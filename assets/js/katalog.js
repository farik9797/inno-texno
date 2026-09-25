/* INNO TEXNO — catalogue page (needs i18n.js, catalog-data.js, products.js, site.js). */
const pageFor = ref => { const p = PRODUCTS.find(x => x.refs.includes(ref)); return p ? `mahsulot/${p.slug}.html` : '#'; };
const orderAttrs = (product, name, price) =>
  `href="#buyurtma" data-product="${product}" data-item="${esc(name)}" data-price="${esc(price)}"`;

function renderLights() {
  document.getElementById('lights-grid').innerHTML = CATALOG.lights.map(l => `
    <article class="product-card">
      <a class="pc-visual" href="${pageFor('lights:' + l.id)}" tabindex="-1" aria-hidden="true"><img src="${l.img}" alt="${esc(tr(l.name))}" loading="lazy"></a>
      <h3 class="pc-name"><a href="${pageFor('lights:' + l.id)}">${esc(tr(l.name))}</a></h3>
      <span class="pc-spec">${esc(tr(l.spec))}</span>
      <span class="pc-price">${money(l.price)}</span>
      <div class="pc-actions">
        <a class="btn sm" ${orderAttrs(l.product, tr(l.name), money(l.price))}>${t('btn_order')}</a>
        <a class="btn sm ghost" href="${pageFor('lights:' + l.id)}">${t('pp_more')}</a>
      </div>
    </article>`).join('');
}

function poleSchema(shape) {
  return `<span class="pole-schema ${shape}" aria-hidden="true"><i class="mast"></i>${shape === 'g' ? '<i class="arm"></i>' : ''}<i class="head"></i><i class="base"></i></span>`;
}

function renderPoles() {
  const card = g => {
    const isG = g.shape === 'g';
    const lens = g.rows.map(r => (isG ? r[1] : r[0]));
    const range = `${dec(Math.min(...lens))}–${len(Math.max(...lens))}`;
    const title = isG ? `${sec(g.section)} · ${len(g.height)}` : sec(g.section);
    const head = isG
      ? `<th>${t('th_console')}</th><th>${t('th_len')}</th><th>${t('th_price')}</th><th><span class="sr-only">${t('row_order')}</span></th>`
      : `<th>${t('th_height')}</th><th>${t('th_price')}</th><th><span class="sr-only">${t('row_order')}</span></th>`;
    const rows = g.rows.map(r => {
      const price = money(r[r.length - 1]);
      const name = isG
        ? t('pole_g_name').replace('{sec}', sec(g.section)).replace('{h}', len(g.height)).replace('{c}', sec(r[0])).replace('{l}', len(r[1]))
        : t('pole_i_name').replace('{sec}', sec(g.section)).replace('{h}', len(r[0]));
      const cells = isG ? `<td>${sec(r[0])}</td><td>${len(r[1])}</td>` : `<td>${len(r[0])}</td>`;
      return `<tr>${cells}<td class="num">${price}</td><td><a class="row-order" ${orderAttrs('ustun', name, price)} aria-label="${esc(t('row_order') + ': ' + name)}"><iconify-icon icon="lucide:plus"></iconify-icon></a></td></tr>`;
    }).join('');
    return `
      <article class="pole-card">
        <header class="pole-head">
          ${poleSchema(g.shape)}
          <div>
            <h4><a href="${pageFor('poles:' + g.id)}">${title}</a></h4>
            <span class="pole-prof">${t('pr_' + g.profile)}</span>
            <span class="pole-range">${isG ? t('th_console') + ' ' : ''}${range}</span>
          </div>
          <a class="pole-more" href="${pageFor('poles:' + g.id)}" aria-label="${esc(t('pp_more') + ': ' + title)}"><iconify-icon icon="lucide:arrow-up-right"></iconify-icon></a>
        </header>
        <table class="price-table"><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table>
      </article>`;
  };
  document.getElementById('poles-i').innerHTML = CATALOG.poles.filter(g => g.shape === 'i').map(card).join('');
  document.getElementById('poles-g').innerHTML = CATALOG.poles.filter(g => g.shape === 'g').map(card).join('');
}

function renderEquip() {
  document.getElementById('equip-grid').innerHTML = CATALOG.equip.map(e => `
    <article class="equip-card">
      <span class="equip-ic"><iconify-icon icon="${e.icon}"></iconify-icon></span>
      <h3><a href="${pageFor('equip:' + e.id)}">${esc(tr(e.name))}</a></h3>
      <span class="pc-price">${money(e.price)}</span>
      <a class="btn sm ghost" ${orderAttrs('jihoz', tr(e.name), money(e.price))}>${t('btn_order')}</a>
    </article>`).join('');
}

function renderStatic() {
  document.title = t('kp_title');
  document.getElementById('ai-price').textContent = money(CATALOG.systems['ai-crossing']);
  document.querySelectorAll('[data-item-key]').forEach(b => {
    b.dataset.item = t(b.dataset.itemKey);
    b.dataset.price = b.dataset.system ? money(CATALOG.systems[b.dataset.system]) : t('price_request');
  });
  const poles = CATALOG.poles.reduce((s, g) => s + g.rows.length, 0);
  [['n-smart', 2], ['n-lights', CATALOG.lights.length], ['n-poles', poles], ['n-equip', CATALOG.equip.length]]
    .forEach(([id, n]) => { document.getElementById(id).textContent = n; });
}

function renderCatalog() { renderStatic(); renderLights(); renderPoles(); renderEquip(); }
renderCatalog();
document.addEventListener('langchange', renderCatalog);
