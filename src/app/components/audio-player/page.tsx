'use client';

import { useState, useEffect, useRef } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Size / State maps ── */
const sizeMap: Record<string, number> = { sm: 32, md: 48, lg: 64 };
type PlayerState = 'idle' | 'playing' | 'paused' | 'buffering';
type PlayerVariant = 'default' | 'compact' | 'playlist' | 'waveform';

const selectStyle: React.CSSProperties = {
  padding: '4px 8px', borderRadius: 6, fontSize: 12, border: '1px solid var(--color-outline)',
  background: 'var(--color-surface)', color: 'var(--color-on-surface)', cursor: 'pointer',
};

/* ── Waveform bars ── */
function WaveformBars({ playing, theme, height }: { playing: boolean; theme: string; height: number }) {
  const barCount = 24;
  const barH = height * 0.5;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: barH }}>
      {Array.from({ length: barCount }).map((_, i) => {
        const h = Math.random() * barH * 0.8 + barH * 0.2;
        return (
          <div
            key={i}
            style={{
              width: 3,
              height: playing ? h : barH * 0.15,
              borderRadius: 1,
              background: i < barCount * 0.4
                ? (theme === 'dark' ? '#60A5FA' : '#2396FB')
                : (theme === 'dark' ? '#444' : '#CCC'),
              transition: 'height 0.3s ease',
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Audio Player Demo ── */
function AudioPlayerDemo({
  size = 'md',
  theme,
  variant = 'default',
  initialState = 'idle',
}: {
  size?: string;
  theme: 'light' | 'dark';
  variant?: PlayerVariant;
  initialState?: PlayerState;
}) {
  const h = sizeMap[size] || 48;
  const [state, setState] = useState<PlayerState>(initialState);
  const [progress, setProgress] = useState(35);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state === 'playing') {
      intervalRef.current = setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 0.5));
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [state]);

  const togglePlay = () => {
    setState(s => s === 'playing' ? 'paused' : 'playing');
  };

  const bg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const fg = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const muted = theme === 'dark' ? '#666' : '#999';
  const accent = theme === 'dark' ? '#60A5FA' : '#2396FB';
  const trackBg = theme === 'dark' ? '#444' : '#DDD';
  const fontSize = h <= 32 ? 10 : h <= 48 ? 12 : 14;
  const iconSize = h <= 32 ? 14 : h <= 48 ? 20 : 26;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentTime = formatTime((progress / 100) * 210);
  const totalTime = '3:30';

  const playIcon = state === 'playing' ? (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={fg}>
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  ) : (
    <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill={fg}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );

  if (variant === 'compact') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: bg, borderRadius: 8, padding: '4px 12px', height: h, border: `1px solid ${theme === 'dark' ? '#333' : '#E0E0E0'}` }}>
        <button onClick={togglePlay} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}>{playIcon}</button>
        <div style={{ flex: 1, height: 3, background: trackBg, borderRadius: 2, position: 'relative', minWidth: 80 }}>
          <div style={{ width: `${progress}%`, height: '100%', background: accent, borderRadius: 2, transition: 'width 0.1s linear' }} />
        </div>
        <span style={{ fontSize: fontSize - 1, color: muted, whiteSpace: 'nowrap' }}>{currentTime}</span>
      </div>
    );
  }

  const playlist = [
    { title: 'Notification Sound', duration: '0:03' },
    { title: 'Alert Tone', duration: '0:05' },
    { title: 'Success Chime', duration: '0:02' },
  ];

  return (
    <div style={{ background: bg, borderRadius: 12, padding: h <= 32 ? 8 : 16, border: `1px solid ${theme === 'dark' ? '#333' : '#E0E0E0'}`, width: variant === 'playlist' ? 280 : 260 }}>
      {/* Track info */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize, fontWeight: 600, color: fg }}>Notification Sound</div>
        <div style={{ fontSize: fontSize - 2, color: muted }}>System Audio</div>
      </div>

      {/* Waveform or progress */}
      {variant === 'waveform' ? (
        <div style={{ marginBottom: 8 }}>
          <WaveformBars playing={state === 'playing'} theme={theme} height={h} />
        </div>
      ) : (
        <div style={{ marginBottom: 8 }}>
          <div style={{ height: 4, background: trackBg, borderRadius: 2, position: 'relative' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: accent, borderRadius: 2, transition: 'width 0.1s linear' }} />
            <div style={{ position: 'absolute', top: -4, left: `${progress}%`, width: 12, height: 12, borderRadius: '50%', background: accent, transform: 'translateX(-50%)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontSize: fontSize - 2, color: muted }}>{currentTime}</span>
            <span style={{ fontSize: fontSize - 2, color: muted }}>{totalTime}</span>
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: h <= 32 ? 12 : 20 }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
          <svg width={iconSize * 0.7} height={iconSize * 0.7} viewBox="0 0 24 24" fill={muted}><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
        </button>
        <button onClick={togglePlay} style={{ background: accent, border: 'none', cursor: 'pointer', borderRadius: '50%', width: h * 0.7, height: h * 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
          {state === 'playing' ? (
            <svg width={iconSize * 0.7} height={iconSize * 0.7} viewBox="0 0 24 24" fill="#FFF"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
          ) : (
            <svg width={iconSize * 0.7} height={iconSize * 0.7} viewBox="0 0 24 24" fill="#FFF"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
          <svg width={iconSize * 0.7} height={iconSize * 0.7} viewBox="0 0 24 24" fill={muted}><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
        </button>
      </div>

      {/* Volume */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
        <svg width={12} height={12} viewBox="0 0 24 24" fill={muted}><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" /></svg>
        <div style={{ flex: 1, height: 3, background: trackBg, borderRadius: 2, position: 'relative' }}>
          <div style={{ width: '70%', height: '100%', background: accent, borderRadius: 2 }} />
        </div>
      </div>

      {/* Playlist */}
      {variant === 'playlist' && (
        <div style={{ marginTop: 12, borderTop: `1px solid ${theme === 'dark' ? '#333' : '#E0E0E0'}`, paddingTop: 8 }}>
          <div style={{ fontSize: fontSize - 1, fontWeight: 600, color: fg, marginBottom: 6 }}>Playlist</div>
          {playlist.map((t, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: fontSize - 1, color: i === 0 ? accent : muted, cursor: 'pointer' }}>
              <span>{i === 0 ? '▶ ' : ''}{t.title}</span>
              <span>{t.duration}</span>
            </div>
          ))}
        </div>
      )}

      {/* Buffering overlay */}
      {state === 'buffering' && (
        <div style={{ textAlign: 'center', fontSize: fontSize - 1, color: muted, marginTop: 4 }}>Buffering...</div>
      )}
    </div>
  );
}

/* ── Custom Example Section ── */
function AudioExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { size: string; theme: 'light' | 'dark'; variant: PlayerVariant }) => React.ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [size, setSize] = useState('md');
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState<PlayerVariant>('default');
  useEffect(() => { setTheme(globalTheme as 'light' | 'dark'); }, [globalTheme]);
  const bg = theme === 'dark' ? '#1A1A1A' : '#F5F5F5';

  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 4 }}>{title}</h3>
      <p style={{ color: 'var(--color-on-surface-variant)', fontSize: 14, marginBottom: 12 }}>{desc}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <select value={size} onChange={e => setSize(e.target.value)} style={selectStyle}>
          <option value="sm">SM (32px)</option>
          <option value="md">MD (48px)</option>
          <option value="lg">LG (64px)</option>
        </select>
        <select value={variant} onChange={e => setVariant(e.target.value as PlayerVariant)} style={selectStyle}>
          <option value="default">Default</option>
          <option value="compact">Compact</option>
          <option value="playlist">With Playlist</option>
          <option value="waveform">With Waveform</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {children({ size, theme, variant })}
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=atoms-audioplayer--default&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/atoms-audioplayer--default"
        height={420}
        title="Audio Player — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>
        The Audio Player component provides playback controls for audio content.
        It supports multiple layouts including compact inline players, full-featured
        players with waveform visualization, and playlist management.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Default, Compact, With Playlist, With Waveform</td></tr>
          <tr><td>Sizes</td><td>Small (32px), Medium (48px), Large (64px)</td></tr>
          <tr><td>States</td><td>Idle, Playing, Paused, Buffering</td></tr>
          <tr><td>Features</td><td>Progress bar, Volume control, Time display, Waveform</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>

      <AudioExampleSection
        title="Audio Player Variants"
        desc="Switch between Default, Compact, Playlist, and Waveform variants using the dropdown. Click play to see animation."
      >
        {({ size, theme, variant }) => (
          <AudioPlayerDemo size={size} theme={theme} variant={variant} />
        )}
      </AudioExampleSection>

      <h2>States</h2>

      <AudioExampleSection
        title="Player States"
        desc="Audio players cycle through Idle, Playing, Paused, and Buffering states. Click play/pause to interact."
      >
        {({ size, theme }) => (
          <>
            <AudioPlayerDemo size={size} theme={theme} variant="default" initialState="idle" />
            <AudioPlayerDemo size={size} theme={theme} variant="compact" initialState="playing" />
          </>
        )}
      </AudioExampleSection>

      <h2>Sizes</h2>

      <ComponentExampleSection
        title="Size Comparison"
        desc="Audio players come in three sizes. Small for inline use, Medium as default, Large for prominent placement."
        sizes={['sm', 'md', 'lg'] as ('sm' | 'md' | 'lg')[]}
      >
        {({ theme }) => (
          <>
            <AudioPlayerDemo size="sm" theme={theme as 'light' | 'dark'} variant="compact" />
            <AudioPlayerDemo size="md" theme={theme as 'light' | 'dark'} variant="compact" />
            <AudioPlayerDemo size="lg" theme={theme as 'light' | 'dark'} variant="compact" />
          </>
        )}
      </ComponentExampleSection>
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
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
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
