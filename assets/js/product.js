/* INNO TEXNO — product page renderer (needs i18n.js, catalog-data.js, products.js).
   The string builders below are also run by tools/build-products.mjs to bake the static UZ pages (SEO);
   in the browser the same builders re-render the page on language change. */
const ROOT = '../'; /* product pages live in /mahsulot/ */
const CAT_ANCHOR = { smart: 'aqlli', lights: 'svetoforlar', poles: 'ustunlar', equip: 'jihozlar' };
const CAT_LABEL = { smart: 'chip_smart', lights: 'chip_lights', poles: 'chip_poles', equip: 'chip_equip' };

const findProduct = slug => PRODUCTS.find(p => p.slug === slug);
function refItem(ref) {
  const [list, id] = ref.split(':');
  if (list === 'systems') return { price: CATALOG.systems[id] };
  return CATALOG[list].find(x => x.id === id);
}
const poleGroup = p => (p.refs[0] && p.refs[0].startsWith('poles:') ? refItem(p.refs[0]) : null);

function productName(p) {
  if (p.name) return tr(p.name);
  const g = poleGroup(p);
  if (g) return g.shape === 'g'
    ? t('pole_g_title').replace('{sec}', sec(g.section)).replace('{h}', len(g.height))
    : t('pole_i_title').replace('{sec}', sec(g.section));
  return tr(refItem(p.refs[0]).name);
}

/* every orderable variant of a product: { cells (table columns), label, name (for the order form), price } */
function variants(p) {
  const g = poleGroup(p);
  if (g) return g.rows.map(r => g.shape === 'g'
    ? { cells: [sec(r[0]), len(r[1])], label: `${sec(r[0])} · ${len(r[1])}`, price: r[2],
        name: t('pole_g_name').replace('{sec}', sec(g.section)).replace('{h}', len(g.height)).replace('{c}', sec(r[0])).replace('{l}', len(r[1])) }
    : { cells: [len(r[0])], label: len(r[0]), price: r[1],
        name: t('pole_i_name').replace('{sec}', sec(g.section)).replace('{h}', len(r[0])) });
  if (p.refs.length > 1) return p.refs.map((ref, i) => {
    const it = refItem(ref);
    return { cells: [tr(p.vlabels[i])], label: tr(p.vlabels[i]), price: it.price, name: tr(it.name) };
  });
  if (p.refs.length === 1) return [{ cells: [], label: '', price: refItem(p.refs[0]).price, name: productName(p) }];
  return []; /* price on request */
}
function lengthRange(g) {
  const ls = g.rows.map(r => (g.shape === 'g' ? r[1] : r[0]));
  return `${dec(Math.min(...ls))}–${len(Math.max(...ls))}`;
}

function productDesc(p) {
  if (p.desc) return tr(p.desc);
  const g = poleGroup(p);
  return (g.shape === 'g' ? t('pole_g_desc') : t('pole_i_desc'))
    .replace('{prof}', t('pr_' + g.profile).toLowerCase()).replace('{sec}', sec(g.section))
    .replace('{h}', len(g.height || 0)).replace('{range}', lengthRange(g));
}

function productSpecs(p) {
  if (p.specs) return p.specs.map(([k, v]) => [tr(k), tr(v)]);
  const g = poleGroup(p);
  const rows = [[t('sk_shape'), t(g.shape === 'g' ? 'shape_g' : 'shape_i')], [t('sk_section'), sec(g.section)], [t('sk_profile'), t('pr_' + g.profile)]];
  if (g.shape === 'g') {
    rows.push([t('sk_mast'), len(g.height)], [t('sk_console_sec'), [...new Set(g.rows.map(r => sec(r[0])))].join(', ')], [t('sk_console_len'), lengthRange(g)]);
  } else {
    rows.push([t('sk_height'), lengthRange(g)]);
  }
  rows.push([t('sk_count'), String(g.rows.length)]);
  return rows;
}

function poleSchemaHtml(shape) {
  return `<span class="pole-schema ${shape}" aria-hidden="true"><i class="mast"></i>${shape === 'g' ? '<i class="arm"></i>' : ''}<i class="head"></i><i class="base"></i></span>`;
}
function iconOf(p) { return refItem(p.refs[0]).icon; }
function productImage(p) { return p.thumb || (p.media.kind === 'img' ? p.media.src : null); }

/* small visual for related cards */
function thumbHtml(p) {
  const name = esc(productName(p));
  if (p.media.kind === 'pole') return poleSchemaHtml(poleGroup(p).shape);
  if (p.media.kind === 'icon') return `<span class="pp-icon sm"><iconify-icon icon="${iconOf(p)}"></iconify-icon></span>`;
  return `<img${p.photo ? ' class="pc-photo"' : ''} src="${ROOT}${productImage(p)}" alt="${name}" loading="lazy">`;
}

