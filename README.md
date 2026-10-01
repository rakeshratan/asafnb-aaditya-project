# Your Company: Premium Indian Foods Website

A multi-page static website for a food & beverage business covering **Retail, Wholesale, Distribution and Export** of makhana, premium dry fruits, healthy beverages and snacks.

Built with **HTML5, CSS3, Bootstrap 5.3 (CSS only), vanilla JavaScript (ES6+)**. There is no build step, framework or server-side code, so it runs on any shared hosting (GoDaddy, cPanel, Hostinger, etc.).

---

## 1. Project structure

```
index.html                 Homepage
404.html                   "Page not found" page
.htaccess                  Apache settings: 404 page, gzip, caching, security headers
robots.txt / sitemap.xml   SEO files (replace the domain, see below)
pages/
  about.html  products.html  makhana.html  dry-fruits.html  beverages.html
  wholesale.html  distribution.html  export.html  enquiry.html  contact.html
  privacy-policy.html  terms.html
assets/
  css/style.css            Design system (colours, fonts) + all components
  css/responsive.css       Tablet & mobile adjustments
  js/config.js             ← YOUR BUSINESS DETAILS (email, phone, WhatsApp, address, social links, form endpoints)
  js/products.js           ← PRODUCT CATALOGUE DATA (add/edit products here)
  js/main.js               Navigation, menus, product grid & filters, product pop-up, testimonial carousel
  js/animations.js         Scroll animations, counters, parallax (respects "reduce motion")
  js/forms.js              Form validation & submission
  images/
    brand/                 logo-light.svg, logo-dark.svg (placeholders)
    hero/                  Large banner images
    products/              Product & category images
    beverages/             Beverage images
    export/                Export / packaging images, world map
    about/                 About page images
    CREDITS.md             Source & licence of every photo
    og-image.jpg           Social-sharing preview image (1200×630)
  icons/                   favicon.svg, apple-touch-icon.png
```

## 2. Run locally

The pages work when you double-click `index.html`, but a local server behaves exactly like real hosting:

- **VS Code:** install the *Live Server* extension → right-click `index.html` → *Open with Live Server*.
- **Node.js:** `npx serve .` in the project folder, then open the URL shown.
- **Python:** `python -m http.server 8000`, then open http://localhost:8000

## 3. Deploy to GoDaddy / cPanel

