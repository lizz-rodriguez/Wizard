import { Card, Breakpoint, CardPosition } from '../types/dashboard';

/**
 * Grid utilities for card positioning and snapping
 */

export interface GridConfig {
  columns: number;
  rowHeight: number;
  gutter: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface SnapResult {
  col: number;
  row: number;
  snapped: boolean;
}

/**
 * Calculate the grid column from a pixel position
 */
export function pixelToColumn(
  x: number, 
  gridConfig: GridConfig, 
  containerWidth: number
): number {
  const columnWidth = (containerWidth - (gridConfig.gutter * (gridConfig.columns - 1))) / gridConfig.columns;
  const col = Math.round(x / (columnWidth + gridConfig.gutter));
  return Math.max(0, Math.min(col, gridConfig.columns - 1));
}

/**
 * Calculate the grid row from a pixel position
 */
export function pixelToRow(y: number, gridConfig: GridConfig): number {
  const row = Math.round(y / (gridConfig.rowHeight + gridConfig.gutter));
  return Math.max(0, row);
}

/**
 * Snap a point to the nearest grid position
 */
export function snapToGrid(
  point: Point,
  gridConfig: GridConfig,
  containerWidth: number,
  threshold: number = 10
): SnapResult {
  const col = pixelToColumn(point.x, gridConfig, containerWidth);
  const row = pixelToRow(point.y, gridConfig);
  
  // Calculate the pixel position of the snapped grid point
  const columnWidth = (containerWidth - (gridConfig.gutter * (gridConfig.columns - 1))) / gridConfig.columns;
  const snappedX = col * (columnWidth + gridConfig.gutter);
  const snappedY = row * (gridConfig.rowHeight + gridConfig.gutter);
  
  // Check if the point is within the snap threshold
  const distance = Math.sqrt(
    Math.pow(point.x - snappedX, 2) + Math.pow(point.y - snappedY, 2)
  );
  
  return {
    col,
    row,
    snapped: distance <= threshold
  };
}

/**
 * Check if a card overlaps with another card
 */
export function cardsOverlap(
  card1: Card,
  card2: Card,
  breakpoint: Breakpoint
): boolean {
  if (!card1.position || !card2.position) return false;
  
  const c1 = card1.position;
  const c2 = card2.position;
  const span1 = card1.span[breakpoint];
  const span2 = card2.span[breakpoint];
  
  const c1Right = c1.col + span1;
  const c2Right = c2.col + span2;
  const c1Bottom = c1.row + (c1.rowSpan || 1);
  const c2Bottom = c2.row + (c2.rowSpan || 1);
  
  return !(
    c1.col >= c2Right ||
    c1Right <= c2.col ||
    c1.row >= c2Bottom ||
    c1Bottom <= c2.row
  );
}

/**
 * Find a valid position for a card that doesn't overlap with existing cards
 */
export function findValidPosition(
  cards: Card[],
  newCard: Card,
  breakpoint: Breakpoint,
  gridColumns: number
): CardPosition {
  const span = newCard.span[breakpoint];
  
  // Try positions row by row
  for (let row = 0; row < 100; row++) {
    for (let col = 0; col <= gridColumns - span; col++) {
      const testPosition: CardPosition = { row, col };
      const testCard = { ...newCard, position: testPosition };
      
      const hasOverlap = cards.some(card => 
        cardsOverlap(testCard, card, breakpoint)
      );
      
      if (!hasOverlap) {
        return testPosition;
      }
    }
  }
  
  // Fallback: return the next available row
  return { row: cards.length, col: 0 };
}

/**
 * Calculate alignment guides when dragging a card
 */
export interface AlignmentGuide {
  type: 'vertical' | 'horizontal';
  position: number;
  cards: string[];
}

export function calculateAlignmentGuides(
  draggingCard: Card,
  allCards: Card[],
  breakpoint: Breakpoint,
  containerWidth: number,
  gridConfig: GridConfig
): AlignmentGuide[] {
  if (!draggingCard.position) return [];
  
  const guides: AlignmentGuide[] = [];
  const columnWidth = (containerWidth - (gridConfig.gutter * (gridConfig.columns - 1))) / gridConfig.columns;
  
  const draggingCol = draggingCard.position.col;
  const draggingRow = draggingCard.position.row;
  const draggingSpan = draggingCard.span[breakpoint];
  const draggingRight = draggingCol + draggingSpan;
  
  allCards.forEach(card => {
    if (card.id === draggingCard.id || !card.position) return;
    
    const cardCol = card.position.col;
    const cardRow = card.position.row;
    const cardSpan = card.span[breakpoint];
    const cardRight = cardCol + cardSpan;
    
    // Vertical guides (same column alignment)
    if (cardCol === draggingCol) {
      guides.push({
        type: 'vertical',
        position: cardCol * (columnWidth + gridConfig.gutter),
        cards: [card.id]
      });
    }
    
    if (cardRight === draggingRight) {
      guides.push({
        type: 'vertical',
        position: cardRight * (columnWidth + gridConfig.gutter),
        cards: [card.id]
      });
    }
    
    // Horizontal guides (same row alignment)
    if (cardRow === draggingRow) {
      guides.push({
        type: 'horizontal',
        position: cardRow * (gridConfig.rowHeight + gridConfig.gutter),
        cards: [card.id]
      });
    }
  });
  
  return guides;
}

/**
 * Distribute cards evenly in a given space
 */
export function distributeCardsEvenly(
  cards: Card[],
  direction: 'horizontal' | 'vertical',
  breakpoint: Breakpoint,
  gridColumns: number
): Card[] {
  if (cards.length < 2) return cards;
  
  const sortedCards = [...cards].sort((a, b) => {
    if (!a.position || !b.position) return 0;
    return direction === 'horizontal' 
      ? a.position.col - b.position.col
      : a.position.row - b.position.row;
  });
  
  const first = sortedCards[0];
  const last = sortedCards[sortedCards.length - 1];
  
  if (!first.position || !last.position) return cards;
  
  if (direction === 'horizontal') {
    const startCol = first.position.col;
    const endCol = last.position.col;
    const totalSpace = endCol - startCol;
    const spacing = totalSpace / (sortedCards.length - 1);
    
    return sortedCards.map((card, index) => ({
      ...card,
      position: {
        ...card.position!,
        col: Math.round(startCol + (spacing * index))
      }
    }));
  } else {
    const startRow = first.position.row;
    const endRow = last.position.row;
    const totalSpace = endRow - startRow;
    const spacing = totalSpace / (sortedCards.length - 1);
    
    return sortedCards.map((card, index) => ({
      ...card,
      position: {
        ...card.position!,
        row: Math.round(startRow + (spacing * index))
      }
    }));
  }
}

/**
 * Align selected cards to a common edge
 */
export function alignCards(
  cards: Card[],
  alignment: 'left' | 'right' | 'top' | 'bottom' | 'center-h' | 'center-v',
  breakpoint: Breakpoint
): Card[] {
  if (cards.length < 2) return cards;
  
  const positions = cards
    .map(card => card.position)
    .filter((pos): pos is CardPosition => pos !== undefined);
  
  if (positions.length === 0) return cards;
  
  switch (alignment) {
    case 'left': {
      const minCol = Math.min(...positions.map(p => p.col));
      return cards.map(card => 
        card.position ? { ...card, position: { ...card.position, col: minCol } } : card
      );
    }
    case 'right': {
      const maxRight = Math.max(...cards.map(card => 
        (card.position?.col || 0) + card.span[breakpoint]
      ));
      return cards.map(card => {
        if (!card.position) return card;
        return {
          ...card,
          position: {
            ...card.position,
            col: maxRight - card.span[breakpoint]
          }
        };
      });
    }
    case 'top': {
      const minRow = Math.min(...positions.map(p => p.row));
      return cards.map(card =>
        card.position ? { ...card, position: { ...card.position, row: minRow } } : card
      );
    }
    case 'bottom': {
      const maxBottom = Math.max(...cards.map(card =>
        (card.position?.row || 0) + (card.position?.rowSpan || 1)
      ));
      return cards.map(card => {
        if (!card.position) return card;
        return {
          ...card,
          position: {
            ...card.position,
            row: maxBottom - (card.position.rowSpan || 1)
          }
        };
      });
    }
    case 'center-h': {
      const avgCol = positions.reduce((sum, p) => sum + p.col, 0) / positions.length;
      return cards.map(card =>
        card.position ? { ...card, position: { ...card.position, col: Math.round(avgCol) } } : card
      );
    }
    case 'center-v': {
      const avgRow = positions.reduce((sum, p) => sum + p.row, 0) / positions.length;
      return cards.map(card =>
        card.position ? { ...card, position: { ...card.position, row: Math.round(avgRow) } } : card
      );
    }
    default:
      return cards;
  }
}
