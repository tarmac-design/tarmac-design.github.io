'use client';

import { PageShell } from '@/components/PageShell';
import { DoDont } from '@/components/mdx';
import { StorybookVariantViewer } from '@/components/StorybookVariantViewer';
import { Changelog, type ChangelogEntry } from '@/components/Changelog';
import { AvailabilityTable } from '@/components/AvailabilityTable';
import { RoleToggle } from '@/components/RoleToggle';
import { GuidelineImage } from '@/components/GuidelineImage';

const changelogEntries: ChangelogEntry[] = [
  {
    version: '1.1.0',
    date: 'June 2026',
    changes: [{ category: 'Changed', items: ['Added file preview thumbnails for image uploads', 'Improved drag-and-drop visual feedback', 'Fixed progress bar accuracy for large files'] }],
  },
  {
    version: '1.0.0',
    date: 'March 2026',
    changes: [{ category: 'Changed', items: ['Initial release of File Upload component', 'Support for Single file, Multiple files, and With preview variants', 'Drag-and-drop and click-to-browse interactions', 'Upload progress and status states'] }],
  },
];

function OverviewTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
        <p className="text-base text-gray-700 leading-relaxed">
          File Upload provides a drag-and-drop or click-based interface for selecting and
          uploading files. It supports single and multiple file selection, displays upload
          progress, and provides clear feedback on success or failure states. The component
          handles file validation, size limits, and format restrictions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Uploading documents in forms (PDF, DOC, etc.)</li>
          <li>Adding images to content (profiles, galleries)</li>
          <li>Bulk file upload for batch processing</li>
          <li>Attaching files to messages or tickets</li>
          <li>Importing data files (CSV, Excel)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Availability</h2>
        <AvailabilityTable />
      </section>
    </div>
  );
}

function SpecsTab() {
  return (
    <div className="space-y-10">
      <section>
        <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-outline)', marginBottom: '2rem', background: '#fff' }}>
          <iframe
            src="https://tarmac-storybook-dev.pntrzz.com/storybook/sb/iframe.html?id=tarmac-tds-fileupload--playground&viewMode=story&shortcuts=false"
            style={{ width: '100%', height: '300px', border: 'none', display: 'block' }}
            title="File Upload interactive example"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Anatomy</h2>
        <p className="text-gray-700 mb-4">
          The File Upload component is composed of the following elements:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Drop Zone</strong> — Dashed-border area for drag-and-drop interaction</li>
          <li><strong>Upload Button</strong> — Click trigger for file browser dialog</li>
          <li><strong>File List</strong> — Displays selected/uploaded file names and sizes</li>
          <li><strong>Progress</strong> — Upload progress indicator per file</li>
          <li><strong>Status</strong> — Success/error state icons and messages</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Single File</strong> — Accepts one file at a time, replaces on re-upload</li>
          <li><strong>Multiple Files</strong> — Accepts multiple files simultaneously</li>
          <li><strong>With Preview</strong> — Shows thumbnail previews for image files</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">States</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Default</strong> — Ready to accept files</li>
          <li><strong>Dragging</strong> — Active drag-over with visual highlight</li>
          <li><strong>Uploading</strong> — File transfer in progress with progress bar</li>
          <li><strong>Success</strong> — Upload completed successfully</li>
          <li><strong>Error</strong> — Upload failed with error message</li>
        </ul>
      </section>

      <section>
        <StorybookVariantViewer slug="file-upload" />
      </section>
    </div>
  );
}

function GuidelinesTab() {
  return (
    <RoleToggle>
      {(role) => role === 'designer' ? (
        <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">When to Use</h2>
          <GuidelineImage title="File Upload usage overview" slug="file-upload" section="usage" />
          <GuidelineImage title="File Upload when to use" slug="file-upload" section="when-to-use" />
        <GuidelineImage title="When to use File Upload" slug="component" section="guideline" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>When users need to upload documents or images as part of a form</li>
          <li>When batch file upload is required</li>
          <li>When file type and size validation is needed</li>
          <li>When visual feedback of upload progress is important</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">When Not to Use</h2>
          <GuidelineImage title="File Upload when not to use" slug="file-upload" section="when-not-to-use" />
        <GuidelineImage title="When not to use File Upload" slug="component" section="guideline" />
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>For simple text input — use Input component</li>
          <li>For capturing photos — use a camera/capture interface</li>
          <li>For pasting content — use Input Area with paste support</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Do&apos;s and Don&apos;ts</h2>
        <DoDont
          doItems={[
            'Clearly communicate accepted file types and size limits',
            'Show upload progress for each file',
            'Allow users to remove uploaded files before submission',
            'Provide clear error messages when upload fails',
          ]}
          dontItems={[
            'Auto-submit the form on file selection',
            'Hide file size or type restrictions until error occurs',
            'Allow unlimited file sizes without warning',
            'Remove the drop zone after first file is selected',
          ]}
        />
      </section>
    </div>
      ) : (
        <>
          <h2>Installation</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`npm install @tarmac/design-system`}</code></pre>

          <h2>Import</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`import { FileUpload } from '@tarmac/design-system';`}</code></pre>

          <h2>Rules</h2>
          <table>
            <thead><tr><th>#</th><th>Rule</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Follow the documented prop interface</td></tr>
              <tr><td>2</td><td>Use design tokens for customization</td></tr>
              <tr><td>3</td><td>Ensure accessibility requirements are met</td></tr>
              <tr><td>4</td><td>Test across light and dark themes</td></tr>
            </tbody>
          </table>

          <h2>Basic Usage</h2>
          <pre style={{ background: 'var(--color-surface-dim)', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto' }}><code>{`<FileUpload />`}</code></pre>
        </>
      )}
    </RoleToggle>
  );
}

function AccessibilityTab() {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-2xl font-semibold mb-4">ARIA Attributes</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><code>role="button"</code> on the drop zone for click interaction</li>
          <li><code>aria-label</code> describing the upload action and accepted types</li>
          <li><code>aria-describedby</code> linking to helper text with constraints</li>
          <li><code>aria-live="polite"</code> on status messages for upload progress</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Keyboard Navigation</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><kbd>Tab</kbd> — Moves focus to the upload button/drop zone</li>
          <li><kbd>Enter</kbd> / <kbd>Space</kbd> — Opens file browser dialog</li>
          <li><kbd>Delete</kbd> — Removes focused file from the list</li>
          <li><kbd>Tab</kbd> through file list items for management</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Screen Reader</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Drop zone announces its purpose and accepted file types</li>
          <li>Upload progress is announced as it changes</li>
          <li>Success and error states are communicated immediately</li>
          <li>File list items announce file name, size, and status</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Color Contrast</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Drop zone border meets 3:1 contrast ratio</li>
          <li>Status icons are accompanied by text labels</li>
          <li>Progress bar fill contrasts with track background</li>
        </ul>
      </section>
    </div>
  );
}

function ChangelogTab() {
  return <Changelog entries={changelogEntries} />;
}

export default function FileUploadPage() {
  const tabs = [
    { label: 'Overview', content: <OverviewTab /> },
    { label: 'Specs', content: <SpecsTab /> },
    { label: 'Guidelines', content: <GuidelinesTab /> },
    { label: 'Accessibility', content: <AccessibilityTab /> },
    { label: 'Changelog', content: <ChangelogTab /> },
  ];

  return (
    <PageShell
      title="File Upload"
      description="Drag-and-drop or click interface for selecting and uploading files. Supports single and multiple file selection with progress feedback."
      tabs={tabs}
    >
      <OverviewTab />
    </PageShell>
  );
}
