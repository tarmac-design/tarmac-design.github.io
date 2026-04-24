/**
 * Storybook story IDs and variant metadata for all TDS components.
 *
 * Story ID format: `{prefix}--{kebab-case-export-name}`
 * Kebab-casing follows Storybook's `storyNameFromExport` algorithm:
 *   insert hyphen before each uppercase letter, then lowercase everything.
 */

const BASE = 'https://tarmac-storybook-dev.pntrzz.com/storybook';

export interface StoryVariant {
  id: string;
  label: string;
}

export function getIframeUrl(storyId: string) {
  return `${BASE}/sb/iframe.html?id=${storyId}&viewMode=story`;
}

export function getStorybookUrl(storyId: string) {
  return `${BASE}/?path=/story/${storyId}`;
}

// Keep legacy helpers for backward compat
export function getDocsIframeUrl(docsId: string) {
  return `${BASE}/sb/iframe.html?id=${docsId}&viewMode=docs`;
}

export function getDocsStorybookUrl(docsId: string) {
  return `${BASE}/?path=/docs/${docsId}`;
}

export function getStoryIframeUrl(storyId: string) {
  return getIframeUrl(storyId);
}

export function getStoryStorybookUrl(storyId: string) {
  return getStorybookUrl(storyId);
}

/** Legacy docs map — kept for backward compat */
export const storybookDocsMap: Record<string, { docsId: string; storyId: string }> = {
  accordion:          { docsId: 'atoms-collapse--docs',                storyId: 'atoms-collapse--default' },
  alert:              { docsId: 'tarmac-tds-alert--docs',              storyId: 'tarmac-tds-alert--playground' },
  'audio-player':     { docsId: 'atoms-audioplayer--docs',             storyId: 'atoms-audioplayer--default' },
  avatar:             { docsId: 'tarmac-tds-avatar--docs',             storyId: 'tarmac-tds-avatar--playground' },
  'avatar-group':     { docsId: 'tarmac-tds-avatar--docs',             storyId: 'tarmac-tds-avatar--playground' },
  badge:              { docsId: 'tarmac-tds-badge--docs',              storyId: 'tarmac-tds-badge--playground' },
  'bottom-sheet':     { docsId: 'tarmac-tds-bottomsheet--docs',        storyId: 'tarmac-tds-bottomsheet--playground' },
  breadcrumbs:        { docsId: 'tarmac-tds-breadcrumbs--docs',        storyId: 'tarmac-tds-breadcrumbs--playground' },
  button:             { docsId: 'tarmac-tds-button--docs',             storyId: 'tarmac-tds-button--playground' },
  cards:              { docsId: 'tarmac-tds-card--card--docs',         storyId: 'tarmac-tds-card--card--card-playground' },
  checkbox:           { docsId: 'tarmac-tds-checkbox--docs',           storyId: 'tarmac-tds-checkbox--playground' },
  coachmarks:         { docsId: 'tarmac-tds-coachmarks--docs',         storyId: 'tarmac-tds-coachmarks--playground' },
  'date-time-picker': { docsId: 'tarmac-tds-datepicker--docs',         storyId: 'tarmac-tds-datepicker--playground' },
  'dialog-box':       { docsId: 'tarmac-tds-dialog-box--docs',         storyId: 'tarmac-tds-dialog-box--playground' },
  dropdown:           { docsId: 'tarmac-tds-dropdown--list--docs',     storyId: 'tarmac-tds-dropdown--list--list-playground' },
  'file-upload':      { docsId: 'atoms-upload--docs',                  storyId: 'atoms-upload--playground' },
  filter:             { docsId: 'tarmac-tds-filterdropdown--docs',     storyId: 'tarmac-tds-filterdropdown--playground' },
  footer:             { docsId: 'tarmac-tds-popupheaderfooter--docs',  storyId: 'tarmac-tds-popupheaderfooter--footer-playground' },
  header:             { docsId: 'tarmac-tds-popupheaderfooter--docs',  storyId: 'tarmac-tds-popupheaderfooter--header-playground' },
  input:              { docsId: 'tarmac-tds-input-field--docs',        storyId: 'tarmac-tds-input-field--playground' },
  'input-area':       { docsId: 'tarmac-tds-text-area--docs',          storyId: 'tarmac-tds-text-area--playground' },
  links:              { docsId: 'tarmac-tds-link--docs',               storyId: 'tarmac-tds-link--playground' },
  list:               { docsId: 'tarmac-tds-table--docs',              storyId: 'tarmac-tds-table--playground' },
  navigation:         { docsId: 'atoms-sidebar--docs',                 storyId: 'atoms-sidebar--default' },
  'otp-fields':       { docsId: 'tarmac-tds-otp-fields--docs',         storyId: 'tarmac-tds-otp-fields--playground' },
  pagination:         { docsId: 'tarmac-tds-pagination--docs',         storyId: 'tarmac-tds-pagination--playground' },
  pills:              { docsId: 'tarmac-tds-pill--docs',               storyId: 'tarmac-tds-pill--playground' },
  popups:             { docsId: 'tarmac-tds-popup--docs',              storyId: 'tarmac-tds-popup--playground' },
  'progress-bar':     { docsId: 'tarmac-tds-progressbar--docs',        storyId: 'tarmac-tds-progressbar--playground-with-text' },
  radio:              { docsId: 'tarmac-tds-radio--docs',              storyId: 'tarmac-tds-radio--playground' },
  rating:             { docsId: 'tarmac-tds-rating--docs',             storyId: 'tarmac-tds-rating--playground' },
  scroll:             { docsId: 'tarmac-tds-scrollbar--docs',          storyId: 'tarmac-tds-scrollbar--playground' },
  search:             { docsId: 'tarmac-tds-search-dropdown--docs',    storyId: 'tarmac-tds-search-dropdown--playground' },
  shimmer:            { docsId: 'tarmac-tds-spinner--docs',            storyId: 'tarmac-tds-spinner--playground' },
  'side-drawer':      { docsId: 'tarmac-tds-side-drawer--docs',        storyId: 'tarmac-tds-side-drawer--playground' },
  slider:             { docsId: 'tarmac-tds-slider--docs',             storyId: 'tarmac-tds-slider--playground' },
  snackbar:           { docsId: 'tarmac-tds-snackbar--docs',           storyId: 'tarmac-tds-snackbar--playground' },
  spinner:            { docsId: 'tarmac-tds-spinner--docs',            storyId: 'tarmac-tds-spinner--playground' },
  'status-indicator': { docsId: 'tarmac-tds-statusindicator--docs',    storyId: 'tarmac-tds-statusindicator--playground' },
  stepper:            { docsId: 'atoms-steps--docs',                   storyId: 'atoms-steps--default' },
  tabs:               { docsId: 'tarmac-tds-tabs-tabgroup--docs',      storyId: 'tarmac-tds-tabs-tabgroup--playground' },
  tags:               { docsId: 'tarmac-tds-chip--docs',               storyId: 'tarmac-tds-chip--playground' },
  toggle:             { docsId: 'tarmac-tds-toggle--docs',             storyId: 'tarmac-tds-toggle--playground' },
  tooltip:            { docsId: 'tarmac-tds-tooltip--docs',            storyId: 'tarmac-tds-tooltip--playground' },
};

