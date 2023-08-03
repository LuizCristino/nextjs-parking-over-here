'use client';

import { SessionProvider } from 'next-auth/react';
import { type ReactNode } from 'react';

export type ProviderProps = {
  children: ReactNode;
};

function Provider({ children }: ProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Provider;
