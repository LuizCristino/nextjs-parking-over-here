'use client';

import { DEFAULT_VALUES } from '@/_config/default-values';
import { SafeCast } from '@/_utilities/safe-cast';
import { PaginationState } from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useCreateQueryString } from './use-create-query-string';

export function useTablePagination() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString();

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: SafeCast.number(searchParams.get('page'), 1) - 1,
    pageSize: SafeCast.number(
      searchParams.get('per_page'),
      DEFAULT_VALUES.ITEMS_PER_PAGE_MIN
    ),
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  useEffect(() => {
    const { pageIndex, pageSize } = pagination;

    let query = '';

    if (pageSize != null) {
      query = createQueryString('per_page', String(pageSize));
    }

    if (pageIndex != null) {
      query = createQueryString('page', String(pageIndex + 1));
    }

    router.push(`${pathname}?${query}`);
  }, [pagination]);

  useEffect(() => {}, [pageSize]);

  return useMemo(
    () => ({ ...pagination, setPagination }),
    [pagination, setPagination]
  );
}
