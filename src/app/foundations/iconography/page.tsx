'use client';
import { useState, useEffect, useMemo } from 'react';
import { PageShell } from '@/components/PageShell';
import { Info, DoDont } from '@/components/mdx';

/* ─── helpers ─── */
function toMaterialName(kebab: string) {
  return kebab.replace(/-/g, '_');
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
}

/* ─── Icon data by category ─── */
type IconCategory = {
  name: string;
  icons: string[];
};

const ICON_CATEGORIES: IconCategory[] = [
  {
    name: 'Action',
    icons: [
      'search', 'home', 'settings', 'delete', 'done', 'info', 'help',
      'visibility', 'lock', 'favorite', 'bookmark-border', 'print',
      'dashboard', 'build', 'code', 'history', 'check-circle', 'explore',
      'shopping-cart', 'credit-card', 'language', 'launch', 'backup',
      'open-in-new', 'account-circle', 'face', 'stars', 'translate',
      'room', 'store', 'book', 'work', 'event', 'today', 'alarm',
      'fingerprint', 'bug-report', 'https', 'feedback', 'trending-up',
      'assessment', 'description', 'label', 'subject', 'get-app',
      'receipt', 'watch-later', 'hourglass-empty', 'card-giftcard',
      'settings-applications', 'power-settings-new', 'account-balance',
      'calendar-today', 'date-range', 'question-answer', 'gavel',
      'thumb-up', 'aspect-ratio', 'eject', 'pets', 'pan-tool',
      'compare-arrows', '3d-rotation', 'thumbs-up-down', 'euro-symbol',
      'maximize', 'alarm-add', 'shopping-basket', 'tab', 'view-day',
    ],
  },
  {
    name: 'Alerts',
    icons: ['add-alert', 'error-outline', 'error', 'notification-important', 'warning'],
  },
  {
    name: 'Navigation',
    icons: [
      'apps', 'arrow-back', 'arrow-forward', 'arrow-upward', 'arrow-downward',
      'arrow-back-ios', 'arrow-forward-ios', 'arrow-drop-down', 'arrow-drop-up',
      'arrow-drop-down-circle', 'arrow-left', 'arrow-right',
      'chevron-left', 'chevron-right', 'expand-less', 'expand-more',
      'cancel', 'check', 'close', 'menu', 'menu-open', 'more-horiz',
      'more-vert', 'refresh', 'fullscreen', 'fullscreen-exit',
      'first-page', 'last-page', 'unfold-less', 'unfold-more',
      'subdirectory-arrow-left', 'subdirectory-arrow-right', 'double-arrow',
    ],
  },
  {
    name: 'Toggle',
    icons: [
      'check-box-outline-blank', 'check-box', 'indeterminate-check-box',
      'radio-button-checked', 'radio-button-unchecked',
      'star-border', 'star-half', 'star-outline', 'star',
      'toggle-off', 'toggle-on',
    ],
  },
  {
    name: 'Content',
    icons: [
      'add', 'add-circle', 'add-circle-outline', 'add-box', 'remove',
      'remove-circle', 'archive', 'block', 'create', 'delete-sweep',
      'drafts', 'file-copy', 'filter-list', 'flag', 'forward',
      'inbox', 'link', 'mail', 'redo', 'undo', 'reply', 'reply-all',
      'report', 'save', 'select-all', 'send', 'sort', 'backspace', 'waves',
    ],
  },
  {
    name: 'File',
    icons: [
      'attachment', 'cloud', 'cloud-circle', 'cloud-done', 'cloud-download',
      'cloud-off', 'cloud-queue', 'cloud-upload', 'create-new-folder',
      'folder', 'folder-open', 'folder-shared',
    ],
  },
  {
    name: 'Hardware',
    icons: [
      'computer', 'desktop-mac', 'desktop-windows', 'laptop', 'smartphone',
      'tablet', 'phone-android', 'phone-iphone', 'tv', 'watch', 'speaker',
      'keyboard', 'keyboard-arrow-down', 'keyboard-arrow-left',
      'keyboard-arrow-right', 'keyboard-arrow-up', 'keyboard-backspace',
      'mouse', 'memory', 'router', 'scanner', 'security', 'sim-card',
      'cast', 'cast-connected', 'developer-board', 'device-hub',
    ],
  },
  {
    name: 'Device',
    icons: [
      'access-alarm', 'access-alarms', 'access-time', 'add-alarm', 'add-to-home-screen',
      'airplanemode-active', 'airplanemode-inactive',
      'battery-alert', 'battery-charging-full', 'battery-full', 'battery-std', 'battery-unknown',
      'bluetooth-connected', 'bluetooth-disabled', 'bluetooth-searching', 'bluetooth',
      'brightness-auto', 'brightness-high', 'brightness-low', 'brightness-medium',
      'data-usage', 'developer-mode', 'devices', 'dvr',
      'gps-fixed', 'gps-not-fixed', 'gps-off', 'graphic-eq',
      'location-disabled', 'location-searching',
      'mobile-friendly', 'mobile-off', 'nfc',
      'screen-lock-landscape', 'screen-lock-portrait', 'screen-lock-rotation', 'screen-rotation',
      'sd-storage', 'settings-system-daydream',
      'signal-cellular-4-bar', 'signal-cellular-alt', 'signal-cellular-connected-no-internet-4-bar',
      'signal-cellular-no-sim', 'signal-cellular-null', 'signal-cellular-off',
      'signal-wifi-4-bar-lock', 'signal-wifi-4-bar', 'signal-wifi-off',
      'storage', 'usb', 'wallpaper', 'widgets', 'wifi-lock', 'wifi-tethering',
    ],
  },
  {
    name: 'AV',
    icons: [
      '4k', 'add-to-queue', 'airplay', 'album', 'art-track', 'av-timer',
      'branding-watermark', 'call-to-action', 'closed-caption', 'control-camera',
      'equalizer', 'explicit', 'fast-forward', 'fast-rewind',
      'featured-play-list', 'featured-video', 'fiber-dvr', 'fiber-new', 'fiber-pin', 'fiber-smart-record',
      'games', 'hd', 'hearing', 'high-quality',
      'library-add-check', 'library-add', 'library-books', 'library-music',
      'loop', 'mic-none', 'mic-off', 'mic', 'missed-video-call', 'movie', 'music-video',
      'new-releases', 'not-interested', 'note',
      'pause-circle-filled', 'pause-circle-outline', 'pause', 'play-arrow',
      'play-circle-filled', 'play-circle-outline',
      'playlist-add-check', 'playlist-add', 'playlist-play',
      'queue-music', 'queue-play-next', 'queue', 'radio', 'recent-actors',
      'repeat-one', 'repeat', 'replay', 'shuffle',
      'skip-next', 'skip-previous', 'slow-motion-video', 'snooze', 'sort-by-alpha', 'speed',
      'stop', 'subscriptions', 'subtitles', 'surround-sound',
      'video-call', 'video-label', 'video-library', 'videocam-off', 'videocam',
      'volume-down', 'volume-mute', 'volume-off', 'volume-up', 'web-asset', 'web',
    ],
  },
  {
    name: 'Communication',
    icons: [
      'add-ic-call', 'alternate-email', 'business', 'call-end', 'call-made', 'call-merge',
      'call-missed-outgoing', 'call-missed', 'call-received', 'call-split', 'call',
      'cancel-presentation', 'chat-bubble-outline', 'chat-bubble', 'chat',
      'clear-all', 'comment', 'contact-mail', 'contact-phone', 'contacts',
      'desktop-access-disabled', 'dialer-sip', 'dialpad', 'domain-disabled', 'duo', 'email',
      'forum', 'import-contacts', 'import-export', 'invert-colors-off',
      'list-alt', 'live-help', 'location-off', 'location-on', 'mail-outline', 'message',
      'mobile-screen-share', 'no-sim', 'pause-presentation', 'person-add-disabled',
      'phone-disabled', 'phone-enabled', 'phone', 'phonelink-erase', 'phonelink-lock', 'phonelink-ring',
      'phonelink-setup', 'portable-wifi-off', 'present-to-all', 'print-disabled',
      'ring-volume', 'rss-feed', 'screen-share', 'sentiment-satisfied-alt', 'speaker-phone',
      'stay-current-landscape', 'stay-current-portrait', 'stay-primary-landscape', 'stay-primary-portrait',
      'stop-screen-share', 'swap-calls', 'textsms', 'unsubscribe', 'voicemail', 'vpn-key',
    ],
  },
  {
    name: 'Editor',
    icons: [
      'add-comment', 'attach-file', 'attach-money', 'bar-chart',
      'border-all', 'border-bottom', 'border-clear', 'border-horizontal', 'border-inner',
      'border-left', 'border-outer', 'border-right', 'border-style', 'border-top', 'border-vertical',
      'bubble-chart', 'drag-handle',
      'format-align-center', 'format-align-justify', 'format-align-left', 'format-align-right',
      'format-bold', 'format-clear', 'format-color-reset',
      'format-indent-decrease', 'format-indent-increase', 'format-italic', 'format-line-spacing',
      'format-list-bulleted', 'format-list-numbered-rtl', 'format-list-numbered',
      'format-paint', 'format-quote', 'format-shapes', 'format-size',
      'format-strikethrough', 'format-textdirection-l-to-r', 'format-textdirection-r-to-l',
      'format-underlined', 'functions', 'height', 'highlight',
      'insert-chart-outlined', 'insert-chart', 'insert-comment', 'insert-drive-file',
      'insert-emoticon', 'insert-invitation', 'insert-link', 'insert-photo',
      'linear-scale', 'merge-type', 'mode-comment', 'monetization-on', 'money-off',
      'multiline-chart', 'notes', 'pie-chart', 'post-add', 'publish',
      'scatter-plot', 'score', 'short-text', 'show-chart', 'space-bar',
      'strikethrough-s', 'table-chart', 'text-fields', 'title',
      'vertical-align-bottom', 'vertical-align-center', 'vertical-align-top', 'wrap-text',
    ],
  },
  {
    name: 'Image',
    icons: [
      'add-a-photo', 'add-photo-alternate', 'add-to-photos', 'adjust', 'assistant-photo', 'assistant',
      'audiotrack', 'blur-circular', 'blur-linear', 'blur-off', 'blur-on',
      'brightness-1', 'brightness-2', 'brightness-3', 'brightness-4', 'brightness-5', 'brightness-6', 'brightness-7',
      'broken-image', 'brush', 'burst-mode', 'camera-alt', 'camera-front', 'camera-rear', 'camera-roll', 'camera',
      'center-focus-strong', 'center-focus-weak', 'collections-bookmark', 'collections',
      'color-lens', 'colorize', 'compare', 'control-point-duplicate', 'control-point',
      'crop-16-9', 'crop-3-2', 'crop-5-4', 'crop-7-5', 'crop-din', 'crop-free',
      'crop-landscape', 'crop-original', 'crop-portrait', 'crop-rotate', 'crop-square', 'crop',
      'dehaze', 'details', 'edit', 'euro',
      'exposure-neg-1', 'exposure-neg-2', 'exposure-plus-1', 'exposure-plus-2', 'exposure-zero', 'exposure',
      'filter-1', 'filter-2', 'filter-3', 'filter-4', 'filter-5', 'filter-6', 'filter-7', 'filter-8', 'filter-9-plus', 'filter-9',
      'filter-b-and-w', 'filter-center-focus', 'filter-drama', 'filter-frames', 'filter-hdr',
      'filter-none', 'filter-tilt-shift', 'filter-vintage', 'filter',
      'flare', 'flash-auto', 'flash-off', 'flash-on', 'flip-camera-android', 'flip-camera-ios', 'flip',
      'gradient', 'grain', 'grid-off', 'grid-on', 'hdr-off', 'hdr-on', 'hdr-strong', 'hdr-weak', 'healing',
      'image-aspect-ratio', 'image-search', 'image', 'iso', 'landscape',
      'leak-add', 'leak-remove', 'lens', 'linked-camera',
      'looks-3', 'looks-4', 'looks-5', 'looks-6', 'looks-one', 'looks-two', 'looks', 'loupe',
      'monochrome-photos', 'movie-creation', 'movie-filter', 'music-note', 'music-off',
      'nature-people', 'nature', 'navigate-before', 'navigate-next', 'palette',
      'panorama-fish-eye', 'panorama-horizontal', 'panorama-vertical', 'panorama-wide-angle', 'panorama',
      'photo-album', 'photo-camera', 'photo-filter', 'photo-library',
      'photo-size-select-actual', 'photo-size-select-large', 'photo-size-select-small', 'photo',
      'picture-as-pdf', 'portrait', 'remove-red-eye', 'rotate-90-degrees-ccw', 'rotate-left', 'rotate-right',
      'shutter-speed', 'slideshow', 'straighten', 'style', 'switch-camera', 'switch-video',
      'tag-faces', 'texture', 'timelapse', 'timer-10', 'timer-3', 'timer-off', 'timer',
      'tonality', 'transform', 'tune', 'view-comfy', 'view-compact', 'vignette',
      'wb-auto', 'wb-cloudy', 'wb-incandescent', 'wb-iridescent', 'wb-sunny',
    ],
  },
  {
    name: 'Maps',
    icons: [
      '360', 'add-location', 'atm', 'beenhere', 'category', 'compass-calibration',
      'departure-board', 'directions-bike', 'directions-boat', 'directions-bus', 'directions-car',
      'directions-railway', 'directions-run', 'directions-subway', 'directions-transit',
      'directions-walk', 'directions', 'edit-attributes', 'edit-location', 'ev-station',
      'fastfood', 'flight', 'hotel', 'layers-clear', 'layers', 'local-activity',
      'local-airport', 'local-atm', 'local-bar', 'local-cafe', 'local-car-wash',
      'local-convenience-store', 'local-dining', 'local-drink', 'local-florist',
      'local-gas-station', 'local-grocery-store', 'local-hospital', 'local-hotel',
      'local-laundry-service', 'local-library', 'local-mall', 'local-movies',
      'local-offer', 'local-parking', 'local-pharmacy', 'local-phone', 'local-pizza',
      'local-play', 'local-post-office', 'local-printshop', 'local-see',
      'local-taxi', 'map', 'menu-book', 'money', 'museum', 'my-location',
      'navigation', 'near-me', 'not-listed-location', 'person-pin-circle', 'person-pin',
      'pin-drop', 'place', 'rate-review', 'restaurant-menu', 'restaurant',
      'satellite', 'store-mall-directory', 'streetview', 'subway', 'terrain',
      'traffic', 'train', 'tram', 'transfer-within-a-station', 'transit-enterexit',
      'trip-origin', 'two-wheeler', 'zoom-out-map',
    ],
  },
  {
    name: 'Notification',
    icons: [
      'account-tree', 'adb', 'airline-seat-flat-angled', 'airline-seat-flat',
      'airline-seat-individual-suite', 'airline-seat-legroom-extra', 'airline-seat-legroom-normal',
      'airline-seat-legroom-reduced', 'airline-seat-recline-extra', 'airline-seat-recline-normal',
      'bluetooth-audio', 'confirmation-number', 'disc-full', 'drive-eta',
      'enhanced-encryption', 'event-available', 'event-busy', 'event-note', 'folder-special',
      'live-tv', 'mms', 'more', 'network-check', 'network-locked', 'no-encryption',
      'ondemand-video', 'personal-video', 'phone-bluetooth-speaker', 'phone-callback',
      'phone-forwarded', 'phone-in-talk', 'phone-locked', 'phone-missed', 'phone-paused',
      'power-off', 'power', 'priority-high', 'sd-card', 'sms-failed', 'sms',
      'sync-disabled', 'sync-problem', 'sync', 'system-update', 'tap-and-play',
      'time-to-leave', 'tv-off', 'vibration', 'voice-chat', 'vpn-lock', 'wc', 'wifi-off', 'wifi',
    ],
  },
  {
    name: 'Outdoor',
    icons: [
      'ac-unit', 'airport-shuttle', 'all-inclusive', 'apartment', 'bathtub',
      'beach-access', 'business-center', 'casino', 'child-care', 'child-friendly',
      'fitness-center', 'free-breakfast', 'golf-course', 'hot-tub', 'house',
      'kitchen', 'meeting-room', 'no-meeting-room', 'pool', 'room-service',
      'rv-hookup', 'smoke-free', 'smoking-rooms', 'spa', 'storefront',
    ],
  },
  {
    name: 'Social',
    icons: [
      'cake', 'deck', 'domain', 'emoji-emotions', 'emoji-events', 'emoji-flags',
      'emoji-food-beverage', 'emoji-nature', 'emoji-objects', 'emoji-people',
      'emoji-symbols', 'emoji-transportation', 'fireplace',
      'group-add', 'group', 'king-bed', 'location-city', 'mood-bad', 'mood',
      'nights-stay', 'notifications-active', 'notifications-none', 'notifications-off',
      'notifications-paused', 'notifications', 'outdoor-grill',
      'pages', 'party-mode', 'people-alt', 'people-outline', 'people',
      'person-add', 'person-outline', 'person', 'plus-one', 'poll', 'public', 'school',
      'sentiment-dissatisfied', 'sentiment-satisfied', 'sentiment-very-dissatisfied', 'sentiment-very-satisfied',
      'share', 'single-bed',
      'sports-baseball', 'sports-basketball', 'sports-cricket', 'sports-esports',
      'sports-football', 'sports-golf', 'sports-handball', 'sports-hockey',
      'sports-kabaddi', 'sports-mma', 'sports-motorsports', 'sports-rugby',
      'sports-soccer', 'sports-tennis', 'sports-volleyball', 'sports',
      'thumb-down-alt', 'thumb-up-alt', 'whatshot',
    ],
  },
];

