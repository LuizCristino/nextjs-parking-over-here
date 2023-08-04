'use client';

import { DataTable } from '@/_components/data-table';
import { useExtractPaginationFromUrl } from '@/_hooks/use-extract-pagination-from-url';
import { Center } from '@chakra-ui/react';
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
    cell: (info) => info.getValue(),
    header: 'Name',
  }),

  columnHelper.accessor('initial_price', {
    cell: (info) => <Center>{(info.getValue() / 100).toFixed(2)}</Center>,
    header: 'Initial price',
  }),

  columnHelper.accessor('price_per_hour', {
    cell: (info) => <Center>{(info.getValue() / 100).toFixed(2)}</Center>,
    header: 'Price per hour',
  }),
];

export default function Vehicles() {
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
