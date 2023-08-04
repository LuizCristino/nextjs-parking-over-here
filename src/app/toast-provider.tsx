'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

export type ToastProviderProps = {
  children?: ReactNode;
};

/**
 * The only reason that toast provider is in a
 * different component than the other providers
 * is so it can access the session and position
 * itself correctly based if the header exists or
 * not
 */
export function ToastProvider(props: ToastProviderProps) {
  const { children } = props;

  const session = useSession();

  const className = `transition-transform transition-duration-[750ms] ${
    session.data?.user != null ? 'translate-y-[64px]' : ''
  }`;

  return (
    <>
      {children}
      <ToastContainer
        className={className}
        position='top-right'
        autoClose={8000}
        newestOnTop={false}
        hideProgressBar={false}
        draggable={false}
        pauseOnFocusLoss={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}
