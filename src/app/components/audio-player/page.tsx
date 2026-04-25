'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="audio-player" />
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 2 — Code                                   */
/* ─────────────────────────────────────────────── */
function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>

      <h2>Import</h2>
      <pre><code>{`import { AudioPlayer } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface AudioPlayerProps {
  src: string;
  variant?: 'default' | 'compact' | 'playlist' | 'waveform';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  artist?: string;
  playlist?: Array<{ src: string; title: string; duration: string }>;
  autoPlay?: boolean;
  loop?: boolean;
  showVolume?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Default player
<AudioPlayer src="/audio/notification.mp3" title="Notification" />

// Compact inline player
<AudioPlayer src="/audio/alert.mp3" variant="compact" size="sm" />

// With playlist
<AudioPlayer
  variant="playlist"
  playlist={[
    { src: '/audio/track1.mp3', title: 'Track 1', duration: '3:30' },
    { src: '/audio/track2.mp3', title: 'Track 2', duration: '2:45' },
  ]}
/>

// Waveform visualization
<AudioPlayer src="/audio/voice.mp3" variant="waveform" />

// Size variants
<AudioPlayer src="/audio/clip.mp3" size="sm" />
<AudioPlayer src="/audio/clip.mp3" size="md" />
<AudioPlayer src="/audio/clip.mp3" size="lg" />`}</code></pre>

      <h2>Design Tokens</h2>
      <h3>Sizing</h3>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>audio-player-height-sm</td><td>32px</td></tr>
          <tr><td>audio-player-height-md</td><td>48px</td></tr>
          <tr><td>audio-player-height-lg</td><td>64px</td></tr>
          <tr><td>audio-player-border-radius</td><td>12px</td></tr>
          <tr><td>audio-player-track-height</td><td>4px</td></tr>
          <tr><td>audio-player-thumb-size</td><td>12px</td></tr>
        </tbody>
      </table>

      <h3>Colors</h3>
      <table>
        <thead><tr><th>Token</th><th>Light</th><th>Dark</th></tr></thead>
        <tbody>
          <tr><td>audio-player-bg</td><td>#FFFFFF</td><td>#2A2A2A</td></tr>
          <tr><td>audio-player-accent</td><td>#2396FB</td><td>#60A5FA</td></tr>
          <tr><td>audio-player-track</td><td>#DDD</td><td>#444</td></tr>
          <tr><td>audio-player-text</td><td>#1A1A1A</td><td>#E0E0E0</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all audio player variants and props interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-audioplayer--playground" target="_blank" rel="noopener noreferrer">
          TARMAC Storybook →
        </a>
      </p>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 3 — Usage                                  */
/* ─────────────────────────────────────────────── */
function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Container</td><td>Rounded card wrapper with background and border</td></tr>
          <tr><td>2</td><td>Track Info</td><td>Title and artist/source metadata</td></tr>
          <tr><td>3</td><td>Progress Bar</td><td>Seekable track showing playback position</td></tr>
          <tr><td>4</td><td>Time Display</td><td>Current time and total duration labels</td></tr>
          <tr><td>5</td><td>Play/Pause Button</td><td>Primary playback toggle control</td></tr>
          <tr><td>6</td><td>Skip Controls</td><td>Previous/Next track navigation buttons</td></tr>
          <tr><td>7</td><td>Volume Control</td><td>Volume slider with mute toggle</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>To play audio clips, podcasts, or voice messages inline</li>
        <li>For music or sound effect previews in content pages</li>
        <li>In messaging apps for voice note playback</li>
        <li>For accessibility — providing audio alternatives to text content</li>
        <li>In media galleries alongside video and image content</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="audio-player"
        doItems={[
          'Show track title and duration for context',
          'Provide visible progress indication during playback',
          'Include volume controls for user comfort',
          'Use compact variant for inline or list contexts',
          'Pause other players when a new one starts',
        ]}
        dontItems={[
          'Don\'t autoplay audio without user consent',
          'Don\'t hide playback controls during playback',
          'Don\'t use the full player variant in tight spaces',
          'Don\'t omit time display — users need progress context',
          'Don\'t play multiple audio sources simultaneously',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>region</td><td>Identifies the player as a distinct region</td></tr>
          <tr><td>aria-label</td><td>&quot;Audio player&quot;</td><td>Descriptive label for the player region</td></tr>
          <tr><td>aria-valuenow</td><td>number</td><td>Current playback position on progress bar</td></tr>
          <tr><td>aria-valuemin/max</td><td>0 / duration</td><td>Range bounds for the progress slider</td></tr>
          <tr><td>Keyboard</td><td>Space, ←/→</td><td>Play/pause and seek controls</td></tr>
          <tr><td>Focus</td><td>Visible ring</td><td>All interactive elements show focus indicator</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Progress Bar</strong> — Standalone progress indicator used within the player</li>
        <li><strong>Slider</strong> — Volume and seek controls use slider internally</li>
        <li><strong>Button</strong> — Play/pause and skip controls</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 4 — Changelog                              */
/* ─────────────────────────────────────────────── */
function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v1.2.0</h3>
      <ul>
        <li>Added <code>waveform</code> variant with animated visualization</li>
        <li>Added <code>playlist</code> variant with track list management</li>
        <li>Added <code>compact</code> variant for inline usage</li>
        <li>Improved keyboard navigation for seek and volume controls</li>
      </ul>
      <h3>v1.1.0</h3>
      <ul>
        <li>Added volume control with mute toggle</li>
        <li>Added buffering state indicator</li>
        <li>Added <code>onTimeUpdate</code> callback</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with play/pause, progress bar, and time display</li>
        <li>Three size options: SM (32px), MD (48px), LG (64px)</li>
        <li>Light and dark theme support</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function AudioPlayerPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="Audio Player"
      description="Audio players provide playback controls for audio content with progress tracking, volume control, and multiple layout variants."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
