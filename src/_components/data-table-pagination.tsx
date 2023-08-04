'use client';

import { Pagination } from '@/_utilities/pagination';
import { HStack, Stack, Text } from '@chakra-ui/react';
import { Table } from '@tanstack/react-table';
import { DataTableNextButton } from './data-table-next-button';
import { DataTablePageButton } from './data-table-page-button';
import { DataTablePreviousButton } from './data-table-previous-button';

export type DataTablePaginationProps<T> = {
  table: Table<T>;
  pageIndex: number;
  lastIndex: number;
  perPage: number;
  total: number;
};

export function DataTablePagination<T>(props: DataTablePaginationProps<T>) {
  const { table, pageIndex, lastIndex, total, perPage } = props;

  const current = pageIndex + 1;

  const pages = Pagination.generate({
    current,
    start: 1,
    end: lastIndex,
    sides: 2,
  });

  const firstItemIndex = (current - 1) * perPage + 1;
  const lastItemIndex = current * perPage > total ? total : current * perPage;

  return (
    <Stack
      spacing='4'
      w='full'
      justifyContent={{ lg: 'space-between' }}
      direction={{ base: 'column', lg: 'row' }}
    >
      <HStack as='nav' aria-label='table navigation'>
        <Text as='span' fontWeight='normal' color='gray.500' h='full'>
          Showing{' '}
          <Text as='span' fontWeight='semibold' color='gray.900'>
            {firstItemIndex} - {lastItemIndex}
          </Text>{' '}
          of{' '}
          <Text as='span' fontWeight='semibold' color='gray.900'>
            {total}
          </Text>
        </Text>
      </HStack>

      <HStack alignSelf='flex-end'>
        <DataTablePreviousButton table={table} />

        {pages.map((page, index) => (
          <DataTablePageButton
            key={page + index}
            table={table}
            page={page}
            current={current}
          />
        ))}

        <DataTableNextButton table={table} />
      </HStack>
    </Stack>
  );
}