1. Log in to cPanel → **File Manager** → open `public_html` (your domain's root folder).
2. Upload **everything** in this folder (including the hidden `.htaccess` file; enable *Show Hidden Files* in File Manager settings). Easiest: zip the folder contents, upload the zip, then *Extract*.
3. Make sure `index.html` sits directly in `public_html` (not in a sub-folder).
4. Enable SSL (cPanel → *SSL/TLS Status* or GoDaddy SSL), then optionally un-comment the HTTPS redirect lines in `.htaccess`.
5. Visit your domain and check a few pages.

> If you deploy into a sub-folder (e.g. `yourdomain.com/site/`), everything works except the custom 404 page; edit the `ErrorDocument` line in `.htaccess` to `/site/404.html`.

## 4. What you need to replace

| What | Where |
|---|---|
| **Email, phone, WhatsApp, address, business hours** | `assets/js/config.js` (updates header, footer, contact & enquiry pages automatically) |
| **Social media links** | `assets/js/config.js` → `socialLinks` (empty = icon shown as "coming soon") |
| **Company name in page titles, SEO & legal text** | Find & replace **`Your Company`** across all `.html` files (VS Code: *Ctrl+Shift+H*). Also set `companyName` in `config.js`. |
| **Domain** | Find & replace **`https://www.yourdomain.com`** in all `.html` files, `sitemap.xml` and `robots.txt` |
| **Logo** | See section 5 |
| **Product photos** | See section 6 |
| **Products, descriptions, pack sizes** | `assets/js/products.js` |
| **Testimonials** | In `index.html`, search for "Customer testimonial placeholder" (cards marked "Placeholder"). Use only genuine customer quotes. |
| **Our Story text** | `pages/about.html`, look for the `STORY:` comment |
| **Certifications** (FSSAI, APEDA, IEC, etc.) | Only add ones you actually hold. Look for the `CERTIFICATIONS:` comment in the quality sections. |
| **Privacy Policy & Terms** | `pages/privacy-policy.html`, `pages/terms.html`: replace `[bracketed]` text and have them reviewed by a legal professional |
| **"[To be confirmed]" pack sizes** | `pages/makhana.html`, `pages/dry-fruits.html`, `products.js` |
| **Social preview image** | `assets/images/og-image.jpg` (1200×630) |

## 5. Your logo

Replace these two files (keep the file names):

- `assets/images/brand/logo-light.svg`: light/white version, used on dark backgrounds (top of pages, footer, mobile menu)
- `assets/images/brand/logo-dark.svg`: dark version, used on the cream header after scrolling

SVG is best; PNG also works (then update the two `<img>` paths, or name your PNGs to match and change `.svg` → `.png` with find & replace). The logo displays 46px tall on desktop and 40px on mobile. Also replace `assets/icons/favicon.svg` and `assets/icons/apple-touch-icon.png` (180×180).

## 6. Product images

All product and lifestyle images are **real HD stock photographs from Unsplash and Pexels**. Both licences allow free commercial use, and sources are listed in `assets/images/CREDITS.md`. They are stand-ins until you have your own product photography: **save your photo with the same file name** in the same folder and it will appear everywhere automatically.

> **Replace first:** stock photos show generic products, not *your* goods or packaging. Before launch, prioritise your own photos for the makhana images (`makhana-roasted.webp` and `makhana-flavoured.webp` currently share one source photo), the beverage images (they show generic drinks, not your concepts) and `retail-pouches.webp` (your actual packaging).

| File | Used for | Recommended size |
|---|---|---|
| `images/products/makhana-premium.webp`, `almonds.webp`, `cashews.webp`, `pistachios.webp`, `walnuts.webp`, `raisins.webp`, `dates.webp`, `figs.webp`, `mixed-dry-fruits.webp`, `makhana-roasted.webp`, `makhana-flavoured.webp`, `snacks-*.webp`, `beverage.webp` | Product cards & catalogue | 1000×1000 (square) |
| `images/beverages/beverage-herbal.webp`, `beverage-berry.webp` | Beverage products | 1000×1000 |
| `images/products/category-*.webp` | Category cards & menu | 900×1125 (portrait) |
| `images/hero/*.webp`, `export/export-hero.webp`, `about/about-hero.webp` | Page banners | 1920×1080 |
| `images/hero/hero-main-mobile.webp` | Homepage banner on phones | 800×1200 |
| `images/beverages/ing-*.webp` | Ingredient circles on Beverages page | 400×400 |
| `images/products/makhana-editorial.webp`, `about/about-story.webp` | Tall editorial images | 1000×1250 |

Tips: export photos as **WebP at 75–85% quality** (Squoosh.app is free). Keep product photos under ~150 KB and banners under ~350 KB. Use a consistent background and lighting for product shots.

## 7. Forms (email / WhatsApp / backend)

Forms validate fully on the page but **do not send or store anything** until you connect an endpoint. Until then, visitors see an honest message and buttons to **send their enquiry by email or WhatsApp**, pre-filled with everything they typed (this uses the email/WhatsApp from `config.js`).

To receive submissions directly, paste an endpoint into `assets/js/config.js`:

```js
forms: {
  enquiry:    { endpoint: 'https://formspree.io/f/xxxxxxx' },
  contact:    { endpoint: 'https://formspree.io/f/yyyyyyy' },
  newsletter: { endpoint: '' },   // e.g. your Mailchimp/Brevo integration URL
},
```

Data is POSTed as JSON (`Accept: application/json`), which works with Formspree, Getform, Basin and similar services, or your own PHP/Node script. Each form includes a hidden spam trap (honeypot).

## 8. Adding a product

Open `assets/js/products.js` and copy an existing `{ … }` block:

```js
{
  id: 'cranberries', name: 'Dried Cranberries', category: 'dry-fruits',
  image: 'assets/images/products/cranberries.webp',
  short: 'One-line card description.',
  description: 'Longer description for the pop-up.',
  highlights: ['Point one', 'Point two'],
  packaging: 'Retail pouches & bulk',
  channels: ['Retail', 'Wholesale', 'Export'],
  featured: false,          // true = also show on the homepage
},
```

Categories: `makhana`, `dry-fruits`, `beverages`, `snacks`. Prices are hidden by default; set `showPrices: true` in `config.js` and add `price: '499 / 250 g'` to products to show them.

## 9. Colours & fonts

Defined once at the top of `assets/css/style.css` (`:root`):
Forest `#12372A` · Olive `#31572C` · Gold `#C9A227` · Cream `#F8F4E8` · Beige `#E8DCC4` · Dark `#172018`.
Fonts: **Playfair Display** (headings) and **Manrope** (text), loaded from Google Fonts.

## 10. Editing shared parts (header / footer)

The header, footer and SEO tags are repeated in every HTML file (so each page works on its own without a server). To change a menu link or footer text, use VS Code's **Find in Files** (*Ctrl+Shift+F*) and update all files at once.

## 11. Notes on content

- No certifications, customers, countries, statistics or awards are claimed. The homepage counters describe the site's own structure (4 channels, 4 categories, 7+ dry fruits, 6 regions of opportunity).
- The world map is labelled **"Global Market Opportunities"** and explicitly states it is not a list of current export destinations.
- Beverage products are presented as **concepts**; update this once your range is finalised.
- Structured data (Schema.org Organization, WebSite, BreadcrumbList, FAQPage) uses placeholder values; update them with the find & replace in section 4.

## 12. Quality checks performed

Tested in Chrome at 1920, 1440, 1200, 992, 768, 576, 390 and 360 px: no console errors, no broken internal links or images, no horizontal overflow, exactly one `<h1>` per page, keyboard-accessible menus/dialog/forms, and full support for the *reduce motion* accessibility setting.
