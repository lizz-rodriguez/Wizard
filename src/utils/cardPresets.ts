import { CardType, Card, DensityPreset } from '../types/dashboard';

/**
 * Card preset configurations for quick card creation
 */

export interface CardPreset {
  type: CardType;
  name: string;
  description: string;
  icon?: string;
  category: 'chart' | 'kpi' | 'table' | 'text' | 'other';
  defaultConfig: Omit<Card, 'id'>;
}

const baseKPICard: Omit<Card, 'id' | 'type'> = {
  span: { desktop: 3, tablet: 4, mobile: 4 },
  minHeight: 150,
  maxHeight: 250,
  style: {
    padding: 'compact',
    header: true,
    footer: false,
    border: true,
    borderRadius: 8,
    dropShadow: true,
  },
  overflow: 'clamp',
  locked: false,
};

const baseChartCard: Omit<Card, 'id' | 'type'> = {
  span: { desktop: 6, tablet: 8, mobile: 4 },
  minHeight: 300,
  maxHeight: 600,
  style: {
    padding: 'cozy',
    header: true,
    footer: true,
    border: true,
    borderRadius: 8,
    dropShadow: true,
  },
  overflow: 'clamp',
  locked: false,
  interactions: {
    crossFilter: true,
  },
};

const baseTableCard: Omit<Card, 'id' | 'type'> = {
  span: { desktop: 12, tablet: 8, mobile: 4 },
  minHeight: 400,
  style: {
    padding: 'cozy',
    header: true,
    footer: true,
    border: true,
    borderRadius: 8,
    dropShadow: true,
  },
  overflow: 'scroll',
  locked: false,
};

export const cardPresets: CardPreset[] = [
  {
    type: 'kpi',
    name: 'KPI Card',
    description: 'Single metric with trend indicator',
    icon: '📊',
    category: 'kpi',
    defaultConfig: {
      ...baseKPICard,
      type: 'kpi',
    },
  },
  {
    type: 'lineChart',
    name: 'Line Chart',
    description: 'Time series or continuous data',
    icon: '📈',
    category: 'chart',
    defaultConfig: {
      ...baseChartCard,
      type: 'lineChart',
      aspectRatio: '16:9',
    },
  },
  {
    type: 'areaChart',
    name: 'Area Chart',
    description: 'Filled line chart for volume trends',
    icon: '🏔️',
    category: 'chart',
    defaultConfig: {
      ...baseChartCard,
      type: 'areaChart',
      aspectRatio: '16:9',
    },
  },
  {
    type: 'barChart',
    name: 'Bar Chart',
    description: 'Horizontal bars for comparisons',
    icon: '📊',
    category: 'chart',
    defaultConfig: {
      ...baseChartCard,
      type: 'barChart',
      span: { desktop: 6, tablet: 8, mobile: 4 },
    },
  },
  {
    type: 'columnChart',
    name: 'Column Chart',
    description: 'Vertical bars for categorical data',
    icon: '📊',
    category: 'chart',
    defaultConfig: {
      ...baseChartCard,
      type: 'columnChart',
      span: { desktop: 6, tablet: 8, mobile: 4 },
    },
  },
  {
    type: 'pieChart',
    name: 'Pie Chart',
    description: 'Part-to-whole relationships',
    icon: '🥧',
    category: 'chart',
    defaultConfig: {
      ...baseChartCard,
      type: 'pieChart',
      span: { desktop: 4, tablet: 4, mobile: 4 },
      aspectRatio: '1:1',
      minHeight: 250,
    },
  },
  {
    type: 'donutChart',
    name: 'Donut Chart',
    description: 'Pie chart with center metric',
    icon: '🍩',
    category: 'chart',
    defaultConfig: {
      ...baseChartCard,
      type: 'donutChart',
      span: { desktop: 4, tablet: 4, mobile: 4 },
      aspectRatio: '1:1',
      minHeight: 250,
    },
  },
  {
    type: 'table',
    name: 'Data Table',
    description: 'Sortable, filterable table',
    icon: '📋',
    category: 'table',
    defaultConfig: {
      ...baseTableCard,
      type: 'table',
    },
  },
  {
    type: 'grid',
    name: 'Data Grid',
    description: 'Advanced grid with editing',
    icon: '🗂️',
    category: 'table',
    defaultConfig: {
      ...baseTableCard,
      type: 'grid',
    },
  },
  {
    type: 'text',
    name: 'Text Card',
    description: 'Rich text content',
    icon: '📝',
    category: 'text',
    defaultConfig: {
      type: 'text',
      span: { desktop: 6, tablet: 8, mobile: 4 },
      minHeight: 150,
      style: {
        padding: 'comfortable',
        header: true,
        footer: false,
        border: true,
        borderRadius: 8,
        dropShadow: false,
      },
      overflow: 'auto-expand',
      locked: false,
    },
  },
  {
    type: 'markdown',
    name: 'Markdown Card',
    description: 'Markdown formatted text',
    icon: 'Ⓜ️',
    category: 'text',
    defaultConfig: {
      type: 'markdown',
      span: { desktop: 6, tablet: 8, mobile: 4 },
      minHeight: 150,
      style: {
        padding: 'comfortable',
        header: true,
        footer: false,
        border: true,
        borderRadius: 8,
        dropShadow: false,
      },
      overflow: 'auto-expand',
      locked: false,
    },
  },
  {
    type: 'iframe',
    name: 'Embedded Content',
    description: 'External iframe embed',
    icon: '🔗',
    category: 'other',
    defaultConfig: {
      type: 'iframe',
      span: { desktop: 8, tablet: 8, mobile: 4 },
      minHeight: 400,
      style: {
        padding: 'none',
        header: true,
        footer: false,
        border: true,
        borderRadius: 8,
        dropShadow: true,
      },
      overflow: 'scroll',
      locked: false,
    },
  },
];

/**
 * Get preset by card type
 */
export function getCardPreset(type: CardType): CardPreset | undefined {
  return cardPresets.find(p => p.type === type);
}

/**
 * Get all presets for a category
 */
export function getPresetsByCategory(category: string): CardPreset[] {
  return cardPresets.filter(p => p.category === category);
}

/**
 * Density preset configurations
 */
export interface DensityConfig {
  name: DensityPreset;
  description: string;
  gutter: number;
  cardPadding: 'none' | 'compact' | 'cozy' | 'comfortable';
  rowHeight: number;
  fontSize: number;
}

export const densityPresets: Record<DensityPreset, DensityConfig> = {
  minimal: {
    name: 'minimal',
    description: 'Maximum density, minimal spacing',
    gutter: 8,
    cardPadding: 'compact',
    rowHeight: 40,
    fontSize: 12,
  },
  compact: {
    name: 'compact',
    description: 'Compact layout with tight spacing',
    gutter: 12,
    cardPadding: 'compact',
    rowHeight: 50,
    fontSize: 13,
  },
  comfortable: {
    name: 'comfortable',
    description: 'Balanced spacing for readability',
    gutter: 16,
    cardPadding: 'cozy',
    rowHeight: 60,
    fontSize: 14,
  },
};

/**
 * Create a new card from preset
 */
export function createCardFromPreset(
  type: CardType,
  id: string,
  overrides?: Partial<Card>
): Card {
  const preset = getCardPreset(type);
  if (!preset) {
    throw new Error(`No preset found for card type: ${type}`);
  }

  return {
    ...preset.defaultConfig,
    id,
    ...overrides,
  } as Card;
}
