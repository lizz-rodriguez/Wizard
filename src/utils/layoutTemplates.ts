import { Card, CardType, DensityPreset } from '../types/dashboard';

/**
 * Predefined layout templates for quick dashboard scaffolding
 */

export interface LayoutTemplate {
  id: string;
  name: string;
  description: string;
  preview?: string;
  cards: Omit<Card, 'id'>[];
  columns: number;
  rows: number;
  density: DensityPreset;
}

const defaultCardStyle = {
  padding: 'cozy' as const,
  header: true,
  footer: false,
  border: true,
  borderRadius: 8,
  dropShadow: true,
};

export const layoutTemplates: LayoutTemplate[] = [
  {
    id: 'grid-2x2',
    name: '2×2 Grid',
    description: 'Four equal cards in a 2×2 grid layout',
    columns: 12,
    rows: 2,
    density: 'comfortable',
    cards: [
      {
        type: 'kpi',
        span: { desktop: 6, tablet: 6, mobile: 4 },
        position: { row: 0, col: 0 },
        minHeight: 200,
        style: defaultCardStyle,
        overflow: 'clamp',
        locked: false,
      },
      {
        type: 'kpi',
        span: { desktop: 6, tablet: 6, mobile: 4 },
        position: { row: 0, col: 6 },
        minHeight: 200,
        style: defaultCardStyle,
        overflow: 'clamp',
        locked: false,
      },
      {
        type: 'barChart',
        span: { desktop: 6, tablet: 6, mobile: 4 },
        position: { row: 1, col: 0 },
        minHeight: 300,
        style: defaultCardStyle,
        overflow: 'scroll',
        locked: false,
      },
      {
        type: 'table',
        span: { desktop: 6, tablet: 6, mobile: 4 },
        position: { row: 1, col: 6 },
        minHeight: 300,
        style: defaultCardStyle,
        overflow: 'scroll',
        locked: false,
      },
    ],
  },
  {
    id: 'hero-plus-two',
    name: 'Hero + Two',
    description: 'Large hero chart with two smaller cards below',
    columns: 12,
    rows: 2,
    density: 'comfortable',
    cards: [
      {
        type: 'lineChart',
        span: { desktop: 12, tablet: 8, mobile: 4 },
        position: { row: 0, col: 0 },
        minHeight: 400,
        aspectRatio: '16:9',
        style: defaultCardStyle,
        overflow: 'clamp',
        locked: false,
      },
      {
        type: 'kpi',
        span: { desktop: 6, tablet: 4, mobile: 4 },
        position: { row: 1, col: 0 },
        minHeight: 200,
        style: defaultCardStyle,
        overflow: 'clamp',
        locked: false,
      },
      {
        type: 'pieChart',
        span: { desktop: 6, tablet: 4, mobile: 4 },
        position: { row: 1, col: 6 },
        minHeight: 200,
        style: defaultCardStyle,
        overflow: 'clamp',
        locked: false,
      },
    ],
  },
  {
    id: 'kpi-row-detail',
    name: 'KPI Row + Detail Grid',
    description: 'Row of KPIs with detailed data grid below',
    columns: 12,
    rows: 2,
    density: 'compact',
    cards: [
      {
        type: 'kpi',
        span: { desktop: 3, tablet: 4, mobile: 4 },
        position: { row: 0, col: 0 },
        minHeight: 150,
        style: { ...defaultCardStyle, padding: 'compact' },
        overflow: 'clamp',
        locked: false,
      },
      {
        type: 'kpi',
        span: { desktop: 3, tablet: 4, mobile: 4 },
        position: { row: 0, col: 3 },
        minHeight: 150,
        style: { ...defaultCardStyle, padding: 'compact' },
        overflow: 'clamp',
        locked: false,
      },
      {
        type: 'kpi',
        span: { desktop: 3, tablet: 4, mobile: 4 },
        position: { row: 0, col: 6 },
        minHeight: 150,
        style: { ...defaultCardStyle, padding: 'compact' },
        overflow: 'clamp',
        locked: false,
      },
      {
        type: 'kpi',
        span: { desktop: 3, tablet: 4, mobile: 4 },
        position: { row: 0, col: 9 },
        minHeight: 150,
        style: { ...defaultCardStyle, padding: 'compact' },
        overflow: 'clamp',
        locked: false,
      },
      {
        type: 'table',
        span: { desktop: 12, tablet: 8, mobile: 4 },
        position: { row: 1, col: 0 },
        minHeight: 500,
        style: defaultCardStyle,
        overflow: 'scroll',
        locked: false,
      },
    ],
  },
  {
    id: 'three-column-asymmetric',
    name: '3-Column Asymmetric',
    description: 'Wide center column with narrow sidebars',
    columns: 12,
    rows: 1,
    density: 'comfortable',
    cards: [
      {
        type: 'kpi',
        span: { desktop: 2, tablet: 2, mobile: 4 },
        position: { row: 0, col: 0 },
        minHeight: 400,
        style: defaultCardStyle,
        overflow: 'scroll',
        locked: false,
      },
      {
        type: 'lineChart',
        span: { desktop: 8, tablet: 6, mobile: 4 },
        position: { row: 0, col: 2 },
        minHeight: 400,
        aspectRatio: '16:9',
        style: defaultCardStyle,
        overflow: 'clamp',
        locked: false,
      },
      {
        type: 'table',
        span: { desktop: 2, tablet: 2, mobile: 4 },
        position: { row: 0, col: 10 },
        minHeight: 400,
        style: defaultCardStyle,
        overflow: 'scroll',
        locked: false,
      },
    ],
  },
  {
    id: 'mixed-charts',
    name: 'Mixed Chart Dashboard',
    description: 'Various chart types for comprehensive analytics',
    columns: 12,
    rows: 2,
    density: 'comfortable',
    cards: [
      {
        type: 'lineChart',
        span: { desktop: 8, tablet: 8, mobile: 4 },
        position: { row: 0, col: 0 },
        minHeight: 300,
        style: defaultCardStyle,
        overflow: 'clamp',
        locked: false,
      },
      {
        type: 'donutChart',
        span: { desktop: 4, tablet: 4, mobile: 4 },
        position: { row: 0, col: 8 },
        minHeight: 300,
        aspectRatio: '1:1',
        style: defaultCardStyle,
        overflow: 'clamp',
        locked: false,
      },
      {
        type: 'barChart',
        span: { desktop: 4, tablet: 4, mobile: 4 },
        position: { row: 1, col: 0 },
        minHeight: 300,
        style: defaultCardStyle,
        overflow: 'scroll',
        locked: false,
      },
      {
        type: 'columnChart',
        span: { desktop: 4, tablet: 4, mobile: 4 },
        position: { row: 1, col: 4 },
        minHeight: 300,
        style: defaultCardStyle,
        overflow: 'scroll',
        locked: false,
      },
      {
        type: 'areaChart',
        span: { desktop: 4, tablet: 4, mobile: 4 },
        position: { row: 1, col: 8 },
        minHeight: 300,
        style: defaultCardStyle,
        overflow: 'clamp',
        locked: false,
      },
    ],
  },
];

/**
 * Get a template by ID
 */
export function getTemplate(id: string): LayoutTemplate | undefined {
  return layoutTemplates.find(t => t.id === id);
}

/**
 * Generate card IDs for a template
 */
export function instantiateTemplate(template: LayoutTemplate): Card[] {
  return template.cards.map((card, index) => ({
    ...card,
    id: `${template.id}-card-${index}`,
  }));
}
