'use client';

import { DataTable } from '@/_components/data-table';
import { useExtractPaginationFromUrl } from '@/_hooks/use-extract-pagination-from-url';
import { Center } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import useSWR from 'swr';

const resource = 'cash-register';

const columnHelper = createColumnHelper<RemoteCashRegister>();

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    header: 'ID',
  }),

  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
    header: 'Name',
  }),

  columnHelper.accessor('quantity', {
    cell: (info) => <Center>{info.getValue()}</Center>,
    header: 'Quantity',
  }),

  columnHelper.accessor('value', {
    cell: (info) => <Center>{(info.getValue() / 100).toFixed(2)}</Center>,
    header: 'Value',
  }),
];

export default function Vehicles() {
  const { page, perPage } = useExtractPaginationFromUrl();
  const { data: rows, isLoading } = useSWR<
    RemotePagination<RemoteCashRegister>
  >(`/api/${resource}?page=${page}&per_page=${perPage}`);

  if (isLoading) {
    return null;
  }

  return <DataTable data={rows!.data} columns={columns} />;
}