function priceLabel(p) {
  const vs = variants(p);
  if (!vs.length) return t('price_request');
  if (vs.length === 1) return money(vs[0].price);
  return t('price_from').replace('{p}', money(Math.min(...vs.map(v => v.price))));
}

function renderCrumbs(p) {
  const sep = '<iconify-icon icon="lucide:chevron-right" aria-hidden="true"></iconify-icon>';
  return `<a href="${ROOT}index.html">${t('crumb_home')}</a>${sep}<a href="${ROOT}katalog.html">${t('crumb_cat')}</a>${sep}`
    + `<a href="${ROOT}katalog.html#${CAT_ANCHOR[p.cat]}">${t(CAT_LABEL[p.cat])}</a>${sep}<span aria-current="page">${esc(productName(p))}</span>`;
}

function renderHero(p, vi) {
  const vs = variants(p);
  const name = productName(p);
  const cur = vs[vi] || vs[0];
  let media;
  if (p.media.kind === 'ai') {
    media = `<figure class="feature-photo"><img src="${ROOT}assets/img/products/p-crossing-night.webp" width="656" height="314" alt="${esc(name)}"><figcaption>${t('ai_photo')}</figcaption></figure>`
      + `<img class="feature-cutout" src="${ROOT}assets/img/products/p-crossing-columns.webp" width="876" height="388" alt="" loading="lazy">`;
  } else if (p.media.kind === 'pole') {
    media = poleSchemaHtml(poleGroup(p).shape);
  } else if (p.media.kind === 'icon') {
    media = `<span class="pp-icon"><iconify-icon icon="${iconOf(p)}"></iconify-icon></span>`;
  } else {
    media = `<img src="${ROOT}${p.media.src}" alt="${esc(name)}">`;
  }
  let picker = '';
  if (vs.length > 1) {
    const g = poleGroup(p);
    const label = g && g.shape === 'i' ? t('th_height') : t('pp_variant');
    picker = `<label class="pp-label" for="pp-variant">${label}</label>
      <select id="pp-variant" class="pp-select">${vs.map((v, i) => `<option value="${i}"${i === vi ? ' selected' : ''}>${esc(v.label)} — ${money(v.price)}</option>`).join('')}</select>`;
  }
  const price = cur ? money(cur.price) : t('price_request');
  const note = vs.length > 1 ? `<a class="pp-price-note" href="#variantlar">${t('pp_n_variants').replace('{n}', vs.length)}</a>` : '';
  return `
    <div class="pp-media ${p.media.kind}">${media}</div>
    <div class="pp-info">
      <a class="badge" href="${ROOT}katalog.html#${CAT_ANCHOR[p.cat]}">${t(CAT_LABEL[p.cat])}</a>
      <h1>${esc(name)}</h1>
      <p class="pp-desc">${esc(productDesc(p))}</p>
      ${picker}
      <span class="pp-price" id="pp-price">${price}</span>
      ${note}
      <div class="pp-actions">
        <a class="btn" href="#buyurtma" data-product="${p.form}" data-item="${esc(cur ? cur.name : name)}" data-price="${esc(price)}"><span>${t('btn_order')}</span><iconify-icon icon="lucide:arrow-right"></iconify-icon></a>
        <a class="btn ghost" href="${ROOT}katalog.html#${CAT_ANCHOR[p.cat]}">${t('pp_back')}</a>
      </div>
      <ul class="trust-list">
        <li><iconify-icon icon="lucide:shield-check"></iconify-icon>${t('trust1')}</li>
        <li><iconify-icon icon="lucide:truck"></iconify-icon>${t('trust2')}</li>
        <li><iconify-icon icon="lucide:wallet"></iconify-icon>${t('pay_note')}</li>
      </ul>
    </div>`;
}

