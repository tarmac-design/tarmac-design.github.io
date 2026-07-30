'use client';

import { PageShell } from '@/components/PageShell';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { RoleToggle } from '@/components/RoleToggle';
import { GuidelineImage } from '@/components/GuidelineImage';

function OverviewTab() {
  return (
    <>
      <h2>Overview</h2>
      <p>The File Upload component enables users to upload files through drag-and-drop or manual selection. It provides structured feedback across the upload lifecycle, including idle, uploading, success, and error states.</p>
      <p>It combines both:</p>
      <ul>
        <li><strong>Upload Container (UI surface)</strong> — where interaction happens</li>
        <li><strong>Upload Behavior (logic &amp; states)</strong> — how files are processed and displayed</li>
      </ul>
      <p>This ensures a consistent, scalable experience for file handling across workflows such as document submission, media uploads, and attachments.</p>

      <h2>Anatomy</h2>
      <table><thead><tr><th>Element</th><th>Description</th></tr></thead><tbody>
        <tr><td>Upload Container</td><td>The primary interactive area that accepts file input via drag-and-drop or browse</td></tr>
        <tr><td>Title</td><td>Primary instruction guiding the user (e.g., &quot;Upload your files here&quot;)</td></tr>
        <tr><td>Subtext (Top / Bottom)</td><td>Supporting guidance describing accepted actions or constraints</td></tr>
        <tr><td>Upload Area</td><td>Drop zone and clickable region for file selection</td></tr>
        <tr><td>File Item</td><td>Represents each uploaded file with metadata and actions</td></tr>
        <tr><td>Progress Indicator</td><td>Displays upload progress (percentage or file size)</td></tr>
        <tr><td>Status Indicator</td><td>Communicates current file state (pending, uploading, completed, error)</td></tr>
        <tr><td>Actions</td><td>Controls available per file: Preview, Change/Replace, Remove, Cancel (during upload)</td></tr>
      </tbody></table>

      <h2>Variants</h2>
      <table><thead><tr><th>Variant</th><th>Description</th></tr></thead><tbody>
        <tr><td>Default (Idle)</td><td>No files uploaded. Shows drag-and-drop zone and browse action with instructional content</td></tr>
        <tr><td>Uploading</td><td>File is in progress. Shows progress bar and upload details. Allows cancellation</td></tr>
        <tr><td>Added (Completed)</td><td>File successfully uploaded. Displays file information with management actions (preview, change, remove)</td></tr>
        <tr><td>Uploading + Added</td><td>Combination state for multi-file scenarios. One or more files completed, one or more uploading</td></tr>
        <tr><td>Error</td><td>Upload failed or invalid file. Displays error message. Allows retry or removal</td></tr>
      </tbody></table>

      <h2>Component Behavior</h2>
      <h3>Upload Methods</h3>
      <ul>
        <li>Drag-and-drop into container</li>
        <li>Manual file selection via system dialog</li>
      </ul>
      <h3>State Flow</h3>
      <ul>
        <li>Default → Uploading → Added</li>
        <li>Default → Uploading → Error</li>
        <li>Multi-file: Added + Uploading → Added</li>
      </ul>
      <h3>File Handling</h3>
      <ul>
        <li>Each file is treated as an independent item</li>
        <li>Supports sequential or parallel uploads</li>
        <li>Allows replacement or removal at any stage</li>
      </ul>

      <h2>Availability</h2>
      <AvailabilityTable storybookUrl="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/index.html?path=/story/tarmac-tds-uploadfile--playground" />
    </>
  );
}

