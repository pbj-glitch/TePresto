export interface CategoryStyle {
  icon: string;
  colorVar: string;
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  Herramientas: { icon: 'hammer-outline', colorVar: 'primary' },
  Electrónica: { icon: 'hardware-chip-outline', colorVar: 'secondary' },
  Camping: { icon: 'bonfire-outline', colorVar: 'success' },
  Hogar: { icon: 'home-outline', colorVar: 'tertiary' },
  Deportes: { icon: 'basketball-outline', colorVar: 'warning' },
};

const DEFAULT_CATEGORY_STYLE: CategoryStyle = { icon: 'cube-outline', colorVar: 'medium' };

export function getCategoryStyle(category: string | undefined): CategoryStyle {
  return (category && CATEGORY_STYLES[category]) || DEFAULT_CATEGORY_STYLE;
}
