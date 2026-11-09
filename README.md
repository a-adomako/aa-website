# aa-website

Personal site for Aaron Tabi — [aarontabi.com](https://aarontabi.com). Static HTML/CSS/JS, deployed on GitHub Pages from `main`.

## Editing

- **Projects** — edit `js/projects.js`. Each entry drives both its card on the Projects tab and its detail page at `project.html?p=<slug>`. To log new progress on a project, append `{ date, note }` to its `updates` array and push.
- **Copy & layout** — `index.html` and `css/styles.css`.
- **Social preview image** — `assets/og-image.png` (1200×630), referenced from the meta tags in `index.html`.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
