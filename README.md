# Medical Affairs Imersion Lab

A responsive, single-page marketing experience for the Medical Affairs Imersion Lab. The site highlights program
offerings, immersive lab environments, and measurable outcomes for Medical Affairs teams. The layout is purpose-built for
static hosting providers like Netlify and includes a redirect rule to ensure deep links resolve to the homepage.

## Project structure

- `index.html` – main page markup with sections for hero content, programs, approach, immersion labs, outcomes, insights,
  and contact.
- `styles.css` – global design tokens, responsive layout rules, and component styling.
- `script.js` – progressive enhancement for the outcomes switcher, header navigation, and subtle scroll animations.
- `_redirects` – Netlify-compatible rule to send every unmatched route to the single page (fixes custom path 404s).

## Running locally

Open `index.html` directly in a browser, or serve the repository through a simple static server:

```bash
npx serve .
```

The JavaScript updates the footer year automatically and animates sections into view when supported by the browser.

## Deployment notes

- Upload the repository contents to Netlify or any static host.
- Ensure the `_redirects` file is published at the site root so that internal navigation works for bookmarked deep links.
- No build step is required; the page uses vanilla HTML, CSS, and JavaScript.
