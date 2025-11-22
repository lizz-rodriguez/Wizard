/**
 * Core type definitions for the dashboard builder system
 */

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';
export type LayoutMode = 'continuous' | 'fixed' | 'fit';
export type DensityPreset = 'minimal' | 'compact' | 'comfortable';
export type OverflowPolicy = 'clamp' | 'scroll' | 'auto-expand';
export type AlignmentHorizontal = 'left' | 'center' | 'right' | 'stretch';
export type AlignmentVertical = 'top' | 'middle' | 'bottom' | 'stretch';

export type CardType = 
  | 'kpi'
  | 'lineChart'
  | 'areaChart'
  | 'barChart'
  | 'columnChart'
  | 'pieChart'
  | 'donutChart'
  | 'table'
  | 'grid'
  | 'text'
  | 'markdown'
  | 'iframe';

export interface BreakpointConfig {
  columns: number;
  gutter: number;
  margin?: number;
}

export interface LayoutConfig {
  mode: LayoutMode;
  viewportHeight?: number;
  breakpoints: Record<Breakpoint, BreakpointConfig>;
  density: DensityPreset;
  template?: string;
  snapToGrid: boolean;
  showAlignmentGuides: boolean;
}

export interface CardSpan {
  desktop: number;
  tablet: number;
  mobile: number;
}

export interface CardStyle {
  padding: 'none' | 'compact' | 'cozy' | 'comfortable';
  header: boolean;
  footer: boolean;
  border: boolean;
  borderRadius: number;
  dropShadow: boolean;
  background?: string;
}

export interface CardPosition {
  row: number;
  col: number;
  rowSpan?: number;
}

export interface CardInteractions {
  crossFilter: boolean;
  drillThrough?: string;
  customActions?: Array<{
    label: string;
    action: string;
  }>;
}

export interface CardDataConfig {
  datasetId?: string;
  filters?: Record<string, any>;
  refreshInterval?: number;
  application?: string;
}

export interface Card {
  id: string;
  type: CardType;
  name?: string;
  span: CardSpan;
  position?: CardPosition;
  minHeight?: number;
  maxHeight?: number;
  aspectRatio?: string;
  style: CardStyle;
  interactions?: CardInteractions;
  data?: CardDataConfig;
  overflow: OverflowPolicy;
  locked: boolean;
  zIndex?: number;
}

export interface ContainerProperties {
  alignmentHorizontal: AlignmentHorizontal;
  alignmentVertical: AlignmentVertical;
  background?: string;
  padding: number;
  gap: number;
}

export interface DashboardConfig {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  launch: {
    visible: boolean;
    defaultView?: string;
  };
  layout: LayoutConfig;
  container: ContainerProperties;
  cards: Card[];
  version: number;
  lastModified: string;
}
