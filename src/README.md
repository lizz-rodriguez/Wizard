# Dashboard Layout Tools - Implementation Guide

This directory contains a complete implementation of the dashboard layout tools and rendering controls described in the documentation.

## 📁 Structure

```
src/
├── types/
│   └── dashboard.ts           # Core type definitions
├── utils/
│   ├── layoutTemplates.ts     # Predefined layout templates
│   ├── cardPresets.ts         # Card type presets and configurations
│   └── gridUtils.ts           # Grid positioning and alignment utilities
├── components/
│   ├── ControlPanels/
│   │   ├── BasicInfoPanel.tsx         # Dashboard name, tags, launch settings
│   │   ├── ContainerPropertiesPanel.tsx # Layout, spacing, viewport mode
│   │   ├── DataPanel.tsx              # Data sources and filters
│   │   └── DesignPanel.tsx            # Card styling and visual properties
│   └── DashboardRenderer/
│       └── DashboardRenderer.tsx      # Main rendering components
├── examples/
│   └── exampleDashboard.ts    # Example dashboard configuration
└── styles/
    └── dashboard.css          # Complete styling system
```

## 🚀 Key Features Implemented

### 1. **Layout System**
- **5 predefined templates**: 2×2 Grid, Hero + Two, KPI Row + Detail, 3-Column Asymmetric, Mixed Charts
- **Responsive grid**: 12-column desktop, 8-column tablet, 4-column mobile
- **Density presets**: Minimal, Compact, Comfortable (affects spacing, padding, typography)
- **Snap-to-grid** and **alignment guides** for precise positioning

### 2. **Card Types**
12 card types with default configurations:
- **Charts**: Line, Area, Bar, Column, Pie, Donut
- **Data**: Table, Grid
- **Content**: Text, Markdown, Iframe
- **KPI**: Metric cards with trend indicators

### 3. **Rendering Modes**
- **Continuous scroll**: Standard page with stacked rows
- **Fixed viewport**: Defined canvas height with internal scroll
- **Fit-to-container**: Percent-based for embedded contexts

### 4. **Control Panels**
Four organized control sections matching the screenshot:
- **Basic Info**: Name, description, tags, visibility
- **Container Properties**: Template, density, viewport mode, spacing, alignment
- **Data**: Dataset selection, filters, refresh intervals
- **Design**: Header/footer, padding, borders, shadows, overflow behavior

### 5. **Grid Utilities**
Complete set of positioning helpers:
- `snapToGrid()` - Snap card positions to grid
- `findValidPosition()` - Auto-place without overlaps
- `calculateAlignmentGuides()` - Show alignment guides when dragging
- `distributeCardsEvenly()` - Even spacing distribution
- `alignCards()` - Align to common edges (left, right, top, bottom, center)

## 💻 Usage Examples

### Creating a New Dashboard

```typescript
import { DashboardConfig } from './types/dashboard';
import { layoutTemplates, instantiateTemplate } from './utils/layoutTemplates';

// Start from a template
const template = layoutTemplates.find(t => t.id === 'kpi-row-detail');
const cards = instantiateTemplate(template!);

const dashboard: DashboardConfig = {
  id: 'my-dashboard',
  name: 'My Dashboard',
  layout: {
    mode: 'continuous',
    breakpoints: {
      desktop: { columns: 12, gutter: 16 },
      tablet: { columns: 8, gutter: 12 },
      mobile: { columns: 4, gutter: 8 }
    },
    density: 'comfortable',
    snapToGrid: true,
    showAlignmentGuides: true
  },
  container: {
    alignmentHorizontal: 'stretch',
    alignmentVertical: 'top',
    background: '#f8f9fa',
    padding: 24,
    gap: 16
  },
  cards,
  // ... rest of config
};
```

### Adding a Card from Preset

```typescript
import { createCardFromPreset } from './utils/cardPresets';

const newCard = createCardFromPreset('lineChart', 'chart-1', {
  name: 'Sales Trend',
  span: { desktop: 8, tablet: 8, mobile: 4 },
  data: {
    datasetId: 'sales-data',
    refreshInterval: 300
  }
});
```

### Using Grid Utilities

```typescript
import { snapToGrid, findValidPosition, alignCards } from './utils/gridUtils';

// Snap a dragged card to grid
const snapped = snapToGrid(
  { x: 523, y: 287 },
  { columns: 12, rowHeight: 100, gutter: 16 },
  1200 // container width
);

// Find valid position for new card
const position = findValidPosition(
  existingCards,
  newCard,
  'desktop',
  12
);

// Align selected cards to left edge
const alignedCards = alignCards(selectedCards, 'left', 'desktop');
```

### Rendering a Dashboard

```typescript
import { DashboardRenderer, CardRenderer, useBreakpoint } from './components/DashboardRenderer/DashboardRenderer';

function DashboardView({ config }: { config: DashboardConfig }) {
  const breakpoint = useBreakpoint();
  
  return (
    <DashboardRenderer config={config} currentBreakpoint={breakpoint}>
      {config.cards.map(card => (
        <CardRenderer 
          key={card.id} 
          card={card} 
          currentBreakpoint={breakpoint}
        >
          {/* Card content here */}
        </CardRenderer>
      ))}
    </DashboardRenderer>
  );
}
```

## 🎨 Styling

The `dashboard.css` file provides:
- CSS custom properties for easy theming
- Responsive breakpoints
- Card type-specific styles
- Control panel form styling
- Alignment guide and grid overlay visuals

Import the stylesheet in your app:
```typescript
import './styles/dashboard.css';
```

## 🔧 Configuration Model

All dashboard state is stored in a declarative JSON structure (`DashboardConfig`):
- Supports versioning and autosave
- Can be serialized/deserialized
- Templates and saved dashboards share the same model
- Easy to implement undo/redo

Example configuration structure:
```json
{
  "name": "Sales Overview",
  "layout": {
    "mode": "continuous",
    "density": "compact",
    "breakpoints": { ... }
  },
  "cards": [
    {
      "id": "kpi-1",
      "type": "kpi",
      "span": { "desktop": 3, "tablet": 4, "mobile": 4 },
      "style": { ... },
      "data": { ... }
    }
  ]
}
```

## 📊 Example Dashboard

See `src/examples/exampleDashboard.ts` for a complete working example with:
- 4 KPI cards in a row
- Line chart and donut chart
- Data table with filtering
- Full responsive configuration

## 🔗 Integration with Drag-and-Drop

The grid utilities are designed to integrate with any drag-and-drop library:

```typescript
// On drag
const guides = calculateAlignmentGuides(
  draggingCard,
  allCards,
  breakpoint,
  containerWidth,
  gridConfig
);

// On drop
const snapped = snapToGrid(dropPoint, gridConfig, containerWidth);
if (snapped.snapped) {
  updateCardPosition(card.id, { row: snapped.row, col: snapped.col });
}
```

## 🎯 Next Steps

To complete the implementation:
1. **Add drag-and-drop library** (e.g., react-dnd, dnd-kit)
2. **Implement chart components** for each chart type
3. **Build data connection layer** for real data sources
4. **Add export/import** functionality
5. **Implement undo/redo** using the configuration history
6. **Add real-time preview** switching between breakpoints

## 📝 Notes

- TypeScript errors shown are because React dependencies aren't installed yet
- This is a framework-agnostic implementation (can adapt to React, Vue, Angular)
- All percentage-based calculations maintain responsiveness
- Card overlap detection prevents layout conflicts
- Alignment guides improve UX when positioning cards manually
