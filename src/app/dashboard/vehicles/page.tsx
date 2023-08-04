'use client';

import { DataTable } from '@/_components/data-table';
import { useExtractPaginationFromUrl } from '@/_hooks/use-extract-pagination-from-url';
import { createColumnHelper } from '@tanstack/react-table';
import useSWR from 'swr';

const resource = 'vehicles';

const columnHelper = createColumnHelper<RemoteVehicle>();

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    header: 'ID',
  }),

  columnHelper.accessor('plate', {
    cell: (info) => info.getValue(),
    header: 'Plate',
  }),
];

export default function Vehicles() {
  const { page, perPage } = useExtractPaginationFromUrl();
  const { data: response, isLoading } = useSWR<RemotePagination<RemoteVehicle>>(
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
