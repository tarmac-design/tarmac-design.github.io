'use client';

import { useState, useEffect, useRef } from 'react';
import { PageShell } from '@/components/PageShell';
import { StorybookEmbed, DoDont } from '@/components/mdx';
import { ComponentExampleSection } from '@/components/ComponentPreview';
import { useTheme } from '@/components/ThemeProvider';

/* ── Types ── */
type UploadVariant = 'single' | 'multiple' | 'dragdrop' | 'preview';
type UploadState = 'empty' | 'dragging' | 'uploading' | 'complete' | 'error';

const selectStyle: React.CSSProperties = {
  padding: '4px 8px', borderRadius: 6, fontSize: 12, border: '1px solid var(--color-outline)',
  background: 'var(--color-surface)', color: 'var(--color-on-surface)', cursor: 'pointer',
};

/* ── File Upload Demo ── */
function FileUploadDemo({
  theme,
  variant = 'dragdrop',
  initialState = 'empty',
}: {
  theme: 'light' | 'dark';
  variant?: UploadVariant;
  initialState?: UploadState;
}) {
  const [state, setState] = useState<UploadState>(initialState);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const bg = theme === 'dark' ? '#2A2A2A' : '#FFFFFF';
  const fg = theme === 'dark' ? '#E0E0E0' : '#1A1A1A';
  const muted = theme === 'dark' ? '#666' : '#999';
  const accent = theme === 'dark' ? '#60A5FA' : '#2396FB';
  const success = '#1BA86E';
  const error = '#DC143C';
  const borderColor = theme === 'dark' ? '#444' : '#CCC';
  const dropBg = theme === 'dark' ? '#1E1E1E' : '#FAFAFA';
  const dragBg = theme === 'dark' ? '#1E3A5F20' : '#2396FB10';

  useEffect(() => {
    if (state === 'uploading') {
      setProgress(0);
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setState('complete');
            return 100;
          }
          return p + 2;
        });
      }, 50);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [state]);

  const simulateUpload = () => {
    setState('uploading');
  };

  const simulateError = () => {
    setState('error');
  };

  const reset = () => {
    setState('empty');
    setProgress(0);
  };

  const files = [
    { name: 'document.pdf', size: '2.4 MB', type: 'pdf' },
    { name: 'photo.jpg', size: '1.8 MB', type: 'jpg' },
    { name: 'data.xlsx', size: '540 KB', type: 'xlsx' },
  ];

  const fileIcon = (type: string) => {
    const colors: Record<string, string> = { pdf: '#DC143C', jpg: '#1BA86E', xlsx: '#1BA86E' };
    return (
      <div style={{ width: 28, height: 28, borderRadius: 6, background: `${colors[type] || accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill={colors[type] || accent}>
          <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
        </svg>
      </div>
    );
  };

  return (
    <div style={{ width: 300, background: bg, borderRadius: 12, border: `1px solid ${borderColor}`, overflow: 'hidden' }}>
      {/* Drop zone */}
      <div
        style={{
          margin: 12,
          padding: variant === 'preview' ? 12 : 24,
          borderRadius: 10,
          border: `2px dashed ${state === 'dragging' ? accent : borderColor}`,
          background: state === 'dragging' ? dragBg : dropBg,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={() => state === 'empty' && setState('dragging')}
        onMouseLeave={() => state === 'dragging' && setState('empty')}
        onClick={() => state !== 'uploading' && state !== 'complete' && simulateUpload()}
      >
        {state === 'complete' ? (
          <>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${success}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill={success}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: success }}>Upload Complete</div>
            <div style={{ fontSize: 10, color: muted, marginTop: 4 }}>{variant === 'single' ? '1 file' : '3 files'} uploaded successfully</div>
            <button onClick={e => { e.stopPropagation(); reset(); }} style={{ marginTop: 8, padding: '3px 10px', borderRadius: 5, fontSize: 10, background: 'transparent', color: accent, border: `1px solid ${accent}`, cursor: 'pointer' }}>Upload More</button>
          </>
        ) : state === 'error' ? (
          <>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${error}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill={error}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: error }}>Upload Failed</div>
            <div style={{ fontSize: 10, color: muted, marginTop: 4 }}>File size exceeds the 10MB limit</div>
            <button onClick={e => { e.stopPropagation(); reset(); }} style={{ marginTop: 8, padding: '3px 10px', borderRadius: 5, fontSize: 10, background: 'transparent', color: accent, border: `1px solid ${accent}`, cursor: 'pointer' }}>Try Again</button>
          </>
        ) : (
          <>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill={accent}><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" /></svg>
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: fg }}>
              {state === 'dragging' ? 'Drop files here' : 'Drag & drop files here'}
            </div>
            <div style={{ fontSize: 10, color: muted, marginTop: 4 }}>
              or <span style={{ color: accent, cursor: 'pointer', fontWeight: 500 }}>browse files</span>
            </div>
            <div style={{ fontSize: 9, color: muted, marginTop: 6 }}>
              {variant === 'single' ? 'Max 1 file • ' : ''}PDF, JPG, PNG up to 10MB
            </div>
          </>
        )}

        {/* Preview thumbnails */}
        {variant === 'preview' && state !== 'empty' && state !== 'dragging' && (
          <div style={{ display: 'flex', gap: 6, marginTop: 10, justifyContent: 'center' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ width: 48, height: 48, borderRadius: 6, background: theme === 'dark' ? '#3A3A3A' : '#EEE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={16} height={16} viewBox="0 0 24 24" fill={muted}><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* File list with progress */}
      {(state === 'uploading' || state === 'complete' || state === 'error') && variant !== 'single' && (
        <div style={{ padding: '0 12px 12px' }}>
          {files.map((file, i) => {
            const fileProgress = state === 'uploading' ? Math.min(progress + i * 15, 100) : state === 'complete' ? 100 : 0;
            const isFileError = state === 'error' && i === 2;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: i < files.length - 1 ? `1px solid ${theme === 'dark' ? '#333' : '#EEE'}` : 'none' }}>
                {fileIcon(file.type)}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 500, color: fg, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                  <div style={{ fontSize: 9, color: muted }}>{file.size}</div>
                  {state === 'uploading' && (
                    <div style={{ height: 3, borderRadius: 2, background: theme === 'dark' ? '#3A3A3A' : '#EEE', marginTop: 4 }}>
                      <div style={{ height: '100%', borderRadius: 2, background: accent, width: `${fileProgress}%`, transition: 'width 0.1s linear' }} />
                    </div>
                  )}
                </div>
                <div style={{ fontSize: 10, color: isFileError ? error : state === 'complete' ? success : muted, whiteSpace: 'nowrap' }}>
                  {isFileError ? 'Failed' : state === 'complete' ? '✓' : state === 'uploading' ? `${fileProgress}%` : ''}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Action buttons */}
      {state === 'empty' && (
        <div style={{ display: 'flex', gap: 6, padding: '0 12px 12px' }}>
          <button onClick={simulateUpload} style={{ flex: 1, padding: '6px 0', borderRadius: 6, fontSize: 11, fontWeight: 500, background: accent, color: '#FFF', border: 'none', cursor: 'pointer' }}>Upload</button>
          <button onClick={simulateError} style={{ padding: '6px 12px', borderRadius: 6, fontSize: 11, fontWeight: 500, background: 'transparent', color: muted, border: `1px solid ${borderColor}`, cursor: 'pointer' }}>Simulate Error</button>
        </div>
      )}
    </div>
  );
}

/* ── Custom Example Section ── */
function FileUploadExampleSection({ title, desc, children }: {
  title: string; desc: string;
  children: (props: { theme: 'light' | 'dark'; variant: UploadVariant }) => React.ReactNode;
}) {
  const { theme: globalTheme } = useTheme();
  const [theme, setTheme] = useState<'light' | 'dark'>(globalTheme as 'light' | 'dark');
  const [variant, setVariant] = useState<UploadVariant>('dragdrop');
  useEffect(() => { setTheme(globalTheme as 'light' | 'dark'); }, [globalTheme]);
  const bg = theme === 'dark' ? '#1A1A1A' : '#F5F5F5';

  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ color: 'var(--color-on-surface)', marginBottom: 4 }}>{title}</h3>
      <p style={{ color: 'var(--color-on-surface-variant)', fontSize: 14, marginBottom: 12 }}>{desc}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <select value={variant} onChange={e => setVariant(e.target.value as UploadVariant)} style={selectStyle}>
          <option value="single">Single</option>
          <option value="multiple">Multiple</option>
          <option value="dragdrop">Drag &amp; Drop</option>
          <option value="preview">With Preview</option>
        </select>
        <select value={theme} onChange={e => setTheme(e.target.value as 'light' | 'dark')} style={selectStyle}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ background: bg, borderRadius: 12, padding: 24, display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {children({ theme, variant })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookEmbed
        url="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=atoms-upload--playground&viewMode=story"
        storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/atoms-upload--playground"
        height={420}
        title="File Upload — TARMAC Storybook"
      />
      <h2>Overview</h2>
      <p>
        The File Upload component provides a drag-and-drop interface for uploading files.
        It supports single and multiple file selection, progress tracking, preview thumbnails,
        and various upload states including error handling.
      </p>

      <table>
        <thead><tr><th>Property</th><th>Options</th></tr></thead>
        <tbody>
          <tr><td>Variants</td><td>Single, Multiple, Drag &amp; Drop, With Preview</td></tr>
          <tr><td>States</td><td>Empty, Dragging, Uploading, Complete, Error</td></tr>
          <tr><td>Features</td><td>Drag zone, File list, Progress bars, Thumbnails</td></tr>
        </tbody>
      </table>

      <h2>All Variants</h2>

      <FileUploadExampleSection
        title="File Upload Variants"
        desc="Switch between Single, Multiple, Drag & Drop, and Preview variants. Click the drop zone or Upload button to simulate upload. Hover to see drag state."
      >
        {({ theme, variant }) => (
          <FileUploadDemo theme={theme} variant={variant} />
        )}
      </FileUploadExampleSection>

      <h2>States</h2>

      <FileUploadExampleSection
        title="Upload States"
        desc="File upload cycles through Empty, Dragging, Uploading, Complete, and Error states. Click Upload to see progress animation, or Simulate Error for error state."
      >
        {({ theme, variant }) => (
          <>
            <FileUploadDemo theme={theme} variant={variant} initialState="empty" />
            <FileUploadDemo theme={theme} variant={variant} initialState="complete" />
          </>
        )}
      </FileUploadExampleSection>

      <h2>With Preview</h2>

      <FileUploadExampleSection
        title="Preview Thumbnails"
        desc="The preview variant shows thumbnail previews of uploaded images alongside the file list."
      >
        {({ theme }) => (
          <FileUploadDemo theme={theme} variant="preview" />
        )}
      </FileUploadExampleSection>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 2 — Code                                   */
/* ─────────────────────────────────────────────── */
function CodeTab() {
  return (
    <>
      <h2>Installation</h2>
      <pre><code>{`npm install @tarmac/design-system`}</code></pre>

      <h2>Import</h2>
      <pre><code>{`import { FileUpload } from '@tarmac/design-system';`}</code></pre>

      <h2>Component API</h2>
      <pre><code>{`interface FileUploadProps {
  variant?: 'single' | 'multiple' | 'dragdrop' | 'preview';
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  showFileList?: boolean;
  showProgress?: boolean;
  showPreview?: boolean;
  disabled?: boolean;
  onFilesSelected?: (files: File[]) => void;
  onUploadProgress?: (progress: number, file: File) => void;
  onUploadComplete?: (files: File[]) => void;
  onUploadError?: (error: Error, file: File) => void;
  onRemoveFile?: (file: File) => void;
}

interface UploadedFile {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
  previewUrl?: string;
  errorMessage?: string;
}`}</code></pre>

      <h2>Basic Usage</h2>
      <pre><code>{`// Single file upload
<FileUpload
  variant="single"
  accept=".pdf,.doc,.docx"
  maxSize={10 * 1024 * 1024}
  onFilesSelected={handleFiles}
/>

// Multiple file upload
<FileUpload
  variant="multiple"
  maxFiles={5}
  onFilesSelected={handleFiles}
  onUploadComplete={handleComplete}
/>

// Drag & drop
<FileUpload
  variant="dragdrop"
  accept="image/*"
  onFilesSelected={handleFiles}
  onUploadProgress={(progress, file) => console.log(file.name, progress)}
/>

// With preview thumbnails
<FileUpload
  variant="preview"
  accept="image/*"
  showPreview
  onFilesSelected={handleFiles}
/>

// With error handling
<FileUpload
  variant="multiple"
  maxSize={5 * 1024 * 1024}
  onUploadError={(error, file) => showToast(error.message)}
  onRemoveFile={handleRemove}
/>`}</code></pre>

      <h2>Design Tokens</h2>
      <table>
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>upload-border-radius</td><td>12px</td></tr>
          <tr><td>upload-drop-zone-radius</td><td>10px</td></tr>
          <tr><td>upload-border-style</td><td>2px dashed</td></tr>
          <tr><td>upload-accent-light</td><td>#2396FB</td></tr>
          <tr><td>upload-accent-dark</td><td>#60A5FA</td></tr>
          <tr><td>upload-success</td><td>#1BA86E</td></tr>
          <tr><td>upload-error</td><td>#DC143C</td></tr>
          <tr><td>upload-progress-height</td><td>3px</td></tr>
        </tbody>
      </table>

      <h2>Storybook</h2>
      <p>
        Explore all file upload variants interactively in{' '}
        <a href="https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/tarmac-tds-fileupload--playground" target="_blank" rel="noopener noreferrer">
          TARMAC Storybook →
        </a>
      </p>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 3 — Usage                                  */
/* ─────────────────────────────────────────────── */
function UsageTab() {
  return (
    <>
      <h2>Anatomy</h2>
      <table>
        <thead><tr><th>#</th><th>Element</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Drop Zone</td><td>Dashed border area for drag-and-drop interaction</td></tr>
          <tr><td>2</td><td>Upload Icon</td><td>Visual indicator for the upload action</td></tr>
          <tr><td>3</td><td>Instruction Text</td><td>Primary text describing the drop action</td></tr>
          <tr><td>4</td><td>Browse Link</td><td>Clickable text to open file browser</td></tr>
          <tr><td>5</td><td>Constraints Text</td><td>File type and size limit information</td></tr>
          <tr><td>6</td><td>File List</td><td>List of selected/uploaded files with metadata</td></tr>
          <tr><td>7</td><td>Progress Bar</td><td>Upload progress indicator per file</td></tr>
          <tr><td>8</td><td>Preview Thumbnails</td><td>Image previews for uploaded files</td></tr>
          <tr><td>9</td><td>Status Indicators</td><td>Success checkmark or error icon per file</td></tr>
        </tbody>
      </table>

      <h2>When to Use</h2>
      <ul>
        <li>For document uploads in forms (resumes, invoices, etc.)</li>
        <li>For image uploads in content management systems</li>
        <li>For bulk file imports in data processing workflows</li>
        <li>For avatar or profile picture uploads</li>
        <li>For attachment uploads in messaging or email interfaces</li>
      </ul>

      <h2>Best Practices</h2>
      <DoDont
        slug="file-upload"
        doItems={[
          'Show accepted file types and size limits clearly',
          'Provide visual feedback during drag-over state',
          'Show individual progress bars for each file',
          'Allow users to remove files before and after upload',
          'Display clear error messages with recovery actions',
        ]}
        dontItems={[
          'Don\'t allow uploads without showing progress feedback',
          'Don\'t silently reject files — always show why they were rejected',
          'Don\'t auto-upload without user confirmation for sensitive files',
          'Don\'t remove the file list after upload completes',
          'Don\'t use the preview variant for non-image file types',
        ]}
      />

      <h2>Accessibility</h2>
      <table>
        <thead><tr><th>Attribute</th><th>Value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>role</td><td>button</td><td>Drop zone is keyboard-activatable</td></tr>
          <tr><td>aria-label</td><td>&quot;Upload files&quot;</td><td>Descriptive label for the drop zone</td></tr>
          <tr><td>aria-describedby</td><td>constraints id</td><td>Links to file type/size constraints</td></tr>
          <tr><td>aria-live</td><td>polite</td><td>Announces upload progress and completion</td></tr>
          <tr><td>Keyboard</td><td>Enter / Space</td><td>Opens file browser from drop zone</td></tr>
          <tr><td>Tab</td><td>—</td><td>Navigates between drop zone, files, and actions</td></tr>
        </tbody>
      </table>

      <h2>Related Components</h2>
      <ul>
        <li><strong>Progress Bar</strong> — Used for individual file upload progress</li>
        <li><strong>Button</strong> — Upload and action buttons</li>
        <li><strong>Alert</strong> — Error messages for failed uploads</li>
        <li><strong>Avatar</strong> — Profile picture upload uses file upload internally</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  TAB 4 — Changelog                              */
/* ─────────────────────────────────────────────── */
function ChangelogTab() {
  return (
    <>
      <h2>Changelog</h2>
      <h3>v2.0.0</h3>
      <ul>
        <li>Added <code>preview</code> variant with image thumbnails</li>
        <li>Added <code>single</code> variant for single-file uploads</li>
        <li>Added per-file progress tracking with progress bars</li>
        <li>Added error state with descriptive error messages</li>
        <li>Added file removal before and after upload</li>
        <li>Improved drag-and-drop visual feedback</li>
      </ul>
      <h3>v1.0.0</h3>
      <ul>
        <li>Initial release with drag-and-drop zone</li>
        <li>Multiple file selection support</li>
        <li>File type and size validation</li>
        <li>Light and dark theme support</li>
      </ul>
    </>
  );
}

/* ─────────────────────────────────────────────── */
/*  Page Export                                     */
/* ─────────────────────────────────────────────── */
export default function FileUploadPage() {
  const tabs = [
    { label: 'Examples', content: <ExamplesTab /> },
    { label: 'Code', content: <CodeTab /> },
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="File Upload"
      description="File Upload provides drag-and-drop and browse interfaces for uploading files with progress tracking, previews, and error handling."
      tabs={tabs}
    >
      <ExamplesTab />
    </PageShell>
  );
}
