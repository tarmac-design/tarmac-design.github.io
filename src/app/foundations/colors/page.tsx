'use client';
import { useState, useCallback, useEffect } from 'react';
import { PageShell } from '@/components/PageShell';
import { Info, DoDont } from '@/components/mdx';
import {
  brandAccentColors, neutralColors, alphaColors,
  surfaceTokens, textTokens, borderTokens,
  type ColorFamily, type Shade, type AlphaColor, type SemanticGroup, type TextToken,
} from './colorData';

/* ─── helpers ─── */
function isLight(hex: string) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

/* ─── Resolve semantic ref like "Blue.500" → hex ─── */
function buildColorMap() {
  const map: Record<string, string> = {};
  const allFamilies = [...brandAccentColors, ...neutralColors];
  for (const f of allFamilies) {
    // Extract short name: "Red (Velocity Red)" → "Red", "Black (Tar Black)" → "Black", "Grey (Cargo Grey)" → "Grey", "Charcoal (Coal)" → "Coal"
    let key = f.name.split('(')[0].trim();
    // Special mappings from Figma naming
    if (key === 'Charcoal') key = 'Coal';
    if (key === 'Grey') key = 'Grey';
    // Also map DLV Red → Red for accent tokens
    for (const shade of f.shades) {
      map[`${key}.${shade.s}`] = shade.h;
    }
    // Alias: "Red" also as "DLV Red" for accent semantic tokens
    if (key === 'Red') {
      for (const shade of f.shades) {
        map[`DLV Red.${shade.s}`] = shade.h;
      }
    }
  }
  return map;
}
const colorMap = buildColorMap();

