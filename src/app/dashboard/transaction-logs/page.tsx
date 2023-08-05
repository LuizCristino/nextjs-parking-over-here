'use client';

import { DataTable } from '@/_components/data-table';
import { DataTableActionRow } from '@/_components/data-table-action-row';
import { TooltipedIcon } from '@/_components/tooltiped-icon';
import { useExtractPaginationFromUrl } from '@/_hooks/use-extract-pagination-from-url';
import { Box, Center, Text } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import useSWR from 'swr';

const resource = 'transaction-logs';

const columnHelper = createColumnHelper<RemoteTransactionLog>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('type', {
    header: () => <Center>Type</Center>,
    cell: (info) => {
      const value = info.getValue();
      const Icon = value === 'IN' ? FiArrowUp : FiArrowDown;
      const color = value === 'IN' ? 'green.500' : 'red.500';

      return (
        <Center>
          <TooltipedIcon label={value} as={Icon} color={color} />
        </Center>
      );
    },
  }),

  columnHelper.accessor('ticket.vehicle.plate', {
    header: 'Vehicle Plate',
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('total', {
    header: () => <Center>Bills (SUM)</Center>,
    cell: (info) => {
      const value = info.getValue();
      const isValid = value != null && value > 0;
      const formatted = (value / 100).toFixed(2);

      return (
        <Box textAlign={isValid ? 'end' : 'center'}>
          {isValid ? `$${formatted}` : '-'}
        </Box>
      );
    },
  }),

  columnHelper.accessor('created_at', {
    header: 'Vehicle Plate',
    cell: (info) => format(new Date(info.getValue()), 'dd/MM/yyyy HH:mm:ss'),
  }),

  columnHelper.display(DataTableActionRow({ noExclusion: true, noEdit: true })),
];

export default function TransactionLogs() {
  const { page, perPage } = useExtractPaginationFromUrl();
  const { data: response, isLoading } = useSWR<
    RemotePagination<RemoteTransactionLog>
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
