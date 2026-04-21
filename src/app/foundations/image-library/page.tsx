'use client';
import { PageShell } from '@/components/PageShell';

export default function ImageLibraryPage() {
  return (
    <PageShell title="Image Library" description="Guidelines for using images and illustrations across TARMAC products.">
      <h2>Image Guidelines</h2>
      <ul>
        <li>Use WebP format for optimal performance</li>
        <li>Provide 2x resolution for retina displays</li>
        <li>Always include meaningful alt text</li>
        <li>Use lazy loading for below-the-fold images</li>
      </ul>
      <h2>Aspect Ratios</h2>
      <table>
        <thead><tr><th>Ratio</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>16:9</td><td>Hero banners, video thumbnails</td></tr>
          <tr><td>4:3</td><td>Card images, product photos</td></tr>
          <tr><td>1:1</td><td>Avatars, icons, thumbnails</td></tr>
          <tr><td>3:2</td><td>Feature images, blog posts</td></tr>
        </tbody>
      </table>
    </PageShell>
  );
}
