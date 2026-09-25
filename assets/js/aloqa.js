/* INNO TEXNO — contacts page (needs i18n.js, site.js). The map is click-to-load: no request to Google until asked. */
if (typeof document !== 'undefined') {
  const box = document.getElementById('map');
  document.getElementById('map-load').addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.src = `https://maps.google.com/maps?q=${encodeURIComponent(box.dataset.query)}&z=16&output=embed`;
    frame.title = t('cp_map_t');
    frame.referrerPolicy = 'no-referrer-when-downgrade';
    frame.allowFullscreen = true;
    box.replaceChildren(frame);
    box.classList.add('loaded');
  });
  const setTitle = () => { document.title = t('cp_title'); };
  setTitle();
  document.addEventListener('langchange', setTitle);
}
