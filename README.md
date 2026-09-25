# INNO TEXNO — сайт производителя светофоров

Главная страница компании INNO TEXNO (Узбекистан): LED-светофоры, дорожные знаки и системы управления движением.

- **Live:** https://farik9797.github.io/inno-texno/
- Один файл `index.html` (без сборки), тёмная индустриальная тема
- Трёхъязычность UZ / RU / EN, конфигуратор цены, GSAP ScrollTrigger, Zdog 3D-светофор
- Контекст: [PRODUCT.md](PRODUCT.md), [DESIGN.md](DESIGN.md), [PROGRESS.md](PROGRESS.md)

Страницы товаров (`mahsulot/*.html`) и `sitemap.xml` генерируются из `assets/js/catalog-data.js` + `assets/js/products.js`:

```bash
node tools/build-products.mjs
```

Локальный запуск:

```bash
python3 -m http.server 8734
```
