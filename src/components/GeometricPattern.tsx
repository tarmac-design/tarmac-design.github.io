'use client';

export function GeometricPattern() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Left pattern */}
      <svg
        className="absolute left-0 top-0 h-full w-[300px] opacity-[0.04]"
        viewBox="0 0 300 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin slice"
      >
        {/* Large circle */}
        <circle cx="60" cy="200" r="120" fill="var(--color-on-surface)" />
        {/* Half circle */}
        <path d="M0 450 A90 90 0 0 1 180 450" fill="var(--color-on-surface)" />
        {/* Triangle */}
        <polygon points="40,600 180,600 110,500" fill="var(--color-on-surface)" />
        {/* Rectangle */}
        <rect x="20" y="680" width="140" height="80" rx="0" fill="var(--color-on-surface)" />
        {/* Small circle */}
        <circle cx="200" cy="100" r="60" fill="var(--color-on-surface)" />
        {/* Quarter circle */}
        <path d="M0 0 L0 160 A160 160 0 0 0 160 0 Z" fill="var(--color-on-surface)" />
        {/* Diamond */}
        <polygon points="220,350 280,420 220,490 160,420" fill="var(--color-on-surface)" />
        {/* Arch */}
        <path d="M60 800 L60 850 A60 60 0 0 0 180 850 L180 800 Z" fill="var(--color-on-surface)" />
      </svg>

      {/* Right pattern */}
      <svg
        className="absolute right-0 top-0 h-full w-[300px] opacity-[0.04]"
        viewBox="0 0 300 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMin slice"
      >
        {/* Quarter circle top-right */}
        <path d="M300 0 L300 160 A160 160 0 0 1 140 0 Z" fill="var(--color-on-surface)" />
        {/* Grid squares */}
        <rect x="180" y="200" width="50" height="50" fill="var(--color-on-surface)" />
        <rect x="240" y="200" width="50" height="50" fill="var(--color-on-surface)" />
        <rect x="180" y="260" width="50" height="50" fill="var(--color-on-surface)" />
        {/* Circle */}
        <circle cx="240" cy="400" r="80" fill="var(--color-on-surface)" />
        {/* Triangle pointing down */}
        <polygon points="160,550 300,550 230,650" fill="var(--color-on-surface)" />
        {/* Half circle right */}
        <path d="M300 700 A80 80 0 0 1 300 860" fill="var(--color-on-surface)" />
        {/* Small squares grid */}
        <rect x="140" y="720" width="40" height="40" fill="var(--color-on-surface)" />
        <rect x="190" y="720" width="40" height="40" fill="var(--color-on-surface)" />
        <rect x="140" y="770" width="40" height="40" fill="var(--color-on-surface)" />
        <rect x="190" y="770" width="40" height="40" fill="var(--color-on-surface)" />
        {/* Arch */}
        <path d="M200 180 A40 40 0 0 1 280 180" fill="var(--color-on-surface)" />
      </svg>
    </div>
  );
}
