'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';

/* ─────────────────────────────────────────────── */
/*  TAB 1 — Examples                               */
/* ─────────────────────────────────────────────── */
function ExamplesTab() {
  return (
    <>
      <StorybookVariantViewer slug="file-upload" />
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
    { label: 'Usage', content: <UsageTab /> },
    { label: 'Code', content: <CodeTab /> },

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