function SpecsTab() {
  return (
    <>
      <h2>Styles</h2>
      <table><thead><tr><th>Property</th><th>Value</th></tr></thead><tbody>
        <tr><td>CTA Right width</td><td>477px</td></tr>
        <tr><td>CTA Bottom width</td><td>416px</td></tr>
      </tbody></table>

      <h2>Variants</h2>
      <table><thead><tr><th>Component</th><th>Variants</th></tr></thead><tbody>
        <tr><td>Upload File</td><td>Default, Uploading, Completed, Failed, Warning, Upload, Ghost</td></tr>
        <tr><td>File Upload Container</td><td>Default, Uploading, Uploading + Added, Added</td></tr>
        <tr><td>Upload Header</td><td>Upload, Uploading, Uploaded</td></tr>
      </tbody></table>

      <h2>Booleans</h2>
      <table><thead><tr><th>Component</th><th>Toggleable Properties</th></tr></thead><tbody>
        <tr><td>Upload File</td><td>Status Text, Status Indicator, CTAs, Illustration, Progress Bar, Subtext</td></tr>
        <tr><td>Upload Header</td><td>Snackbar, Trailing Icon Button, Leading Icon, Title Pill, Subtext, Info Icon</td></tr>
      </tbody></table>

      <h2>Playground</h2>
      <StorybookVariantViewer slug="upload-file" />
    </>
  );
}

function GuidelinesTab() {
  return (
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <>
          <h2>Usage</h2>
          <p>File Upload lets users attach documents, images or proof files to a task — a POD photo, a KYC document, a dispute attachment — with clear feedback at every stage: choosing a file, watching it upload, confirming success, or recovering from failure.</p>
          <p><strong>Upload File</strong> is the single-file control (CTA Right for compact rows, CTA Bottom for a drop-zone card); <strong>File Upload Container</strong> wraps multiple files with shared header and status; <strong>Upload Header</strong> sits above a list to show overall Upload/Uploading/Uploaded progress.</p>

          <h2>When to Use</h2>
          <ul>
            <li>KYC and identity verification — ID proof, address proof, business documents</li>
            <li>Proof of delivery — a signed POD or damage photo attached to a shipment event</li>
            <li>Dispute evidence — receipts, photos or documents supporting a claim</li>
            <li>Bulk data import — a CSV or spreadsheet upload for batch shipment creation</li>
            <li>Seller onboarding — GST certificates, catalog images, business registration</li>
          </ul>

          <h2>When Not to Use</h2>
          <ul>
            <li>Selecting from existing options — use Dropdown or Selection Cards instead</li>
            <li>Capturing a photo directly — a live camera capture flow is a different pattern</li>
            <li>Non-file text input — free-text notes belong in Input Field or Text Area</li>
            <li>Extremely large or unbounded batches — needs a dedicated import flow</li>
            <li>As a required step with no fallback — always offer an alternative</li>
          </ul>

          <h2>Do&apos;s and Don&apos;ts</h2>
          <h3>Do</h3>
          <ul>
            <li>Show accepted file types and size limits clearly</li>
            <li>Provide visual feedback during drag-over state</li>
            <li>Show individual progress bars for each file</li>
            <li>Allow users to remove files before and after upload</li>
            <li>Display clear error messages with recovery actions</li>
          </ul>
          <h3>Don&apos;t</h3>
          <ul>
            <li>Don&apos;t allow uploads without showing progress feedback</li>
            <li>Don&apos;t silently reject files — always show why they were rejected</li>
            <li>Don&apos;t auto-upload without user confirmation for sensitive files</li>
            <li>Don&apos;t remove the file list after upload completes</li>
            <li>Don&apos;t use the preview variant for non-image file types</li>
          </ul>

          <h2>How to Use</h2>
          <ol>
            <li><strong>State the constraint upfront</strong> — accepted file types and max size belong in the subtext before a user picks the wrong file.</li>
            <li><strong>Always show progress</strong> — the progress bar and Uploading state give confidence on slow connections; never leave a silent gap.</li>
            <li><strong>Make Failed actionable</strong> — a Failed upload needs a visible retry, not just an error color.</li>
            <li><strong>Confirm success explicitly</strong> — Completed should be visually distinct (checkmark, status text), not just the absence of a progress bar.</li>
            <li><strong>Use CTA Right for dense forms, CTA Bottom for a single prominent upload</strong> — match density to how many fields surround it.</li>
            <li><strong>Group multi-file uploads</strong> — use File Upload Container with Upload Header so users see overall progress, not just per-file status.</li>
          </ol>
        </>
      ) : (
        <>
          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { UploadFile, FileUploadContainer } from '@tarmac/design-system';`}</code></pre>

          <h2>Basic Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<UploadFile
  variant="default"
  style="cta-bottom"
  title="Upload your files here"
  subtext="JPEG, PNG, PDF — max 10MB"
  onUpload={(file) => handleUpload(file)}
/>`}</code></pre>

          <h2>CTA Right (Compact)</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<UploadFile
  variant="default"
  style="cta-right"
  title="Upload Document"
  subtext="JPEG • 10MB • PDF/Photo • 5MB"
/>`}</code></pre>

          <h2>Multi-file Container</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<FileUploadContainer
  variant="added"
  title="Upload your files here"
  files={uploadedFiles}
  onRemove={(id) => removeFile(id)}
  onRetry={(id) => retryFile(id)}
/>`}</code></pre>

          <h2>Rules</h2>
          <table>
            <thead><tr><th>#</th><th>Rule</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Always provide <code>onUpload</code> callback for file handling</td></tr>
              <tr><td>2</td><td>Set accepted file types via <code>accept</code> prop</td></tr>
              <tr><td>3</td><td>Handle all states: default, uploading, completed, failed</td></tr>
              <tr><td>4</td><td>Use design tokens for customization</td></tr>
              <tr><td>5</td><td>Test across light and dark themes</td></tr>
            </tbody>
          </table>
        </>
      )}
    </RoleToggle>
  );
}

