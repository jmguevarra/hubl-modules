# Phoenix DX — Claude Prompt Commands

Quick reference for all saved command keys used with Claude in this project.
Say the exact phrase to Claude and it will use the saved pattern automatically.

---

## `Hubspot Hubdb to CMS item display`

**What it does:** Uses `hubl-modules/courses/hubdb-courses.module/` as the canonical reference for building a HubDB-powered listing + detail page in HubSpot CMS.

**Live URL:** https://phoenix-dx.ai/courses-catalog

**Screenshot:**
![Courses Catalog — filter chips + pagination](./docs/courses-catalog-screenshot.png)
> *Save your screenshot as `docs/courses-catalog-screenshot.png` to display it here.*

**Pattern summary:**
- HubL renders **all rows** into the DOM — no server-side `batch()` pagination
- Filter chips are built from `hubdb_table_column(table_id, 'categories').options`
- Each card gets `data-tags="..."` so JS can filter globally across all pages
- JS handles both category filtering AND pagination via `renderPage()`
- Pagination `<nav>` uses `<button>` elements (not `<a>` links); shown/hidden by JS
- Detail page (`page_level == 1`) has date picker, HubSpot form sync, and related courses

**Two views from one module:**

| `dynamic_page_route_level` | View |
|---|---|
| `0` | Listing / catalog grid |
| `1` | Single course detail |

**Key module files:**
- `hubl-modules/courses/hubdb-courses.module/module.html`
- `hubl-modules/courses/hubdb-courses.module/fields.json`
- `hubl-modules/courses/hubdb-courses.module/module.css`

---

## `Hubspot button module v1`

**What it does:** Generates the full reusable button `fields.json` and `module.html` snippet with link/anchor toggle, `enable_styles` opt-in colour pickers, and optional hover styles.

**Pattern summary:**
- `button_type` select field: `link` or `anchor`
- `button_url` and `button_new_tab` shown only when type = `link`
- `button_anchor` shown only when type = `anchor`
- Style group has `enable_styles` (boolean, default `false`) — colour pickers are hidden by default
- `enable_hover` (boolean, default `false`) — hover pickers opt-in
- Default styling always falls back to CSS variables (never hardcoded colours)

```css
/* Default — inherits template design */
color: var(--dx-connector-btn-color);
background: var(--dx-connector-btn-linear-bg-color);
```

**Reference implementations:**
- `hubl-modules/landing/dx-connect/header.module`
- `hubl-modules/landing/dx-connect/hero-single-column.module`

---

## Button Style Rule

**Rule:** Buttons default to CSS vars. Colour pickers are opt-in via an `Enable Styles` toggle — never hardcode colours as the default.

**Why:** Buttons inherit the template/theme design by default. Style overrides are only needed when a specific page deviates from the global design.

---

## HubSpot Reference Docs

**Rule:** Always follow the official HubSpot CMS developer docs for all module/theme work.

**Reference:** https://developers.hubspot.com/docs/cms/start-building/building-blocks/overview

**Applies to:** `fields.json` field types, default value formats, tab assignments, and structural conventions.

---

## `dx-product-hero` Module Notes

**Module:** `hubl-modules/dx-product-hero.module/`

- Style fields intentionally removed — all visual defaults live in `module.css`
- `feature_icon` is type `image` (not Font Awesome `icon`)
- `overlay_image` group has an `enable_overlay_image` boolean toggle controlling visibility
- Do **not** re-introduce style fields or Font Awesome icons unless explicitly requested

---

*Last updated: 2026-06-11*
