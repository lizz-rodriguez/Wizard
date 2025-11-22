import React, { CSSProperties } from 'react';
import { DashboardConfig, Card, Breakpoint } from '../../types/dashboard';

interface DashboardRendererProps {
  config: DashboardConfig;
  currentBreakpoint: Breakpoint;
  children?: React.ReactNode;
}

/**
 * Main dashboard renderer that applies layout mode and container settings
 */
export const DashboardRenderer: React.FC<DashboardRendererProps> = ({ 
  config, 
  currentBreakpoint,
  children 
}) => {
  const containerStyles: CSSProperties = {
    backgroundColor: config.container.background || '#f5f5f5',
    padding: `${config.container.padding}px`,
    minHeight: config.layout.mode === 'fixed' ? `${config.layout.viewportHeight}px` : 'auto',
    maxHeight: config.layout.mode === 'fixed' ? `${config.layout.viewportHeight}px` : 'none',
    overflow: config.layout.mode === 'fixed' ? 'auto' : 'visible',
    display: 'grid',
    gridTemplateColumns: `repeat(${config.layout.breakpoints[currentBreakpoint].columns}, 1fr)`,
    gap: `${config.container.gap}px`,
    alignItems: config.container.alignmentVertical === 'stretch' ? 'stretch' : 
                config.container.alignmentVertical === 'middle' ? 'center' :
                config.container.alignmentVertical === 'bottom' ? 'end' : 'start',
    justifyItems: config.container.alignmentHorizontal === 'stretch' ? 'stretch' :
                  config.container.alignmentHorizontal === 'center' ? 'center' :
                  config.container.alignmentHorizontal === 'right' ? 'end' : 'start',
  };

  return (
    <div 
      className={`dashboard-container mode-${config.layout.mode}`}
      style={containerStyles}
    >
      {children}
    </div>
  );
};

interface CardRendererProps {
  card: Card;
  currentBreakpoint: Breakpoint;
  children?: React.ReactNode;
  isEditMode?: boolean;
  onSelect?: (cardId: string) => void;
}

/**
 * Individual card renderer with styling and overflow handling
 */
export const CardRenderer: React.FC<CardRendererProps> = ({ 
  card, 
  currentBreakpoint,
  children,
  isEditMode = false,
  onSelect
}) => {
  const span = card.span[currentBreakpoint];
  
  const cardStyles: CSSProperties = {
    gridColumn: `span ${span}`,
    minHeight: `${card.minHeight || 100}px`,
    maxHeight: card.maxHeight ? `${card.maxHeight}px` : 'none',
    padding: getPaddingValue(card.style.padding),
    backgroundColor: card.style.background || '#ffffff',
    border: card.style.border ? '1px solid #e0e0e0' : 'none',
    borderRadius: `${card.style.borderRadius}px`,
    boxShadow: card.style.dropShadow ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
    overflow: card.overflow === 'scroll' ? 'auto' : 
              card.overflow === 'clamp' ? 'hidden' : 'visible',
    position: 'relative',
    cursor: isEditMode ? (card.locked ? 'not-allowed' : 'move') : 'default',
    opacity: card.locked ? 0.7 : 1,
    zIndex: card.zIndex || 1,
  };

  // Apply aspect ratio if specified
  if (card.aspectRatio) {
    const [width, height] = card.aspectRatio.split(':').map(Number);
    cardStyles.aspectRatio = `${width} / ${height}`;
  }

  return (
    <div 
      className={`dashboard-card type-${card.type} ${card.locked ? 'locked' : ''}`}
      style={cardStyles}
      onClick={() => isEditMode && onSelect?.(card.id)}
      data-card-id={card.id}
    >
      {card.style.header && (
        <div className="card-header">
          <h4>{card.name || `${card.type} Card`}</h4>
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>

      {card.style.footer && (
        <div className="card-footer">
          <small>Last updated: {new Date().toLocaleString()}</small>
        </div>
      )}
    </div>
  );
};

/**
 * Convert padding preset to CSS value
 */
function getPaddingValue(padding: 'none' | 'compact' | 'cozy' | 'comfortable'): string {
  switch (padding) {
    case 'none': return '0';
    case 'compact': return '8px';
    case 'cozy': return '16px';
    case 'comfortable': return '24px';
    default: return '16px';
  }
}

/**
 * Hook to detect current breakpoint based on window width
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>('desktop');

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint('mobile');
      } else if (width < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
}