/**
 * Per-component story variants — curated selection of the most useful stories.
 * Story IDs follow Storybook's kebab-case convention from export names.
 */
export const storybookVariants: Record<string, StoryVariant[]> = {
  /* ── Accordion ─────────────────────────────────────────────── */
  accordion: [
    { id: 'atoms-collapse--default',               label: 'Default' },
    { id: 'atoms-collapse--accordion',              label: 'Accordion' },
    { id: 'atoms-collapse--sizes',                  label: 'Sizes' },
    { id: 'atoms-collapse--expand-icon-position',   label: 'Expand Icon Position' },
    { id: 'atoms-collapse--collapsible-behavior',   label: 'Collapsible Behavior' },
    { id: 'atoms-collapse--with-extra-content',     label: 'With Extra Content' },
    { id: 'atoms-collapse--borderless',             label: 'Borderless' },
    { id: 'atoms-collapse--ghost',                  label: 'Ghost' },
    { id: 'atoms-collapse--custom-expand-icon',     label: 'Custom Expand Icon' },
    { id: 'atoms-collapse--nested-collapse',        label: 'Nested Collapse' },
    { id: 'atoms-collapse--light-theme',            label: 'Light Theme' },
    { id: 'atoms-collapse--dark-theme',             label: 'Dark Theme' },
  ],

  /* ── Alert ─────────────────────────────────────────────────── */
  alert: [
    { id: 'tarmac-tds-alert--playground',           label: 'Playground' },
    { id: 'tarmac-tds-alert--full-matrix',          label: 'Full Matrix' },
    { id: 'tarmac-tds-alert--light-vs-dark',        label: 'Light Vs Dark' },
    { id: 'tarmac-tds-alert--info',                 label: 'Info' },
    { id: 'tarmac-tds-alert--success',              label: 'Success' },
    { id: 'tarmac-tds-alert--warning',              label: 'Warning' },
    { id: 'tarmac-tds-alert--error',                label: 'Error' },
    { id: 'tarmac-tds-alert--with-ct-as',           label: 'With CTAs' },
    { id: 'tarmac-tds-alert--with-ct-as-small',     label: 'With CTAs Small' },
  ],

  /* ── Audio Player ──────────────────────────────────────────── */
  'audio-player': [
    { id: 'atoms-audioplayer--default',              label: 'Default' },
    { id: 'atoms-audioplayer--custom-colors',        label: 'Custom Colors' },
    { id: 'atoms-audioplayer--themed-overrides',     label: 'Themed Overrides' },
    { id: 'atoms-audioplayer--with-callbacks',       label: 'With Callbacks' },
    { id: 'atoms-audioplayer--with-error-handling',  label: 'With Error Handling' },
    { id: 'atoms-audioplayer--sizes',                label: 'Sizes' },
    { id: 'atoms-audioplayer--custom-icons-and-border', label: 'Custom Icons And Border' },
  ],

  /* ── Avatar ────────────────────────────────────────────────── */
  avatar: [
    { id: 'tarmac-tds-avatar--playground',           label: 'Playground' },
    { id: 'tarmac-tds-avatar--full-matrix',          label: 'Full Matrix' },
    { id: 'tarmac-tds-avatar--light-vs-dark',        label: 'Light Vs Dark' },
    { id: 'tarmac-tds-avatar--shapes-comparison',    label: 'Shapes Comparison' },
    { id: 'tarmac-tds-avatar--status-dots',          label: 'Status Dots' },
  ],

  /* ── Avatar Group (uses same avatar prefix) ─────────────────── */
  'avatar-group': [
    { id: 'tarmac-tds-avatar--playground',           label: 'Playground' },
    { id: 'tarmac-tds-avatar--full-matrix',          label: 'Full Matrix' },
    { id: 'tarmac-tds-avatar--light-vs-dark',        label: 'Light Vs Dark' },
    { id: 'tarmac-tds-avatar--shapes-comparison',    label: 'Shapes Comparison' },
    { id: 'tarmac-tds-avatar--status-dots',          label: 'Status Dots' },
  ],

  /* ── Badge ─────────────────────────────────────────────────── */
  badge: [
    { id: 'tarmac-tds-badge--playground',            label: 'Playground' },
    { id: 'tarmac-tds-badge--full-matrix',           label: 'Full Matrix' },
    { id: 'tarmac-tds-badge--light-vs-dark',         label: 'Light Vs Dark' },
    { id: 'tarmac-tds-badge--info',                  label: 'Info' },
    { id: 'tarmac-tds-badge--success',               label: 'Success' },
    { id: 'tarmac-tds-badge--warning',               label: 'Warning' },
    { id: 'tarmac-tds-badge--error',                 label: 'Error' },
    { id: 'tarmac-tds-badge--cardbox',               label: 'Cardbox' },
  ],

  /* ── Bottom Sheet ──────────────────────────────────────────── */
  'bottom-sheet': [
    { id: 'tarmac-tds-bottomsheet--playground',              label: 'Playground' },
    { id: 'tarmac-tds-bottomsheet--light-vs-dark',           label: 'Light Vs Dark' },
    { id: 'tarmac-tds-bottomsheet--boolean-toggles',         label: 'Boolean Toggles' },
    { id: 'tarmac-tds-bottomsheet--compound-pattern',        label: 'Compound Pattern' },
    { id: 'tarmac-tds-bottomsheet--standard-vertical',       label: 'Standard Vertical' },
    { id: 'tarmac-tds-bottomsheet--standard-horizontal',     label: 'Standard Horizontal' },
    { id: 'tarmac-tds-bottomsheet--slot-vertical',           label: 'Slot Vertical' },
    { id: 'tarmac-tds-bottomsheet--slot-horizontal',         label: 'Slot Horizontal' },
    { id: 'tarmac-tds-bottomsheet--illustration-types',      label: 'Illustration Types' },
    { id: 'tarmac-tds-bottomsheet--with-subtext',            label: 'With Subtext' },
  ],

  /* ── Breadcrumbs ───────────────────────────────────────────── */
  breadcrumbs: [
    { id: 'tarmac-tds-breadcrumbs--playground',              label: 'Playground' },
    { id: 'tarmac-tds-breadcrumbs--cell-playground',         label: 'Cell Playground' },
    { id: 'tarmac-tds-breadcrumbs--cell-default',            label: 'Cell Default' },
    { id: 'tarmac-tds-breadcrumbs--cell-hover',              label: 'Cell Hover' },
    { id: 'tarmac-tds-breadcrumbs--cell-disabled',           label: 'Cell Disabled' },
    { id: 'tarmac-tds-breadcrumbs--cell-pill',               label: 'Cell Pill' },
    { id: 'tarmac-tds-breadcrumbs--divider-chevron',         label: 'Divider Chevron' },
    { id: 'tarmac-tds-breadcrumbs--divider-slash',           label: 'Divider Slash' },
    { id: 'tarmac-tds-breadcrumbs--breadcrumbs-small',       label: 'Breadcrumbs Small' },
    { id: 'tarmac-tds-breadcrumbs--breadcrumbs-large',       label: 'Breadcrumbs Large' },
  ],

  /* ── Button ────────────────────────────────────────────────── */
  button: [
    { id: 'tarmac-tds-button--playground',           label: 'Playground' },
    { id: 'tarmac-tds-button--full-matrix',          label: 'Full Matrix' },
    { id: 'tarmac-tds-button--light-vs-dark',        label: 'Light Vs Dark' },
    { id: 'tarmac-tds-button--black',                label: 'Black' },
    { id: 'tarmac-tds-button--white',                label: 'White' },
    { id: 'tarmac-tds-button--coal',                 label: 'Coal' },
    { id: 'tarmac-tds-button--dlv-red',              label: 'DLV Red' },
    { id: 'tarmac-tds-button--info',                 label: 'Info' },
    { id: 'tarmac-tds-button--success',              label: 'Success' },
    { id: 'tarmac-tds-button--warning',              label: 'Warning' },
    { id: 'tarmac-tds-button--error',                label: 'Error' },
  ],

  /* ── Cards ─────────────────────────────────────────────────── */
  cards: [
    { id: 'tarmac-tds-card--card--card-playground',              label: 'Card Playground' },
    { id: 'tarmac-tds-card--card--card-full-matrix',             label: 'Card Full Matrix' },
    { id: 'tarmac-tds-card--card--light-vs-dark',                label: 'Light Vs Dark' },
    { id: 'tarmac-tds-card--card--variant-standard',             label: 'Variant Standard' },
    { id: 'tarmac-tds-card--card--variant-standard-type-2',      label: 'Variant Standard Type 2' },
    { id: 'tarmac-tds-card--card--variant-buttons-tacked',       label: 'Variant Buttons Tacked' },
    { id: 'tarmac-tds-card--card--variant-badge-bottom',         label: 'Variant Badge Bottom' },
    { id: 'tarmac-tds-card--card--info-card-playground',         label: 'Info Card Playground' },
    { id: 'tarmac-tds-card--card--info-card-full-matrix',        label: 'Info Card Full Matrix' },
    { id: 'tarmac-tds-card--card--selection-card-playground',    label: 'Selection Card Playground' },
    { id: 'tarmac-tds-card--card--selection-card-full-matrix',   label: 'Selection Card Full Matrix' },
    { id: 'tarmac-tds-card--card--checkbox-type',                label: 'Checkbox Type' },
  ],

  /* ── Checkbox ──────────────────────────────────────────────── */
  checkbox: [
    { id: 'tarmac-tds-checkbox--playground',         label: 'Playground' },
    { id: 'tarmac-tds-checkbox--full-matrix',        label: 'Full Matrix' },
    { id: 'tarmac-tds-checkbox--light-vs-dark',      label: 'Light Vs Dark' },
    { id: 'tarmac-tds-checkbox--standard',           label: 'Standard' },
    { id: 'tarmac-tds-checkbox--with-text',          label: 'With Text' },
    { id: 'tarmac-tds-checkbox--blue',               label: 'Blue' },
    { id: 'tarmac-tds-checkbox--dlv-red',            label: 'DLV Red' },
    { id: 'tarmac-tds-checkbox--green',              label: 'Green' },
  ],

  /* ── Tags (Chip) ───────────────────────────────────────────── */
  tags: [
    { id: 'tarmac-tds-chip--playground',             label: 'Playground' },
    { id: 'tarmac-tds-chip--full-matrix',            label: 'Full Matrix' },
    { id: 'tarmac-tds-chip--light-vs-dark',          label: 'Light Vs Dark' },
    { id: 'tarmac-tds-chip--black',                  label: 'Black' },
    { id: 'tarmac-tds-chip--blue',                   label: 'Blue' },
    { id: 'tarmac-tds-chip--dlv-red',                label: 'DLV Red' },
    { id: 'tarmac-tds-chip--success',                label: 'Success' },
    { id: 'tarmac-tds-chip--warning',                label: 'Warning' },
    { id: 'tarmac-tds-chip--error',                  label: 'Error' },
    { id: 'tarmac-tds-chip--status-dots',            label: 'Status Dots' },
  ],

  /* ── Coachmarks ────────────────────────────────────────────── */
  coachmarks: [
    { id: 'tarmac-tds-coachmarks--playground',           label: 'Playground' },
    { id: 'tarmac-tds-coachmarks--full-matrix',          label: 'Full Matrix' },
    { id: 'tarmac-tds-coachmarks--light-vs-dark',        label: 'Light Vs Dark' },
    { id: 'tarmac-tds-coachmarks--anchored-on-click',    label: 'Anchored On Click' },
    { id: 'tarmac-tds-coachmarks--anchored-on-hover',    label: 'Anchored On Hover' },
    { id: 'tarmac-tds-coachmarks--arrow-positions',      label: 'Arrow Positions' },
    { id: 'tarmac-tds-coachmarks--size-small',           label: 'Size Small' },
    { id: 'tarmac-tds-coachmarks--size-large',           label: 'Size Large' },
    { id: 'tarmac-tds-coachmarks--with-badges',          label: 'With Badges' },
    { id: 'tarmac-tds-coachmarks--with-ct-as',           label: 'With CTAs' },
    { id: 'tarmac-tds-coachmarks--with-image',           label: 'With Image' },
  ],

  /* ── Date Time Picker ──────────────────────────────────────── */
  'date-time-picker': [
    { id: 'tarmac-tds-datepicker--playground',                   label: 'Playground' },
    { id: 'tarmac-tds-datepicker--light-vs-dark',                label: 'Light Vs Dark' },
    { id: 'tarmac-tds-datepicker--all-sizes',                    label: 'All Sizes' },
    { id: 'tarmac-tds-datepicker--single-date-mode',             label: 'Single Date Mode' },
    { id: 'tarmac-tds-datepicker--range-selection',              label: 'Range Selection' },
    { id: 'tarmac-tds-datepicker--min-max-date',                 label: 'Min Max Date' },
    { id: 'tarmac-tds-datepicker--disabled-weekends',            label: 'Disabled Weekends' },
    { id: 'tarmac-tds-datepicker--display-format',               label: 'Display Format' },
    { id: 'tarmac-tds-datepicker--with-sidebar',                 label: 'With Sidebar' },
    { id: 'tarmac-tds-datepicker--bottom-sheet-playground',      label: 'Bottom Sheet Playground' },
  ],

  /* ── Dialog Box ────────────────────────────────────────────── */
  'dialog-box': [
    { id: 'tarmac-tds-dialog-box--playground',                   label: 'Playground' },
    { id: 'tarmac-tds-dialog-box--full-matrix',                  label: 'Full Matrix' },
    { id: 'tarmac-tds-dialog-box--light-vs-dark-mode',           label: 'Light Vs Dark Mode' },
    { id: 'tarmac-tds-dialog-box--standard',                     label: 'Standard' },
    { id: 'tarmac-tds-dialog-box--boolean-properties',           label: 'Boolean Properties' },
    { id: 'tarmac-tds-dialog-box--slots',                        label: 'Slots' },
    { id: 'tarmac-tds-dialog-box--type-1-inline-footer',         label: 'Type 1 Inline Footer' },
    { id: 'tarmac-tds-dialog-box--type-2-stacked-footer',        label: 'Type 2 Stacked Footer' },
    { id: 'tarmac-tds-dialog-box--interactive-demo',             label: 'Interactive Demo' },
  ],

  /* ── Dropdown ──────────────────────────────────────────────── */
  dropdown: [
    { id: 'tarmac-tds-dropdown--list--list-playground',          label: 'List Playground' },
    { id: 'tarmac-tds-dropdown--list--list-size-comparison',     label: 'List Size Comparison' },
    { id: 'tarmac-tds-dropdown--list--list-variants',            label: 'List Variants' },
    { id: 'tarmac-tds-dropdown--list--full-matrix',              label: 'Full Matrix' },
    { id: 'tarmac-tds-dropdown--list--light-vs-dark',            label: 'Light Vs Dark' },
    { id: 'tarmac-tds-dropdown--list--playground',               label: 'Playground' },
    { id: 'tarmac-tds-dropdown--list--default-type',             label: 'Default Type' },
    { id: 'tarmac-tds-dropdown--list--multi-select',             label: 'Multi Select' },
    { id: 'tarmac-tds-dropdown--list--searchable',               label: 'Searchable' },
    { id: 'tarmac-tds-dropdown--list--grouped-options',          label: 'Grouped Options' },
    { id: 'tarmac-tds-dropdown--list--footer-ct-as',             label: 'Footer CTAs' },
  ],

  /* ── File Upload ───────────────────────────────────────────── */
  'file-upload': [
    { id: 'atoms-upload--playground',                label: 'Playground' },
    { id: 'atoms-upload--default',                   label: 'Default' },
    { id: 'atoms-upload--drag-and-drop',             label: 'Drag And Drop' },
    { id: 'atoms-upload--multiple-files',            label: 'Multiple Files' },
    { id: 'atoms-upload--with-image-preview',        label: 'With Image Preview' },
    { id: 'atoms-upload--picture-card',              label: 'Picture Card' },
    { id: 'atoms-upload--small',                     label: 'Small' },
    { id: 'atoms-upload--large',                     label: 'Large' },
    { id: 'atoms-upload--horizontal-layout',         label: 'Horizontal Layout' },
    { id: 'atoms-upload--disabled',                  label: 'Disabled' },
    { id: 'atoms-upload--v-2-default',               label: 'V2 Default' },
    { id: 'atoms-upload--v-2-all-states',            label: 'V2 All States' },
  ],

  /* ── Filter ────────────────────────────────────────────────── */
  filter: [
    { id: 'tarmac-tds-filterdropdown--playground',               label: 'Playground' },
    { id: 'tarmac-tds-filterdropdown--all-states',               label: 'All States' },
    { id: 'tarmac-tds-filterdropdown--expanded',                 label: 'Expanded' },
    { id: 'tarmac-tds-filterdropdown--collapsed',                label: 'Collapsed' },
    { id: 'tarmac-tds-filterdropdown--active',                   label: 'Active' },
    { id: 'tarmac-tds-filterdropdown--filtered',                 label: 'Filtered' },
    { id: 'tarmac-tds-filterdropdown--disabled',                 label: 'Disabled' },
    { id: 'tarmac-tds-filterdropdown--searchable',               label: 'Searchable' },
    { id: 'tarmac-tds-filterdropdown--interactive-demo',         label: 'Interactive Demo' },
  ],

  /* ── Footer ────────────────────────────────────────────────── */
  footer: [
    { id: 'tarmac-tds-popupheaderfooter--footer-playground',     label: 'Footer Playground' },
    { id: 'tarmac-tds-popupheaderfooter--footer-variants',       label: 'Footer Variants' },
  ],

  /* ── Header ────────────────────────────────────────────────── */
  header: [
    { id: 'tarmac-tds-popupheaderfooter--header-playground',     label: 'Header Playground' },
    { id: 'tarmac-tds-popupheaderfooter--header-variants',       label: 'Header Variants' },
  ],

  /* ── Input ─────────────────────────────────────────────────── */
  input: [
    { id: 'tarmac-tds-input-field--playground',          label: 'Playground' },
    { id: 'tarmac-tds-input-field--full-matrix',         label: 'Full Matrix' },
    { id: 'tarmac-tds-input-field--light-vs-dark',       label: 'Light Vs Dark' },
    { id: 'tarmac-tds-input-field--regular',             label: 'Regular' },
    { id: 'tarmac-tds-input-field--success',             label: 'Success' },
    { id: 'tarmac-tds-input-field--error',               label: 'Error' },
    { id: 'tarmac-tds-input-field--disabled-state',      label: 'Disabled State' },
    { id: 'tarmac-tds-input-field--ghost-state',         label: 'Ghost State' },
    { id: 'tarmac-tds-input-field--addon-left',          label: 'Addon Left' },
    { id: 'tarmac-tds-input-field--addon-right',         label: 'Addon Right' },
    { id: 'tarmac-tds-input-field--badge-and-status',    label: 'Badge And Status' },
  ],

  /* ── Input Area (Text Area) ────────────────────────────────── */
  'input-area': [
    { id: 'tarmac-tds-text-area--playground',            label: 'Playground' },
    { id: 'tarmac-tds-text-area--full-matrix',           label: 'Full Matrix' },
    { id: 'tarmac-tds-text-area--light-vs-dark',         label: 'Light Vs Dark' },
    { id: 'tarmac-tds-text-area--regular',               label: 'Regular' },
    { id: 'tarmac-tds-text-area--success',               label: 'Success' },
    { id: 'tarmac-tds-text-area--error',                 label: 'Error' },
    { id: 'tarmac-tds-text-area--disabled-state',        label: 'Disabled State' },
    { id: 'tarmac-tds-text-area--ghost-state',           label: 'Ghost State' },
    { id: 'tarmac-tds-text-area--tags-sub-component',    label: 'Tags Sub Component' },
    { id: 'tarmac-tds-text-area--with-tags-style',       label: 'With Tags Style' },
  ],

  /* ── Links ─────────────────────────────────────────────────── */
  links: [
    { id: 'tarmac-tds-link--playground',             label: 'Playground' },
    { id: 'tarmac-tds-link--full-matrix',            label: 'Full Matrix' },
    { id: 'tarmac-tds-link--light-vs-dark-mode',     label: 'Light Vs Dark Mode' },
    { id: 'tarmac-tds-link--black',                  label: 'Black' },
    { id: 'tarmac-tds-link--white',                  label: 'White' },
    { id: 'tarmac-tds-link--blue',                   label: 'Blue' },
    { id: 'tarmac-tds-link--disabled',               label: 'Disabled' },
    { id: 'tarmac-tds-link--with-icons',             label: 'With Icons' },
  ],

  /* ── List (Table) ──────────────────────────────────────────── */
  list: [
    { id: 'tarmac-tds-table--playground',                        label: 'Playground' },
    { id: 'tarmac-tds-table--full-table-with-header-footer',     label: 'Full Table With Header Footer' },
    { id: 'tarmac-tds-table--light-vs-dark',                     label: 'Light Vs Dark' },
    { id: 'tarmac-tds-table--size-comparison',                   label: 'Size Comparison' },
    { id: 'tarmac-tds-table--text-rows',                         label: 'Text Rows' },
    { id: 'tarmac-tds-table--checkbox-rows',                     label: 'Checkbox Rows' },
    { id: 'tarmac-tds-table--row-selection',                     label: 'Row Selection' },
    { id: 'tarmac-tds-table--sorting',                           label: 'Sorting' },
    { id: 'tarmac-tds-table--loading-and-empty',                 label: 'Loading And Empty' },
    { id: 'tarmac-tds-table--table-d-1-standard',                label: 'Table D1 Standard' },
    { id: 'tarmac-tds-table--table-d-1-modern',                  label: 'Table D1 Modern' },
    { id: 'tarmac-tds-table--card-variant',                      label: 'Card Variant' },
  ],

  /* ── Navigation (Sidebar) ──────────────────────────────────── */
  navigation: [
    { id: 'atoms-sidebar--default',                  label: 'Default' },
    { id: 'atoms-sidebar--dark-variant',             label: 'Dark Variant' },
    { id: 'atoms-sidebar--expandable',               label: 'Expandable' },
    { id: 'atoms-sidebar--with-custom-icons',        label: 'With Custom Icons' },
    { id: 'atoms-sidebar--with-bg-image',            label: 'With Bg Image' },
    { id: 'atoms-sidebar--hidden-sidebar',           label: 'Hidden Sidebar' },
  ],

  /* ── OTP Fields ────────────────────────────────────────────── */
  'otp-fields': [
    { id: 'tarmac-tds-otp-fields--playground',               label: 'Playground' },
    { id: 'tarmac-tds-otp-fields--full-matrix',              label: 'Full Matrix' },
    { id: 'tarmac-tds-otp-fields--light-vs-dark-mode',       label: 'Light Vs Dark Mode' },
    { id: 'tarmac-tds-otp-fields--default',                  label: 'Default' },
    { id: 'tarmac-tds-otp-fields--four-vs-six-number',       label: 'Four Vs Six Number' },
    { id: 'tarmac-tds-otp-fields--success',                  label: 'Success' },
    { id: 'tarmac-tds-otp-fields--error',                    label: 'Error' },
    { id: 'tarmac-tds-otp-fields--disabled',                 label: 'Disabled' },
    { id: 'tarmac-tds-otp-fields--ghost',                    label: 'Ghost' },
  ],

  /* ── Pagination ────────────────────────────────────────────── */
  pagination: [
    { id: 'tarmac-tds-pagination--playground',               label: 'Playground' },
    { id: 'tarmac-tds-pagination--full-matrix',              label: 'Full Matrix' },
    { id: 'tarmac-tds-pagination--light-vs-dark',            label: 'Light Vs Dark' },
    { id: 'tarmac-tds-pagination--sizes',                    label: 'Sizes' },
    { id: 'tarmac-tds-pagination--boolean-toggles',          label: 'Boolean Toggles' },
    { id: 'tarmac-tds-pagination--disabled-state',           label: 'Disabled State' },
    { id: 'tarmac-tds-pagination--number-cell-states',       label: 'Number Cell States' },
    { id: 'tarmac-tds-pagination--number-cell-styles',       label: 'Number Cell Styles' },
    { id: 'tarmac-tds-pagination--text-cell-states',         label: 'Text Cell States' },
  ],

  /* ── Pills ─────────────────────────────────────────────────── */
  pills: [
    { id: 'tarmac-tds-pill--playground',             label: 'Playground' },
    { id: 'tarmac-tds-pill--full-matrix',            label: 'Full Matrix' },
    { id: 'tarmac-tds-pill--light-vs-dark',          label: 'Light Vs Dark' },
    { id: 'tarmac-tds-pill--black',                  label: 'Black' },
    { id: 'tarmac-tds-pill--white',                  label: 'White' },
    { id: 'tarmac-tds-pill--blue',                   label: 'Blue' },
    { id: 'tarmac-tds-pill--success',                label: 'Success' },
    { id: 'tarmac-tds-pill--warning',                label: 'Warning' },
    { id: 'tarmac-tds-pill--error',                  label: 'Error' },
  ],

  /* ── Popups ────────────────────────────────────────────────── */
  popups: [
    { id: 'tarmac-tds-popup--playground',            label: 'Playground' },
    { id: 'tarmac-tds-popup--light-vs-dark',         label: 'Light Vs Dark' },
    { id: 'tarmac-tds-popup--all-sizes',             label: 'All Sizes' },
    { id: 'tarmac-tds-popup--x-small',               label: 'X Small' },
    { id: 'tarmac-tds-popup--small',                 label: 'Small' },
    { id: 'tarmac-tds-popup--medium',                label: 'Medium' },
    { id: 'tarmac-tds-popup--large',                 label: 'Large' },
    { id: 'tarmac-tds-popup--full-popup',            label: 'Full Popup' },
    { id: 'tarmac-tds-popup--with-tabs',             label: 'With Tabs' },
    { id: 'tarmac-tds-popup--without-footer',        label: 'Without Footer' },
  ],

  /* ── Progress Bar ──────────────────────────────────────────── */
  'progress-bar': [
    { id: 'tarmac-tds-progressbar--playground-with-text',    label: 'Playground With Text' },
    { id: 'tarmac-tds-progressbar--playground',              label: 'Playground' },
    { id: 'tarmac-tds-progressbar--full-matrix',             label: 'Full Matrix' },
    { id: 'tarmac-tds-progressbar--light-vs-dark',           label: 'Light Vs Dark' },
    { id: 'tarmac-tds-progressbar--with-text',               label: 'With Text' },
  ],

  /* ── Radio ─────────────────────────────────────────────────── */
  radio: [
    { id: 'tarmac-tds-radio--playground',            label: 'Playground' },
    { id: 'tarmac-tds-radio--full-matrix',           label: 'Full Matrix' },
    { id: 'tarmac-tds-radio--light-vs-dark',         label: 'Light Vs Dark' },
    { id: 'tarmac-tds-radio--standard',              label: 'Standard' },
    { id: 'tarmac-tds-radio--with-subtext',          label: 'With Subtext' },
    { id: 'tarmac-tds-radio--sizes',                 label: 'Sizes' },
    { id: 'tarmac-tds-radio--filled-vs-outlined',    label: 'Filled Vs Outlined' },
    { id: 'tarmac-tds-radio--blue',                  label: 'Blue' },
    { id: 'tarmac-tds-radio--dlv-red',               label: 'DLV Red' },
    { id: 'tarmac-tds-radio--disabled',              label: 'Disabled' },
    { id: 'tarmac-tds-radio--radio-group',           label: 'Radio Group' },
  ],

  /* ── Rating ────────────────────────────────────────────────── */
  rating: [
    { id: 'tarmac-tds-rating--playground',           label: 'Playground' },
    { id: 'tarmac-tds-rating--full-matrix',          label: 'Full Matrix' },
    { id: 'tarmac-tds-rating--light-vs-dark-mode',   label: 'Light Vs Dark Mode' },
    { id: 'tarmac-tds-rating--small',                label: 'Small' },
    { id: 'tarmac-tds-rating--medium',               label: 'Medium' },
    { id: 'tarmac-tds-rating--large',                label: 'Large' },
    { id: 'tarmac-tds-rating--half-stars',           label: 'Half Stars' },
    { id: 'tarmac-tds-rating--interactive',          label: 'Interactive' },
  ],

  /* ── Scroll ────────────────────────────────────────────────── */
  scroll: [
    { id: 'tarmac-tds-scrollbar--playground',        label: 'Playground' },
    { id: 'tarmac-tds-scrollbar--full-matrix',       label: 'Full Matrix' },
    { id: 'tarmac-tds-scrollbar--black',             label: 'Black' },
    { id: 'tarmac-tds-scrollbar--coal',              label: 'Coal' },
    { id: 'tarmac-tds-scrollbar--grey',              label: 'Grey' },
    { id: 'tarmac-tds-scrollbar--horizontal',        label: 'Horizontal' },
    { id: 'tarmac-tds-scrollbar--app-level-wrapper', label: 'App Level Wrapper' },
  ],

  /* ── Search ────────────────────────────────────────────────── */
  search: [
    { id: 'tarmac-tds-search-dropdown--playground',              label: 'Playground' },
    { id: 'tarmac-tds-search-dropdown--full-matrix',             label: 'Full Matrix' },
    { id: 'tarmac-tds-search-dropdown--light-vs-dark',           label: 'Light Vs Dark' },
    { id: 'tarmac-tds-search-dropdown--search-field-states',     label: 'Search Field States' },
    { id: 'tarmac-tds-search-dropdown--search-field-with-tags',  label: 'Search Field With Tags' },
    { id: 'tarmac-tds-search-dropdown--search-cells',            label: 'Search Cells' },
    { id: 'tarmac-tds-search-dropdown--search-list-variants',    label: 'Search List Variants' },
    { id: 'tarmac-tds-search-dropdown--disabled-state',          label: 'Disabled State' },
    { id: 'tarmac-tds-search-dropdown--ghost-state',             label: 'Ghost State' },
  ],

  /* ── Spinner ───────────────────────────────────────────────── */
  spinner: [
    { id: 'tarmac-tds-spinner--playground',          label: 'Playground' },
    { id: 'tarmac-tds-spinner--full-matrix',         label: 'Full Matrix' },
    { id: 'tarmac-tds-spinner--light-vs-dark',       label: 'Light Vs Dark' },
    { id: 'tarmac-tds-spinner--variant-01',          label: 'Variant 01' },
    { id: 'tarmac-tds-spinner--variant-02',          label: 'Variant 02' },
    { id: 'tarmac-tds-spinner--variant-03',          label: 'Variant 03' },
    { id: 'tarmac-tds-spinner--variant-04',          label: 'Variant 04' },
  ],

  /* ── Shimmer (shares spinner prefix) ───────────────────────── */
  shimmer: [
    { id: 'tarmac-tds-spinner--playground',          label: 'Playground' },
    { id: 'tarmac-tds-spinner--full-matrix',         label: 'Full Matrix' },
    { id: 'tarmac-tds-spinner--light-vs-dark',       label: 'Light Vs Dark' },
    { id: 'tarmac-tds-spinner--variant-01',          label: 'Variant 01' },
    { id: 'tarmac-tds-spinner--variant-02',          label: 'Variant 02' },
    { id: 'tarmac-tds-spinner--variant-03',          label: 'Variant 03' },
    { id: 'tarmac-tds-spinner--variant-04',          label: 'Variant 04' },
  ],

  /* ── Status Indicator ──────────────────────────────────────── */
  'status-indicator': [
    { id: 'tarmac-tds-statusindicator--playground',          label: 'Playground' },
    { id: 'tarmac-tds-statusindicator--full-matrix',         label: 'Full Matrix' },
    { id: 'tarmac-tds-statusindicator--light-vs-dark',       label: 'Light Vs Dark' },
    { id: 'tarmac-tds-statusindicator--size-small',          label: 'Size Small' },
    { id: 'tarmac-tds-statusindicator--size-medium',         label: 'Size Medium' },
    { id: 'tarmac-tds-statusindicator--success',             label: 'Success' },
    { id: 'tarmac-tds-statusindicator--pending',             label: 'Pending' },
    { id: 'tarmac-tds-statusindicator--warning',             label: 'Warning' },
    { id: 'tarmac-tds-statusindicator--failed',              label: 'Failed' },
    { id: 'tarmac-tds-statusindicator--custom-icons',        label: 'Custom Icons' },
    { id: 'tarmac-tds-statusindicator--without-label',       label: 'Without Label' },
  ],

  /* ── Side Drawer ───────────────────────────────────────────── */
  'side-drawer': [
    { id: 'tarmac-tds-side-drawer--playground',              label: 'Playground' },
    { id: 'tarmac-tds-side-drawer--full-matrix',             label: 'Full Matrix' },
    { id: 'tarmac-tds-side-drawer--light-vs-dark-mode',      label: 'Light Vs Dark Mode' },
    { id: 'tarmac-tds-side-drawer--boolean-toggles',         label: 'Boolean Toggles' },
    { id: 'tarmac-tds-side-drawer--narrow-variant',          label: 'Narrow Variant' },
    { id: 'tarmac-tds-side-drawer--extended-variant',        label: 'Extended Variant' },
    { id: 'tarmac-tds-side-drawer--header-playground',       label: 'Header Playground' },
    { id: 'tarmac-tds-side-drawer--footer-playground',       label: 'Footer Playground' },
    { id: 'tarmac-tds-side-drawer--header-footer-sizes',     label: 'Header Footer Sizes' },
    { id: 'tarmac-tds-side-drawer--portal-overlay',          label: 'Portal Overlay' },
  ],

  /* ── Slider ────────────────────────────────────────────────── */
  slider: [
    { id: 'tarmac-tds-slider--playground',           label: 'Playground' },
    { id: 'tarmac-tds-slider--full-matrix',          label: 'Full Matrix' },
    { id: 'tarmac-tds-slider--light-vs-dark-mode',   label: 'Light Vs Dark Mode' },
    { id: 'tarmac-tds-slider--single-slider',        label: 'Single Slider' },
    { id: 'tarmac-tds-slider--dual-slider',          label: 'Dual Slider' },
    { id: 'tarmac-tds-slider--black',                label: 'Black' },
    { id: 'tarmac-tds-slider--coal',                 label: 'Coal' },
    { id: 'tarmac-tds-slider--dlv-red',              label: 'DLV Red' },
    { id: 'tarmac-tds-slider--disabled',             label: 'Disabled' },
  ],

  /* ── Snackbar ──────────────────────────────────────────────── */
  snackbar: [
    { id: 'tarmac-tds-snackbar--playground',                 label: 'Playground' },
    { id: 'tarmac-tds-snackbar--full-matrix',                label: 'Full Matrix' },
    { id: 'tarmac-tds-snackbar--light-vs-dark',              label: 'Light Vs Dark' },
    { id: 'tarmac-tds-snackbar--filled',                     label: 'Filled' },
    { id: 'tarmac-tds-snackbar--outlined',                   label: 'Outlined' },
    { id: 'tarmac-tds-snackbar--subtle',                     label: 'Subtle' },
    { id: 'tarmac-tds-snackbar--positive',                   label: 'Positive' },
    { id: 'tarmac-tds-snackbar--negative',                   label: 'Negative' },
    { id: 'tarmac-tds-snackbar--warning',                    label: 'Warning' },
    { id: 'tarmac-tds-snackbar--sizes',                      label: 'Sizes' },
    { id: 'tarmac-tds-snackbar--with-ct-as',                 label: 'With CTAs' },
  ],

  /* ── Stepper ───────────────────────────────────────────────── */
  stepper: [
    { id: 'atoms-steps--default',                    label: 'Default' },
    { id: 'atoms-steps--vertical',                   label: 'Vertical' },
    { id: 'atoms-steps--sizes',                      label: 'Sizes' },
    { id: 'atoms-steps--vertical-sizes',             label: 'Vertical Sizes' },
    { id: 'atoms-steps--with-error',                 label: 'With Error' },
    { id: 'atoms-steps--with-status',                label: 'With Status' },
    { id: 'atoms-steps--all-completed',              label: 'All Completed' },
    { id: 'atoms-steps--clickable',                  label: 'Clickable' },
    { id: 'atoms-steps--interactive',                label: 'Interactive' },
    { id: 'atoms-steps--dotted-connector',           label: 'Dotted Connector' },
  ],

  /* ── Tabs ──────────────────────────────────────────────────── */
  tabs: [
    { id: 'tarmac-tds-tabs-tabgroup--playground',                label: 'Playground' },
    { id: 'tarmac-tds-tabs-tabgroup--full-matrix',               label: 'Full Matrix' },
    { id: 'tarmac-tds-tabs-tabgroup--horizontal-all-variants',   label: 'Horizontal All Variants' },
    { id: 'tarmac-tds-tabs-tabgroup--horizontal-tab-counts',     label: 'Horizontal Tab Counts' },
    { id: 'tarmac-tds-tabs-tabgroup--vertical-all-variants',     label: 'Vertical All Variants' },
    { id: 'tarmac-tds-tabs-tabgroup--vertical-tab-counts',       label: 'Vertical Tab Counts' },
    { id: 'tarmac-tds-tabs-tabgroup--with-divider',              label: 'With Divider' },
  ],

  /* ── Toggle ────────────────────────────────────────────────── */
  toggle: [
    { id: 'tarmac-tds-toggle--playground',           label: 'Playground' },
    { id: 'tarmac-tds-toggle--full-matrix',          label: 'Full Matrix' },
    { id: 'tarmac-tds-toggle--light-vs-dark',        label: 'Light Vs Dark' },
    { id: 'tarmac-tds-toggle--black',                label: 'Black' },
    { id: 'tarmac-tds-toggle--blue',                 label: 'Blue' },
    { id: 'tarmac-tds-toggle--dlv-red',              label: 'DLV Red' },
    { id: 'tarmac-tds-toggle--green',                label: 'Green' },
  ],

  /* ── Tooltip ───────────────────────────────────────────────── */
  tooltip: [
    { id: 'tarmac-tds-tooltip--playground',          label: 'Playground' },
    { id: 'tarmac-tds-tooltip--full-matrix',         label: 'Full Matrix' },
    { id: 'tarmac-tds-tooltip--arrow-positions',     label: 'Arrow Positions' },
    { id: 'tarmac-tds-tooltip--black',               label: 'Black' },
    { id: 'tarmac-tds-tooltip--white',               label: 'White' },
    { id: 'tarmac-tds-tooltip--coal',                label: 'Coal' },
    { id: 'tarmac-tds-tooltip--ct-as-playground',    label: 'CTAs Playground' },
  ],
};
