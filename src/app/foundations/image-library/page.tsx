'use client';
import { useState, useEffect, useCallback } from 'react';
import { PageShell } from '@/components/PageShell';
import { Info, DoDont } from '@/components/mdx';

/* ─── Image Library data from Figma ─── */
type ImageCategory = 'Vehicles' | 'People' | 'Warehouse' | 'Riders' | 'Illustrative';

type ImageItem = {
  name: string;
  category: ImageCategory;
  width: number;
  height: number;
  path: string;
};

const categoryInfo: { key: ImageCategory; label: string; count: number }[] = [
  { key: 'Vehicles', label: 'Vehicles', count: 8 },
  { key: 'People', label: 'People', count: 1 },
  { key: 'Warehouse', label: 'Warehouse', count: 4 },
  { key: 'Riders', label: 'Riders', count: 3 },
  { key: 'Illustrative', label: 'Illustrative', count: 5 },
];

const allImages: ImageItem[] = [
  { name: 'Highway Fleet', category: 'Vehicles', width: 1800, height: 777, path: '/images/vehicles/highway-fleet.jpg' },
  { name: 'Delivery Trucks', category: 'Vehicles', width: 1800, height: 645, path: '/images/vehicles/delivery-trucks.jpg' },
  { name: 'Volvo Fleet', category: 'Vehicles', width: 1800, height: 635, path: '/images/vehicles/volvo-fleet.jpg' },
  { name: 'Urban Delivery', category: 'Vehicles', width: 1800, height: 645, path: '/images/vehicles/urban-delivery.jpg' },
  { name: 'Truck Closeup', category: 'Vehicles', width: 1800, height: 771, path: '/images/vehicles/truck-closeup.jpg' },
  { name: 'Night Operations', category: 'Vehicles', width: 1800, height: 579, path: '/images/vehicles/night-operations.jpg' },
  { name: 'Logistics Hub', category: 'Vehicles', width: 1800, height: 1029, path: '/images/vehicles/logistics-hub.jpg' },
  { name: 'Delivery Van', category: 'Vehicles', width: 843, height: 666, path: '/images/vehicles/delivery-van.jpg' },
  { name: 'Operations Team', category: 'People', width: 1951, height: 627, path: '/images/people/operations-team.jpg' },
  { name: 'Warehouse Interior', category: 'Warehouse', width: 1436, height: 820, path: '/images/warehouse/interior.jpg' },
  { name: 'Sorting Facility', category: 'Warehouse', width: 1436, height: 820, path: '/images/warehouse/sorting-facility.jpg' },
  { name: 'Conveyor Belt A', category: 'Warehouse', width: 688, height: 943, path: '/images/warehouse/conveyor-a.jpg' },
  { name: 'Conveyor Belt B', category: 'Warehouse', width: 688, height: 943, path: '/images/warehouse/conveyor-b.jpg' },
  { name: 'Rider Portrait', category: 'Riders', width: 1120, height: 928, path: '/images/riders/portrait.jpg' },
  { name: 'Rider in Motion', category: 'Riders', width: 1120, height: 928, path: '/images/riders/in-motion.jpg' },
  { name: 'Rider Delivery', category: 'Riders', width: 1024, height: 1024, path: '/images/riders/delivery.jpg' },
  { name: 'Brand Landscape', category: 'Illustrative', width: 1724, height: 985, path: '/images/illustrative/brand-landscape.jpg' },
  { name: 'Abstract Motion', category: 'Illustrative', width: 1724, height: 676, path: '/images/illustrative/abstract-motion.jpg' },
  { name: 'Composition A', category: 'Illustrative', width: 832, height: 1248, path: '/images/illustrative/composition-a.jpg' },
  { name: 'Composition B', category: 'Illustrative', width: 832, height: 1248, path: '/images/illustrative/composition-b.jpg' },
  { name: 'Feature Image', category: 'Illustrative', width: 832, height: 1248, path: '/images/illustrative/feature.jpg' },
];