const ALL_CATEGORIES = ICON_CATEGORIES.map((c) => c.name);

const ICON_SIZES = [
  { label: '12', value: 12 },
  { label: '16', value: 16 },
  { label: '20', value: 20 },
  { label: '24', value: 24 },
  { label: '28', value: 28 },
  { label: '32', value: 32 },
];

/* ─── Load Material Icons font ─── */
function useMaterialIconsFont() {
  useEffect(() => {
    const id = 'material-icons-font';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined';
    document.head.appendChild(link);
  }, []);
}

/* ─── Icon Detail Popup ─── */
function IconPopup({
  icon,
  onClose,
}: {
  icon: string;
  onClose: () => void;
}) {
  const materialName = toMaterialName(icon);
  const [copied, setCopied] = useState<string | null>(null);
  const [style, setStyle] = useState<'filled' | 'outlined'>('filled');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleCopy = (text: string, label: string) => {
    copyToClipboard(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  };

  const fontClass = style === 'filled' ? 'material-icons' : 'material-icons-outlined';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative rounded-2xl p-8 w-[420px] max-w-[90vw] shadow-2xl"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-outline)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg transition-colors hover:bg-black/10"
          style={{ color: 'var(--color-on-surface-variant)' }}
          aria-label="Close"
        >
          <span className="material-icons" style={{ fontSize: 20 }}>close</span>
        </button>

        {/* Icon preview */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center"
            style={{ background: 'var(--color-surface-container-low)' }}
          >
            <span className={fontClass} style={{ fontSize: 48, color: 'var(--color-on-surface)' }}>
              {materialName}
            </span>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold" style={{ color: 'var(--color-on-surface)' }}>{icon}</p>
            <p className="text-sm mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>
              Material Icon: <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-surface-container-low)' }}>{materialName}</code>
            </p>
          </div>
        </div>

        {/* Style toggle */}
        <div className="flex gap-2 mb-4 justify-center">
          {(['filled', 'outlined'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors capitalize"
              style={{
                backgroundColor: style === s ? 'var(--color-on-surface)' : 'transparent',
                color: style === s ? 'var(--color-surface)' : 'var(--color-on-surface-variant)',
                border: `1px solid ${style === s ? 'var(--color-on-surface)' : 'var(--color-outline)'}`,
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Size previews */}
        <div className="flex items-end justify-center gap-4 mb-6 py-3 rounded-xl" style={{ background: 'var(--color-surface-container-low)' }}>
          {[16, 20, 24, 32].map((size) => (
            <div key={size} className="flex flex-col items-center gap-1">
              <span className={fontClass} style={{ fontSize: size, color: 'var(--color-on-surface)' }}>
                {materialName}
              </span>
              <span className="text-[10px]" style={{ color: 'var(--color-on-surface-variant)' }}>{size}px</span>
            </div>
          ))}
        </div>

        {/* Copy buttons */}
        <div className="flex flex-col gap-2">
          {[
            { label: 'Name', value: icon },
            { label: 'Material ID', value: materialName },
            { label: 'HTML', value: `<span class="${fontClass}">${materialName}</span>` },
            { label: 'React', value: `<span className="${fontClass}">${materialName}</span>` },
          ].map(({ label, value }) => (
            <button
              key={label}
              onClick={() => handleCopy(value, label)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors hover:bg-black/5"
              style={{ border: '1px solid var(--color-outline)', color: 'var(--color-on-surface)' }}
            >
              <span className="font-medium">{label}</span>
              <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-on-surface-variant)' }}>
                {copied === label ? (
                  <><span className="material-icons" style={{ fontSize: 14, color: '#1BA86E' }}>check</span> Copied!</>
                ) : (
                  <><span className="material-icons" style={{ fontSize: 14 }}>content_copy</span> Copy</>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Tab: Examples ─── */
function ExamplesTab() {
  useMaterialIconsFont();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [iconStyle, setIconStyle] = useState<'filled' | 'outlined'>('filled');
  const [iconSize, setIconSize] = useState(24);

  const filteredCategories = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (category === 'All') {
      if (!query) return ICON_CATEGORIES;
      return ICON_CATEGORIES.map((cat) => ({
        ...cat,
        icons: cat.icons.filter((icon) => icon.includes(query) || toMaterialName(icon).includes(query)),
      })).filter((cat) => cat.icons.length > 0);
    }
    const cat = ICON_CATEGORIES.find((c) => c.name === category);
    if (!cat) return [];
    const icons = query
      ? cat.icons.filter((icon) => icon.includes(query) || toMaterialName(icon).includes(query))
      : cat.icons;
    return icons.length > 0 ? [{ ...cat, icons }] : [];
  }, [category, search]);

  const totalCount = filteredCategories.reduce((sum, cat) => sum + cat.icons.length, 0);
  const fontClass = iconStyle === 'filled' ? 'material-icons' : 'material-icons-outlined';

  return (
    <div className="mdx-content">
      {selectedIcon && <IconPopup icon={selectedIcon} onClose={() => setSelectedIcon(null)} />}

      {/* Category pills — single scrollable row */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {['All', ...ALL_CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0"
            style={{
              backgroundColor: category === cat ? 'var(--color-on-surface)' : 'transparent',
              color: category === cat ? 'var(--color-surface)' : 'var(--color-on-surface-variant)',
              border: `1px solid ${category === cat ? 'var(--color-on-surface)' : 'var(--color-outline)'}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search + style + size — single row */}
      <div className="flex items-center gap-2 mb-6">
        <div className="relative flex-1 min-w-0">
          <span
            className="material-icons absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ fontSize: 18, color: 'var(--color-on-surface-variant)' }}
          >
            search
          </span>
          <input
            type="text"
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none transition-colors"
            style={{
              background: 'var(--color-surface-container-low)',
              border: '1px solid var(--color-outline)',
              color: 'var(--color-on-surface)',
            }}
          />
        </div>

        {/* Style toggle */}
        <div className="flex rounded-lg overflow-hidden shrink-0" style={{ border: '1px solid var(--color-outline)' }}>
          {(['filled', 'outlined'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setIconStyle(s)}
              className="px-3 py-2 text-xs font-medium transition-colors capitalize"
              style={{
                background: iconStyle === s ? 'var(--color-on-surface)' : 'transparent',
                color: iconStyle === s ? 'var(--color-surface)' : 'var(--color-on-surface-variant)',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Size selector */}
        <select
          value={iconSize}
          onChange={(e) => setIconSize(Number(e.target.value))}
          className="px-3 py-2 rounded-lg text-xs font-medium outline-none cursor-pointer"
          style={{
            background: 'var(--color-surface-container-low)',
            border: '1px solid var(--color-outline)',
            color: 'var(--color-on-surface)',
          }}
        >
          {ICON_SIZES.map((s) => (
            <option key={s.value} value={s.value}>{s.value}px</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm mb-4" style={{ color: 'var(--color-on-surface-variant)' }}>
        {totalCount} icon{totalCount !== 1 ? 's' : ''} found
        {search && <> matching &ldquo;<strong>{search}</strong>&rdquo;</>}
      </p>

      {/* Icon grid by category */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-16">
          <span className="material-icons mb-3 block" style={{ fontSize: 48, color: 'var(--color-on-surface-variant)', opacity: 0.4 }}>
            search_off
          </span>
          <p style={{ color: 'var(--color-on-surface-variant)' }}>No icons match your search.</p>
        </div>
      ) : (
        filteredCategories.map((cat) => (
          <div key={cat.name} className="mb-6 pb-5 border-b last:border-b-0" style={{ borderColor: 'var(--color-outline)' }}>
            <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--color-on-surface)' }}>
              {cat.name}
              <span className="text-xs font-normal ml-2" style={{ color: 'var(--color-on-surface-variant)' }}>
                ({cat.icons.length})
              </span>
            </h3>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
              {cat.icons.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setSelectedIcon(icon)}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all hover:scale-105 group cursor-pointer"
                  style={{
                    background: 'var(--color-surface-container-low)',
                    border: '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-outline)';
                    e.currentTarget.style.background = 'var(--color-surface-container)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.background = 'var(--color-surface-container-low)';
                  }}
                  title={icon}
                >
                  <span className={fontClass} style={{ fontSize: iconSize, color: 'var(--color-on-surface)' }}>
                    {toMaterialName(icon)}
                  </span>
                  <span
                    className="text-[10px] leading-tight text-center truncate w-full"
                    style={{ color: 'var(--color-on-surface-variant)' }}
                  >
                    {icon}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* ─── Tab: Usage ─── */
function UsageTab() {
  return (
    <div className="mdx-content">
      <h2>Icon System</h2>
      <Info>TARMAC uses Google Material Icons as its core icon library. All icons should be used consistently across products to maintain visual coherence and user familiarity.</Info>

      <p>The icon system is built on three principles:</p>
      <ol>
        <li><strong>Consistency</strong> — Use the same icon for the same action everywhere. Don&apos;t use &ldquo;delete&rdquo; in one place and &ldquo;remove&rdquo; in another for the same operation.</li>
        <li><strong>Clarity</strong> — Icons should be immediately recognizable. When in doubt, pair with a text label.</li>
        <li><strong>Hierarchy</strong> — Use size to establish visual importance. Primary actions get larger icons; secondary/tertiary actions use smaller ones.</li>
      </ol>

      <h2>Sizes</h2>
      <table>
        <thead><tr><th>Size</th><th>Pixels</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>2XS</td><td>12px</td><td>Micro indicators, status dots</td></tr>
          <tr><td>XS</td><td>16px</td><td>Inline with small text, badges, tags</td></tr>
          <tr><td>SM</td><td>20px</td><td>Buttons, form fields, compact UI</td></tr>
          <tr><td>MD (default)</td><td>24px</td><td>Navigation, standalone icons, list items</td></tr>
          <tr><td>LG</td><td>28px</td><td>Section headers, card actions</td></tr>
          <tr><td>XL</td><td>32px</td><td>Empty states, feature highlights, onboarding</td></tr>
        </tbody>
      </table>

      <h2>Styles</h2>
      <p>Material Icons come in two styles:</p>
      <ul>
        <li><strong>Filled</strong> — Default style. Use for primary UI elements, navigation, and actions. Provides stronger visual weight.</li>
        <li><strong>Outlined</strong> — Use for secondary elements, inactive states, or when a lighter visual weight is needed. Good for dense interfaces.</li>
      </ul>
      <Info>Never mix filled and outlined styles within the same context or component group. Pick one style per interface section and stay consistent.</Info>

      <h2>Accessibility</h2>
      <ul>
        <li>Always add <code>aria-label</code> to icon-only buttons and interactive elements</li>
        <li>Use <code>aria-hidden=&quot;true&quot;</code> on decorative icons that are paired with visible text</li>
        <li>Ensure icons meet a minimum 3:1 contrast ratio against their background</li>
        <li>Never use color alone to convey meaning — pair icons with text or use additional visual cues</li>
        <li>Icon touch targets should be at least 44×44px for mobile, even if the icon itself is smaller</li>
        <li>Provide <code>role=&quot;img&quot;</code> for standalone informational icons</li>
      </ul>

      <h2>Categories</h2>
      <p>Icons are organized into functional categories to help teams find the right icon quickly:</p>
      <ul>
        <li><strong>Action</strong> — Common operations: search, settings, delete, print, share</li>
        <li><strong>Alerts</strong> — Warnings, errors, and notification indicators</li>
        <li><strong>Navigation</strong> — Arrows, menus, chevrons, pagination controls</li>
        <li><strong>Toggle</strong> — Checkboxes, radio buttons, stars, switches</li>
        <li><strong>Content</strong> — Add, remove, edit, mail, save, undo/redo</li>
        <li><strong>File</strong> — Cloud operations, folders, attachments</li>
        <li><strong>Hardware</strong> — Devices, keyboards, peripherals</li>
        <li><strong>Device</strong> — Connectivity, sensors, system features</li>
      </ul>

      <h2>Do&apos;s &amp; Don&apos;ts</h2>
      <DoDont
        slug="iconography"
        doItems={[
          'Use icons with well-established, universally understood meaning',
          'Always pair icon-only buttons with aria-label for accessibility',
          'Keep icon size consistent within the same context (e.g., all toolbar icons at 24px)',
          'Use outlined style for secondary/inactive states and filled for primary actions',
          'Maintain minimum 44×44px touch targets on mobile',
        ]}
        dontItems={[
          'Use ambiguous or unfamiliar icons without a text label',
          'Mix filled and outlined styles in the same component group',
          'Resize icons below 12px — they become unreadable',
          'Use one icon to mean different things in different contexts',
          'Rely on color alone to convey icon meaning',
        ]}
      />
    </div>
  );
}

/* ─── Tab: Code ─── */
function CodeTab() {
  return (
    <div className="mdx-content">
      <h2>Installation</h2>
      <p>Add the Material Icons font to your project. Choose one of the following methods:</p>

      <h3>CDN (recommended for web)</h3>
      <pre><code>{`<!-- Add to your <head> -->
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined"
  rel="stylesheet"
/>`}</code></pre>

      <h3>npm package</h3>
      <pre><code>{`npm install material-icons

// Import in your entry file
import 'material-icons/iconfont/material-icons.css';`}</code></pre>

      <h2>Basic Usage</h2>

      <h3>HTML</h3>
      <pre><code>{`<!-- Filled (default) -->
<span class="material-icons">home</span>

<!-- Outlined -->
<span class="material-icons-outlined">home</span>

<!-- With custom size -->
<span class="material-icons" style="font-size: 32px;">home</span>`}</code></pre>

      <h3>React / Next.js</h3>
      <pre><code>{`// Filled icon
<span className="material-icons">home</span>

// Outlined icon
<span className="material-icons-outlined">home</span>

// With size and color props
<span
  className="material-icons"
  style={{ fontSize: 20, color: 'var(--color-primary)' }}
>
  search
</span>`}</code></pre>

      <h2>Icon Component Wrapper</h2>
      <p>For consistent usage across your app, create a reusable component:</p>
      <pre><code>{`interface IconProps {
  name: string;
  size?: 12 | 16 | 20 | 24 | 28 | 32;
  variant?: 'filled' | 'outlined';
  color?: string;
  className?: string;
  ariaLabel?: string;
}

function Icon({
  name,
  size = 24,
  variant = 'filled',
  color,
  className = '',
  ariaLabel,
}: IconProps) {
  const fontClass = variant === 'filled'
    ? 'material-icons'
    : 'material-icons-outlined';

  return (
    <span
      className={\`\${fontClass} \${className}\`}
      style={{ fontSize: size, color }}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      {name}
    </span>
  );
}

// Usage
<Icon name="search" size={20} />
<Icon name="delete" variant="outlined" color="var(--color-error)" />
<Icon name="menu" ariaLabel="Open navigation menu" />`}</code></pre>

      <h2>Naming Convention</h2>
      <p>Material Icons use <strong>snake_case</strong> for icon identifiers. When referencing icons in documentation or design specs, we use <strong>kebab-case</strong> (e.g., <code>arrow-back</code>). Convert to snake_case for code usage:</p>
      <pre><code>{`// Design spec name → Code name
"arrow-back"     → arrow_back
"check-circle"   → check_circle
"cloud-download"  → cloud_download`}</code></pre>

      <h2>Accessibility in Code</h2>
      <pre><code>{`<!-- Decorative icon (paired with text) -->
<button>
  <span class="material-icons" aria-hidden="true">delete</span>
  Delete item
</button>

<!-- Icon-only button (needs aria-label) -->
<button aria-label="Delete item">
  <span class="material-icons" aria-hidden="true">delete</span>
</button>

<!-- Standalone informational icon -->
<span class="material-icons" role="img" aria-label="Warning">
  warning
</span>`}</code></pre>
    </div>
  );
}

/* ─── Main Page ─── */
export default function IconographyPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },
    {
      label: 'Changelog',
      content: (
        <div className="mdx-content py-4">
          <p style={{ color: 'var(--color-on-surface-variant)' }}>
            No changelog entries yet. Updates will appear here as the icon system evolves.
          </p>
        </div>
      ),
    },
  ];

  return (
    <PageShell
      title="Iconography"
      description="TARMAC uses Google Material Icons — a comprehensive library of 500+ icons organized into 16 categories, available in filled and outlined styles at 6 standard sizes (12–32px)."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
