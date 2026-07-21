'use client';

type PlatformStatus = 'available' | 'in-progress' | 'planned' | 'not-available';

interface PlatformEntry {
  platform: string;
  status: PlatformStatus;
  link?: string;
}

const statusConfig: Record<PlatformStatus, { label: string; borderColor: string; color: string }> = {
  available: { label: 'Available', borderColor: '#1BA86E', color: '#1BA86E' },
  'in-progress': { label: 'In Progress', borderColor: '#CF9F02', color: '#CF9F02' },
  planned: { label: 'Planned', borderColor: '#3B82F6', color: '#3B82F6' },
  'not-available': { label: 'Not Available', borderColor: '#6b7280', color: '#6b7280' },
};

function StatusPill({ status }: { status: PlatformStatus }) {
  const config = statusConfig[status];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '1px 8px', borderRadius: '9999px', fontSize: '11px', fontWeight: 500, backgroundColor: 'transparent', color: config.color, border: `1px solid ${config.borderColor}`, lineHeight: '18px' }}>
      {config.label}
    </span>
  );
}

interface AvailabilityTableProps {
  platforms?: PlatformEntry[];
  storybookUrl?: string;
}

const defaultPlatforms: PlatformEntry[] = [
  { platform: 'React', status: 'available' },
  { platform: 'Angular', status: 'available' },
  { platform: 'Figma', status: 'available' },
  { platform: 'Android', status: 'in-progress' },
  { platform: 'iOS', status: 'in-progress' },
  { platform: 'GitHub', status: 'available' },
];

export function AvailabilityTable({ platforms = defaultPlatforms, storybookUrl }: AvailabilityTableProps) {
  return (
    <table>
      <thead><tr><th>Platform</th><th>Status</th><th>Link</th></tr></thead>
      <tbody>
        {platforms.map((entry) => (
          <tr key={entry.platform}>
            <td>{entry.platform}</td>
            <td><StatusPill status={entry.status} /></td>
            <td>{storybookUrl ? <a href={storybookUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontSize: '13px' }}>View →</a> : <span style={{ color: '#9ca3af', fontSize: '13px' }}>—</span>}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
