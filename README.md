# Acme Chambers

Website for a practice of advocates (land and property law, Gujarat): Home, About, Practice (with a page per
practice area), Insights (with a page per note) and Contact. Built on the same system as Acme Studio — React,
Vite and TypeScript, GSAP for scroll effects and the line-by-line text reveal, Lenis smooth scrolling, and Motion
for entrances, the accordions and the disclaimer.

- **Disclaimer** — the Bar Council of India's rules bar advocates from advertising or soliciting work, so the
  site opens behind a notice (`src/components/Disclaimer.tsx`) until the visitor agrees; agreement lasts for the
  browser session. The footer carries a standing version. Keep the copy free of testimonials, success rates and
  superlatives.
- **Layout** — at 1200px and wider, every section is laid out on a 1920px artboard scaled to the window width.
  Below that the CSS switches to a fluid layout (the `@media (max-width: 1199px)` block near the end of
  `src/index.css`).
- **Artwork** — no photography: the courthouse is drawn in hairlines (`src/components/CourtArt.tsx`) and traced
  in on scroll; advocates show as monograms until portraits arrive (swap `.monogram` for an `<img>`).
- **Routing** — hash routes (`#/practice/land-title`), so deep links work on GitHub Pages without a server
  fallback. Routes are listed in `src/pages/Page.tsx`; menu and footer links in `src/data/site.ts`.
- **Per-person links** — the mockup is shared by putting a name after the site's address:
  `/mehta-chambers` shows "Mehta Chambers" in the curtain, header, tab title, footer wordmark and About copy
  (`src/lib/brand.ts`). No name falls back to Acme Chambers. Hosts must serve `index.html` for any path: 
  deploy script copies it to `404.html` for GitHub Pages, and `vercel.json` covers Vercel. Pages carry
  `noindex` so the mockups stay out of search results.
- **Curtain** — plays once when the site is opened or reloaded on the home page; the disclaimer follows it.
- **Content** — practice areas, insights and the team live in `src/data/`. Names and contact details are
  placeholders. Insights are general information and end with a not-legal-advice note.

```sh
pnpm install
pnpm dev      # http://localhost:5173
pnpm build    # outputs dist/
```

`./deploy.sh` builds the site and publishes it to the `gh-pages` branch, served by GitHub Pages at
https://novierstudio.github.io/acme-advocate/ (and `/acme-advocate/<name>` for a personal link).
