'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AccordionV2Redirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/components/accordion');
  }, [router]);
  return (
    <div style={{ padding: '2rem', color: 'var(--color-on-surface-variant)' }}>
      Redirecting to Accordion page...
    </div>
  );
}
