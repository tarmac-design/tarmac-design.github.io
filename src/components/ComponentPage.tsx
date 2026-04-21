'use client';

import { PageShell } from '@/components/PageShell';
import { StorybookEmbed } from '@/components/mdx';

interface ComponentPageProps {
  name: string;
  description: string;
  storybookPath?: string;
  children?: React.ReactNode;
}

export function ComponentPage({ name, description, storybookPath, children }: ComponentPageProps) {
  const sbUrl = storybookPath
    ? `https://tarmac-storybook-dev.pntrzz.com/storybook/?path=/story/${storybookPath}`
    : 'https://tarmac-storybook-dev.pntrzz.com/storybook/';

  return (
    <PageShell title={name} description={description}>
      <h2>Live Demo</h2>
      <StorybookEmbed url={sbUrl} height={500} title={`${name} — TARMAC Storybook`} />
      {children}
    </PageShell>
  );
}
