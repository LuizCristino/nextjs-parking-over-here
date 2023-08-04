'use client';

import { DataTable } from '@/_components/data-table';
import { useExtractPaginationFromUrl } from '@/_hooks/use-extract-pagination-from-url';
import { createColumnHelper } from '@tanstack/react-table';
import useSWR from 'swr';

const resource = 'tickets';

const columnHelper = createColumnHelper<RemoteTicket>();

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    header: 'ID',
  }),
];

export default function Vehicles() {
  const { page, perPage } = useExtractPaginationFromUrl();
  const { data: rows, isLoading } = useSWR<RemotePagination<RemoteTicket>>(
    `/api/${resource}?page=${page}&per_page=${perPage}`
  );

  if (isLoading) {
    return null;
  }

  return <DataTable data={rows!.data} columns={columns} />;
}
