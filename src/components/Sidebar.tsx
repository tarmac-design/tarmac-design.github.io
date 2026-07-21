'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

type NavLink = { label: string; href: string };
type NavGroup = { title: string; icon?: string; items: NavLink[] };

const sidebarSections: NavGroup[] = [
  { title: 'Get Started', icon: 'rocket', items: [
    { label: 'Introduction to TARMAC', href: '/about/overview' },
    { label: 'Philosophy', href: '/about/philosophy' },
    { label: 'Brand Language', href: '/about/brand-language' },
    { label: 'Movement Metaphors', href: '/about/movement-metaphors' },
    { label: 'TARMAC Logo', href: '/about/logo' },
    { label: 'Installation', href: '/getting-started/installation' },
    { label: 'Quick Start', href: '/getting-started/quick-start' },
  ]},
  { title: 'Foundation', icon: 'layers', items: [
    { label: 'Colors', href: '/foundations/colors' },
    { label: 'Typography', href: '/foundations/typography' },
    { label: 'Grid System', href: '/foundations/grid-system' },
    { label: 'Iconography', href: '/foundations/iconography' },
    { label: 'Spacing', href: '/foundations/spacing' },
    { label: 'Radius', href: '/foundations/radius' },
    { label: 'Borders', href: '/foundations/borders' },
    { label: 'Shadows', href: '/foundations/shadows' },
    { label: 'Dividers', href: '/foundations/dividers' },
    { label: 'Logo', href: '/foundations/logo' },
    { label: 'Illustration', href: '/foundations/illustration' },
    { label: 'Image Library', href: '/foundations/image-library' },
  ]},
  { title: 'Component', icon: 'grid', items: [
    { label: 'Accordion', href: '/components/accordion' },
    { label: 'Alert', href: '/components/alert' },
    { label: 'Avatar', href: '/components/avatar' },
    { label: 'Avatar Group', href: '/components/avatar-group' },
    { label: 'Badge', href: '/components/badge' },
    { label: 'Bottom Sheet', href: '/components/bottom-sheet' },
    { label: 'Breadcrumbs', href: '/components/breadcrumbs' },
    { label: 'Button', href: '/components/button' },
    { label: 'Card Block', href: '/components/card-block' },
    { label: 'Cards', href: '/components/cards' },
    { label: 'Carousel', href: '/components/carousel' },
    { label: 'Checkbox', href: '/components/checkbox' },
    { label: 'Coachmarks', href: '/components/coachmarks' },
    { label: 'Date Time Picker', href: '/components/date-time-picker' },
    { label: 'Dialog Box', href: '/components/dialog-box' },
    { label: 'Divider', href: '/components/divider' },
    { label: 'Dropdown', href: '/components/dropdown' },
    { label: 'FAB', href: '/components/fab' },
    { label: 'File Upload', href: '/components/file-upload' },
    { label: 'Filter', href: '/components/filter' },
    { label: 'Footer', href: '/components/footer' },
    { label: 'Ghost', href: '/components/ghost' },
    { label: 'Header', href: '/components/header' },
    { label: 'Info Card', href: '/components/info-card' },
    { label: 'Input Field', href: '/components/input' },
    { label: 'Input Field Stepper', href: '/components/input-field-stepper' },
    { label: 'Links', href: '/components/links' },
    { label: 'List', href: '/components/list' },
    { label: 'List Cell', href: '/components/list-cell' },
    { label: 'Menu', href: '/components/menu' },
    { label: 'Navigation', href: '/components/navigation' },
    { label: 'OTP Fields', href: '/components/otp-fields' },
    { label: 'Pagination', href: '/components/pagination' },
    { label: 'Pills', href: '/components/pills' },
    { label: 'Popups', href: '/components/popups' },
    { label: 'Progress Bar', href: '/components/progress-bar' },
    { label: 'Radio', href: '/components/radio' },
    { label: 'Rating', href: '/components/rating' },
    { label: 'Scroll', href: '/components/scroll' },
    { label: 'Search', href: '/components/search' },
    { label: 'Selection Card', href: '/components/selection-card' },
    { label: 'Shimmer', href: '/components/shimmer' },
    { label: 'Side Drawer', href: '/components/side-drawer' },
    { label: 'Sidebar', href: '/components/sidebar-nav' },
    { label: 'Slider', href: '/components/slider' },
    { label: 'Snackbar', href: '/components/snackbar' },
    { label: 'Spinner', href: '/components/spinner' },
    { label: 'Status Indicator', href: '/components/status-indicator' },
    { label: 'Stepper', href: '/components/stepper' },
    { label: 'Table', href: '/components/table' },
    { label: 'Tabs', href: '/components/tabs' },
    { label: 'Tags', href: '/components/tags' },
    { label: 'Text Area', href: '/components/text-area' },
    { label: 'Time Picker', href: '/components/time-picker' },
    { label: 'Toggle', href: '/components/toggle' },
    { label: 'Tooltip', href: '/components/tooltip' },
    { label: 'Tooltip V2', href: '/components/tooltip-v2' },
    { label: 'Top Navigation', href: '/components/top-navigation' },
    { label: 'Upload File', href: '/components/upload-file' },
    { label: 'Web Header', href: '/components/web-header' },
  ]},
  { title: 'Tools', icon: 'layout', items: [
    { label: 'Design File Access', href: '/tools/design-file-access' },
    { label: 'App Provider', href: '/tools/app-provider' },
    { label: 'TDS Plugins', href: '/tools/tds-plugins' },
    { label: 'Storybook Add-ons', href: '/tools/storybook-addons' },
    { label: 'MCPs', href: '/tools/mcps' },
    { label: 'UI Styling Standards', href: '/tools/ui-styling-standards' },
  ]},
  { title: 'Accessibility', icon: 'eye', items: [
    { label: 'Overview', href: '/accessibility/overview' },
    { label: 'Guidelines', href: '/accessibility/guidelines' },
    { label: 'Keyboard Navigation', href: '/accessibility/keyboard-navigation' },
    { label: 'Screen Readers', href: '/accessibility/screen-readers' },
    { label: 'Color Contrast', href: '/accessibility/color-contrast' },
    { label: 'Focus Management', href: '/accessibility/focus-management' },
    { label: 'Testing', href: '/accessibility/testing' },
  ]},
  { title: 'Release Notes', icon: 'file', items: [
    { label: 'Changelog', href: '/release-notes' },
  ]},
];

