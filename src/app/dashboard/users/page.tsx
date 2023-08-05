'use client';

import { DataTable } from '@/_components/data-table';
import { TooltipedIcon } from '@/_components/tooltiped-icon';
import { useExtractPaginationFromUrl } from '@/_hooks/use-extract-pagination-from-url';
import { Center } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { FiCheckCircle, FiCircle } from 'react-icons/fi';
import useSWR from 'swr';

const resource = 'users';

const columnHelper = createColumnHelper<RemoteUser>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('email', {
    header: 'E-mail',
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('is_active', {
    header: () => <Center>Is Active</Center>,
    cell: (info) => (
      <Center>
        {info.getValue() ? (
          <TooltipedIcon
            as={FiCheckCircle}
            label='Active user'
            color='green.500'
          />
        ) : (
          <TooltipedIcon
            as={FiCircle}
            label='Inactive user'
            color='yellow.500'
          />
        )}
      </Center>
    ),
  }),
];

export default function Users() {
  const { page, perPage } = useExtractPaginationFromUrl();
  const { data: response, isLoading } = useSWR<RemotePagination<RemoteUser>>(
    `/api/${resource}?page=${page}&per_page=${perPage}`
  );

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
