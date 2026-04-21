'use client';
import { ComponentPage } from '@/components/ComponentPage';

export default function AvatarPage() {
  return (
    <ComponentPage name="Avatar" description="Avatars represent users or entities with images, initials, or icons." storybookPath="tarmac-tds-avatar--playground">
      <h2>Sizes</h2>
      <table>
        <thead><tr><th>Size</th><th>Pixels</th><th>Usage</th></tr></thead>
        <tbody>
          <tr><td>XSmall</td><td>24px</td><td>Compact lists, inline mentions</td></tr>
          <tr><td>Small</td><td>32px</td><td>Comments, chat bubbles</td></tr>
          <tr><td>Medium</td><td>40px</td><td>Default, cards, headers</td></tr>
          <tr><td>Large</td><td>48px</td><td>Profile sections</td></tr>
          <tr><td>XLarge</td><td>64px</td><td>Profile pages, hero sections</td></tr>
        </tbody>
      </table>
      <h2>Variants</h2>
      <ul>
        <li><strong>Image</strong> — User photo or uploaded image</li>
        <li><strong>Initials</strong> — First letter(s) of the user's name</li>
        <li><strong>Icon</strong> — Generic user icon as fallback</li>
      </ul>
    </ComponentPage>
  );
}
