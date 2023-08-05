'use client';

import { DataTable } from '@/_components/data-table';
import { useExtractPaginationFromUrl } from '@/_hooks/use-extract-pagination-from-url';
import { Box, Center } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import useSWR from 'swr';

const resource = 'vehicle-types';

const columnHelper = createColumnHelper<RemoteVehicleType>();

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    header: 'ID',
  }),

  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('initial_price', {
    header: 'Initial price',
    cell: (info) => {
      const value = info.getValue();
      const isValid = value != null;
      const formatted = (value / 100).toFixed(2);

      return (
        <Box textAlign={isValid ? 'end' : 'center'}>
          {isValid ? `$${formatted}` : '-'}
        </Box>
      );
    },
  }),

  columnHelper.accessor('price_per_hour', {
    header: 'Price per hour',
    cell: (info) => {
      const value = info.getValue();
      const isValid = value != null;
      const formatted = (value / 100).toFixed(2);

      return (
        <Box textAlign={isValid ? 'end' : 'center'}>
          {isValid ? `$${formatted}` : '-'}
        </Box>
      );
    },
  }),
];

export default function Types() {
  const { page, perPage } = useExtractPaginationFromUrl();
  const { data: response, isLoading } = useSWR<
    RemotePagination<RemoteVehicleType>
  >(`/api/${resource}?page=${page}&per_page=${perPage}`);

  if (isLoading) {
    return null;
  }

  return (
    <DataTable
      data={response!.data}
      columns={columns}
      total={response!.total}
      totalPages={response!.total_pages}
    />
  );
}
