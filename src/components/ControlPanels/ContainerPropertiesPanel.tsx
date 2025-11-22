import React from 'react';
import { 
  DashboardConfig, 
  LayoutMode, 
  DensityPreset,
  AlignmentHorizontal,
  AlignmentVertical 
} from '../../types/dashboard';
import { layoutTemplates } from '../../utils/layoutTemplates';
import { densityPresets } from '../../utils/cardPresets';

interface ContainerPropertiesPanelProps {
  config: DashboardConfig;
  onChange: (updates: Partial<DashboardConfig>) => void;
}

/**
 * Container Properties panel - Layout, spacing, alignment, and viewport settings
 */
export const ContainerPropertiesPanel: React.FC<ContainerPropertiesPanelProps> = ({ 
  config, 
  onChange 
}) => {
  const updateLayout = (updates: Partial<typeof config.layout>) => {
    onChange({ layout: { ...config.layout, ...updates } });
  };

  const updateContainer = (updates: Partial<typeof config.container>) => {
    onChange({ container: { ...config.container, ...updates } });
  };

  return (
    <div className="control-panel-section">
      <div className="section-header">
        <h3>Container Properties</h3>
      </div>

      {/* Layout Template */}
      <div className="form-group">
        <label htmlFor="layout-template">Layout Template</label>
        <select
          id="layout-template"
          value={config.layout.template || ''}
          onChange={(e) => updateLayout({ template: e.target.value })}
        >
          <option value="">Custom</option>
          {layoutTemplates.map(template => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
        <small>Start from a predefined layout</small>
      </div>

      {/* Density Preset */}
      <div className="form-group">
        <label htmlFor="density">Density</label>
        <select
          id="density"
          value={config.layout.density}
          onChange={(e) => updateLayout({ density: e.target.value as DensityPreset })}
        >
          {Object.entries(densityPresets).map(([key, preset]) => (
            <option key={key} value={key}>
              {preset.name.charAt(0).toUpperCase() + preset.name.slice(1)} - {preset.description}
            </option>
          ))}
        </select>
      </div>

      {/* Viewport Mode */}
      <div className="form-group">
        <label htmlFor="layout-mode">Viewport Mode</label>
        <select
          id="layout-mode"
          value={config.layout.mode}
          onChange={(e) => updateLayout({ mode: e.target.value as LayoutMode })}
        >
          <option value="continuous">Continuous Scroll</option>
          <option value="fixed">Fixed Viewport</option>
          <option value="fit">Fit to Container</option>
        </select>
      </div>

      {/* Viewport Height (only for fixed mode) */}
      {config.layout.mode === 'fixed' && (
        <div className="form-group">
          <label htmlFor="viewport-height">Viewport Height (px)</label>
          <input
            id="viewport-height"
            type="number"
            value={config.layout.viewportHeight || 800}
            onChange={(e) => updateLayout({ viewportHeight: parseInt(e.target.value) })}
            min={400}
            max={2400}
            step={100}
          />
        </div>
      )}

      {/* Spacing Controls */}
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="container-gap">Gap (px)</label>
          <input
            id="container-gap"
            type="number"
            value={config.container.gap}
            onChange={(e) => updateContainer({ gap: parseInt(e.target.value) })}
            min={0}
            max={48}
            step={4}
          />
        </div>
        <div className="form-group">
          <label htmlFor="container-padding">Padding (px)</label>
          <input
            id="container-padding"
            type="number"
            value={config.container.padding}
            onChange={(e) => updateContainer({ padding: parseInt(e.target.value) })}
            min={0}
            max={64}
            step={8}
          />
        </div>
      </div>

      {/* Alignment */}
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="align-horizontal">Horizontal Align</label>
          <select
            id="align-horizontal"
            value={config.container.alignmentHorizontal}
            onChange={(e) => 
              updateContainer({ alignmentHorizontal: e.target.value as AlignmentHorizontal })
            }
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="stretch">Stretch</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="align-vertical">Vertical Align</label>
          <select
            id="align-vertical"
            value={config.container.alignmentVertical}
            onChange={(e) => 
              updateContainer({ alignmentVertical: e.target.value as AlignmentVertical })
            }
          >
            <option value="top">Top</option>
            <option value="middle">Middle</option>
            <option value="bottom">Bottom</option>
            <option value="stretch">Stretch</option>
          </select>
        </div>
      </div>

      {/* Background */}
      <div className="form-group">
        <label htmlFor="container-background">Background Color</label>
        <input
          id="container-background"
          type="color"
          value={config.container.background || '#ffffff'}
          onChange={(e) => updateContainer({ background: e.target.value })}
        />
      </div>

      {/* Grid Controls */}
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={config.layout.snapToGrid}
            onChange={(e) => updateLayout({ snapToGrid: e.target.checked })}
          />
          <span>Snap to Grid</span>
        </label>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={config.layout.showAlignmentGuides}
            onChange={(e) => updateLayout({ showAlignmentGuides: e.target.checked })}
          />
          <span>Show Alignment Guides</span>
        </label>
      </div>
    </div>
  );
};
