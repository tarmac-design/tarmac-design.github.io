'use client';
import { PageShell } from '@/components/PageShell';
import { ImagePlaceholder } from '@/components/ImagePlaceholder';

export default function LogoPage() {
  return (
    <PageShell title="TARMAC Logo" description="The TARMAC logo is visualized as a Moving Red Dot — a parcel's certainty on the map, a vehicle's streak of light on the highway, and the vital pulse of our entire network.">
      <h2>What is Tarmac?</h2>
      <p>
        Tarmac is a durable paving material made from crushed stone bound with tar, creating a hard surface for roads, driveways, and airport runways. It provides a smooth, resilient ground surface for heavy use — the perfect metaphor for a design system that provides the reliable foundation for all digital products.
      </p>

      <ImagePlaceholder label="TARMAC logo — Primary lockup" path="/assets/images/tarmac-logo-primary.png" height={200} />

      <h2>Why Tarmac?</h2>
      <p>
        The Tarmac Design System begins with the most critical element of Delhivery's operation: <strong>Movement</strong>. Just as tarmac provides the surface that enables all physical movement in logistics, our design system provides the digital surface that enables all product experiences.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <div className="text-xl mb-2">🚀</div>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>Mission</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            To translate the precision of our network into digital experiences that are clear, adaptable, and human-led.
          </p>
        </div>
        <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <div className="text-xl mb-2">🔭</div>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>Vision</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            To be the blueprint for the entire ecosystem, reflecting the certainty of the Moving Red Box.
          </p>
        </div>
      </div>

      <h2>The Logo</h2>
      <p>
        We see the TARMAC logo visualized as a <strong>Moving Red Dot</strong> — a parcel's certainty on the map, a vehicle's streak of light on the highway, and the vital pulse of our entire network. The red square with the white "T" represents both the brand initial and the structural foundation of the tarmac surface.
      </p>

      <h2>Logo Types</h2>
      <p>Logos are treated as system components, not static assets. Each follows a shared structure, sizing logic, and usage rules.</p>
      <div className="space-y-4 mb-6">
        <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>Wordmark</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            The full textual representation of the product or brand. Used when space allows and clear identification is required — ideal for headers, dashboards, and brand-forward surfaces.
          </p>
        </div>
        <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>Logomark</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            A compact symbolic version derived from the wordmark. Used in constrained spaces such as navigation bars, app launchers, favicons, or dense UI layouts.
          </p>
        </div>
        <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--color-outline)', background: 'var(--color-surface-container-low)' }}>
          <h4 className="font-semibold mb-1" style={{ color: 'var(--color-on-surface)' }}>Pictorial</h4>
          <p className="text-sm" style={{ color: 'var(--color-on-surface-variant)' }}>
            An iconic visual mark representing the brand. Used for app icons, social media avatars, and contexts where the wordmark is too wide.
          </p>
        </div>
      </div>

      <h2>Logo Sizes</h2>
      <table>
        <thead><tr><th>Size</th><th>Height</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>XXSmall</td><td>14px</td><td>Micro contexts, dense data UI</td></tr>
          <tr><td>XSmall</td><td>16px</td><td>Favicons, compact nav, footer</td></tr>
          <tr><td>Small</td><td>24px</td><td>Navigation bars, sidebar headers</td></tr>
          <tr><td>Medium</td><td>28px</td><td>Standard headers, toolbars</td></tr>
          <tr><td>Large</td><td>34px</td><td>Dashboard headers, landing pages</td></tr>
          <tr><td>XLarge</td><td>48px</td><td>Hero sections, splash screens, marketing</td></tr>
        </tbody>
      </table>

      <h2>Color Variants</h2>
      <table>
        <thead><tr><th>Variant</th><th>Background</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>Black</td><td>Light backgrounds</td><td>Default for light mode UI</td></tr>
          <tr><td>White</td><td>Dark backgrounds</td><td>Default for dark mode UI, overlays</td></tr>
        </tbody>
      </table>

      <h2>Clear Space &amp; Minimum Size</h2>
      <p>Maintain a minimum clear space around the logo equal to the height of the "T" character.</p>
      <table>
        <thead><tr><th>Context</th><th>Minimum Height</th></tr></thead>
        <tbody>
          <tr><td>Digital (web/app)</td><td>14px (XXSmall)</td></tr>
          <tr><td>Print</td><td>0.5 inch</td></tr>
          <tr><td>Favicon</td><td>16px × 16px</td></tr>
        </tbody>
      </table>

      <h2>Usage Guidelines</h2>
      <ul>
        <li>Don't stretch or distort the logo</li>
        <li>Don't change the logo colors outside approved variants</li>
        <li>Don't place the logo on busy backgrounds without sufficient contrast</li>
        <li>Don't add effects like shadows or gradients to the logo</li>
        <li>Don't rotate or skew the logo</li>
        <li>Always use the provided assets — never recreate the logo</li>
      </ul>

      <ImagePlaceholder label="Logo usage — Clear space, minimum size, color variants" path="/assets/images/logo-usage-guidelines.png" aspect="900/348" />
    </PageShell>
  );
}