function AccessibilityTab() {
  return (
    <>
      <h2>Key Requirements</h2>
      <ul>
        <li>Drop zone must be keyboard accessible (Tab + Enter/Space to open file dialog)</li>
        <li>Upload progress announced via aria-live region</li>
        <li>File status changes (success/error) communicated to screen readers</li>
        <li>Focus states clearly visible on all interactive elements</li>
        <li>Color contrast meets WCAG 2.1 AA for all states</li>
      </ul>
      <h2>Keyboard Navigation</h2>
      <table><thead><tr><th>Key</th><th>Action</th></tr></thead><tbody>
        <tr><td>Tab</td><td>Move focus to upload area / file actions</td></tr>
        <tr><td>Enter / Space</td><td>Open file picker or activate action button</td></tr>
        <tr><td>Delete</td><td>Remove focused file from list</td></tr>
        <tr><td>Escape</td><td>Cancel current upload (if in progress)</td></tr>
      </tbody></table>
      <h2>Screen Reader Announcements</h2>
      <ul>
        <li>&quot;File upload area. Drag and drop or press Enter to browse.&quot;</li>
        <li>&quot;[filename] uploading, 50% complete&quot;</li>
        <li>&quot;[filename] upload complete&quot;</li>
        <li>&quot;[filename] upload failed. Press Enter to retry.&quot;</li>
      </ul>
    </>
  );
}

const changelog: ChangelogEntry[] = [
  { version: '1.1.2', date: 'June 2026', changes: [{ category: 'Changed', items: ['Added Ghost variant', 'Improved drag-over state feedback', 'Added Warning variant for file size limits'] }] },
  { version: '1.0.0', date: 'March 2026', changes: [{ category: 'Added', items: ['Initial release of File Upload component', 'Support for Default, Uploading, Completed, Failed variants', 'CTA Right and CTA Bottom styles', 'File Upload Container for multi-file uploads', 'Upload Header component'] }] },
];

function ChangelogTab() { return <Changelog entries={changelog} />; }

export default function UploadFilePage() {
  return (
    <PageShell
      title="File Upload"
      description="Enables users to upload files through drag-and-drop or manual selection with structured feedback across the upload lifecycle — idle, uploading, success, and error states."
      tabs={[
        { label: 'Overview', content: <OverviewTab /> },
        { label: 'Specs', content: <SpecsTab /> },
        { label: 'Guidelines', content: <GuidelinesTab /> },
        { label: 'Accessibility', content: <AccessibilityTab /> },
        { label: 'Changelog', content: <ChangelogTab /> },
      ]}
    >
      <OverviewTab />
    </PageShell>
  );
}
