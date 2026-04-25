// ============================================================
// TARMAC Design System — Typography Data (from Figma)
// ============================================================

export type Weight = 'Bold' | 'Semibold' | 'Medium' | 'Regular' | 'Light';

export const weightValues: Record<Weight, number> = {
  Bold: 700,
  Semibold: 600,
  Medium: 500,
  Regular: 400,
  Light: 300,
};

export interface TypeStyle {
  /** Display label, e.g. "H1" */
  label: string;
  /** Figma token prefix, e.g. "heading1" */
  tokenPrefix: string;
  /** Font size in px */
  size: number;
  /** Line height in px */
  lineHeight: number;
  /** Letter spacing value */
  letterSpacing: number | { bold: number; regular: number };
  /** Paragraph spacing */
  paragraphSpacing: number;
  /** Available weights — first is default rendered */
  weights: Weight[];
  /** Default weight (used in Figma as "_default") */
  defaultWeight: Weight;
  /** Short purpose description */
  purpose: string;
}

// --- Headings (H1–H5) ---
export const headings: TypeStyle[] = [
  {
    label: 'H1', tokenPrefix: 'heading1', size: 40, lineHeight: 52,
    letterSpacing: -0.5, paragraphSpacing: 2,
    weights: ['Bold', 'Semibold', 'Medium', 'Regular'],
    defaultWeight: 'Medium',
    purpose: 'Primary page titles & major section headers',
  },
  {
    label: 'H2', tokenPrefix: 'heading2', size: 34, lineHeight: 44,
    letterSpacing: -0.25, paragraphSpacing: 2,
    weights: ['Bold', 'Semibold', 'Medium', 'Regular'],
    defaultWeight: 'Medium',
    purpose: 'Section titles & key content anchors',
  },
  {
    label: 'H3', tokenPrefix: 'heading3', size: 28, lineHeight: 36,
    letterSpacing: -0.15, paragraphSpacing: 2,
    weights: ['Bold', 'Semibold', 'Medium', 'Regular'],
    defaultWeight: 'Medium',
    purpose: 'Sub-sections & supporting structure',
  },
  {
    label: 'H4', tokenPrefix: 'heading4', size: 24, lineHeight: 32,
    letterSpacing: 0, paragraphSpacing: 2,
    weights: ['Bold', 'Semibold', 'Medium', 'Regular', 'Light'],
    defaultWeight: 'Medium',
    purpose: 'Component-level titles & feature labels',
  },
  {
    label: 'H5', tokenPrefix: 'heading5', size: 20, lineHeight: 26,
    letterSpacing: 0, paragraphSpacing: 2,
    weights: ['Bold', 'Semibold', 'Medium', 'Regular', 'Light'],
    defaultWeight: 'Medium',
    purpose: 'Minor headings & UI section labels',
  },
];

// --- Body (B1–B2) ---
export const body: TypeStyle[] = [
  {
    label: 'B1', tokenPrefix: 'body1', size: 16, lineHeight: 24,
    letterSpacing: { bold: 0.3, regular: 0.2 }, paragraphSpacing: 0,
    weights: ['Bold', 'Semibold', 'Medium', 'Regular', 'Light'],
    defaultWeight: 'Medium',
    purpose: 'Default reading size for content, forms, and descriptive UI text',
  },
  {
    label: 'B2', tokenPrefix: 'body2', size: 14, lineHeight: 20,
    letterSpacing: 0.3, paragraphSpacing: 0,
    weights: ['Bold', 'Semibold', 'Medium', 'Regular', 'Light'],
    defaultWeight: 'Medium',
    purpose: 'Dense layouts, tables, labels, or secondary content',
  },
];

// --- Caption (C1–C2) ---
export const captions: TypeStyle[] = [
  {
    label: 'C1', tokenPrefix: 'caption1', size: 12, lineHeight: 16,
    letterSpacing: 0.4, paragraphSpacing: 0,
    weights: ['Bold', 'Semibold', 'Medium', 'Regular', 'Light'],
    defaultWeight: 'Medium',
    purpose: 'Helper text, hints, timestamps, and secondary metadata',
  },
  {
    label: 'C2', tokenPrefix: 'caption2', size: 10, lineHeight: 16,
    letterSpacing: 0.4, paragraphSpacing: 0,
    weights: ['Bold', 'Semibold', 'Medium', 'Regular', 'Light'],
    defaultWeight: 'Medium',
    purpose: 'Rare use for constrained UI or legal/technical notations',
  },
];

/** Helper: resolve letter-spacing for a given weight */
export function getLetterSpacing(style: TypeStyle, weight: Weight): number {
  if (typeof style.letterSpacing === 'number') return style.letterSpacing;
  return weight === 'Bold' || weight === 'Semibold'
    ? style.letterSpacing.bold
    : style.letterSpacing.regular;
}

/** Helper: build Figma token name */
export function tokenName(style: TypeStyle, weight: Weight): string {
  const suffix = weight === style.defaultWeight
    ? 'default'
    : weight.toLowerCase();
  return `${style.tokenPrefix}_${suffix}`;
}
