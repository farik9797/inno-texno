/* INNO TEXNO — services page (needs i18n.js; site.js in the browser).
   servicesHtml() / servicesLd() are also run by tools/build-products.mjs to bake the static page. */
const SERVICES = [
  { n: 1, icon: 'lucide:messages-square' },
  { n: 2, icon: 'lucide:truck', tag: 'sv_free', price: 'sv_free' },
  { n: 3, icon: 'lucide:hard-hat', tag: 'sv_free', price: 'sv_free' },
  { n: 4, icon: 'lucide:shield-check', tag: 'ab_f2v' },
  { n: 5, icon: 'lucide:wrench', tag: 'sv_tag_service' },
  { n: 6, icon: 'lucide:package' }
];

function servicesHtml() {
  return SERVICES.map(s => `
      <article class="sv-card">
        <div class="sv-top">
          <span class="equip-ic"><iconify-icon icon="${s.icon}"></iconify-icon></span>
          ${s.tag ? `<span class="sv-tag" data-i18n="${s.tag}">${esc(t(s.tag))}</span>` : ''}
        </div>
        <h3 data-i18n="sv${s.n}t">${esc(t(`sv${s.n}t`))}</h3>
        <p data-i18n="sv${s.n}d">${esc(t(`sv${s.n}d`))}</p>
        <ul class="sv-list">${['a', 'b', 'c'].map(x => `<li><iconify-icon icon="lucide:check"></iconify-icon><span data-i18n="sv${s.n}${x}">${esc(t(`sv${s.n}${x}`))}</span></li>`).join('')}</ul>
        <a class="btn sm ghost" href="#buyurtma" data-product="xizmat" data-item-key="sv${s.n}t"${s.price ? ` data-price-key="${s.price}"` : ''}><span data-i18n="sv_cta">${esc(t('sv_cta'))}</span><iconify-icon icon="lucide:arrow-right"></iconify-icon></a>
      </article>`).join('');
}

function servicesLd() {
  return { '@type': 'ItemList', name: t('sv_h1'), itemListElement: SERVICES.map((s, i) => ({
    '@type': 'ListItem', position: i + 1,
    item: { '@type': 'Service', name: t(`sv${s.n}t`), description: t(`sv${s.n}d`), provider: { '@type': 'Organization', name: 'INNO TEXNO' }, areaServed: 'UZ' }
  })) };
}

if (typeof document !== 'undefined') {
  const setTitle = () => { document.title = t('sv_title'); };
  setTitle();
  document.addEventListener('langchange', setTitle);
}
