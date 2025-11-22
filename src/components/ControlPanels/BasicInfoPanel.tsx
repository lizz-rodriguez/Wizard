import React, { useState } from 'react';
import { DashboardConfig } from '../../types/dashboard';

interface BasicInfoPanelProps {
  config: DashboardConfig;
  onChange: (updates: Partial<DashboardConfig>) => void;
}

/**
 * Basic Info panel - Dashboard name, tags, and launch settings
 */
export const BasicInfoPanel: React.FC<BasicInfoPanelProps> = ({ config, onChange }) => {
  return (
    <div className="control-panel-section">
      <div className="section-header">
        <h3>Basic Info</h3>
      </div>

      <div className="form-group">
        <label htmlFor="dashboard-name">Name</label>
        <input
          id="dashboard-name"
          type="text"
          value={config.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Enter dashboard name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="dashboard-description">Description</label>
        <textarea
          id="dashboard-description"
          value={config.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Optional description"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dashboard-tags">Tags</label>
        <input
          id="dashboard-tags"
          type="text"
          value={config.tags?.join(', ') || ''}
          onChange={(e) => 
            onChange({ 
              tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) 
            })
          }
          placeholder="sales, metrics, monthly"
        />
        <small>Comma-separated tags</small>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={config.launch.visible}
            onChange={(e) => 
              onChange({ 
                launch: { ...config.launch, visible: e.target.checked } 
              })
            }
          />
          <span>Visible on launch</span>
        </label>
      </div>
    </div>
  );
};
