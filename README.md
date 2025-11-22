# Wizard - Dashboard Builder

A complete dashboard builder implementation with drag-and-drop layout tools and rendering controls for business users to design dashboards with cards containing charts and grids.

## 📚 Documentation

- **Design Documentation**: [`docs/dashboard_layout_tools.md`](docs/dashboard_layout_tools.md) - Comprehensive system design
- **Implementation Guide**: [`src/README.md`](src/README.md) - Code usage and examples
- **Preview**: Start a server with `python -m http.server 8000` and open `http://localhost:8000/docs/preview.html`

## 🚀 Quick Start

```bash
npm install
npm run type-check
```

## 📦 What's Included

### Core Implementation (`src/`)

**Types** (`types/dashboard.ts`)
- Complete TypeScript definitions for dashboards, cards, layouts, and configurations

**Layout Templates** (`utils/layoutTemplates.ts`)
- 5 predefined templates: 2×2 Grid, Hero + Two, KPI Row + Detail, 3-Column, Mixed Charts
- Template instantiation and card generation

**Card Presets** (`utils/cardPresets.ts`)
- 12 card types: KPI, Line, Area, Bar, Column, Pie, Donut, Table, Grid, Text, Markdown, Iframe
- Density presets: Minimal, Compact, Comfortable
- Preset-based card creation

**Grid Utilities** (`utils/gridUtils.ts`)
- Snap-to-grid positioning
- Alignment guide calculation
- Overlap detection
- Auto-placement
- Card alignment and distribution

**Control Panels** (`components/ControlPanels/`)
- BasicInfoPanel - Dashboard metadata
- ContainerPropertiesPanel - Layout and viewport settings
- DataPanel - Data source configuration
- DesignPanel - Card styling and visual properties

**Renderer** (`components/DashboardRenderer/`)
- DashboardRenderer - Main container with layout modes
- CardRenderer - Individual card rendering
- useBreakpoint hook - Responsive breakpoint detection

**Styles** (`styles/dashboard.css`)
- Complete CSS with custom properties
- Responsive breakpoints
- Card type-specific styling
- Control panel forms

**Example** (`examples/exampleDashboard.ts`)
- Working sales dashboard with 7 cards
- Demonstrates all features

## ✨ Features

### Layout System
- **Responsive grid**: 12/8/4 columns (desktop/tablet/mobile)
- **3 rendering modes**: Continuous scroll, Fixed viewport, Fit-to-container
- **5 templates**: Quick-start layouts
- **3 density presets**: Spacing and typography control

### Card System
- **12 card types** with default configurations
- **Flexible sizing**: Min/max height, aspect ratios, column spans
- **Overflow modes**: Clamp, scroll, auto-expand
- **Styling controls**: Padding, borders, shadows, backgrounds

### Positioning Tools
- **Snap-to-grid** with threshold detection
- **Alignment guides** when dragging
- **Auto-placement** prevents overlaps
- **Alignment tools**: Left, right, top, bottom, center
- **Distribution**: Even spacing horizontally/vertically
- **Lock cards** to prevent changes

### Configuration
- **Declarative JSON model** - Everything is serializable
- **Version control friendly** - Easy to diff and merge
- **Undo/redo ready** - Track configuration history
- **Template-based** - Start fast, customize later

## 🎯 Usage Example

```typescript
import {
  DashboardRenderer,
  CardRenderer,
  useBreakpoint,
  createCardFromPreset,
  getTemplate,
  instantiateTemplate
} from './src';

// Create dashboard from template
const template = getTemplate('kpi-row-detail');
const cards = instantiateTemplate(template);

// Or create individual cards
const newCard = createCardFromPreset('lineChart', 'chart-1', {
  name: 'Sales Trend',
  span: { desktop: 8, tablet: 8, mobile: 4 },
  data: { datasetId: 'sales-data' }
});

// Render
function Dashboard({ config }) {
  const breakpoint = useBreakpoint();
  
  return (
    <DashboardRenderer config={config} currentBreakpoint={breakpoint}>
      {config.cards.map(card => (
        <CardRenderer key={card.id} card={card} currentBreakpoint={breakpoint}>
          {/* Your content */}
        </CardRenderer>
      ))}
    </DashboardRenderer>
  );
}
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│  Control Panels (Right Rail)           │
│  - Basic Info                           │
│  - Container Properties                 │
│  - Data Configuration                   │
│  - Design Settings                      │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Dashboard Configuration (JSON)         │
│  - Layout mode & breakpoints            │
│  - Card definitions                     │
│  - Styling & behavior                   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Grid Utilities                         │
│  - Position calculation                 │
│  - Snap-to-grid                         │
│  - Alignment guides                     │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Dashboard Renderer                     │
│  - Apply layout mode                    │
│  - Render cards with styling           │
│  - Handle responsive breakpoints        │
└─────────────────────────────────────────┘
```

## 📝 Next Steps

To complete the implementation:

1. **Add React** (peer dependency)
2. **Integrate drag-and-drop** library (@dnd-kit/core recommended)
3. **Build chart components** (use Recharts, Chart.js, or D3)
4. **Connect data sources** with loading/error states
5. **Add undo/redo** using configuration history
6. **Implement preview mode** with breakpoint switching

## 🔧 Development

```bash
npm run dev          # Watch mode for development
npm run build        # Build TypeScript
npm run type-check   # Check types without building
npm run clean        # Remove build artifacts
```

## 📖 Learn More

- **Design Doc**: `docs/dashboard_layout_tools.md` - Complete system design and rationale
- **Implementation Guide**: `src/README.md` - Detailed usage examples and patterns
- **Type Reference**: `src/types/dashboard.ts` - Full API documentation

---

Built to enable business users to create professional dashboards with drag-and-drop ease while maintaining flexibility and control. 🎨
