// Builds one static page per product into mahsulot/, the content pages from tools/pages/ (e.g. kompaniya.html) + sitemap.xml.
// Usage: node tools/build-products.mjs   (re-run after changing catalog-data.js, products.js, i18n.js, tools/pages/* or katalog.html chrome)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://farik9797.github.io/inno-texno/'; // change when the site moves to its own domain
const OUT = path.join(ROOT_DIR, 'mahsulot');
const read = f => fs.readFileSync(path.join(ROOT_DIR, f), 'utf8');

// same renderer as the browser: run the page scripts in one shared context (lang = uz)
const ctx = vm.createContext({ console });
for (const f of ['assets/js/i18n.js', 'assets/js/catalog-data.js', 'assets/js/products.js', 'assets/js/product.js', 'assets/js/kompaniya.js', 'assets/js/xizmatlar.js']) {
  vm.runInContext(read(f), ctx, { filename: f });
}
const run = code => JSON.parse(vm.runInContext(`JSON.stringify(${code})`, ctx));

// shared chrome (header, mobile menu, order form, footer, toast) taken from katalog.html
const kat = read('katalog.html');
const slice = (a, b) => {
  const i = kat.indexOf(a), j = kat.indexOf(b, i);
  if (i < 0 || j < 0) throw new Error(`katalog.html marker not found: ${a} … ${b}`);
  return kat.slice(i, j);
};
const toRoot = h => h
  .replace(/(href|src)="([a-z0-9-]+\.html|assets\/)/g, '$1="../$2')   // root-level pages + assets
  .replace(/ aria-current="page"/g, '');          // catalogue link stays highlighted, but this is not that page
const chromeRaw = slice('<a class="skip-link"', '<main id="main">');
const orderRaw = slice('<!-- ORDER -->', '</main>');
const footerRaw = slice('<footer class="site-footer">', '<script src=');
const formRaw = slice('<form class="contact-form" id="order-form">', '</form>') + '</form>';
const chrome = toRoot(chromeRaw), order = toRoot(orderRaw), footer = toRoot(footerRaw);
const iconTags = root => `<link rel="icon" href="${root}favicon.ico" sizes="32x32">
<link rel="icon" href="${root}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${root}apple-touch-icon.png">
<link rel="manifest" href="${root}site.webmanifest">
<meta name="theme-color" content="#0a0e11">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}assets/css/style.css">`;
const escAttr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) if (f.endsWith('.html')) fs.unlinkSync(path.join(OUT, f));

