'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

const foundations = [
  {
    category: 'Design Tokens',
    items: [
      { title: 'Colors', desc: 'Brand, semantic, and neutral color palettes with light and dark mode support.', href: '/foundations/colors', icon: '🎨' },
      { title: 'Typography', desc: 'Noto Sans type scale — headings, body, and captions with responsive sizing.', href: '/foundations/typography', icon: '🔤' },
      { title: 'Spacing', desc: '8px base unit system with small, medium, and large spacing ranges.', href: '/foundations/spacing', icon: '↔️' },
      { title: 'Radius', desc: 'Corner radius tokens from 0px to 24px for consistent component rounding.', href: '/foundations/radius', icon: '⬜' },
      { title: 'Shadows', desc: 'Elevation system with layered shadow tokens for depth and hierarchy.', href: '/foundations/shadows', icon: '🌫️' },
      { title: 'Borders', desc: 'Stroke weight tokens and border color definitions for outlines and dividers.', href: '/foundations/borders', icon: '▬' },
    ],
  },
  {
    category: 'Layout & Structure',
    items: [
      { title: 'Grid System', desc: 'Responsive grid with 4-column mobile and 12-column desktop layouts.', href: '/foundations/grid-system', icon: '📐' },
      { title: 'Dividers', desc: 'Horizontal and vertical separators for content grouping and hierarchy.', href: '/foundations/dividers', icon: '➖' },
    ],
  },
  {
    category: 'Visual Assets',
    items: [
      { title: 'Iconography', desc: 'Material Icon library with consistent sizing, weight, and optical alignment.', href: '/foundations/iconography', icon: '✦' },
      { title: 'Illustration', desc: 'Brand illustration style guide for empty states, onboarding, and marketing.', href: '/foundations/illustration', icon: '🖼️' },
      { title: 'Image Library', desc: 'AI-generated Gemini image library for surfaces, environments, and use cases.', href: '/foundations/image-library', icon: '📷' },
      { title: 'Logo', desc: 'Delhivery and TARMAC logo usage guidelines, clearspace, and variations.', href: '/foundations/logo', icon: '🏷️' },
    ],
  },
  {
    category: 'Implementation',
    items: [
      { title: 'Typography Styles', desc: 'CSS classes and token mappings for the complete type system.', href: '/foundations/typography-styles', icon: '💻' },
      { title: 'Typography Implementation', desc: 'Code examples and integration patterns for applying type tokens.', href: '/foundations/typography-implementation', icon: '⚙️' },
    ],
  },
];

export default function FoundationsPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--color-on-surface)' }}>
          Foundations
        </h1>
        <p className="text-base leading-relaxed max-w-2xl" style={{ color: 'var(--color-on-surface-variant)' }}>
          The building blocks of TARMAC — design tokens, layout systems, and visual assets that ensure every Delhivery product is consistent, accessible, and scalable.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-14">
        {foundations.map((section, sIdx) => (
          <div key={section.category}>
            <FadeUp delay={sIdx * 0.05}>
              <h2 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--color-on-surface-variant)' }}>
                {section.category}
              </h2>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item, iIdx) => (
                <FadeUp key={item.title} delay={sIdx * 0.05 + iIdx * 0.05}>
                  <Link
                    href={item.href}
                    className="group block p-5 rounded-xl border transition-all duration-200 hover:shadow-md h-full"
                    style={{
                      borderColor: 'var(--color-outline)',
                      background: 'var(--color-surface-container-low)',
                    }}
                  >
                    <span className="text-2xl block mb-3">{item.icon}</span>
                    <h3 className="text-base font-semibold mb-1 group-hover:text-[#ED1B36] transition-colors" style={{ color: 'var(--color-on-surface)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-on-surface-variant)' }}>
                      {item.desc}
                    </p>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
