'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { type ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { SWRConfig } from 'swr';
import { ToastProvider } from './toast-provider';

export type ProviderProps = {
  children: ReactNode;
};

export function Providers({ children }: ProviderProps) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <SWRConfig value={value}>
          <SessionProvider>
            <ToastProvider>{children}</ToastProvider>
          </SessionProvider>
        </SWRConfig>
      </ChakraProvider>
    </CacheProvider>
  );
}

const value = {
  fetcher: (resource: any, init: any) =>
    fetch(resource, init).then((res) => res.json()),
};

const colors = {
  brand: {
    50: '#ecefff',
    100: '#cbceeb',
    200: '#a9aed6',
    300: '#888ec5',
    400: '#666db3',
    500: '#4d5499',
    600: '#3c4178',
    700: '#2a2f57',
    800: '#181c37',
    900: '#080819',
  },
};
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ colors, config });