const slugs = run('PRODUCTS.map(p => p.slug)');
for (const slug of slugs) {
  const d = run(`(() => { const p = findProduct(${JSON.stringify(slug)}); const vs = variants(p);
    return { name: productName(p), desc: productDesc(p), cat: t(CAT_LABEL[p.cat]), anchor: CAT_ANCHOR[p.cat],
      img: productImage(p), imgs: productImages(p), prices: vs.map(v => v.price),
      crumbs: renderCrumbs(p), hero: renderHero(p, 0), details: renderDetails(p), related: renderRelated(p) }; })()`);
  const url = `${BASE}mahsulot/${slug}.html`;
  const metaDesc = d.desc.length > 158 ? d.desc.slice(0, 155).replace(/\s+\S*$/, '') + '…' : d.desc;

  const product = { '@context': 'https://schema.org', '@type': 'Product', name: d.name, description: d.desc,
    brand: { '@type': 'Brand', name: 'INNO TEXNO' }, category: d.cat, url };
  if (d.imgs.length) product.image = d.imgs.map(i => BASE + i);
  if (d.prices.length === 1) product.offers = { '@type': 'Offer', price: d.prices[0], priceCurrency: 'UZS', url };
  else if (d.prices.length > 1) product.offers = { '@type': 'AggregateOffer', priceCurrency: 'UZS',
    lowPrice: Math.min(...d.prices), highPrice: Math.max(...d.prices), offerCount: d.prices.length };
  const crumbsLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    ['Bosh sahifa', BASE], ['Katalog', `${BASE}katalog.html`], [d.cat, `${BASE}katalog.html#${d.anchor}`], [d.name, url]
  ].map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })) };

  const html = `<!DOCTYPE html>
<html lang="uz">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escAttr(d.name)} — INNO TEXNO</title>
<meta name="description" content="${escAttr(metaDesc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="product">
<meta property="og:title" content="${escAttr(d.name)} — INNO TEXNO">
<meta property="og:description" content="${escAttr(metaDesc)}">
<meta property="og:url" content="${url}">${d.img ? `\n<meta property="og:image" content="${BASE}${d.img}">` : ''}
${iconTags('../')}
<script type="application/ld+json">${JSON.stringify(product)}</script>
<script type="application/ld+json">${JSON.stringify(crumbsLd)}</script>
</head>
<body class="catalog-page product-page" data-slug="${slug}">
<!-- generated by tools/build-products.mjs — edit products.js / catalog-data.js and rebuild -->

${chrome}<main id="main">

<div class="pp-top">
  <div class="wrap"><nav class="crumbs" id="pp-crumbs" aria-label="Breadcrumb">${d.crumbs}</nav></div>
</div>

<section class="pp-hero">
  <div class="wrap pp-hero-in" id="pp-hero">${d.hero}</div>
</section>

<section class="k-sec alt">
  <div class="wrap pp-details" id="pp-details">${d.details}</div>
</section>

<section class="k-sec">
  <div class="wrap" id="pp-related">${d.related}</div>
</section>

${order}</main>

${footer}<script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
<script src="../assets/js/i18n.js"></script>
<script src="../assets/js/catalog-data.js"></script>
<script src="../assets/js/products.js"></script>
<script src="../assets/js/site.js"></script>
<script src="../assets/js/product.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, `${slug}.html`), html);
}

// ---- content pages: tools/pages/<out>.html is the <main> body; chrome/order/footer come from katalog.html ----
const PAGES = [
  { src: 'tools/pages/kompaniya.html', out: 'kompaniya.html', title: 'ab_title', desc: 'ab_lead',
    scripts: ['assets/js/catalog-data.js', 'assets/js/kompaniya.js'], orderTitle: ['ab_cta_t', 'ab_cta_d'],
    ld: { '@type': 'Organization', name: 'INNO TEXNO', url: BASE, logo: `${BASE}assets/img/icon-512.png` } },
  // the form is placed in the body via {{form}}; contact data are still placeholders → not put into JSON-LD
  { src: 'tools/pages/aloqa.html', out: 'aloqa.html', title: 'cp_title', desc: 'cp_lead', order: false,
    scripts: ['assets/js/aloqa.js'], ld: { '@type': 'ContactPage', name: 'INNO TEXNO', url: `${BASE}aloqa.html` } },
  { src: 'tools/pages/xizmatlar.html', out: 'xizmatlar.html', title: 'sv_title', desc: 'sv_lead',
    scripts: ['assets/js/xizmatlar.js'], orderTitle: ['sv_form_t', 'sv_form_d'], ldExpr: 'servicesLd()' },
];
for (const pg of PAGES) {
  const url = BASE + pg.out;
  const title = run(`t(${JSON.stringify(pg.title)})`), desc = run(`t(${JSON.stringify(pg.desc)})`);
  const body = read(pg.src).replace(/^<!--[\s\S]*?-->\n/, '')                 // drop the authoring note
    .replace('{{form}}', formRaw)
    .replace(/\{\{html:([^}]+)\}\}/g, (_, expr) => String(run(expr)))       // markup built by a page script
    .replace(/\{\{js:([^}]+)\}\}/g, (_, expr) => escAttr(run(expr)));       // static UZ text (escaped) for SEO
  const chromePg = chromeRaw
    .replace(/ class="active" aria-current="page"/g, '')                      // katalog.html marks itself active
    .replace(new RegExp(`<a href="${pg.out.replace('.', '\\.')}"`, 'g'), `<a href="${pg.out}" class="active" aria-current="page"`);
  let orderPg = orderRaw;
  if (pg.orderTitle) orderPg = orderPg
    .replace(/data-i18n="ct_title">[^<]*/, `data-i18n="${pg.orderTitle[0]}">${run(`t(${JSON.stringify(pg.orderTitle[0])})`)}`)
    .replace(/data-i18n="ct_sub">[^<]*/, `data-i18n="${pg.orderTitle[1]}">${run(`t(${JSON.stringify(pg.orderTitle[1])})`)}`);
  const ld = { '@context': 'https://schema.org', ...(pg.ldExpr ? run(pg.ldExpr) : { ...pg.ld, description: desc }) };
  const html = `<!DOCTYPE html>
<html lang="uz">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escAttr(title)}</title>
<meta name="description" content="${escAttr(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${escAttr(title)}">
<meta property="og:description" content="${escAttr(desc)}">
<meta property="og:url" content="${url}">
${iconTags('')}
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body class="catalog-page">
<!-- generated by tools/build-products.mjs from ${pg.src} — edit that file and rebuild -->

${chromePg}<main id="main">
${body}
${pg.order === false ? '' : orderPg}</main>

${footerRaw}<script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
<script src="assets/js/i18n.js"></script>
${pg.scripts.filter(f => !f.endsWith(pg.out.replace('.html', '.js'))).map(f => `<script src="${f}"></script>`).join('\n')}
<script src="assets/js/site.js"></script>
${pg.scripts.filter(f => f.endsWith(pg.out.replace('.html', '.js'))).map(f => `<script src="${f}"></script>`).join('\n')}
</body>
</html>
`;
  fs.writeFileSync(path.join(ROOT_DIR, pg.out), html);
}

const today = new Date().toISOString().slice(0, 10);
const urls = ['', 'katalog.html', ...PAGES.map(p => p.out), ...slugs.map(s => `mahsulot/${s}.html`)];
fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
  + urls.map(u => `  <url><loc>${BASE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') + '\n</urlset>\n');
console.log(`built ${slugs.length} product pages → mahsulot/, ${PAGES.length} content page(s), sitemap.xml (${urls.length} urls)`);
