/* INNO TEXNO — news & projects (needs i18n.js, catalog-data.js, products.js).
   Add a post here, then run `node tools/build-products.mjs` → yangiliklar/<slug>.html + the list page.
   Only real, verifiable material: text fields are {uz,ru,en} or "@i18n_key"; dates are ISO (yyyy-mm-dd) or null.
   photos: [[src, caption, isPhoto?]] — isPhoto: rectangular shot (cover-fit), else a cut-out (contain).
   blocks: { h, p } | { h, steps: [[title, text]] } | { h, table: [[k, v]] } | { h, list: [..] } | { h, timeline: [[date, text]] } | { photos: true } */
const POSTS = [
  {
    slug: 'aqlli-yol-belgisi-patentlandi', type: 'news', date: '2026-07-03',
    cover: 'assets/img/products/p-smart-sign.webp', product: 'aqlli-yol-belgisi',
    title: { uz: "«Aqlli yo'l belgisi» sanoat namunasi sifatida patentlandi", ru: "«Умный дорожный знак» получил патент на промышленный образец", en: "The Smart Road Sign receives an industrial design patent" },
    lead: {
      uz: "O'zbekiston Respublikasi Adliya vazirligi «Aqlli yo'l belgisi» uchun № SAP 2888 sanoat namunasi patentini berdi va uni davlat reestriga kiritdi.",
      ru: "Министерство юстиции Республики Узбекистан выдало патент на промышленный образец № SAP 2888 на «Умный дорожный знак» и внесло его в государственный реестр.",
      en: "The Ministry of Justice of the Republic of Uzbekistan has granted industrial design patent No. SAP 2888 for the Smart Road Sign and entered it in the state register."
    },
    facts: [['@nw_status', '@nw_st_registered'], ['@sk_patent', '№ SAP 2888'], ['@nw_date', '03.07.2026']],
    docs: [['@doc_patent', 'assets/docs/patent-uz-sap-2888.pdf'], ['@doc_reestr', 'assets/docs/reestr-uz-sap-2888.pdf']],
    photos: [
      ['assets/img/products/p-smart-sign.webp', '@g_view_main'], ['assets/img/gallery/aqlli-yol-belgisi-2.webp', '@g_ss_front'],
      ['assets/img/gallery/aqlli-yol-belgisi-3.webp', '@g_ss_top'], ['assets/img/gallery/aqlli-yol-belgisi-4.webp', '@g_ss_mount']
    ],
    blocks: [
      { h: { uz: "Belgi nima qiladi", ru: "Что делает знак", en: "What the sign does" }, p: '@ss_desc' },
      { h: { uz: "Patentlash bosqichlari", ru: "Этапы патентования", en: "Patenting milestones" }, timeline: [
        ['2024-11-29', { uz: "Talabnoma topshirildi (SAP 20240218)", ru: "Подана заявка (SAP 20240218)", en: "Application filed (SAP 20240218)" }],
        ['2026-07-03', { uz: "Sanoat namunalari davlat reyestrida ro'yxatdan o'tkazildi", ru: "Зарегистрирован в Государственном реестре промышленных образцов", en: "Registered in the State Register of Industrial Designs" }],
        ['2026-07-06', { uz: "Rasmiy axborotnomada e'lon qilindi (№ 7(303))", ru: "Опубликован в официальном бюллетене (№ 7(303))", en: "Published in the official bulletin (No. 7(303))" }]
      ] },
      { h: { uz: "Amal qilish muddati", ru: "Срок действия", en: "Term of protection" }, p: {
        uz: "Patent O'zbekiston Respublikasi hududida 29.11.2024 yildan boshlab 10 yil davomida amal qiladi — patent boji o'z vaqtida to'langan taqdirda.",
        ru: "Патент действует на территории Республики Узбекистан 10 лет с 29.11.2024 — при своевременной уплате патентной пошлины.",
        en: "The patent is valid in the Republic of Uzbekistan for 10 years from 29.11.2024, provided the patent fees are paid on time."
      } },
      { h: '@nw_photos', photos: true }
    ]
  },
  {
    slug: 'aqlli-piyodalar-otish-joyi', type: 'project', date: null,
    cover: 'assets/img/gallery/aqlli-piyodalar-otish-joyi-2.webp', coverPhoto: true, product: 'aqlli-piyodalar-otish-joyi',
    title: { uz: "Sun'iy intellektli piyodalar o'tish joyi real sharoitda", ru: "Пешеходный переход с ИИ в реальных условиях", en: "An AI-driven pedestrian crossing in real conditions" },
    lead: {
      uz: "Farg'ona davlat texnika universiteti bilan hamkorlikda ishlab chiqilgan tizim o'rnatildi: piyoda tugmani bosadi, datchiklar uni aniqlaydi, LED modullar haydovchilarni ogohlantiradi.",
      ru: "Система, разработанная совместно с Ферганским государственным техническим университетом, установлена на переходе: пешеход нажимает кнопку, датчики его обнаруживают, LED-модули предупреждают водителей.",
      en: "Developed with Fergana State Technical University, the system is installed on a crossing: the pedestrian presses a button, sensors detect them and LED modules warn drivers."
    },
    facts: [['@nw_status', '@nw_st_installed'], ['@nw_partner', { uz: "Farg'ona davlat texnika universiteti", ru: 'Ферганский государственный технический университет', en: 'Fergana State Technical University' }]],
    partnerLogo: 'assets/img/partners/fdtu.webp',
    photos: [
      ['assets/img/gallery/aqlli-piyodalar-otish-joyi-2.webp', '@g_ai_day1', true], ['assets/img/gallery/aqlli-piyodalar-otish-joyi-3.webp', '@g_ai_day2', true],
      ['assets/img/gallery/aqlli-piyodalar-otish-joyi-4.webp', '@g_ai_red', true], ['assets/img/gallery/aqlli-piyodalar-otish-joyi-5.webp', '@g_ai_green', true],
      ['assets/img/gallery/aqlli-piyodalar-otish-joyi-6.webp', '@g_ai_close1', true], ['assets/img/gallery/aqlli-piyodalar-otish-joyi-7.webp', '@g_ai_close2', true]
    ],
    blocks: [
      { h: { uz: "Maqsad", ru: "Цель", en: "Goal" }, p: '@ai_goal' },
      { h: '@nw_photos', photos: true },
      { h: '@ai_how', steps: [['@ai_s1t', '@ai_s1d'], ['@ai_s2t', '@ai_s2d'], ['@ai_s3t', '@ai_s3d'], ['@ai_s4t', '@ai_s4d'], ['@ai_s5t', '@ai_s5d']] },
      { h: { uz: "Afzalliklari", ru: "Преимущества", en: "Advantages" }, list: [
        { uz: "Piyodalar xavfsizligini oshiradi", ru: "Повышает безопасность пешеходов", en: "Improves pedestrian safety" },
        { uz: "Haydovchilarni o'z vaqtida ogohlantiradi", ru: "Своевременно предупреждает водителей", en: "Warns drivers in time" },
        { uz: "Kechasi yuqori ko'rinuvchanlikni ta'minlaydi", ru: "Обеспечивает высокую видимость ночью", en: "Stays highly visible at night" },
        { uz: "Piyodani avtomatik aniqlaydi", ru: "Автоматически обнаруживает пешехода", en: "Detects pedestrians automatically" },
        { uz: "Modulli va ixcham konstruksiya", ru: "Модульная и компактная конструкция", en: "Modular, compact design" },
        { uz: "Mavjud yo'l infratuzilmasi va Smart City tizimlariga mos", ru: "Подходит к существующей дорожной инфраструктуре и системам Smart City", en: "Fits existing road infrastructure and Smart City systems" }
      ] },
      { h: '@ai_specs', table: [['@sp1', '@sv1'], ['@sp2', '@sv2'], ['@sp3', '@sv3'], ['@sp4', '@sv4'], ['@sp5', '@sv5'], ['@sp6', '@sv6'], ['@sp7', '@sv7']] }
    ]
  }
];