/* ─── Image Placeholder ─── */
function ImagePlaceholder({ name, width, height, path }: { name: string; width: number; height: number; path: string }) {
  return (
    <div style={{
      width: '100%', aspectRatio: '4/3', background: '#f0f0f0',
      border: '1px dashed #d0d0d0', borderRadius: 8,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 4, padding: 8, minHeight: 80,
    }}>
      <svg width="24" height="20" viewBox="0 0 20 16" fill="none">
        <rect x="1" y="1" width="18" height="14" rx="2" stroke="#d0d0d0" strokeWidth="1.2" />
        <circle cx="7" cy="6" r="2" stroke="#bbb" strokeWidth="1" />
        <path d="M1 12l5-4 3 2.5 4-3.5 6 5" stroke="#bbb" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span style={{ fontSize: 10, color: '#999', fontFamily: 'monospace', lineHeight: 1, textAlign: 'center', maxWidth: '90%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {path.split('/').pop()}
      </span>
    </div>
  );
}

/* ─── Image Popup ─── */
function ImagePopup({ items, index, onClose, onNav }: {
  items: ImageItem[]; index: number; onClose: () => void; onNav: (dir: -1 | 1) => void;
}) {
  const item = items[index];
  const [copied, setCopied] = useState(false);
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && index > 0) onNav(-1);
    if (e.key === 'ArrowRight' && index < items.length - 1) onNav(1);
  }, [onClose, onNav, index, items.length]);
  useEffect(() => { window.addEventListener('keydown', handleKey); return () => window.removeEventListener('keydown', handleKey); }, [handleKey]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      {index > 0 && <button onClick={(e) => { e.stopPropagation(); onNav(-1); }} className="absolute left-4 sm:left-8 z-10 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>}
      {index < items.length - 1 && <button onClick={(e) => { e.stopPropagation(); onNav(1); }} className="absolute right-4 sm:right-8 z-10 w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>}
      <div className="relative z-10 w-[90vw] max-w-lg rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid var(--color-outline)' }} onClick={(e) => e.stopPropagation()}>
        <div className="p-4" style={{ background: '#FFFFFF' }}>
          <ImagePlaceholder name={item.name} width={item.width} height={item.height} path={item.path} />
        </div>
        <div className="p-5" style={{ background: 'var(--color-surface)' }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-base font-semibold block" style={{ color: 'var(--color-on-surface)' }}>{item.name}</span>
              <span className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>{item.category} · {item.width}×{item.height}</span>
            </div>
            <button onClick={() => { navigator.clipboard.writeText(item.path); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium shrink-0" style={{ background: copied ? '#1BA86E' : 'var(--color-surface-variant)', color: copied ? '#fff' : 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}>
              {copied ? 'Copied!' : 'Copy Path'}
            </button>
          </div>
          <code className="text-xs block mt-2 p-2 rounded" style={{ background: 'var(--color-surface-container-low)', color: 'var(--color-on-surface-variant)' }}>{item.path}</code>
          <div className="text-center mt-3"><span className="text-[11px] font-mono" style={{ color: 'var(--color-on-surface-variant)' }}>{index + 1} / {items.length}</span></div>
        </div>
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.15)', color: '#000' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Prompt Template Card ─── */
function PromptCard({ title, template, example }: { title: string; template: string; example: string }) {
  return (
    <div className="p-4 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
      <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-on-surface)' }}>{title}</h4>
      <p className="text-xs mb-2" style={{ color: 'var(--color-on-surface-variant)' }}>{template}</p>
      <div className="p-3 rounded-lg" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-outline)' }}>
        <span className="text-[10px] font-medium block mb-1" style={{ color: 'var(--color-on-surface-variant)' }}>Example:</span>
        <p className="text-xs italic" style={{ color: 'var(--color-on-surface)' }}>&ldquo;{example}&rdquo;</p>
      </div>
    </div>
  );
}

/* ─── Tab: Gallery ─── */
function GalleryTab() {
  const [categoryFilter, setCategoryFilter] = useState<'All' | ImageCategory>('All');
  const [popup, setPopup] = useState<{ index: number } | null>(null);

  const filtered = categoryFilter === 'All' ? allImages : allImages.filter(i => i.category === categoryFilter);

  return (
    <div className="mdx-content">
      {popup && (
        <ImagePopup items={filtered} index={popup.index} onClose={() => setPopup(null)}
          onNav={(dir) => { const n = popup.index + dir; if (n >= 0 && n < filtered.length) setPopup({ index: n }); }} />
      )}

      {/* Filter pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <button onClick={() => setCategoryFilter('All')}
          className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
          style={{
            backgroundColor: categoryFilter === 'All' ? 'var(--color-on-surface)' : 'transparent',
            color: categoryFilter === 'All' ? 'var(--color-surface)' : 'var(--color-on-surface-variant)',
            border: `1px solid ${categoryFilter === 'All' ? 'var(--color-on-surface)' : 'var(--color-outline)'}`,
          }}>All ({allImages.length})</button>
        {categoryInfo.map((c) => (
          <button key={c.key} onClick={() => setCategoryFilter(c.key)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={{
              backgroundColor: categoryFilter === c.key ? 'var(--color-on-surface)' : 'transparent',
              color: categoryFilter === c.key ? 'var(--color-surface)' : 'var(--color-on-surface-variant)',
              border: `1px solid ${categoryFilter === c.key ? 'var(--color-on-surface)' : 'var(--color-outline)'}`,
            }}>{c.label} ({c.count})</button>
        ))}
      </div>

      {/* Image grid by category */}
      {categoryInfo
        .filter(c => categoryFilter === 'All' || categoryFilter === c.key)
        .map((cat) => {
          const catItems = filtered.filter(i => i.category === cat.key);
          if (catItems.length === 0) return null;
          return (
            <div key={cat.key} className="mb-8">
              <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>{cat.label}</h3>
              <p className="text-xs mb-4" style={{ color: 'var(--color-on-surface-variant)' }}>{cat.count} images</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {catItems.map((item) => {
                  const globalIdx = filtered.indexOf(item);
                  return (
                    <button key={item.path} onClick={() => setPopup({ index: globalIdx })}
                      className="rounded-xl border overflow-hidden text-left transition-all hover:shadow-md"
                      style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
                      <div className="w-full p-3" style={{ background: '#FFFFFF' }}>
                        <ImagePlaceholder name={item.name} width={item.width} height={item.height} path={item.path} />
                      </div>
                      <div className="px-3 py-2">
                        <span className="text-[11px] font-medium block truncate" style={{ color: 'var(--color-on-surface)' }}>{item.name}</span>
                        <span className="text-[10px]" style={{ color: 'var(--color-on-surface-variant)' }}>{item.width}×{item.height}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}

/* ─── Tab: Prompt Guide ─── */
function PromptGuideTab() {
  return (
    <div className="mdx-content">
      <h2>Core Prompt Templates</h2>
      <p>All images are generated using Google Gemini. These templates ensure consistent style, controlled composition, and brand alignment.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <PromptCard
          title="Contextual Environment"
          template="Used to establish setting and scale."
          example="A realistic highway environment with multiple delivery trucks moving across long stretches of road, subtle motion blur, overcast sky, and industrial surroundings."
        />
        <PromptCard
          title="Subject-Focused"
          template="Used when the subject must be clearly readable."
          example="A delivery truck parked at a logistics hub, clearly branded, realistic lighting, and sharp detail."
        />
        <PromptCard
          title="Action & Motion"
          template="Used to convey speed, flow, and progress."
          example="A delivery vehicle moving at speed on an urban road at dusk, light trails visible, motion blur emphasizing movement and efficiency."
        />
        <PromptCard
          title="People & Operations"
          template="Used to humanize the system."
          example="A warehouse worker sorting parcels on a conveyor belt, wearing safety gear, natural lighting, candid moment."
        />
        <PromptCard
          title="Mood & Lighting"
          template="Used to control emotional tone."
          example="Soft industrial lighting with cool tones, creating a focused and efficient atmosphere."
        />
        <PromptCard
          title="Composition"
          template="Used to ensure layout compatibility."
          example="Wide-angle composition with the subject centered and negative space on the right for UI content."
        />
      </div>

      <h2>Constraints &amp; Quality Rules</h2>
      <Info>Always include constraints to avoid unwanted results in generated images.</Info>
      <ul>
        <li>Photorealistic, not illustrated</li>
        <li>No abstract or futuristic elements</li>
        <li>No exaggerated colors or effects</li>
        <li>Natural proportions and realistic scale</li>
        <li>No text overlays in the image</li>
      </ul>

      <h2>Example Full Prompt</h2>
      <div className="p-4 rounded-xl" style={{ background: 'var(--color-surface-container-low)', border: '1px solid var(--color-outline)' }}>
        <p className="text-sm italic" style={{ color: 'var(--color-on-surface)' }}>
          &ldquo;A realistic logistics warehouse interior with multiple workers sorting parcels on conveyor belts. Natural industrial lighting, neutral color tones, candid action-focused scene. Wide-angle composition with clear depth and negative space. Photorealistic, grounded, and operational. No text or abstract elements.&rdquo;
        </p>
      </div>
    </div>
  );
}

/* ─── Tab: Usage ─── */
function UsageTab() {
  return (
    <div className="mdx-content">
      <h2>Overview</h2>
      <Info>The image library supports storytelling, scale, and realism across the product ecosystem. Images ground digital experiences in the real world — reflecting movement, infrastructure, people, and operations. They should feel authentic, operational, and purposeful, never generic or stock-like.</Info>

      <h2>Principles</h2>
      <ul>
        <li><strong>Authentic &amp; operational</strong> — Images reflect real logistics environments, not staged or stock photography</li>
        <li><strong>Consistent generation</strong> — All images use Google Gemini with controlled prompts for style consistency</li>
        <li><strong>Purposeful composition</strong> — Every image is composed for specific UI contexts with space for overlays</li>
        <li><strong>Brand-aligned</strong> — Visual direction stays true to Delhivery&apos;s identity and operational reality</li>
      </ul>

      <h2>Do&apos;s &amp; Don&apos;ts</h2>
      <DoDont slug="image-library"
        doItems={[
          'Be specific and descriptive in prompts',
          'Anchor scenes in real environments',
          'Define lighting and composition',
          'Keep subjects clear and readable',
        ]}
        dontItems={[
          'Use vague or generic descriptions',
          'Create abstract or conceptual imagery',
          'Over-stylize or dramatize scenes',
          'Rely on imagery to convey critical information',
        ]}
      />

      <h2>Technical Guidelines</h2>
      <table>
        <thead><tr><th>Property</th><th>Guideline</th></tr></thead>
        <tbody>
          <tr><td>Format</td><td>WebP preferred, JPEG fallback</td></tr>
          <tr><td>Resolution</td><td>2x for retina displays</td></tr>
          <tr><td>Alt text</td><td>Always include meaningful descriptions</td></tr>
          <tr><td>Loading</td><td>Lazy load below-the-fold images</td></tr>
          <tr><td>Aspect ratios</td><td>16:9 (hero), 4:3 (cards), 1:1 (avatars), 3:2 (features)</td></tr>
        </tbody>
      </table>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ImageLibraryPage() {
  const tabs = [
    { label: 'Gallery', content: <GalleryTab /> },
    { label: 'Prompt Guide', content: <PromptGuideTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: (
      <div className="mdx-content py-4">
        <p style={{ color: 'var(--color-on-surface-variant)' }}>No changelog entries yet.</p>
      </div>
    )},
  ];

  return (
    <PageShell title="Image Library"
      description="Photorealistic, AI-generated imagery for the Delhivery ecosystem — vehicles, people, warehouses, riders, and illustrative compositions. All generated with Google Gemini."
      tabs={tabs}>
      <GalleryTab />
    </PageShell>
  );
}
