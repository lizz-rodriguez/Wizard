# Dashboard Layout Tools and Rendering Controls

This document outlines a set of layout helpers, rendering controls, and configuration flows for a drag-and-drop dashboard builder that supports cards containing charts or data grids. The goal is to give business users a guided starting point (templates, presets, guardrails) while keeping the experience flexible and visually predictable.

## Objectives
- Accelerate dashboard creation with reusable layouts, templates, and card presets.
- Make responsive behavior predictable (percent-based widths, breakpoints, and density controls).
- Support both continuous scroll and fixed-view (paged/viewport) experiences with minimal toggles.
- Give cards sensible defaults (padding, header/footer, borders) while allowing overrides.
- Surface data, design, and layout properties in an organized control panel.

## Layout System
### Grid
- **Grid type:** CSS grid-like layout with explicit rows/columns and adjustable gutters.
- **Units:** Percent and fractional units (e.g., 1/2, 1/3, 2/3), with optional fixed pixel widths for special cases.
- **Breakpoints:** Mobile / Tablet / Desktop presets with per-breakpoint column counts and card span overrides.
- **Row height:** Adjustable base row height + auto-fit option; snap-to-grid when resizing.

### Templates & Presets
- **Board templates:** Common starting layouts (e.g., 2x2 grid, 3-column asymmetric, hero + two cards, KPI row + detail grid).
- **Card presets:** KPI card, line/area chart, bar/column chart, pie/donut, table/grid, text/markdown, iframe/embed.
- **Density presets:** Comfortable / Compact / Minimal (affects padding, typography scale, and row height).

### Alignment & Spacing Tools
- **Gutters & margins:** Adjustable horizontal/vertical gutters; global page margin toggle.
- **Snap lines:** Alignment guides when dragging/resizing cards.
- **Distribute:** Evenly distribute selected cards horizontally/vertically.
- **Locking:** Lock card position/size to prevent accidental changes; lock grid (no drag) vs. edit mode.

### Layering & Grouping
- **Z-order:** Bring forward/send backward for overlapping hero elements.
- **Grouping:** Group multiple cards to move/resize together; save as a reusable compound component.

## Rendering Modes
- **Continuous scroll:** Default page with stacked rows; cards flow vertically.
- **Fixed viewport:** Defined canvas height with internal scroll; navigation dots or tabs for “pages.”
- **Fit-to-container:** For embedded contexts; cards remain percent-based relative to container width.
- **Overflow policy:** Clamp (crop), scroll within card, or auto-expand height for tall content (e.g., grids).

## Card Behavior & Controls
- **Sizing:** Min/max width & height; aspect ratio lock (e.g., 16:9 for charts); snap to column spans.
- **Headers/footers:** Toggles for title bar, action menu, refresh, and filters; optional footer for summaries.
- **Interactivity:** Hover state, selection outlines, drill-through click actions, and cross-filtering triggers.
- **Data states:** Empty-state placeholders with instructions; loading and error treatments; skeletons for charts/grids.
- **Export:** Per-card download/export toggles (CSV/image/PDF) with respect to permissions.

## Control Panel Structure
Recommended panel sections (right rail) to mirror the screenshot flow:

1. **Basic Info**
   - Dashboard name, tags, folder, access (private/shareable), default launch behavior (visible on launch).
2. **Container Properties** (applies to selected container or board)
   - **Layout template selector**: Start from template; apply per breakpoint.
   - **Card spacing**: Gutters, margins, density preset.
   - **Height/viewport**: Continuous scroll vs fixed viewport height; page navigation mode.
   - **Background**: Container background, card background, optional drop shadow, border radius.
   - **Alignment**: Horizontal alignment (left/center/stretch) and vertical alignment (top/middle/stretch).
3. **Data** (per card)
   - Data source, dataset, default filters, application context (e.g., app or domain), parameter bindings.
   - Refresh interval; empty/loading/error states configuration.
4. **Design** (per card)
   - Preset style: clean/minimal/data-dense; color palette; typography scale.
   - Header/footer toggles; legend placement (charts); grid row height and column sizing; zebra stripes.
   - Border, radius, drop shadow presets; padding presets (none/compact/cozy).
5. **Interactions**
   - Cross-filter behaviors, drill-through targets, link actions, custom actions in overflow menu.
6. **Permissions**
   - Visibility by role; export allowance; edit vs view locking.

## Component Palette (Left Rail)
- **Layout primitives:** Section, container, row, column, tab, accordion, spacer/divider.
- **Data visuals:** KPI card, charts (line/area/bar/column/stacked/pie/donut/heatmap), grid/table, pivot, embedded URL/iframe.
- **Text & media:** Markdown/Rich text, image, icon, button, KPI list.
- **Filters:** Date range, dropdown, multi-select, search box, toggle, slider.
- **Utility:** Blank card placeholder, annotation, info tooltip, badge.

## User Flow
1. Select a **template** to scaffold the grid (columns/rows and density preset).
2. Drag cards from the palette; snap to grid with alignment guides.
3. Adjust **container properties** to choose scroll vs fixed viewport and spacing.
4. Configure **data** bindings and **design** per card.
5. Toggle **preview** mode to see responsive breakpoints; adjust spans per breakpoint.
6. Save as **layout preset** or **theme** for reuse.

## Configuration Model (JSON Sketch)
```json
{
  "name": "Sales Overview",
  "launch": { "visible": true },
  "layout": {
    "mode": "continuous", // continuous | fixed | fit
    "viewportHeight": 1200,
    "breakpoints": {
      "desktop": { "columns": 12, "gutter": 16 },
      "tablet": { "columns": 8, "gutter": 12 },
      "mobile": { "columns": 4, "gutter": 8 }
    },
    "density": "compact",
    "template": "hero-plus-two"
  },
  "cards": [
    {
      "id": "kpi-1",
      "type": "kpi",
      "span": { "desktop": 3, "tablet": 4, "mobile": 4 },
      "minHeight": 200,
      "style": { "padding": "compact", "header": true }
    },
    {
      "id": "chart-1",
      "type": "lineChart",
      "span": { "desktop": 6, "tablet": 8, "mobile": 4 },
      "aspectRatio": "16:9",
      "interactions": { "crossFilter": true }
    },
    {
      "id": "grid-1",
      "type": "table",
      "span": { "desktop": 12, "tablet": 8, "mobile": 4 },
      "overflow": "scroll"
    }
  ]
}
```

## Validation & Guardrails
- Warn when combined spans exceed column count for a breakpoint; auto-correct by wrapping.
- Minimum sizes for grids/charts; optional aspect ratio locks.
- Toggle for **"maintain percentages"** to keep relative widths when the container resizes.
- Autosave drafts and layout versioning; undo/redo history.

## Preview & Publish
- Multi-breakpoint preview (desktop/tablet/mobile) with quick toggles.
- Preview interactive states (hover/click, loading/error states).
- Publish flow with access controls and optional embed code snippet.

## Implementation Notes
- Use a declarative schema for layout and card configs so that templates and saved dashboards share the same model.
- Keep drag-and-drop state in a single source (e.g., board store) with optimistic snapping to avoid jitter.
- Separate **layout props** (grid, sizing, alignment) from **data props** (sources, filters) and **design props** (theme, padding, borders) to keep controls discoverable.
- Provide sensible defaults for blank states so new cards always show helpful guidance.
