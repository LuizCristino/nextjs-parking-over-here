'use client';

import { DataTable } from '@/_components/data-table';
import { useExtractPaginationFromUrl } from '@/_hooks/use-extract-pagination-from-url';
import { Center } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import useSWR from 'swr';

const resource = 'users';

const columnHelper = createColumnHelper<RemoteUser>();

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    header: 'ID',
  }),

  columnHelper.accessor('email', {
    cell: (info) => info.getValue(),
    header: 'E-mail',
  }),

  columnHelper.accessor('is_active', {
    cell: (info) => (
      <Center>{info.getValue() ? <FiCheckCircle /> : <FiXCircle />}</Center>
    ),
    header: 'Is Active',
  }),
];

export default function Users() {
  const { page, perPage } = useExtractPaginationFromUrl();
  const { data: rows, isLoading } = useSWR<RemotePagination<RemoteUser>>(
    `/api/${resource}?page=${page}&per_page=${perPage}`
  );

  if (isLoading) {
    return null;
  }

  return <DataTable data={rows!.data} columns={columns} />;
}