function renderDetails(p) {
  const vs = variants(p);
  const specs = `<div class="pp-block"><h2>${t('pp_specs')}</h2><table class="spec-table">`
    + productSpecs(p).map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('') + '</table>'
    + (p.extra ? '' : `<p class="pp-note">${t('pp_datasheet')}</p>`) + '</div>';
  let extra = '';
  if (p.extra === 'ai') {
    extra = `<div class="pp-block"><h2>${t('ai_how')}</h2><ol class="steps">`
      + [1, 2, 3, 4, 5].map(i => `<li><div><b>${t('ai_s' + i + 't')}</b><span>${t('ai_s' + i + 'd')}</span></div></li>`).join('')
      + `</ol><div class="partner-inline"><img src="${ROOT}assets/img/partners/fdtu.webp" width="700" height="301" alt="Farg'ona davlat texnika universiteti" loading="lazy"><span>${t('ai_partner')}</span></div></div>`;
  } else if (p.extra === 'sign') {
    const feats = [['lucide:sun', 'ss_f1'], ['lucide:octagon-alert', 'ss_f2'], ['lucide:gauge', 'ss_f3'], ['lucide:smile', 'ss_f4']];
    extra = `<div class="pp-block"><ul class="feat-list">`
      + feats.map(([ic, k]) => `<li><iconify-icon icon="${ic}"></iconify-icon><span>${t(k)}</span></li>`).join('') + '</ul>'
      + `<div class="doc-links"><a href="${ROOT}assets/docs/patent-uz-sap-2888.pdf" target="_blank" rel="noopener"><iconify-icon icon="lucide:file-text"></iconify-icon><span>${t('doc_patent')}</span></a>`
      + `<a href="${ROOT}assets/docs/reestr-uz-sap-2888.pdf" target="_blank" rel="noopener"><iconify-icon icon="lucide:file-text"></iconify-icon><span>${t('doc_reestr')}</span></a></div></div>`;
  }
  let table = '';
  if (vs.length > 1) {
    const g = poleGroup(p);
    const heads = g ? (g.shape === 'g' ? [t('th_console'), t('th_len')] : [t('th_height')]) : [t('pp_variant')];
    table = `<div class="pp-block" id="variantlar"><h2>${t('pp_variants')}</h2><div class="pp-table"><table class="price-table"><thead><tr>`
      + heads.map(h => `<th>${h}</th>`).join('') + `<th>${t('th_price')}</th><th><span class="sr-only">${t('row_order')}</span></th></tr></thead><tbody>`
      + vs.map(v => `<tr>${v.cells.map(c => `<td>${esc(c)}</td>`).join('')}<td class="num">${money(v.price)}</td>`
        + `<td><a class="row-order" href="#buyurtma" data-product="${p.form}" data-item="${esc(v.name)}" data-price="${esc(money(v.price))}" aria-label="${esc(t('row_order') + ': ' + v.name)}"><iconify-icon icon="lucide:plus"></iconify-icon></a></td></tr>`).join('')
      + '</tbody></table></div></div>';
  }
  const service = `<div class="pp-block"><h2>${t('pp_service')}</h2><ul class="service-list">
      <li><iconify-icon icon="lucide:shield-check"></iconify-icon><div><b>${t('w4t')}</b><p>${t('w4d')}</p></div></li>
      <li><iconify-icon icon="lucide:truck"></iconify-icon><div><b>${t('pp_delivery_t')}</b><p>${t('f2a')}</p></div></li>
      <li><iconify-icon icon="lucide:wallet"></iconify-icon><div><b>${t('pp_pay_t')}</b><p>${t('f3a')}</p></div></li>
    </ul></div>`;
  return `<div class="pp-col">${specs}${extra}</div><div class="pp-col">${table}${service}</div>`;
}

function renderRelated(p) {
  return `<div class="sec-head"><h2>${t('pp_related')}</h2></div><div class="cat-grid">`
    + p.related.map(findProduct).map(r => `
      <article class="product-card">
        <a class="pc-visual" href="${r.slug}.html" tabindex="-1" aria-hidden="true">${thumbHtml(r)}</a>
        <h3 class="pc-name"><a href="${r.slug}.html">${esc(productName(r))}</a></h3>
        <span class="pc-price">${priceLabel(r)}</span>
        <a class="btn sm ghost pc-cta" href="${r.slug}.html">${t('pp_more')}</a>
      </article>`).join('') + '</div>';
}

/* ---- browser: mount + re-render on language change ---- */
if (typeof document !== 'undefined') {
  const P = findProduct(document.body.dataset.slug);
  let vi = 0;
  const heroEl = document.getElementById('pp-hero');
  function mountHero() {
    heroEl.innerHTML = renderHero(P, vi);
    const sel = document.getElementById('pp-variant');
    if (sel) sel.addEventListener('change', () => { vi = +sel.value; mountHero(); document.getElementById('pp-variant').focus(); });
  }
  function mount() {
    document.title = `${productName(P)} — INNO TEXNO`;
    document.getElementById('pp-crumbs').innerHTML = renderCrumbs(P);
    mountHero();
    document.getElementById('pp-details').innerHTML = renderDetails(P);
    document.getElementById('pp-related').innerHTML = renderRelated(P);
  }
  mount();
  document.addEventListener('langchange', mount);
}
