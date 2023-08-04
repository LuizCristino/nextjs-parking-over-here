import { useTablePagination } from '@/_hooks/use-table-pagination';
import { Table, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DataTablePagination } from './data-table-pagination';

export type DataTableProps<T extends object> = {
  data: T[];
  total?: number;
  columns: ColumnDef<T, any>[];
  totalPages?: number;
};

export function DataTable<T extends object>(props: DataTableProps<T>) {
  const { data, columns, total = 0, totalPages } = props;

  const { pageSize, pageIndex, setPagination } = useTablePagination();

  const table = useReactTable({
    columns,
    data,
    pageCount: totalPages ?? Math.floor(total / pageSize),
    state: { pagination: { pageSize, pageIndex } },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
  });

  return (
    <VStack spacing={4}>
      <Table
        bg='white'
        borderColor='gray.200'
        borderWidth='1'
        borderRadius='lg'
        shadow='md'
        overflow='hidden'
      >
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>

        <Tbody>
          {table.getRowModel().rows.map((row, index) => (
            <Tr
              key={row.id}
              bg={index % 2 ? 'white' : 'gray.100'}
              _hover={{ bg: 'blackAlpha.300' }}
              userSelect='none'
            >
              {row.getVisibleCells().map((cell) => {
                const meta = cell.column.columnDef.meta;
                return (
                  <Td key={cell.id} isNumeric={meta?.isNumeric}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>

      <DataTablePagination
        table={table}
        pageIndex={pageIndex}
        perPage={pageSize}
        total={total}
        lastIndex={Math.ceil(total / pageSize)}
      />
    </VStack>
  );
}
