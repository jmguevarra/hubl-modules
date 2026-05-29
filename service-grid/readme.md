# Services Grid — HubSpot CMS Module

## Files

| File | Purpose |
|------|---------|
| `module.html` | HubL template with Jinja2 field references |
| `module.css` | Styles; HubL color fields are interpolated at render time |
| `module.js` | Touch-device tap-to-toggle fallback |
| `fields.json` | All editable fields exposed in the Design Manager |
| `meta.json` | Module metadata |

## Installation

1. In HubSpot, go to **Marketing → Files and Templates → Design Tools**.
2. Create a new folder, e.g. `services-grid`.
3. Inside, create a new **Module** file. HubSpot will generate the five files above automatically — replace each file's content with the corresponding file here.
4. Alternatively, use the [HubSpot CLI](https://developers.hubspot.com/docs/cms/developer-reference/local-development-cms-cli):
   ```
   hs upload hubspot-services-module your-portal-id/path/services-grid
   ```
5. Add the module to any page via the page editor drag-and-drop.

## Editable Fields (no coding required)

All fields appear in the right-hand panel of the HubSpot page editor:

### Section-level
- **Section Heading** — text shown above the grid
- **Show Section Heading** — toggle on/off
- **Section / Card / Hover background colors** — color pickers
- **Card border color**, **Title color**, **Description color**, **Link color**

### Per card (repeating group, max 6 cards)
- **Icon SVG Code** — paste any SVG markup
- **Icon Accent Color** — color picker controlling icon stroke
- **Card Title**
- **Card Description** — shown on hover
- **Link Label** and **Link URL** — HubSpot link picker (supports internal pages, external URLs, new tab toggle)

## Hover Behavior

Description text is hidden by default and revealed via a CSS `max-height` + `opacity` transition on `:hover`. On touch devices (phones/tablets), a tap toggles the expanded state via `module.js`.

## Icon SVGs

The default icon SVGs are inlined. To replace them:
1. Open a card field group in the editor.
2. Paste new SVG code into the **Icon SVG Code** textarea.
3. Set the **Icon Accent Color** — this is injected as a CSS custom property (`--icon-color`) and applied via `color: currentColor` on the SVG's `stroke`.

For best results, use SVGs with `stroke="currentColor"` and `fill="none"`.
