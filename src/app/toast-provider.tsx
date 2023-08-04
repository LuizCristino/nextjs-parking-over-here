'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

export type ToastProviderProps = {
  children?: ReactNode;
};

export function ToastProvider(props: ToastProviderProps) {
  const { children } = props;

  const session = useSession();

  const className = session.data?.user != null ? 'mt-[64px]' : undefined;

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
