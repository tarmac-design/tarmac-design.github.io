'use client';

/*
  Changelog Component — TARMAC Design System
  
  Renders a structured changelog following Keep a Changelog format.
  Categories: Added, Changed, Deprecated, Removed, Fixed, Security
  Versioning: Semantic (MAJOR.MINOR.PATCH)
*/

export type ChangelogCategory = 'Added' | 'Changed' | 'Deprecated' | 'Removed' | 'Fixed' | 'Security';

export type ChangelogEntry = {
  version: string;
  date: string;
  author?: string;
  changes: {
    category: ChangelogCategory;
    items: string[];
  }[];
};

const categoryColors: Record<ChangelogCategory, string> = {
  Added: '#1BA86E',
  Changed: '#3B82F6',
  Deprecated: '#F59E0B',
  Removed: '#DC143C',
  Fixed: '#8B5CF6',
  Security: '#EC4899',
};

const categoryIcons: Record<ChangelogCategory, string> = {
  Added: '✚',
  Changed: '↻',
  Deprecated: '⚠',
  Removed: '✕',
  Fixed: '✓',
  Security: '🔒',
};

export function Changelog({ entries }: { entries: ChangelogEntry[] }) {
  return (
    <div className="mdx-content">
      <h2>Changelog</h2>
      <p style={{ color: 'var(--color-on-surface-variant)', marginBottom: '2rem' }}>
        All notable changes to this component are documented here. Format follows{' '}
        <a href="https://keepachangelog.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
          Keep a Changelog
        </a>{' '}
        with{' '}
        <a href="https://semver.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)' }}>
          Semantic Versioning
        </a>.
      </p>

      {entries.map((entry) => (
        <div key={entry.version} className="mb-8 pb-8" style={{ borderBottom: '1px solid var(--color-outline)' }}>
          {/* Version header */}
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="text-lg font-bold" style={{ color: 'var(--color-on-surface)', margin: 0 }}>
              v{entry.version}
            </h3>
            <span className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
              {entry.date}
            </span>
          </div>
          {/* Changes by category */}
          {entry.changes.map((change) => (
            <div key={change.category} className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold"
                  style={{
                    background: `${categoryColors[change.category]}15`,
                    color: categoryColors[change.category],
                    border: `1px solid ${categoryColors[change.category]}30`,
                  }}
                >
                  <span style={{ fontSize: '10px' }}>{categoryIcons[change.category]}</span>
                  {change.category}
                </span>
              </div>
              <ul className="pl-4" style={{ margin: '0 0 8px' }}>
                {change.items.map((item, i) => (
                  <li key={i} className="text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '4px' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