const POST_ROOT = '../'; /* post pages live in /yangiliklar/ */
const findPost = slug => POSTS.find(p => p.slug === slug);
const postDate = iso => (iso ? iso.split('-').reverse().join('.') : '');
const postUrl = (p, root) => `${root}yangiliklar/${p.slug}.html`;
/* newest dated posts first, undated projects after them */
const sortedPosts = () => [...POSTS].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

function postCardHtml(p, root) {
  const type = p.type === 'project' ? t('nw_project') : t('nw_news');
  return `
    <article class="post-card" data-type="${p.type}">
      <a class="post-cover${p.coverPhoto ? ' is-photo' : ''}" href="${postUrl(p, root)}" tabindex="-1" aria-hidden="true"><img src="${root}${p.cover}" alt="" loading="lazy"></a>
      <div class="post-card-body">
        <div class="post-meta"><span class="badge">${type}</span>${p.date ? `<time datetime="${p.date}">${postDate(p.date)}</time>` : ''}</div>
        <h3><a href="${postUrl(p, root)}">${esc(tr(p.title))}</a></h3>
        <p>${esc(tr(p.lead))}</p>
        <a class="post-more" href="${postUrl(p, root)}"><span>${t('nw_read')}</span><iconify-icon icon="lucide:arrow-right"></iconify-icon></a>
      </div>
    </article>`;
}
function postsListHtml(root = '') { return sortedPosts().map(p => postCardHtml(p, root)).join(''); }
function postCounts() {
  return { all: POSTS.length, project: POSTS.filter(p => p.type === 'project').length, news: POSTS.filter(p => p.type === 'news').length };
}

