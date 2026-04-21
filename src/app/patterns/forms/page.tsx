'use client';
import { PageShell } from '@/components/PageShell';

export default function FormsPage() {
  return (
    <PageShell title="Form Patterns" description="Common form layouts and validation patterns for consistent user input experiences.">
      <h2>Form Layout</h2>
      <ul>
        <li>Stack form fields vertically for best readability</li>
        <li>Use 16px gap between fields</li>
        <li>Group related fields with section headings</li>
        <li>Place primary action buttons at the bottom-left</li>
      </ul>

      <h2>Validation</h2>
      <table>
        <thead><tr><th>Type</th><th>When</th><th>Display</th></tr></thead>
        <tbody>
          <tr><td>Inline</td><td>On blur or on change</td><td>Error message below the field</td></tr>
          <tr><td>Summary</td><td>On submit</td><td>Error list at the top of the form</td></tr>
          <tr><td>Real-time</td><td>As user types</td><td>Character count, strength meter</td></tr>
        </tbody>
      </table>

      <h2>Error Messages</h2>
      <ul>
        <li>Be specific: "Email must include @" not "Invalid input"</li>
        <li>Use red (#DC143C) for error text and borders</li>
        <li>Place error messages directly below the relevant field</li>
        <li>Use <code>aria-describedby</code> to associate errors with fields</li>
      </ul>

      <h2>Example</h2>
      <pre><code>{`<form>
  <Input label="Full Name" required />
  <Input label="Email" type="email" required
    error="Please enter a valid email address" />
  <Input label="Phone" type="tel" optional />
  <Button type="submit" variant="primary">Submit</Button>
</form>`}</code></pre>
    </PageShell>
  );
}
