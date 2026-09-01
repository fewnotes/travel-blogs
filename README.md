# travel-blogs

Trip write-ups and photos, live at **https://travelblog.fewnotes.net**.

Migrated from a WordPress.com blog (myinnerpeace.blog). Sister site: [travels.fewnotes.net](https://travels.fewnotes.net) — an interactive "places visited" map.

## What it is

A Jekyll static site hosted on GitHub Pages. Six trip write-ups under `trips/`, an about page, and a homepage that lists all trips. Images are stored in `assets/images/<trip-slug>/` and served directly from the repo.

```
_layouts/
  default.html          shared layout (header, nav, dark/light toggle)
assets/
  css/style.css         all styling — one file
  js/theme.js           dark/light toggle, persists to localStorage
  images/<trip-slug>/   compressed trip photos (capped at 1600px, JPEG q80)
trips/
  *.md                  one file per trip
about.md
index.md                homepage, lists all trips
_config.yml             kramdown + GFM, permalink /:title/
CNAME                   travelblog.fewnotes.net
```

## How deployment works

Push to `main` → GitHub Pages auto-builds with Jekyll → live in ~1 minute.

There is no `Gemfile` in the repo. GitHub Pages builds using its own default gem bundle (Jekyll + kramdown + jekyll-github-metadata). The `jekyll-github-metadata` plugin populates `{{ site.github.build_revision }}` in the stylesheet link for cache-busting — this is empty in a local build, which is expected.

## Local preview

```sh
gem install jekyll bundler --no-document
jekyll build --destination /tmp/travel-blogs-preview
cd /tmp/travel-blogs-preview
python3 -m http.server
```

Open http://localhost:8000. Check both dark and light mode before pushing any CSS or layout change.

## Custom domain mapping

GitHub Pages custom domain setup involves two parts:

**1. CNAME file in the repo**
`CNAME` contains `travelblog.fewnotes.net`. GitHub reads this file and serves the site at that hostname.

**2. DNS record at the domain registrar**
A `CNAME` DNS record points `travelblog` (subdomain of `fewnotes.net`) to `fewnotes.github.io`. GitHub's servers receive the request, look at the `Host` header, match it against known custom domains across all Pages sites, and route it to this repo's built output.

HTTPS is handled automatically by GitHub Pages (Let's Encrypt certificate, renewed automatically). No configuration needed beyond the two steps above.

## Adding a new trip

1. Create `trips/<slug>.md` with front matter `title:` and `layout: default`
2. Add images to `assets/images/<slug>/` — compress first (1600px max, JPEG q80)
3. Push to `main`

## Design notes

- Dark mode is default; toggle persists in `localStorage` key `travelBlog.theme`
- Font: Lora (400/600) from Google Fonts
- Prose max-width capped at 700px for readability; images/tables stay full-width
- "Trip at a glance" sections use a 3-column markdown table (Date / Day / Location)
