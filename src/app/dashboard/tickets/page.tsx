'use client';

import { DataTable } from '@/_components/data-table';
import { TooltipedIcon } from '@/_components/tooltiped-icon';
import { useExtractPaginationFromUrl } from '@/_hooks/use-extract-pagination-from-url';
import { Box, Center, Icon, Text, Tooltip } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';
import useSWR from 'swr';

const resource = 'tickets';

const columnHelper = createColumnHelper<RemoteTicket>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('vehicle.plate', {
    header: () => <Center>Vehicle Plate</Center>,
    cell: (info) => (
      <Center>
        <Link href={`/vehicles/${info.row.original.id}`}>
          <Text color='blue.500' _hover={{ textDecor: 'underline' }}>
            {info.getValue()}
          </Text>
        </Link>
      </Center>
    ),
  }),

  columnHelper.accessor('invoice.charged', {
    header: () => <Center>Total Charged</Center>,
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

  columnHelper.accessor('invoice.paid', {
    header: () => <Center>Paid</Center>,
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

  columnHelper.accessor('invoice.change', {
    header: () => <Center>Change</Center>,
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

  columnHelper.accessor('invoice.status', {
    header: () => <Center>Status</Center>,
    cell: (info) => (
      <Center>
        {info.getValue() === 'paid' ? (
          <TooltipedIcon as={FiCheckSquare} label='Paid' color='green.500' />
        ) : (
          <TooltipedIcon as={FiSquare} label='Pending' color='yellow.500' />
        )}
      </Center>
    ),
  }),
];

export default function Tickets() {
  const { page, perPage } = useExtractPaginationFromUrl();
  const { data: response, isLoading } = useSWR<RemotePagination<RemoteTicket>>(
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
