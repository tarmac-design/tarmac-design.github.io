'use client';

export function TarmacLogo({ height = 24 }: { height?: number }) {
  const scale = height / 24;
  return (
    <svg
      width={160 * scale}
      height={height}
      viewBox="0 0 160 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* T with red accent */}
      <rect x="0" y="0" width="4" height="24" fill="var(--color-on-surface)" />
      <rect x="0" y="0" width="18" height="4" fill="var(--color-on-surface)" />
      <rect x="0" y="0" width="4" height="4" fill="#ED1B36" />
      {/* A */}
      <path d="M28 24L36 0H40L48 24H44L42.4 19H33.6L32 24H28ZM34.8 15.5H41.2L38 5L34.8 15.5Z" fill="var(--color-on-surface)" />
      {/* R */}
      <path d="M52 0H62C64.2 0 66 0.8 67.2 2C68.4 3.2 69 4.8 69 6.5C69 8.2 68.4 9.8 67.2 11C66.4 11.8 65.4 12.4 64 12.7L69.5 24H65L59.8 13H56V24H52V0ZM56 9.5H61.5C62.6 9.5 63.4 9.2 64 8.5C64.6 7.8 65 7.2 65 6.5C65 5.8 64.6 5.2 64 4.5C63.4 3.8 62.6 3.5 61.5 3.5H56V9.5Z" fill="var(--color-on-surface)" />
      {/* M */}
      <path d="M74 0H79L86 16L93 0H98V24H94V7L87.5 22H84.5L78 7V24H74V0Z" fill="var(--color-on-surface)" />
      {/* A */}
      <path d="M104 24L112 0H116L124 24H120L118.4 19H109.6L108 24H104ZM110.8 15.5H117.2L114 5L110.8 15.5Z" fill="var(--color-on-surface)" />
      {/* C */}
      <path d="M140 4C138.8 3.4 137.4 3 136 3C132 3 129 6.4 129 12C129 17.6 132 21 136 21C137.4 21 138.8 20.6 140 20V24C138.6 24.6 137.2 25 135.5 25C129.5 25 125 19.5 125 12C125 4.5 129.5 -1 135.5 -1C137.2 -1 138.6 -0.6 140 0V4Z" fill="var(--color-on-surface)" />
    </svg>
  );
}

export function TarmacLogoCompact({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="6" fill="var(--color-on-surface)" />
      <rect x="6" y="6" width="16" height="3.5" fill="var(--color-on-primary)" />
      <rect x="6" y="6" width="3.5" height="16" fill="var(--color-on-primary)" />
      <rect x="6" y="6" width="3.5" height="3.5" fill="#ED1B36" />
    </svg>
  );
}
