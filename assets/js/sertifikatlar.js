/* INNO TEXNO — certificates & documents page (needs i18n.js; site.js in the browser).
   docsHtml() / docsLd() are also run by tools/build-products.mjs to bake the static page.
   A new PDF: add it here (bytes = exact file size — the build checks it), render a first-page preview
   (pdftoppm -f 1 -l 1 -scale-to-x 560 -scale-to-y -1 -png file.pdf out → cwebp) and rebuild.
   rows: [label i18n key, value — "@i18n_key" or a literal] — only what is printed in the document itself. */
const DOCS = [
  { file: 'assets/docs/patent-uz-sap-2888.pdf', preview: 'assets/img/docs/patent-uz-sap-2888.webp', bytes: 2720582, pages: 1,
    kind: 'dc_k_patent', icon: 'lucide:award', title: 'c1t', desc: 'c1d',
    rows: [['dc_no', '№ SAP 2888'], ['dc_issuer', '@dc_moj'], ['dc_app', 'SAP 20240218 · 29.11.2024'], ['dc_term', '@dc_term_v']] },
  { file: 'assets/docs/reestr-uz-sap-2888.pdf', preview: 'assets/img/docs/reestr-uz-sap-2888.webp', bytes: 305021, pages: 2,
    kind: 'dc_k_reestr', icon: 'lucide:file-text', title: 'c2t', desc: 'c2d',
    rows: [['dc_regno', 'UZ SAP 2888'], ['sk_reg', '03.07.2026'], ['dc_bull', '06.07.2026 · № 7(303)'], ['dc_app', 'SAP 20240218 · 29.11.2024']] }
];
const DOC_PRODUCT = ['fm_p3', 'mahsulot/aqlli-yol-belgisi.html']; /* both documents cover the smart road sign */

const fileSize = b => (b < 1048576 ? `${Math.round(b / 1024)} ${t('u_kb')}` : `${dec((b / 1048576).toFixed(1))} ${t('u_mb')}`);
const docPages = n => (n === 1 ? t('dc_page1') : t('dc_pages').replace('{n}', n));

function docsHtml() {
  return DOCS.map(d => {
    const name = t(d.title);
    return `
      <article class="doc-card">
        <a class="doc-preview" href="${d.file}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">
          <img src="${d.preview}" alt="${esc(t('dc_preview').replace('{name}', name))}" width="560" height="793" loading="lazy">
        </a>
        <div class="doc-body">
          <span class="doc-kind"><iconify-icon icon="${d.icon}"></iconify-icon>${esc(t(d.kind))}</span>
          <h3>${esc(name)}</h3>
          <p>${esc(t(d.desc))}</p>
          <dl class="doc-meta">${d.rows.map(([k, v]) => `<div><dt>${esc(t(k))}</dt><dd>${esc(tr(v))}</dd></div>`).join('')}
            <div><dt>${esc(t('nw_product'))}</dt><dd><a href="${DOC_PRODUCT[1]}">${esc(t(DOC_PRODUCT[0]))}</a></dd></div></dl>
          <div class="doc-actions">
            <a class="btn sm" href="${d.file}" download><iconify-icon icon="lucide:download"></iconify-icon><span>${esc(t('dc_download'))}</span></a>
            <a class="btn sm ghost" href="${d.file}" target="_blank" rel="noopener" aria-label="${esc(t('dc_open_aria').replace('{name}', name))}"><iconify-icon icon="lucide:external-link"></iconify-icon><span>${esc(t('dc_open'))}</span></a>
            <span class="doc-file">PDF · ${docPages(d.pages)} · ${fileSize(d.bytes)}</span>
          </div>
        </div>
      </article>`;
  }).join('');
}

function docsLd(base) {
  return { '@type': 'CollectionPage', name: t('cert_title'), url: `${base}sertifikatlar.html`, description: t('dc_lead'),
    hasPart: DOCS.map(d => ({ '@type': 'DigitalDocument', name: t(d.title), description: t(d.desc), url: base + d.file,
      encodingFormat: 'application/pdf', about: { '@type': 'Product', name: t(DOC_PRODUCT[0]), url: base + DOC_PRODUCT[1] } })) };
}

if (typeof document !== 'undefined') {
  const list = document.getElementById('docs-list');
  const paint = () => { document.title = t('dc_title'); list.innerHTML = docsHtml(); };
  paint();
  document.addEventListener('langchange', paint);
}