/* ---- post page ---- */
function renderPostCrumbs(p) {
  const sep = '<iconify-icon icon="lucide:chevron-right" aria-hidden="true"></iconify-icon>';
  return `<a href="${POST_ROOT}index.html">${t('crumb_home')}</a>${sep}<a href="${POST_ROOT}yangiliklar.html">${t('nw_h1')}</a>${sep}<span aria-current="page">${esc(tr(p.title))}</span>`;
}
function renderPostHead(p) {
  return `<div class="post-meta"><span class="badge">${p.type === 'project' ? t('nw_project') : t('nw_news')}</span>${p.date ? `<time datetime="${p.date}">${postDate(p.date)}</time>` : ''}</div>
    <h1>${esc(tr(p.title))}</h1><p class="post-lead">${esc(tr(p.lead))}</p>`;
}
function postPhotosHtml(p) {
  return `<div class="post-photos">${p.photos.map(([src, cap, photo], i) =>
    `<button type="button" class="post-photo${photo ? ' is-photo' : ''}" data-photo="${i}" aria-label="${esc(t('g_zoom') + ': ' + tr(cap))}"><img src="${POST_ROOT}${src}" alt="${esc(tr(cap))}" loading="lazy"><span>${esc(tr(cap))}</span></button>`).join('')}</div>`;
}
function renderPostBody(p) {
  return p.blocks.map(b => {
    const h = b.h ? `<h2>${esc(tr(b.h))}</h2>` : '';
    if (b.photos) return `<section class="post-block">${h}${postPhotosHtml(p)}</section>`;
    if (b.p) return `<section class="post-block">${h}<p>${esc(tr(b.p))}</p></section>`;
    if (b.steps) return `<section class="post-block">${h}<ol class="steps">${b.steps.map(([a, c]) => `<li><div><b>${esc(tr(a))}</b><span>${esc(tr(c))}</span></div></li>`).join('')}</ol></section>`;
    if (b.table) return `<section class="post-block">${h}<table class="spec-table">${b.table.map(([k, v]) => `<tr><th>${esc(tr(k))}</th><td>${esc(tr(v))}</td></tr>`).join('')}</table></section>`;
    if (b.list) return `<section class="post-block">${h}<ul class="sv-list">${b.list.map(x => `<li><iconify-icon icon="lucide:check"></iconify-icon><span>${esc(tr(x))}</span></li>`).join('')}</ul></section>`;
    if (b.timeline) return `<section class="post-block">${h}<ol class="timeline">${b.timeline.map(([d, x]) => `<li><time datetime="${d}">${postDate(d)}</time><span>${esc(tr(x))}</span></li>`).join('')}</ol></section>`;
    return '';
  }).join('');
}
function renderPostAside(p) {
  const prod = p.product && findProduct(p.product);
  const facts = `<div class="post-aside-card"><h2>${t('nw_facts')}</h2><table class="spec-table">${p.facts.map(([k, v]) => `<tr><th>${esc(tr(k))}</th><td>${esc(tr(v))}</td></tr>`).join('')}</table>`
    + (p.partnerLogo ? `<img class="ab-partner-mini" src="${POST_ROOT}${p.partnerLogo}" width="700" height="301" alt="Farg'ona davlat texnika universiteti" loading="lazy">` : '') + '</div>';
  const product = prod ? `<a class="post-aside-card post-product" href="${POST_ROOT}mahsulot/${prod.slug}.html">
      <span class="post-product-thumb">${thumbHtml(prod).replace(/src="\.\.\//g, `src="${POST_ROOT}`)}</span>
      <span><span class="cp-label">${t('nw_product')}</span><b>${esc(productName(prod))}</b><span class="pc-price">${priceLabel(prod)}</span></span>
      <iconify-icon icon="lucide:arrow-up-right"></iconify-icon></a>` : '';
  const docs = p.docs ? `<div class="post-aside-card"><h2>${t('nw_docs')}</h2><div class="doc-links">${p.docs.map(([k, href]) =>
      `<a href="${POST_ROOT}${href}" target="_blank" rel="noopener"><iconify-icon icon="lucide:file-text"></iconify-icon><span>${esc(tr(k))}</span></a>`).join('')}</div></div>` : '';
  const cta = `<a class="btn post-cta" href="#buyurtma" data-product="${prod ? prod.form : 'other'}" data-item="${esc(tr(p.title))}" data-price="${esc(prod ? priceLabel(prod) : t('price_request'))}"><span>${t('nw_cta')}</span><iconify-icon icon="lucide:arrow-right"></iconify-icon></a>`;
  return facts + product + docs + cta;
}
function renderPostOthers(p) {
  const others = sortedPosts().filter(x => x.slug !== p.slug);
  if (!others.length) return '';
  return `<div class="sec-head"><h2>${t('nw_others')}</h2></div><div class="post-grid">${others.map(x => postCardHtml(x, POST_ROOT)).join('')}</div>
    <p class="post-back"><a href="${POST_ROOT}yangiliklar.html"><iconify-icon icon="lucide:arrow-left"></iconify-icon><span>${t('nw_back')}</span></a></p>`;
}
function postLd(p, base) {
  const ld = { '@context': 'https://schema.org', '@type': p.type === 'news' ? 'NewsArticle' : 'Article', headline: tr(p.title), description: tr(p.lead),
    image: p.photos.map(([src]) => base + src), url: `${base}yangiliklar/${p.slug}.html`, inLanguage: 'uz',
    publisher: { '@type': 'Organization', name: 'INNO TEXNO', logo: { '@type': 'ImageObject', url: `${base}assets/img/icon-512.png` } } };
  if (p.date) ld.datePublished = p.date;
  return ld;
}

/* ---- browser ---- */
if (typeof document !== 'undefined') {
  const list = document.getElementById('posts-list');
  if (list) {                                   /* list page */
    let filter = 'all';
    const paint = () => {
      document.title = t('nw_title');
      list.innerHTML = postsListHtml('');
      const shown = [...list.children].filter(c => { const on = filter === 'all' || c.dataset.type === filter; c.hidden = !on; return on; });
      document.getElementById('posts-empty').hidden = shown.length > 0;
      const n = postCounts();
      document.querySelectorAll('[data-filter]').forEach(b => {
        b.setAttribute('aria-pressed', String(b.dataset.filter === filter));
        b.querySelector('.n').textContent = n[b.dataset.filter];
      });
    };
    document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => { filter = b.dataset.filter; paint(); }));
    paint();
    document.addEventListener('langchange', paint);
  }
  const P = document.body.dataset.post && findPost(document.body.dataset.post);
  if (P) {                                      /* post page */
    const mount = () => {
      document.title = `${tr(P.title)} — INNO TEXNO`;
      document.getElementById('post-crumbs').innerHTML = renderPostCrumbs(P);
      document.getElementById('post-head').innerHTML = renderPostHead(P);
      document.getElementById('post-body').innerHTML = renderPostBody(P);
      document.getElementById('post-aside').innerHTML = renderPostAside(P);
      document.getElementById('post-others').innerHTML = renderPostOthers(P);
      Lightbox.repaint();
    };
    const items = () => P.photos.map(([src, cap]) => ({ src: POST_ROOT + src, alt: tr(cap), cap: tr(cap) }));
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-photo]');
      if (btn) Lightbox.open(items, +btn.dataset.photo, { label: () => `${t('nw_photos')}: ${tr(P.title)}`, returnFocus: () => document.querySelector(`[data-photo="${btn.dataset.photo}"]`) });
    });
    mount();
    document.addEventListener('langchange', mount);
  }
}
