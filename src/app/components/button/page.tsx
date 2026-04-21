'use client';

import { MdxProvider } from '@/components/MdxProvider';
import { PageShell } from '@/components/PageShell';
import ButtonContent from './content.mdx';

export default function ButtonPage() {
  return (
    <PageShell title="Button" description="Buttons trigger actions and enable user interactions throughout the interface.">
      <MdxProvider><ButtonContent /></MdxProvider>
    </PageShell>
  );
}
