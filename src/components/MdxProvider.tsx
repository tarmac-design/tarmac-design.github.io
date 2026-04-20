'use client';

import { MDXProvider } from '@mdx-js/react';
import * as mdxComponents from './mdx';

const components = {
  ...mdxComponents,
};

export function MdxProvider({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
