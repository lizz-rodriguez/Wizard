import { DashboardConfig } from '../types/dashboard';

/**
 * Example dashboard configuration demonstrating the layout system
 */
export const exampleDashboard: DashboardConfig = {
  id: 'sales-overview-001',
  name: 'Sales Overview Dashboard',
  description: 'Quarterly sales performance metrics and trends',
  tags: ['sales', 'quarterly', 'executive'],
  launch: {
    visible: true,
    defaultView: 'desktop'
  },
  layout: {
    mode: 'continuous',
    viewportHeight: 1200,
    breakpoints: {
      desktop: { columns: 12, gutter: 16, margin: 24 },
      tablet: { columns: 8, gutter: 12, margin: 16 },
      mobile: { columns: 4, gutter: 8, margin: 12 }
    },
    density: 'comfortable',
    template: 'kpi-row-detail',
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
  cards: [
    {
      id: 'kpi-revenue',
      type: 'kpi',
      name: 'Total Revenue',
      span: { desktop: 3, tablet: 4, mobile: 4 },
      position: { row: 0, col: 0 },
      minHeight: 150,
      maxHeight: 200,
      style: {
        padding: 'compact',
        header: true,
        footer: false,
        border: true,
        borderRadius: 8,
        dropShadow: true,
        background: '#ffffff'
      },
      overflow: 'clamp',
      locked: false,
      data: {
        datasetId: 'sales-data',
        application: 'crm',
        refreshInterval: 300
      }
    },
    {
      id: 'kpi-customers',
      type: 'kpi',
      name: 'New Customers',
      span: { desktop: 3, tablet: 4, mobile: 4 },
      position: { row: 0, col: 3 },
      minHeight: 150,
      maxHeight: 200,
      style: {
        padding: 'compact',
        header: true,
        footer: false,
        border: true,
        borderRadius: 8,
        dropShadow: true,
        background: '#ffffff'
      },
      overflow: 'clamp',
      locked: false,
      data: {
        datasetId: 'customer-metrics',
        application: 'crm',
        refreshInterval: 300
      }
    },
    {
      id: 'kpi-orders',
      type: 'kpi',
      name: 'Total Orders',
      span: { desktop: 3, tablet: 4, mobile: 4 },
      position: { row: 0, col: 6 },
      minHeight: 150,
      maxHeight: 200,
      style: {
        padding: 'compact',
        header: true,
        footer: false,
        border: true,
        borderRadius: 8,
        dropShadow: true,
        background: '#ffffff'
      },
      overflow: 'clamp',
      locked: false,
      data: {
        datasetId: 'sales-data',
        refreshInterval: 300
      }
    },
    {
      id: 'kpi-conversion',
      type: 'kpi',
      name: 'Conversion Rate',
      span: { desktop: 3, tablet: 4, mobile: 4 },
      position: { row: 0, col: 9 },
      minHeight: 150,
      maxHeight: 200,
      style: {
        padding: 'compact',
        header: true,
        footer: false,
        border: true,
        borderRadius: 8,
        dropShadow: true,
        background: '#ffffff'
      },
      overflow: 'clamp',
      locked: false,
      data: {
        datasetId: 'customer-metrics',
        refreshInterval: 300
      }
    },
    {
      id: 'chart-revenue-trend',
      type: 'lineChart',
      name: 'Revenue Trend',
      span: { desktop: 8, tablet: 8, mobile: 4 },
      position: { row: 1, col: 0 },
      minHeight: 350,
      maxHeight: 500,
      aspectRatio: '16:9',
      style: {
        padding: 'cozy',
        header: true,
        footer: true,
        border: true,
        borderRadius: 8,
        dropShadow: true,
        background: '#ffffff'
      },
      overflow: 'clamp',
      locked: false,
      interactions: {
        crossFilter: true
      },
      data: {
        datasetId: 'sales-data',
        application: 'analytics',
        refreshInterval: 600
      }
    },
    {
      id: 'chart-category-breakdown',
      type: 'donutChart',
      name: 'Sales by Category',
      span: { desktop: 4, tablet: 4, mobile: 4 },
      position: { row: 1, col: 8 },
      minHeight: 350,
      aspectRatio: '1:1',
      style: {
        padding: 'cozy',
        header: true,
        footer: true,
        border: true,
        borderRadius: 8,
        dropShadow: true,
        background: '#ffffff'
      },
      overflow: 'clamp',
      locked: false,
      interactions: {
        crossFilter: true
      },
      data: {
        datasetId: 'sales-data',
        refreshInterval: 600
      }
    },
    {
      id: 'table-recent-orders',
      type: 'table',
      name: 'Recent Orders',
      span: { desktop: 12, tablet: 8, mobile: 4 },
      position: { row: 2, col: 0 },
      minHeight: 400,
      maxHeight: 600,
      style: {
        padding: 'cozy',
        header: true,
        footer: true,
        border: true,
        borderRadius: 8,
        dropShadow: true,
        background: '#ffffff'
      },
      overflow: 'scroll',
      locked: false,
      data: {
        datasetId: 'sales-data',
        filters: {
          status: 'completed',
          dateRange: 'last30days'
        },
        refreshInterval: 300
      }
    }
  ],
  version: 1,
  lastModified: new Date().toISOString()
};
