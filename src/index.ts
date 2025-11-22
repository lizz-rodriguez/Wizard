/**
 * Main entry point for the Dashboard Builder
 * 
 * Export all public APIs and types
 */

// Types
export * from './types/dashboard';

// Utilities
export * from './utils/layoutTemplates';
export * from './utils/cardPresets';
export * from './utils/gridUtils';

// Components
export * from './components/ControlPanels/BasicInfoPanel';
export * from './components/ControlPanels/ContainerPropertiesPanel';
export * from './components/ControlPanels/DataPanel';
export * from './components/ControlPanels/DesignPanel';
export * from './components/DashboardRenderer/DashboardRenderer';

// Examples
export { exampleDashboard } from './examples/exampleDashboard';
