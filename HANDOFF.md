# Session handoff

Context snapshot for continuing work on this repo in a different Claude Code
session (e.g. local VS Code). Written after a session that took the site from
initial migration through a round of design/theming work, ending at commit
`519c573`.

I'm continuing work on `fewnotes/travel-blogs`, a Jekyll static site on GitHub Pages
(live at https://travelblog.fewnotes.net), migrated from a WordPress.com blog
(myinnerpeace.blog) that's being discontinued. All work so far has been pushed
directly to `main` (no PRs) — current HEAD is 519c573. DNS/Pages are already
configured and working; GitHub Pages auto-builds on every push to main.

## Structure
- 6 trip write-ups under trips/*.md (Iceland Dec 2025, Iceland June 2022, Italy
  May 2023, Switzerland Sept 2024, Japan April 2024, Norway Aug 2025) + about.md
  + index.md (homepage, lists all trips)
- Images under assets/images/<trip-slug>/, referenced via raw WordPress Gutenberg
  HTML (<figure class="wp-block-image">, <img>, <figcaption>) kept as-is in the
  .md files
- Single shared layout: _layouts/default.html
- All styling in one file: assets/css/style.css
- _config.yml: kramdown markdown renderer, GFM input enabled
- No Gemfile in the repo (GitHub Pages builds with its own default gem bundle;
  a plain `jekyll` gem was installed locally for testing — `gem install jekyll
  bundler --no-document`, then `jekyll build --destination <dir>` + serve with
  `python3 -m http.server` to preview before pushing)

## Sister site
There's a related site, fewnotes/travels (repo) / https://travels.fewnotes.net —
a "Places I've Visited" world map app. It was used as a direct design reference
for the dark/light toggle pattern and font choices (see below). It's linked
from this site's nav as "map" (opens in a new tab).

## What's been done (chronological, all on main)
1. Fixed images stacking full-width instead of flowing in a row (inline-block,
   fixed width) — later revised (see #6).
2. Compressed all 276 trip images: capped at 1600px longest side, JPEG q80.
   106.7MB -> 24.5MB (77% reduction). Originals were kept in _originals/
   subfolders temporarily, then deleted once the compressed versions were
   validated on the live site (a separate backup of originals exists outside
   the repo).
3. Removed the "few notes on travel" site brand name entirely — from
   _config.yml's title, the header (was a home-link), the footer, and the
   browser tab title. Removed the "about" nav link temporarily (later re-added,
   see #10). Made the layout fluid (removed the old 760px max-width cap on
   header/main) per explicit request to use the full viewport width.
4. Added stylesheet cache-busting: <link href="/assets/css/style.css?v={{
   site.github.build_revision }}">. This Jekyll variable only populates on
   GitHub's actual Pages build (via the jekyll-github-metadata plugin) — it's
   empty in a local `jekyll build`, which is expected/fine.
5. Added a light/dark theme toggle, matching the sister site's exact pattern:
   - Dark is the default (verified via screenshot with no localStorage set)
   - CSS: :root holds dark values, :root[data-theme="light"] overrides
   - An inline anti-FOUC script in <head> (before the stylesheet link) reads
     localStorage key "travelBlog.theme" and sets data-theme on <html> before
     first paint
   - Toggle buttons (☀ Light / ☾ Dark) in the header, wired via
     assets/js/theme.js, persisted in localStorage
6. Re-did image sizing: instead of fixed width, images now use fixed height
   (220px) with width:auto, so each photo keeps its real aspect ratio (no
   cropping) while still lining up at a uniform row height regardless of
   portrait/landscape orientation.
7. Matched typography to the sister site's font stack initially, then set up
   a temporary A/B/C font-comparison toggle (buttons in header, localStorage-
   persisted, works on any page) to compare fonts on real content before
   deciding. Candidates were: A = Fraunces headings + Inter body, B = Inter
   everywhere, C = Lora everywhere. **C (Lora everywhere) was chosen** — now
   permanently baked into style.css (Google Fonts link loads only
   Lora:wght@400;600), and all the A/B/C toggle scaffolding (buttons,
   assets/js/font-test.js, extra font links) was removed again. Headings use
   font-weight:600 to match the loaded weight (avoids browser synthetic-bold
   on a font whose 700 weight isn't loaded).
8. Added a 700px max-width cap on prose only (main > p, blockquote, ul, ol,
   h1/h2/h3) for readable line length, while photos/tables/columns stay fluid
   full-width — this reconciles the "fluid layout" request with basic
   typography readability (very wide unconstrained text lines are hard to
   read).
9. Image gallery refinements: tighter gap between photos (12px -> 6px), and a
   visible border on each photo — currently: no border-radius (square
   corners), 4px thick, using a new --img-border CSS variable that's
   near-white in dark mode / near-black in light mode (for strong contrast
   against the page background, replacing an earlier low-contrast attempt
   using the --muted color).
10. Re-added the "about" nav link (newer trip posts will reference it;
    simpler than duplicating the about text elsewhere). Nav is now:
    trips / about / map.
11. Added table styling (main table/th/td: themed borders, bold header row,
    zebra striping via color-mix(), horizontal scroll on narrow screens) —
    newer (unpublished) trip write-ups use markdown tables for a "Trip at a
    Glance" itinerary section instead of the old bullet-list format;
    kramdown+GFM already converts markdown tables to real <table> HTML with
    zero config, it just needed CSS since there was none before.
12. Restyled the blockquote/callout boxes (.wp-block-quote): dropped italic,
    font-size 0.95rem (vs 1rem body) to read as its own distinct style, and
    tightened padding/margin (was too much whitespace top/bottom).
13. Removed a redundant <h1>trips</h1> from the homepage (the header nav
    already has a persistent "trips" link right above it — was showing the
    same word twice stacked on top of each other).

## Known loose ends / things not done
- No favicon has ever been set for this site.
- There's a leftover branch `claude/travel-blogs-jekyll-migration-vrqtti` on
  GitHub that was supposed to be deleted; the session's push credentials got a
  consistent HTTP 403 trying to delete it remotely (looked like a deliberate
  restriction on that session's credentials, not a transient issue). It's an
  orphan now (all work moved to main) and would need manual deletion via the
  GitHub UI if still wanted.
- Explicitly decided AGAINST: a "click for full size" image feature (checked
  actual original dimensions — only 19 of 276 images have meaningfully more
  resolution than the current 1600px cap, so it wasn't worth the complexity).

## Working conventions established
- Before pushing any CSS/layout change, build with real Jekyll
  (`jekyll build --destination <tmp-dir>`), serve it locally, and check it
  with a headless browser (dark AND light mode) before pushing — several
  earlier bugs (stale browser cache making a deployed fix look broken, a
  fluid-width regression) were only caught this way.
- Prefer showing concrete before/after screenshots over verbal descriptions
  when a change is a judgment call (colors, spacing, fonts) — worth
  generating a quick visual comparison before implementing anything with real
  design ambiguity, rather than just asking or guessing.
- Confirm unclear asks rather than guessing, and don't do more than what's
  literally asked — scope creep and assumptions get pushed back on hard.
