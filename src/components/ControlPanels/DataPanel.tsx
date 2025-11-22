import React from 'react';
import { Card, CardDataConfig } from '../../types/dashboard';

interface DataPanelProps {
  card: Card;
  onChange: (cardId: string, updates: Partial<Card>) => void;
}

/**
 * Data panel - Configure data sources, filters, and refresh settings
 */
export const DataPanel: React.FC<DataPanelProps> = ({ card, onChange }) => {
  const updateData = (updates: Partial<CardDataConfig>) => {
    onChange(card.id, { 
      data: { ...card.data, ...updates } 
    });
  };

  return (
    <div className="control-panel-section">
      <div className="section-header">
        <h3>Data</h3>
      </div>

      <div className="form-group">
        <label htmlFor="dataset">Dataset</label>
        <select
          id="dataset"
          value={card.data?.datasetId || ''}
          onChange={(e) => updateData({ datasetId: e.target.value })}
        >
          <option value="">Select dataset...</option>
          <option value="sales-data">Sales Data</option>
          <option value="customer-metrics">Customer Metrics</option>
          <option value="product-inventory">Product Inventory</option>
          <option value="financial-summary">Financial Summary</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="application">Application</label>
        <select
          id="application"
          value={card.data?.application || ''}
          onChange={(e) => updateData({ application: e.target.value })}
        >
          <option value="">All applications</option>
          <option value="crm">CRM</option>
          <option value="erp">ERP</option>
          <option value="analytics">Analytics</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="refresh-interval">Refresh Interval (seconds)</label>
        <input
          id="refresh-interval"
          type="number"
          value={card.data?.refreshInterval || 0}
          onChange={(e) => updateData({ refreshInterval: parseInt(e.target.value) })}
          min={0}
          step={30}
          placeholder="0 = manual only"
        />
        <small>Set to 0 for manual refresh only</small>
      </div>

      <div className="form-group">
        <label>Filters</label>
        <div className="filter-builder">
          <small>Filter configuration UI would go here</small>
          {/* Placeholder for filter builder component */}
        </div>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={card.data?.filters !== undefined}
            onChange={(e) => updateData({ 
              filters: e.target.checked ? {} : undefined 
            })}
          />
          <span>Override default filters</span>
        </label>
      </div>
    </div>
  );
};
