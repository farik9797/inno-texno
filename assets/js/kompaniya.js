/* INNO TEXNO — about page (needs i18n.js, catalog-data.js; site.js in the browser).
   aboutCount() and regionsHtml() are also used by tools/build-products.mjs for the static page. */
function aboutCount() {
  return CATALOG.lights.length + CATALOG.equip.length + Object.keys(CATALOG.systems).length
    + CATALOG.poles.reduce((s, g) => s + g.rows.length, 0);
}
function regionsHtml() {
  const list = t('regions').split('|');
  return list.map((r, i) => `<li${i === list.length - 1 ? ' class="cis"' : ''}>${esc(r)}</li>`).join('');
}

if (typeof document !== 'undefined') {
  const renderAbout = () => {
    document.title = t('ab_title');
    document.getElementById('ab-count').textContent = aboutCount();
    document.getElementById('ab-regions').innerHTML = regionsHtml();
  };
  renderAbout();
  document.addEventListener('langchange', renderAbout);
}
