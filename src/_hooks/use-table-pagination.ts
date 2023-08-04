'use client';

import { DEFAULT_VALUES } from '@/_config/default-values';
import { SafeCast } from '@/_utilities/safe-cast';
import { PaginationState } from '@tanstack/react-table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (pageIndex != null) {
      router.push(
        pathname + '?' + createQueryString('page', String(pageIndex + 1))
      );
    }
  }, [pageIndex]);

  useEffect(() => {
    if (pageSize != null) {
      router.push(
        pathname + '?' + createQueryString('per_page', String(pageSize))
      );
    }
  }, [pageSize]);

  return { pageIndex, pageSize, setPagination };
}
