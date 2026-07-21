export type Framework = 'react' | 'angular';

export interface StoryVariant {
  id: string;
  label: string;
}

const BASE_URLS: Record<Framework, string> = {
  react: 'https://tarmac-storybook.delhivery.com/storybook/sb',
  angular: 'https://tarmac-storybook.delhivery.com/storybook-angular',
};

export function getIframeUrl(storyId: string, framework: Framework = 'react'): string {
  const base = BASE_URLS[framework];
  return `${base}/iframe.html?id=${storyId}&viewMode=story&shortcuts=false`;
}

export function getStorybookUrl(storyId: string, framework: Framework = 'react'): string {
  const base = BASE_URLS[framework];
  return `${base}/index.html?path=/story/${storyId}`;
}

export const storybookVariants: Record<string, StoryVariant[]> = {
  accordion: [
    { id: 'tarmac-tds-accordion--playground', label: 'Playground' },
    { id: 'tarmac-tds-accordion--header-variants', label: 'Header Variants' },
    { id: 'tarmac-tds-accordion--footer-variants', label: 'Footer Variants' },
    { id: 'tarmac-tds-accordion--accordion-counts', label: 'Accordion Counts' },
    { id: 'tarmac-tds-accordion--accordion-mode', label: 'Accordion Mode' },
    { id: 'tarmac-tds-accordion--controlled', label: 'Controlled' },
    { id: 'tarmac-tds-accordion--collapsed-vs-expanded', label: 'Collapsed vs Expanded' },
    { id: 'tarmac-tds-accordion--full-matrix', label: 'Full Matrix' },
    { id: 'tarmac-tds-accordion--light-vs-dark-mode', label: 'Light vs Dark Mode' },
  ],
  'accordion-v2': [
    { id: 'tarmac-tds-accordion-v2--playground', label: 'Playground' },
    { id: 'tarmac-tds-accordion-v2--collapsed', label: 'Collapsed' },
    { id: 'tarmac-tds-accordion-v2--expanded-with-footer', label: 'Expanded with Footer' },
    { id: 'tarmac-tds-accordion-v2--variant-3-white-header', label: 'Variant 3 White Header' },
    { id: 'tarmac-tds-accordion-v2--pills-header-variant', label: 'Pills Header Variant' },
    { id: 'tarmac-tds-accordion-v2--badges-header-variant', label: 'Badges Header Variant' },
    { id: 'tarmac-tds-accordion-v2--accordion-mode', label: 'Accordion Mode' },
    { id: 'tarmac-tds-accordion-v2--controlled', label: 'Controlled' },
    { id: 'tarmac-tds-accordion-v2--header-style-variants', label: 'Header Style Variants' },
    { id: 'tarmac-tds-accordion-v2--light-vs-dark-mode', label: 'Light vs Dark Mode' },
  ],
  alert: [
    { id: 'tarmac-tds-alert--playground', label: 'Playground' },
    { id: 'tarmac-tds-alert--full-matrix-default', label: 'Full Matrix Default' },
    { id: 'tarmac-tds-alert--full-matrix-outlined', label: 'Full Matrix Outlined' },
    { id: 'tarmac-tds-alert--white', label: 'White' },
    { id: 'tarmac-tds-alert--black', label: 'Black' },
    { id: 'tarmac-tds-alert--coal', label: 'Coal' },
    { id: 'tarmac-tds-alert--success', label: 'Success' },
    { id: 'tarmac-tds-alert--error', label: 'Error' },
    { id: 'tarmac-tds-alert--info', label: 'Info' },
    { id: 'tarmac-tds-alert--warning', label: 'Warning' },
    { id: 'tarmac-tds-alert--with-ct-as', label: 'With CTAs' },
    { id: 'tarmac-tds-alert--sizes-comparison', label: 'Sizes Comparison' },
    { id: 'tarmac-tds-alert--light-vs-dark', label: 'Light vs Dark' },
  ],
  avatar: [
    { id: 'tarmac-tds-avatar--playground', label: 'Playground' },
    { id: 'tarmac-tds-avatar--initials', label: 'Initials' },
    { id: 'tarmac-tds-avatar--image', label: 'Image' },
    { id: 'tarmac-tds-avatar--numeric', label: 'Numeric' },
    { id: 'tarmac-tds-avatar--icon', label: 'Icon' },
    { id: 'tarmac-tds-avatar--square', label: 'Square' },
    { id: 'tarmac-tds-avatar--with-status-dot', label: 'With Status Dot' },
    { id: 'tarmac-tds-avatar--disabled', label: 'Disabled' },
    { id: 'tarmac-tds-avatar--ghost', label: 'Ghost' },
    { id: 'tarmac-tds-avatar--light-vs-dark', label: 'Light vs Dark' },
  ],
  'avatar-group': [
    { id: 'tarmac-tds-avatar-group--playground', label: 'Playground' },
    { id: 'tarmac-tds-avatar-group--all-sizes', label: 'All Sizes' },
    { id: 'tarmac-tds-avatar-group--shapes', label: 'Shapes' },
    { id: 'tarmac-tds-avatar-group--overflow-variants', label: 'Overflow Variants' },
    { id: 'tarmac-tds-avatar-group--ghost', label: 'Ghost' },
    { id: 'tarmac-tds-avatar-group--with-images', label: 'With Images' },
    { id: 'tarmac-tds-avatar-group--mixed-types', label: 'Mixed Types' },
    { id: 'tarmac-tds-avatar-group--disabled', label: 'Disabled' },
    { id: 'tarmac-tds-avatar-group--light-vs-dark', label: 'Light vs Dark' },
  ],
  badge: [
    { id: 'tarmac-tds-badge--playground', label: 'Playground' },
    { id: 'tarmac-tds-badge--full-matrix', label: 'Full Matrix' },
    { id: 'tarmac-tds-badge--black', label: 'Black' },
    { id: 'tarmac-tds-badge--white', label: 'White' },
    { id: 'tarmac-tds-badge--coal', label: 'Coal' },
    { id: 'tarmac-tds-badge--dlv-red', label: 'Dlv Red' },
    { id: 'tarmac-tds-badge--info', label: 'Info' },
    { id: 'tarmac-tds-badge--success', label: 'Success' },
    { id: 'tarmac-tds-badge--warning', label: 'Warning' },
    { id: 'tarmac-tds-badge--error', label: 'Error' },
    { id: 'tarmac-tds-badge--cardbox', label: 'Cardbox' },
    { id: 'tarmac-tds-badge--light-vs-dark', label: 'Light vs Dark' },
  ],
  'bottom-sheet': [
    { id: 'tarmac-tds-bottomsheet--playground', label: 'Playground' },
  ],
  breadcrumbs: [
    { id: 'tarmac-tds-breadcrumbs--playground', label: 'Playground' },
    { id: 'tarmac-tds-breadcrumbs--all-sizes', label: 'All Sizes' },
    { id: 'tarmac-tds-breadcrumbs--with-icons', label: 'With Icons' },
    { id: 'tarmac-tds-breadcrumbs--truncated', label: 'Truncated' },
    { id: 'tarmac-tds-breadcrumbs--custom-separator', label: 'Custom Separator' },
    { id: 'tarmac-tds-breadcrumbs--ghost', label: 'Ghost' },
    { id: 'tarmac-tds-breadcrumbs--light-vs-dark', label: 'Light vs Dark' },
  ],
  button: [
    { id: 'tarmac-tds-button--playground', label: 'Playground' },
    { id: 'tarmac-tds-button--full-matrix', label: 'Full Matrix' },
    { id: 'tarmac-tds-button--light-vs-dark', label: 'Light vs Dark' },
    { id: 'tarmac-tds-button--black', label: 'Black' },
    { id: 'tarmac-tds-button--white', label: 'White' },
    { id: 'tarmac-tds-button--coal', label: 'Coal' },
    { id: 'tarmac-tds-button--dlv-red', label: 'Dlv Red' },
    { id: 'tarmac-tds-button--info', label: 'Info' },
    { id: 'tarmac-tds-button--success', label: 'Success' },
    { id: 'tarmac-tds-button--error', label: 'Error' },
    { id: 'tarmac-tds-button--warning', label: 'Warning' },
  ],
  cards: [
    { id: 'tarmac-tds-card--playground', label: 'Playground' },
    { id: 'tarmac-tds-card--card-playground', label: 'Card Playground' },
  ],
  checkbox: [
    { id: 'tarmac-tds-checkbox--playground', label: 'Playground' },
    { id: 'tarmac-tds-checkbox--all-states', label: 'All States' },
    { id: 'tarmac-tds-checkbox--sizes', label: 'Sizes' },
    { id: 'tarmac-tds-checkbox--with-label', label: 'With Label' },
    { id: 'tarmac-tds-checkbox--ghost', label: 'Ghost' },
    { id: 'tarmac-tds-checkbox--disabled', label: 'Disabled' },
    { id: 'tarmac-tds-checkbox--indeterminate', label: 'Indeterminate' },
    { id: 'tarmac-tds-checkbox--light-vs-dark', label: 'Light vs Dark' },
  ],
  coachmarks: [
    { id: 'tarmac-tds-coachmarks--playground', label: 'Playground' },
  ],
  'date-time-picker': [
    { id: 'tarmac-tds-daterangepicker--playground', label: 'Playground' },
  ],
  'dialog-box': [
    { id: 'tarmac-tds-dialogbox--playground', label: 'Playground' },
  ],
  dropdown: [
    { id: 'tarmac-tds-dropdown--list-playground', label: 'Playground' },
  ],
  fab: [
    { id: 'tarmac-tds-fab--playground', label: 'Playground' },
  ],
  'file-upload': [
    { id: 'tarmac-tds-fileupload--playground', label: 'Playground' },
  ],
  filter: [
    { id: 'tarmac-tds-filterdropdown--playground', label: 'Playground' },
  ],
  footer: [
    { id: 'tarmac-tds-popupheaderfooter--footer-playground', label: 'Playground' },
  ],
  header: [
    { id: 'tarmac-tds-popupheaderfooter--header-playground', label: 'Playground' },
  ],
  input: [
    { id: 'tarmac-tds-input--playground', label: 'Playground' },
  ],
  'input-area': [
    { id: 'tarmac-tds-textarea--playground', label: 'Playground' },
  ],
  'input-field-stepper': [
    { id: 'tarmac-tds-inputfieldstepper--playground', label: 'Playground' },
  ],
  links: [
    { id: 'tarmac-tds-link--playground', label: 'Playground' },
  ],
  list: [
    { id: 'tarmac-tds-listset--playground', label: 'Playground' },
  ],
  menu: [
    { id: 'tarmac-tds-menu--playground', label: 'Playground' },
  ],
  navigation: [
    { id: 'tarmac-tds-sidenavigation--playground', label: 'Playground' },
  ],
  'otp-fields': [
    { id: 'tarmac-tds-otpinput--playground', label: 'Playground' },
  ],
  pagination: [
    { id: 'tarmac-tds-pagination--playground', label: 'Playground' },
  ],
  pills: [
    { id: 'tarmac-tds-pill--playground', label: 'Playground' },
  ],
  popups: [
    { id: 'tarmac-tds-popup--playground', label: 'Playground' },
  ],
  'progress-bar': [
    { id: 'tarmac-tds-progressbar--playground', label: 'Playground' },
  ],
  radio: [
    { id: 'tarmac-tds-radio--playground', label: 'Playground' },
  ],
  rating: [
    { id: 'tarmac-tds-rating--playground', label: 'Playground' },
  ],
  scroll: [
    { id: 'tarmac-tds-tdsscrollbar--playground', label: 'Playground' },
  ],
  search: [
    { id: 'tarmac-tds-searchdropdown--playground', label: 'Playground' },
  ],
  'selection-card': [
    { id: 'tarmac-tds-selectioncard--playground', label: 'Playground' },
  ],
  shimmer: [
    { id: 'tarmac-tds-shimmer--playground', label: 'Playground' },
  ],
  'side-drawer': [
    { id: 'tarmac-tds-sidedrawer--playground', label: 'Playground' },
  ],
  slider: [
    { id: 'tarmac-tds-slider--playground', label: 'Playground' },
  ],
  snackbar: [
    { id: 'tarmac-tds-snackbar--playground', label: 'Playground' },
  ],
  spinner: [
    { id: 'tarmac-tds-spinner--playground', label: 'Playground' },
  ],
  'status-indicator': [
    { id: 'tarmac-tds-statusindicator--playground', label: 'Playground' },
  ],
  stepper: [
    { id: 'tarmac-tds-stepper--playground', label: 'Playground' },
  ],
  table: [
    { id: 'tarmac-tds-table--playground', label: 'Playground' },
  ],
  tabs: [
    { id: 'tarmac-tds-tabgroup--playground', label: 'Playground' },
  ],
  tags: [
    { id: 'tarmac-tds-chip--playground', label: 'Playground' },
  ],
  toggle: [
    { id: 'tarmac-tds-switch--playground', label: 'Playground' },
  ],
  tooltip: [
    { id: 'tarmac-tds-tooltip--playground', label: 'Playground' },
  ],
  'tooltip-v2': [
    { id: 'tarmac-tds-tooltip-v2--playground', label: 'Playground' },
  ],
  'top-navigation': [
    { id: 'tarmac-tds-topnavigation--playground', label: 'Playground' },
  ],
  'upload-file': [
    { id: 'tarmac-tds-fileupload--playground', label: 'Playground' },
  ],
  'web-header': [
    { id: 'tarmac-tds-webheader--playground', label: 'Playground' },
  ],
};