/* ─── Color Detail Popup ─── */
function ColorPopup({
  family,
  shadeIndex,
  onClose,
  onNav,
  onJump,
}: {
  family: ColorFamily;
  shadeIndex: number;
  onClose: () => void;
  onNav: (dir: -1 | 1) => void;
  onJump: (index: number) => void;
}) {
  const shade = family.shades[shadeIndex];
  const light = isLight(shade.h);
  const [copied, setCopied] = useState(false);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onNav(-1);
    if (e.key === 'ArrowRight') onNav(1);
  }, [onClose, onNav]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const handleCopy = () => {
    copyToClipboard(shade.h);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* nav arrows */}
      {shadeIndex > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav(-1); }}
          className="absolute left-4 sm:left-8 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}
          aria-label="Previous shade"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}
      {shadeIndex < family.shades.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav(1); }}
          className="absolute right-4 sm:right-8 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}
          aria-label="Next shade"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      )}

      {/* card */}
      <div
        className="relative z-10 w-[90vw] max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ border: '1px solid var(--color-outline)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* large swatch */}
        <div
          className="w-full h-48 sm:h-56 flex items-end p-5"
          style={{ backgroundColor: shade.h }}
        >
          <span className="text-lg font-bold" style={{ color: light ? '#000' : '#fff' }}>
            {family.name.split('(')[0].trim()} {shade.s}
          </span>
        </div>
        {/* details */}
        <div className="p-5" style={{ background: 'var(--color-surface)' }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-mono font-semibold" style={{ color: 'var(--color-on-surface)' }}>{shade.h}</span>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{
                background: copied ? '#1BA86E' : 'var(--color-surface-variant)',
                color: copied ? '#fff' : 'var(--color-on-surface)',
                border: '1px solid var(--color-outline)',
              }}
            >
              {copied ? 'Copied!' : 'Copy HEX'}
            </button>
          </div>
          {/* shade strip */}
          <div className="flex gap-0.5 rounded-lg overflow-hidden">
            {family.shades.map((s, i) => (
              <button
                key={s.s}
                onClick={() => { if (i !== shadeIndex) onJump(i); }}
                className="flex-1 h-6 transition-all"
                style={{
                  backgroundColor: s.h,
                  outline: i === shadeIndex ? '2px solid var(--color-primary)' : 'none',
                  outlineOffset: '-1px',
                  borderRadius: i === 0 ? '4px 0 0 4px' : i === family.shades.length - 1 ? '0 4px 4px 0' : '0',
                }}
                title={`${s.s}: ${s.h}`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] font-mono" style={{ color: 'var(--color-on-surface-variant)' }}>{family.shades[0].s}</span>
            <span className="text-[10px] font-mono" style={{ color: 'var(--color-on-surface-variant)' }}>{family.shades[family.shades.length - 1].s}</span>
          </div>
        </div>
        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: light ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)', color: light ? '#000' : '#fff' }}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Simple Single-Color Popup (for alpha & semantic) ─── */
type SimplePopupItem = { hex: string; label: string; sublabel?: string; opacity?: number };

function SimpleColorPopup({
  items,
  index,
  onClose,
  onNav,
}: {
  items: SimplePopupItem[];
  index: number;
  onClose: () => void;
  onNav: (dir: -1 | 1) => void;
}) {
  const item = items[index];
  const light = isLight(item.hex);
  const [copied, setCopied] = useState(false);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && index > 0) onNav(-1);
    if (e.key === 'ArrowRight' && index < items.length - 1) onNav(1);
  }, [onClose, onNav, index, items.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const handleCopy = () => {
    const text = item.opacity != null ? `${item.hex} @ ${Math.round(item.opacity * 100)}%` : item.hex;
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* prev arrow */}
      {index > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav(-1); }}
          className="absolute left-4 sm:left-8 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}
          aria-label="Previous"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}
      {/* next arrow */}
      {index < items.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNav(1); }}
          className="absolute right-4 sm:right-8 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          style={{ background: 'var(--color-surface)', color: 'var(--color-on-surface)', border: '1px solid var(--color-outline)' }}
          aria-label="Next"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      )}

      <div
        className="relative z-10 w-[90vw] max-w-sm rounded-2xl overflow-hidden shadow-2xl"
        style={{ border: '1px solid var(--color-outline)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-full h-48 sm:h-56 flex items-end p-5"
          style={{ backgroundColor: item.hex, opacity: item.opacity ?? 1 }}
        />
        {/* overlay label on top of swatch */}
        <div className="absolute top-0 left-0 right-0 h-48 sm:h-56 flex items-end p-5 pointer-events-none">
          <span className="text-lg font-bold" style={{ color: light && (item.opacity ?? 1) > 0.3 ? '#000' : '#fff' }}>
            {item.label}
          </span>
        </div>
        <div className="p-5" style={{ background: 'var(--color-surface)' }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xl font-mono font-semibold block" style={{ color: 'var(--color-on-surface)' }}>{item.hex}</span>
              {item.opacity != null && (
                <span className="text-sm font-mono" style={{ color: 'var(--color-on-surface-variant)' }}>Opacity: {Math.round(item.opacity * 100)}%</span>
              )}
              {item.sublabel && (
                <span className="text-sm block mt-1" style={{ color: 'var(--color-on-surface-variant)' }}>{item.sublabel}</span>
              )}
            </div>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0"
              style={{
                background: copied ? '#1BA86E' : 'var(--color-surface-variant)',
                color: copied ? '#fff' : 'var(--color-on-surface)',
                border: '1px solid var(--color-outline)',
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          {/* counter */}
          <div className="text-center mt-3">
            <span className="text-[11px] font-mono" style={{ color: 'var(--color-on-surface-variant)' }}>{index + 1} / {items.length}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: light && (item.opacity ?? 1) > 0.3 ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)', color: light && (item.opacity ?? 1) > 0.3 ? '#000' : '#fff' }}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Palette Row — full width, equal stretch ─── */
function PaletteRow({
  family,
  onSwatchClick,
}: {
  family: ColorFamily;
  onSwatchClick: (family: ColorFamily, index: number) => void;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-on-surface)' }}>
        {family.name}
      </h3>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${family.shades.length}, 1fr)` }}>
        {family.shades.map((shade, i) => (
          <button
            key={shade.s}
            onClick={() => onSwatchClick(family, i)}
            className="group cursor-pointer text-center min-w-0"
            title={`${shade.s}: ${shade.h}`}
          >
            <div
              className="w-full aspect-[4/3] rounded-md border transition-all group-hover:scale-105 group-hover:shadow-lg"
              style={{ backgroundColor: shade.h, borderColor: 'var(--color-outline)' }}
            />
            <div className="text-[10px] font-medium mt-1 truncate" style={{ color: 'var(--color-on-surface)' }}>{shade.s}</div>
            <div className="text-[9px] font-mono truncate" style={{ color: 'var(--color-on-surface-variant)' }}>{shade.h}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Alpha Row — full width, equal stretch ─── */
function AlphaRow({ alpha, onSwatchClick }: { alpha: AlphaColor; onSwatchClick: (items: SimplePopupItem[], index: number) => void }) {
  const items: SimplePopupItem[] = alpha.opacities.map((op) => ({
    hex: alpha.hex,
    label: `${alpha.name} ${op}`,
    opacity: parseInt(op) / 100,
  }));

  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-on-surface)' }}>{alpha.name}</h3>
      <div className="grid grid-cols-6 gap-1">
        {alpha.opacities.map((op, i) => {
          const opVal = parseInt(op) / 100;
          return (
            <button
              key={op}
              className="text-center group cursor-pointer"
              onClick={() => onSwatchClick(items, i)}
              title={`${alpha.name} ${op}`}
            >
              <div
                className="w-full aspect-[4/3] rounded-md border transition-all group-hover:scale-105 group-hover:shadow-lg"
                style={{
                  backgroundColor: alpha.hex,
                  opacity: opVal,
                  borderColor: 'var(--color-outline)',
                }}
              />
              <div className="text-[10px] font-medium mt-1" style={{ color: 'var(--color-on-surface)' }}>{op}</div>
              <div className="text-[9px] font-mono" style={{ color: 'var(--color-on-surface-variant)' }}>{alpha.hex}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Semantic Token Table ─── */
function SemanticTable({ group, onSwatchClick }: { group: SemanticGroup | TextToken; onSwatchClick: (items: SimplePopupItem[], index: number) => void }) {
  // Build flat list of all items across both modes for navigation
  const allItems: SimplePopupItem[] = [];
  for (const mode of ['light', 'dark'] as const) {
    for (const t of group[mode]) {
      allItems.push({
        hex: colorMap[t.ref] || '#888888',
        label: `${group.token}.${mode}.${t.level}`,
        sublabel: `Ref: ${t.ref}`,
      });
    }
  }

  let flatIndex = 0;
  return (
    <div className="mb-6">
      <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--color-on-surface)' }}>
        <code className="text-sm px-1.5 py-0.5 rounded" style={{ background: 'var(--color-surface-variant)' }}>{group.token}</code>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(['light', 'dark'] as const).map((mode) => (
          <div key={mode}>
            <div className="text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: 'var(--color-on-surface-variant)' }}>{mode}</div>
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${group[mode].length}, 1fr)` }}>
              {group[mode].map((t) => {
                const idx = flatIndex++;
                return (
                  <button
                    key={t.level}
                    className="text-center min-w-0 group cursor-pointer"
                    onClick={() => onSwatchClick(allItems, idx)}
                    title={`${group.token}.${mode}.${t.level} → ${t.ref}`}
                  >
                    <div className="w-full aspect-[5/4] rounded border flex items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-lg" style={{ backgroundColor: colorMap[t.ref] || 'var(--color-surface-variant)', borderColor: 'var(--color-outline)' }}>
                      <span className="text-[8px] font-mono truncate px-0.5" style={{ color: isLight(colorMap[t.ref] || '#888888') ? '#000' : '#fff' }}>{t.ref.split('.')[1]}</span>
                    </div>
                    <div className="text-[9px] mt-1 font-medium truncate" style={{ color: 'var(--color-on-surface)' }}>{t.level}</div>
                    <div className="text-[8px] font-mono truncate" style={{ color: 'var(--color-on-surface-variant)' }}>{t.ref}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Sub-nav for Examples tab ─── */
const exampleSections = ['Brand/Accent', 'Neutrals', 'Alpha', 'Semantic'] as const;
type ExampleSection = typeof exampleSections[number];

/* ─── Tab: Examples ─── */
function ExamplesTab() {
  const [section, setSection] = useState<ExampleSection>('Brand/Accent');
  const [popup, setPopup] = useState<{ family: ColorFamily; index: number } | null>(null);
  const [simplePopup, setSimplePopup] = useState<{ items: SimplePopupItem[]; index: number } | null>(null);

  const handleSwatchClick = (family: ColorFamily, index: number) => {
    setPopup({ family, index });
  };

  const handleNav = (dir: number) => {
    if (!popup) return;
    const newIndex = popup.index + dir;
    if (newIndex >= 0 && newIndex < popup.family.shades.length) {
      setPopup({ ...popup, index: newIndex });
    }
  };

  return (
    <div className="mdx-content">
      {/* Popup — palette families */}
      {popup && (
        <ColorPopup
          family={popup.family}
          shadeIndex={popup.index}
          onClose={() => setPopup(null)}
          onNav={(dir) => handleNav(dir)}
          onJump={(i) => setPopup({ ...popup, index: i })}
        />
      )}

      {/* Popup — alpha & semantic */}
      {simplePopup && (
        <SimpleColorPopup
          items={simplePopup.items}
          index={simplePopup.index}
          onClose={() => setSimplePopup(null)}
          onNav={(dir) => {
            const newIdx = simplePopup.index + dir;
            if (newIdx >= 0 && newIdx < simplePopup.items.length) {
              setSimplePopup({ ...simplePopup, index: newIdx });
            }
          }}
        />
      )}

      {/* Sub-nav pills */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {exampleSections.map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={{
              backgroundColor: section === s ? 'var(--color-on-surface)' : 'transparent',
              color: section === s ? 'var(--color-surface)' : 'var(--color-on-surface-variant)',
              border: `1px solid ${section === s ? 'var(--color-on-surface)' : 'var(--color-outline)'}`,
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {section === 'Brand/Accent' && (
        <>
          <h2>Brand / Accent Colors</h2>
          <p>10 color families, each with 13 shades from 15 (lightest) to 950 (darkest). The 500 shade is the primary value. Click any swatch to view details.</p>
          {brandAccentColors.map((f) => <PaletteRow key={f.name} family={f} onSwatchClick={handleSwatchClick} />)}
        </>
      )}

      {section === 'Neutrals' && (
        <>
          <h2>Neutral Colors</h2>
          <p>4 neutral families with 11 shades each (25→500). Used for backgrounds, text, borders, and structural elements.</p>
          {neutralColors.map((f) => <PaletteRow key={f.name} family={f} onSwatchClick={handleSwatchClick} />)}
        </>
      )}

      {section === 'Alpha' && (
        <>
          <h2>Alpha Colors</h2>
          <p>Opacity variants of core colors at 5%, 10%, 20%, 40%, 60%, and 80%. Used for overlays, states, elevation, and subtle emphasis.</p>
          {alphaColors.map((a) => (
            <AlphaRow
              key={a.name}
              alpha={a}
              onSwatchClick={(items, index) => setSimplePopup({ items, index })}
            />
          ))}
        </>
      )}

      {section === 'Semantic' && (
        <>
          <h2>Semantic Tokens</h2>
          <p>Purpose-driven tokens mapped to core palette values. Each token has light and dark mode variants with intensity levels.</p>

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: 'var(--color-on-surface)' }}>Surface</h3>
          {surfaceTokens.map((g) => <SemanticTable key={g.token} group={g} onSwatchClick={(items, index) => setSimplePopup({ items, index })} />)}

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: 'var(--color-on-surface)' }}>Text</h3>
          {textTokens.map((g) => <SemanticTable key={g.token} group={g} onSwatchClick={(items, index) => setSimplePopup({ items, index })} />)}

          <h3 className="text-lg font-semibold mt-6 mb-3" style={{ color: 'var(--color-on-surface)' }}>Border</h3>
          {borderTokens.map((g) => <SemanticTable key={g.token} group={g} onSwatchClick={(items, index) => setSimplePopup({ items, index })} />)}
        </>
      )}
    </div>
  );
}

/* ─── Tab: Usage ─── */
function UsageTab() {
  return (
    <div className="mdx-content">
      <h2>Color Architecture</h2>
      <Info>Always use semantic tokens in your UI code rather than raw hex values. Semantic tokens ensure your interfaces adapt correctly to themes and maintain consistent meaning across contexts.</Info>
      <p>TARMAC uses a 3-layer token system:</p>
      <ol>
        <li><strong>Core Tokens</strong> — Raw color values (hex codes). These are the palette. No component or screen should reference them directly.</li>
        <li><strong>Semantic Tokens</strong> — Purpose-driven aliases mapped to core palette values (e.g., <code>surface.background.light.Default</code> → <code>White.500</code>).</li>
        <li><strong>Usage Tokens</strong> — Component-specific mappings (e.g., <code>button.background.primary</code>).</li>
      </ol>

      <h2>Core Color Rules</h2>
      <ul>
        <li>Core colors are palette-only — no component or screen should reference them directly</li>
        <li>Changes at the core layer automatically propagate through semantic layers</li>
        <li>Brand/Accent families: Red, Blue, Green, Cyan, Yellow, Crimson, Cardbox, Orange, Purple, Pink</li>
        <li>Neutral families: Tar Black, Optic White, Cargo Grey, Charcoal (Coal)</li>
        <li>Alpha colors: Opacity variants for overlays, states, elevation, and subtle emphasis</li>
      </ul>

      <h2>Semantic Roles</h2>
      <table>
        <thead><tr><th>Role</th><th>Purpose</th><th>Core Mapping</th></tr></thead>
        <tbody>
          <tr><td>Accent</td><td>Brand identity, primary actions</td><td>Red (DLV Red)</td></tr>
          <tr><td>Info</td><td>Helpful guidance, neutral alerts, links</td><td>Blue</td></tr>
          <tr><td>Success</td><td>Confirmation, completion, positive state</td><td>Green</td></tr>
          <tr><td>Error</td><td>Failure, blocking issues, destructive actions</td><td>Crimson</td></tr>
          <tr><td>Warning</td><td>Caution, potential risk, needs attention</td><td>Yellow</td></tr>
        </tbody>
      </table>

      <h2>Accessibility Guidelines</h2>
      <p>Accessibility is enforced at the semantic layer, not manually per screen.</p>
      <ul>
        <li>Body text: WCAG AA (4.5:1) minimum contrast</li>
        <li>Large text: 3:1 minimum contrast</li>
        <li>Icon &amp; UI elements: Minimum 3:1 against background</li>
        <li>Never rely on color alone to convey meaning — pair with icons, text, or shape</li>
        <li>Avoid low-contrast alpha overlays for critical content</li>
        <li>Hover, focus, and active states must remain distinguishable</li>
        <li>Error and success colors should not rely solely on red/green differentiation</li>
      </ul>

      <h2>Do&apos;s &amp; Don&apos;ts</h2>
      <DoDont slug="colors"
        doItems={[
          "Use semantic tokens instead of raw hex values",
          "Ensure all text meets WCAG AA contrast ratios (4.5:1)",
          "Use brand red sparingly — only for primary actions and accents",
          "Pair color with icons, text, or shape to convey meaning",
        ]}
        dontItems={[
          "Hardcode hex values in component styles",
          "Use color alone to convey meaning",
          "Mix core tokens and semantic tokens in the same component",
          "Use low-contrast alpha overlays for critical content",
        ]}
      />
    </div>
  );
}

/* ─── Tab: Code ─── */
function CodeTab() {
  return (
    <div className="mdx-content">
      <h2>CSS Custom Properties</h2>
      <pre><code>{`:root {
  /* Core — Brand */
  --color-red-500: #ED1B36;
  --color-blue-500: #2396FB;
  --color-green-500: #1BA86E;
  --color-yellow-500: #CF9F02;
  --color-crimson-500: #DC143C;

  /* Core — Neutral */
  --color-black-500: #000000;
  --color-white-500: #FFFFFF;
  --color-grey-500: #666666;
  --color-coal-500: #3D445C;

  /* Semantic — Surface (light) */
  --color-surface-background: var(--color-white-500);
  --color-surface-neutral: var(--color-grey-500);
  --color-surface-accent: var(--color-red-500);

  /* Semantic — Text (light) */
  --color-text-heading-primary: var(--color-black-400);
  --color-text-body-primary: var(--color-black-400);
  --color-text-info-primary: var(--color-blue-500);
  --color-text-error-primary: var(--color-crimson-500);

  /* Semantic — Border (light) */
  --color-border-neutral-primary: var(--color-white-300);
  --color-border-info-primary: var(--color-blue-400);
}`}</code></pre>

      <h2>JavaScript Constants</h2>
      <pre><code>{`import { colors } from '@tarmac/design-system/tokens';

// Core palette
colors.red[500]     // '#ED1B36'
colors.blue[500]    // '#2396FB'
colors.black[500]   // '#000000'
colors.grey[500]    // '#666666'

// Semantic tokens
colors.semantic.surface.background.light.default  // White.500
colors.semantic.text.heading.light.primary        // Black.400
colors.semantic.border.neutral.light.primary      // White.300`}</code></pre>

      <h2>Tailwind Integration</h2>
      <pre><code>{`// tailwind.config.ts
import { tarmacColors } from '@tarmac/design-system/tailwind';

export default {
  theme: {
    extend: {
      colors: tarmacColors,
    },
  },
};`}</code></pre>
    </div>
  );
}

/* ─── Main Page ─── */
export default function ColorsPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Changelog', content: (
      <div className="mdx-content py-4">
        <p style={{ color: 'var(--color-on-surface-variant)' }}>No changelog entries yet. Updates will appear here as the color system evolves.</p>
      </div>
    )},
  ];

  return (
    <PageShell
      title="Colors"
      description="TARMAC's color system — a 3-layer architecture of Core, Semantic, and Usage tokens with 10 brand/accent families, 4 neutral families, alpha variants, and full light/dark semantic mappings."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
