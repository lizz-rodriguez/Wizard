import React from 'react';
import { Card, OverflowPolicy } from '../../types/dashboard';

interface DesignPanelProps {
  card: Card;
  onChange: (cardId: string, updates: Partial<Card>) => void;
}

/**
 * Design panel - Configure card styling, layout, and visual properties
 */
export const DesignPanel: React.FC<DesignPanelProps> = ({ card, onChange }) => {
  const updateStyle = (updates: Partial<typeof card.style>) => {
    onChange(card.id, { 
      style: { ...card.style, ...updates } 
    });
  };

  const updateInteractions = (updates: Partial<typeof card.interactions>) => {
    onChange(card.id, { 
      interactions: { ...card.interactions, ...updates } 
    });
  };

  return (
    <div className="control-panel-section">
      <div className="section-header">
        <h3>Design</h3>
      </div>

      {/* Card Header & Footer */}
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={card.style.header}
            onChange={(e) => updateStyle({ header: e.target.checked })}
          />
          <span>Show Header</span>
        </label>
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={card.style.footer}
            onChange={(e) => updateStyle({ footer: e.target.checked })}
          />
          <span>Show Footer</span>
        </label>
      </div>

      {/* Padding */}
      <div className="form-group">
        <label htmlFor="padding">Padding</label>
        <select
          id="padding"
          value={card.style.padding}
          onChange={(e) => updateStyle({ 
            padding: e.target.value as typeof card.style.padding 
          })}
        >
          <option value="none">None</option>
          <option value="compact">Compact</option>
          <option value="cozy">Cozy</option>
          <option value="comfortable">Comfortable</option>
        </select>
      </div>

      {/* Border & Radius */}
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={card.style.border}
            onChange={(e) => updateStyle({ border: e.target.checked })}
          />
          <span>Show Border</span>
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="border-radius">Border Radius (px)</label>
        <input
          id="border-radius"
          type="number"
          value={card.style.borderRadius}
          onChange={(e) => updateStyle({ borderRadius: parseInt(e.target.value) })}
          min={0}
          max={24}
          step={2}
        />
      </div>

      {/* Shadow */}
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={card.style.dropShadow}
            onChange={(e) => updateStyle({ dropShadow: e.target.checked })}
          />
          <span>Drop Shadow</span>
        </label>
      </div>

      {/* Background Color */}
      <div className="form-group">
        <label htmlFor="card-background">Background Color</label>
        <input
          id="card-background"
          type="color"
          value={card.style.background || '#ffffff'}
          onChange={(e) => updateStyle({ background: e.target.value })}
        />
      </div>

      {/* Overflow Behavior */}
      <div className="form-group">
        <label htmlFor="overflow">Overflow Behavior</label>
        <select
          id="overflow"
          value={card.overflow}
          onChange={(e) => onChange(card.id, { overflow: e.target.value as OverflowPolicy })}
        >
          <option value="clamp">Clamp (crop)</option>
          <option value="scroll">Scroll within card</option>
          <option value="auto-expand">Auto-expand height</option>
        </select>
      </div>

      {/* Size Constraints */}
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="min-height">Min Height (px)</label>
          <input
            id="min-height"
            type="number"
            value={card.minHeight || 100}
            onChange={(e) => onChange(card.id, { minHeight: parseInt(e.target.value) })}
            min={50}
            step={50}
          />
        </div>
        <div className="form-group">
          <label htmlFor="max-height">Max Height (px)</label>
          <input
            id="max-height"
            type="number"
            value={card.maxHeight || 1000}
            onChange={(e) => onChange(card.id, { maxHeight: parseInt(e.target.value) })}
            min={100}
            step={50}
          />
        </div>
      </div>

      {/* Aspect Ratio */}
      {(card.type.includes('Chart') || card.type === 'iframe') && (
        <div className="form-group">
          <label htmlFor="aspect-ratio">Aspect Ratio</label>
          <select
            id="aspect-ratio"
            value={card.aspectRatio || ''}
            onChange={(e) => onChange(card.id, { aspectRatio: e.target.value || undefined })}
          >
            <option value="">None</option>
            <option value="16:9">16:9 (Widescreen)</option>
            <option value="4:3">4:3 (Standard)</option>
            <option value="1:1">1:1 (Square)</option>
            <option value="21:9">21:9 (Ultrawide)</option>
          </select>
        </div>
      )}

      {/* Interactions */}
      {card.type.includes('Chart') && (
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={card.interactions?.crossFilter || false}
              onChange={(e) => updateInteractions({ crossFilter: e.target.checked })}
            />
            <span>Enable Cross-filtering</span>
          </label>
        </div>
      )}

      {/* Lock Card */}
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={card.locked}
            onChange={(e) => onChange(card.id, { locked: e.target.checked })}
          />
          <span>Lock Position & Size</span>
        </label>
      </div>
    </div>
  );
};
