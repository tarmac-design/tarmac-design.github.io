'use client';

import { PageShell } from '@/components/PageShell';

const storybookIds: Record<string, string> = {
  avatar: 'tarmac-tds-avatar--playground',
  button: 'tarmac-tds-button--playground',
  checkbox: 'tarmac-tds-checkbox--playground',
  radio: 'tarmac-tds-radio--playground',
  input: 'tarmac-tds-input--playground',
  'input-area': 'tarmac-tds-textarea--playground',
  dropdown: 'tarmac-tds-dropdown--playground',
  search: 'tarmac-tds-search--playground',
  shimmer: 'tarmac-tds-shimmer--playground',
  scroll: 'tarmac-tds-scroll--playground',
  header: 'tarmac-tds-header--playground',
  footer: 'tarmac-tds-footer--playground',
  rating: 'tarmac-tds-rating--playground',
  'file-upload': 'tarmac-tds-fileupload--playground',
  'date-time-picker': 'tarmac-tds-datetimepicker--playground',
  filter: 'tarmac-tds-filter--playground',
  'dialog-box': 'tarmac-tds-dialog--playground',
  list: 'tarmac-tds-list--playground',
  popups: 'tarmac-tds-popup--playground',
  'side-drawer': 'tarmac-tds-sidedrawer--playground',
  'bottom-sheet': 'tarmac-tds-bottomsheet--playground',
  navigation: 'tarmac-tds-navigation--playground',
  cards: 'tarmac-tds-card--playground',
  badge: 'tarmac-tds-badge--playground',
  tags: 'tarmac-tds-tag--playground',
  pills: 'tarmac-tds-pill--playground',
  alert: 'tarmac-tds-alert--playground',
  'progress-bar': 'tarmac-tds-progressbar--playground',
  snackbar: 'tarmac-tds-snackbar--playground',
  accordion: 'tarmac-tds-accordion--playground',
  coachmarks: 'tarmac-tds-coachmark--playground',
  tabs: 'tarmac-tds-tabs--playground',
  breadcrumbs: 'tarmac-tds-breadcrumbs--playground',
  toggle: 'tarmac-tds-toggle--playground',
  'status-indicator': 'tarmac-tds-statusindicator--playground',
  links: 'tarmac-tds-link--playground',
  slider: 'tarmac-tds-slider--playground',
  stepper: 'tarmac-tds-stepper--playground',
  spinner: 'tarmac-tds-spinner--playground',
  pagination: 'tarmac-tds-pagination--playground',
  tooltip: 'tarmac-tds-tooltip--playground',
  'audio-player': 'tarmac-tds-audioplayer--playground',
  'otp-fields': 'tarmac-tds-otpfield--playground',
};

const STORYBOOK_BASE = 'https://tarmac-storybook-dev.pntrzz.com/storybook';

interface ComponentPageProps {
  name: string;
  description: string;
  slug?: string;
  children?: React.ReactNode;
}

export function ComponentPage({ name, description, slug, children }: ComponentPageProps) {
  const storyId = slug ? storybookIds[slug] : null;
  const embedUrl = storyId
    ? `${STORYBOOK_BASE}/?path=/story/${storyId}`
    : STORYBOOK_BASE;

  return (
    <PageShell title={name} description={description}>
      <h2>Live Demo</h2>
      <div
        className="rounded-2xl overflow-hidden border mb-8"
        style={{ borderColor: 'var(--color-outline)' }}
      >
        <iframe
          src={embedUrl}
          style={{ width: '100%', height: '480px', border: 'none' }}
          title={`${name} — TARMAC Storybook`}
          allow="clipboard-write"
        />
        <div
          className="flex items-center justify-between px-4 py-2.5 border-t"
          style={{
            background: 'var(--color-surface-container-low)',
            borderColor: 'var(--color-outline)',
          }}
        >
          <span className="text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
            Interactive preview — {name}
          </span>
          <a
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium hover:underline"
            style={{ color: 'var(--color-secondary)' }}
          >
            Open in Storybook ↗
          </a>
        </div>
      </div>
      {children}
    </PageShell>
  );
}