/* ── Icons — use provided PNG images ── */
const iconMap: Record<string, string> = {
  rocket: '/icons/get-started.png',
  layers: '/icons/foundation.png',
  grid: '/icons/component.png',
  layout: '/icons/tools.png',
  file: '/icons/release-notes.png',
  mail: '/icons/contact-us.png',
  eye: '/icons/accessibility.png',
};

function NavIcon({ name, size = 20 }: { name: string; size?: number }) {
  const src = iconMap[name];
  if (src) {
    return <img src={src} alt="" width={size} height={size} className="sidebar-nav-icon" style={{ objectFit: 'contain' }} />;
  }
  // Fallback chevron SVG
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* ── Search trigger ── */
function SidebarSearch({ onSearchClick }: { onSearchClick?: () => void }) {
  return (
    <button onClick={onSearchClick} className="sidebar-search-btn" aria-label="Search">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" style={{ opacity: 0.5 }}>
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <span style={{ opacity: 0.4 }}>Search...</span>
      <kbd className="sidebar-search-kbd">⌘K</kbd>
    </button>
  );
}

/* ── Nav Group with expand/collapse ── */
function SidebarGroup({ group, defaultOpen }: { group: NavGroup; defaultOpen?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const hasActiveChild = group.items.some(item => pathname === item.href);
  const [isOpen, setIsOpen] = useState(defaultOpen || hasActiveChild);

  return (
    <div style={{ marginBottom: '2px' }}>
      {/* Group header — Nav Cell style */}
      <button
        onClick={() => {
          if (!isOpen && group.items.length > 0) {
            router.push(group.items[0].href);
          }
          setIsOpen(!isOpen);
        }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 12px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.15s',
          backgroundColor: isOpen ? 'var(--color-surface-container-low, rgba(255,255,255,0.04))' : 'transparent',
          color: 'var(--color-on-surface)',
        }}
        onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; }}
        onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        {/* Leading icon */}
        <span style={{ color: 'var(--color-on-surface-variant)', display: 'flex', flexShrink: 0 }}>
          <NavIcon name={group.icon || 'grid'} size={18} />
        </span>
        {/* Title */}
        <span style={{ flex: 1, textAlign: 'left', fontSize: '13px', fontWeight: 500 }}>
          {group.title}
        </span>
        {/* Chevron */}
        <span
          style={{
            display: 'flex',
            color: 'var(--color-on-surface-variant)',
            transition: 'transform 0.2s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <NavIcon name="chevron" size={16} />
        </span>
      </button>

      {/* Divider */}
      {isOpen && (
        <div style={{ margin: '4px 12px', height: '1px', backgroundColor: 'var(--color-outline)', opacity: 0.4 }} />
      )}

      {/* Expanded items */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: '4px 0 8px 0' }}>
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px 8px 5px 32px',
                        fontSize: '12px',
                        lineHeight: '18px',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        margin: '1px 8px',
                        transition: 'all 0.12s ease',
                        color: isActive ? 'var(--color-on-surface)' : 'var(--color-on-surface-variant)',
                        backgroundColor: isActive ? 'var(--sidebar-active-bg)' : 'transparent',
                        fontWeight: isActive ? 600 : 400,
                        position: 'relative',
                      }}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <span
                          style={{
                            position: 'absolute',
                            left: '0',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '3px',
                            height: '16px',
                            borderRadius: '0 2px 2px 0',
                            backgroundColor: 'var(--color-primary)',
                          }}
                        />
                      )}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar({ open, onClose, onSearchClick }: { open?: boolean; onClose?: () => void; onSearchClick?: () => void }) {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const sidebarContent = (
    <nav style={{ padding: '4px 6px' }}>
      <SidebarSearch onSearchClick={onSearchClick} />
      <div style={{ marginTop: '8px' }}>
        {sidebarSections.map((group) => (
          <SidebarGroup key={group.title} group={group} />
        ))}
      </div>
    </nav>
  );

  return (
    <>
      {/* Unified sidebar — slides in from left on all screens */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.aside
              className="fixed left-0 top-16 w-[min(280px,85vw)] h-[calc(100vh-64px)] overflow-y-auto z-50 border-r sidebar-scroll"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-outline)' }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
