/**
 * Storybook story variant mappings for all TDS components.
 * Each component has a list of story IDs and display names.
 * Story IDs follow: atoms-{component}--{variant} or tarmac-tds-{component}--{variant}
 */

export interface StoryVariant {
  id: string;
  label: string;
}

const BASE = 'https://tarmac-storybook-dev.pntrzz.com/storybook';

export function getIframeUrl(storyId: string) {
  return `${BASE}/sb/iframe.html?id=${storyId}&viewMode=story`;
}

export function getStorybookUrl(storyId: string) {
  return `${BASE}/?path=/story/${storyId}`;
}

export const storybookVariants: Record<string, StoryVariant[]> = {
  accordion: [
    { id: 'atoms-collapse--default', label: 'Default' },
    { id: 'atoms-collapse--accordion', label: 'Accordion' },
    { id: 'atoms-collapse--sizes', label: 'Sizes' },
    { id: 'atoms-collapse--expand-icon-position', label: 'Expand Icon Position' },
    { id: 'atoms-collapse--collapsible-behavior', label: 'Collapsible Behavior' },
    { id: 'atoms-collapse--with-extra-content', label: 'With Extra Content' },
    { id: 'atoms-collapse--borderless', label: 'Borderless' },
    { id: 'atoms-collapse--ghost', label: 'Ghost' },
    { id: 'atoms-collapse--no-arrows', label: 'No Arrows' },
    { id: 'atoms-collapse--custom-expand-icon', label: 'Custom Expand Icon' },
    { id: 'atoms-collapse--header-only', label: 'Header Only' },
    { id: 'atoms-collapse--nested-collapse', label: 'Nested Collapse' },
    { id: 'atoms-collapse--light-theme', label: 'Light Theme' },
    { id: 'atoms-collapse--dark-theme', label: 'Dark Theme' },
    { id: 'atoms-collapse--with-children', label: 'With Children' },
  ],
  alert: [
    { id: 'tarmac-tds-alert--playground', label: 'Playground' },
    { id: 'tarmac-tds-alert--info', label: 'Info' },
    { id: 'tarmac-tds-alert--success', label: 'Success' },
    { id: 'tarmac-tds-alert--warning', label: 'Warning' },
    { id: 'tarmac-tds-alert--error', label: 'Error' },
    { id: 'tarmac-tds-alert--with-action', label: 'With Action' },
    { id: 'tarmac-tds-alert--closable', label: 'Closable' },
  ],
  'audio-player': [
    { id: 'atoms-audioplayer--default', label: 'Default' },
  ],
  avatar: [
    { id: 'tarmac-tds-avatar--playground', label: 'Playground' },
    { id: 'tarmac-tds-avatar--sizes', label: 'Sizes' },
    { id: 'tarmac-tds-avatar--with-image', label: 'With Image' },
    { id: 'tarmac-tds-avatar--with-initials', label: 'With Initials' },
    { id: 'tarmac-tds-avatar--with-icon', label: 'With Icon' },
    { id: 'tarmac-tds-avatar--with-badge', label: 'With Badge' },
    { id: 'tarmac-tds-avatar--with-status', label: 'With Status' },
  ],
  'avatar-group': [
    { id: 'tarmac-tds-avatar--playground', label: 'Avatar Playground' },
  ],
  badge: [
    { id: 'tarmac-tds-badge--playground', label: 'Playground' },
    { id: 'tarmac-tds-badge--dot', label: 'Dot' },
    { id: 'tarmac-tds-badge--numeric', label: 'Numeric' },
    { id: 'tarmac-tds-badge--standalone', label: 'Standalone' },
    { id: 'tarmac-tds-badge--sizes', label: 'Sizes' },
    { id: 'tarmac-tds-badge--colors', label: 'Colors' },
  ],
  'bottom-sheet': [
    { id: 'tarmac-tds-bottomsheet--playground', label: 'Playground' },
    { id: 'tarmac-tds-bottomsheet--default', label: 'Default' },
    { id: 'tarmac-tds-bottomsheet--with-header', label: 'With Header' },
    { id: 'tarmac-tds-bottomsheet--full-screen', label: 'Full Screen' },
  ],
  breadcrumbs: [
    { id: 'tarmac-tds-breadcrumbs--playground', label: 'Playground' },
    { id: 'tarmac-tds-breadcrumbs--default', label: 'Default' },
    { id: 'tarmac-tds-breadcrumbs--with-icons', label: 'With Icons' },
    { id: 'tarmac-tds-breadcrumbs--collapsed', label: 'Collapsed' },
  ],
  button: [
    { id: 'tarmac-tds-button--playground', label: 'Playground' },
    { id: 'tarmac-tds-button--primary', label: 'Primary' },
    { id: 'tarmac-tds-button--secondary', label: 'Secondary' },
    { id: 'tarmac-tds-button--tertiary', label: 'Tertiary' },
    { id: 'tarmac-tds-button--ghost', label: 'Ghost' },
    { id: 'tarmac-tds-button--danger', label: 'Danger' },
    { id: 'tarmac-tds-button--sizes', label: 'Sizes' },
    { id: 'tarmac-tds-button--with-icon', label: 'With Icon' },
    { id: 'tarmac-tds-button--icon-only', label: 'Icon Only' },
    { id: 'tarmac-tds-button--loading', label: 'Loading' },
    { id: 'tarmac-tds-button--disabled', label: 'Disabled' },
    { id: 'tarmac-tds-button--full-width', label: 'Full Width' },
  ],
  cards: [
    { id: 'tarmac-tds-card--card-playground', label: 'Playground' },
    { id: 'tarmac-tds-card--default', label: 'Default' },
    { id: 'tarmac-tds-card--with-image', label: 'With Image' },
    { id: 'tarmac-tds-card--with-actions', label: 'With Actions' },
    { id: 'tarmac-tds-card--horizontal', label: 'Horizontal' },
  ],
  checkbox: [
    { id: 'tarmac-tds-checkbox--playground', label: 'Playground' },
    { id: 'tarmac-tds-checkbox--default', label: 'Default' },
    { id: 'tarmac-tds-checkbox--checked', label: 'Checked' },
    { id: 'tarmac-tds-checkbox--indeterminate', label: 'Indeterminate' },
    { id: 'tarmac-tds-checkbox--disabled', label: 'Disabled' },
    { id: 'tarmac-tds-checkbox--with-label', label: 'With Label' },
    { id: 'tarmac-tds-checkbox--group', label: 'Group' },
  ],
  coachmarks: [
    { id: 'tarmac-tds-coachmarks--playground', label: 'Playground' },
    { id: 'tarmac-tds-coachmarks--default', label: 'Default' },
    { id: 'tarmac-tds-coachmarks--multi-step', label: 'Multi Step' },
  ],
  'date-time-picker': [
    { id: 'tarmac-tds-datepicker--playground', label: 'Playground' },
    { id: 'tarmac-tds-datepicker--default', label: 'Default' },
    { id: 'tarmac-tds-datepicker--range', label: 'Range' },
    { id: 'tarmac-tds-datepicker--with-time', label: 'With Time' },
  ],
  'dialog-box': [
    { id: 'tarmac-tds-dialog-box--playground', label: 'Playground' },
    { id: 'tarmac-tds-dialog-box--default', label: 'Default' },
    { id: 'tarmac-tds-dialog-box--confirmation', label: 'Confirmation' },
    { id: 'tarmac-tds-dialog-box--with-form', label: 'With Form' },
  ],
  dropdown: [
    { id: 'tarmac-tds-dropdown--list-playground', label: 'Playground' },
    { id: 'tarmac-tds-dropdown--default', label: 'Default' },
    { id: 'tarmac-tds-dropdown--multi-select', label: 'Multi Select' },
    { id: 'tarmac-tds-dropdown--searchable', label: 'Searchable' },
    { id: 'tarmac-tds-dropdown--with-icons', label: 'With Icons' },
    { id: 'tarmac-tds-dropdown--grouped', label: 'Grouped' },
  ],
  'file-upload': [
    { id: 'atoms-upload--playground', label: 'Playground' },
    { id: 'atoms-upload--default', label: 'Default' },
    { id: 'atoms-upload--drag-and-drop', label: 'Drag and Drop' },
  ],
  filter: [
    { id: 'tarmac-tds-filterdropdown--playground', label: 'Playground' },
    { id: 'tarmac-tds-filterdropdown--default', label: 'Default' },
    { id: 'tarmac-tds-filterdropdown--multi-select', label: 'Multi Select' },
  ],
  footer: [
    { id: 'tarmac-tds-popupheaderfooter--footer-playground', label: 'Footer Playground' },
  ],
  header: [
    { id: 'tarmac-tds-popupheaderfooter--header-playground', label: 'Header Playground' },
  ],
  input: [
    { id: 'tarmac-tds-input-field--playground', label: 'Playground' },
    { id: 'tarmac-tds-input-field--default', label: 'Default' },
    { id: 'tarmac-tds-input-field--with-label', label: 'With Label' },
    { id: 'tarmac-tds-input-field--with-icon', label: 'With Icon' },
    { id: 'tarmac-tds-input-field--error', label: 'Error' },
    { id: 'tarmac-tds-input-field--disabled', label: 'Disabled' },
    { id: 'tarmac-tds-input-field--sizes', label: 'Sizes' },
  ],
  'input-area': [
    { id: 'tarmac-tds-text-area--playground', label: 'Playground' },
    { id: 'tarmac-tds-text-area--default', label: 'Default' },
    { id: 'tarmac-tds-text-area--with-counter', label: 'With Counter' },
    { id: 'tarmac-tds-text-area--error', label: 'Error' },
    { id: 'tarmac-tds-text-area--disabled', label: 'Disabled' },
  ],
  links: [
    { id: 'tarmac-tds-link--playground', label: 'Playground' },
    { id: 'tarmac-tds-link--default', label: 'Default' },
    { id: 'tarmac-tds-link--with-icon', label: 'With Icon' },
    { id: 'tarmac-tds-link--sizes', label: 'Sizes' },
  ],
  list: [
    { id: 'tarmac-tds-table--playground', label: 'Playground' },
    { id: 'tarmac-tds-table--default', label: 'Default' },
    { id: 'tarmac-tds-table--striped', label: 'Striped' },
    { id: 'tarmac-tds-table--sortable', label: 'Sortable' },
  ],
  navigation: [
    { id: 'atoms-sidebar--default', label: 'Default' },
  ],
  'otp-fields': [
    { id: 'tarmac-tds-otp-fields--playground', label: 'Playground' },
    { id: 'tarmac-tds-otp-fields--default', label: 'Default' },
    { id: 'tarmac-tds-otp-fields--error', label: 'Error' },
    { id: 'tarmac-tds-otp-fields--disabled', label: 'Disabled' },
  ],
  pagination: [
    { id: 'tarmac-tds-pagination--playground', label: 'Playground' },
    { id: 'tarmac-tds-pagination--default', label: 'Default' },
    { id: 'tarmac-tds-pagination--with-page-size', label: 'With Page Size' },
  ],
  pills: [
    { id: 'tarmac-tds-pill--playground', label: 'Playground' },
    { id: 'tarmac-tds-pill--default', label: 'Default' },
    { id: 'tarmac-tds-pill--sizes', label: 'Sizes' },
    { id: 'tarmac-tds-pill--with-icon', label: 'With Icon' },
    { id: 'tarmac-tds-pill--closable', label: 'Closable' },
  ],
  popups: [
    { id: 'tarmac-tds-popup--playground', label: 'Playground' },
    { id: 'tarmac-tds-popup--default', label: 'Default' },
    { id: 'tarmac-tds-popup--with-header', label: 'With Header' },
    { id: 'tarmac-tds-popup--with-footer', label: 'With Footer' },
  ],
  'progress-bar': [
    { id: 'tarmac-tds-progressbar--playground-with-text', label: 'Playground' },
    { id: 'tarmac-tds-progressbar--default', label: 'Default' },
    { id: 'tarmac-tds-progressbar--with-label', label: 'With Label' },
    { id: 'tarmac-tds-progressbar--indeterminate', label: 'Indeterminate' },
  ],
  radio: [
    { id: 'tarmac-tds-radio--playground', label: 'Playground' },
    { id: 'tarmac-tds-radio--default', label: 'Default' },
    { id: 'tarmac-tds-radio--checked', label: 'Checked' },
    { id: 'tarmac-tds-radio--disabled', label: 'Disabled' },
    { id: 'tarmac-tds-radio--group', label: 'Group' },
  ],
  rating: [
    { id: 'tarmac-tds-rating--playground', label: 'Playground' },
    { id: 'tarmac-tds-rating--default', label: 'Default' },
    { id: 'tarmac-tds-rating--read-only', label: 'Read Only' },
    { id: 'tarmac-tds-rating--sizes', label: 'Sizes' },
  ],
  scroll: [
    { id: 'tarmac-tds-scrollbar--playground', label: 'Playground' },
  ],
  search: [
    { id: 'tarmac-tds-search-dropdown--playground', label: 'Playground' },
    { id: 'tarmac-tds-search-dropdown--default', label: 'Default' },
    { id: 'tarmac-tds-search-dropdown--with-suggestions', label: 'With Suggestions' },
  ],
  shimmer: [
    { id: 'tarmac-tds-spinner--playground', label: 'Playground' },
  ],
  'side-drawer': [
    { id: 'tarmac-tds-side-drawer--playground', label: 'Playground' },
    { id: 'tarmac-tds-side-drawer--default', label: 'Default' },
    { id: 'tarmac-tds-side-drawer--left', label: 'Left' },
    { id: 'tarmac-tds-side-drawer--right', label: 'Right' },
  ],
  slider: [
    { id: 'tarmac-tds-slider--playground', label: 'Playground' },
    { id: 'tarmac-tds-slider--default', label: 'Default' },
    { id: 'tarmac-tds-slider--range', label: 'Range' },
    { id: 'tarmac-tds-slider--with-marks', label: 'With Marks' },
    { id: 'tarmac-tds-slider--disabled', label: 'Disabled' },
  ],
  snackbar: [
    { id: 'tarmac-tds-snackbar--playground', label: 'Playground' },
    { id: 'tarmac-tds-snackbar--info', label: 'Info' },
    { id: 'tarmac-tds-snackbar--success', label: 'Success' },
    { id: 'tarmac-tds-snackbar--warning', label: 'Warning' },
    { id: 'tarmac-tds-snackbar--error', label: 'Error' },
    { id: 'tarmac-tds-snackbar--with-action', label: 'With Action' },
  ],
  spinner: [
    { id: 'tarmac-tds-spinner--playground', label: 'Playground' },
    { id: 'tarmac-tds-spinner--default', label: 'Default' },
    { id: 'tarmac-tds-spinner--sizes', label: 'Sizes' },
  ],
  'status-indicator': [
    { id: 'tarmac-tds-statusindicator--playground', label: 'Playground' },
    { id: 'tarmac-tds-statusindicator--default', label: 'Default' },
    { id: 'tarmac-tds-statusindicator--sizes', label: 'Sizes' },
    { id: 'tarmac-tds-statusindicator--with-label', label: 'With Label' },
  ],
  stepper: [
    { id: 'atoms-steps--default', label: 'Default' },
    { id: 'atoms-steps--vertical', label: 'Vertical' },
    { id: 'atoms-steps--with-description', label: 'With Description' },
    { id: 'atoms-steps--error', label: 'Error' },
  ],
  tabs: [
    { id: 'tarmac-tds-tabs-tabgroup--playground', label: 'Playground' },
    { id: 'tarmac-tds-tabs-tabgroup--default', label: 'Default' },
    { id: 'tarmac-tds-tabs-tabgroup--with-icons', label: 'With Icons' },
    { id: 'tarmac-tds-tabs-tabgroup--scrollable', label: 'Scrollable' },
  ],
  tags: [
    { id: 'tarmac-tds-chip--playground', label: 'Playground' },
    { id: 'tarmac-tds-chip--default', label: 'Default' },
    { id: 'tarmac-tds-chip--sizes', label: 'Sizes' },
    { id: 'tarmac-tds-chip--with-icon', label: 'With Icon' },
    { id: 'tarmac-tds-chip--closable', label: 'Closable' },
    { id: 'tarmac-tds-chip--colors', label: 'Colors' },
  ],
  toggle: [
    { id: 'tarmac-tds-toggle--playground', label: 'Playground' },
    { id: 'tarmac-tds-toggle--default', label: 'Default' },
    { id: 'tarmac-tds-toggle--checked', label: 'Checked' },
    { id: 'tarmac-tds-toggle--disabled', label: 'Disabled' },
    { id: 'tarmac-tds-toggle--sizes', label: 'Sizes' },
    { id: 'tarmac-tds-toggle--with-label', label: 'With Label' },
  ],
  tooltip: [
    { id: 'tarmac-tds-tooltip--playground', label: 'Playground' },
    { id: 'tarmac-tds-tooltip--default', label: 'Default' },
    { id: 'tarmac-tds-tooltip--positions', label: 'Positions' },
    { id: 'tarmac-tds-tooltip--with-arrow', label: 'With Arrow' },
  ],
};
