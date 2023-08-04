import { Button } from '@chakra-ui/react';
import { Table } from '@tanstack/react-table';

export type DataTablePreviousButtonProps<T> = {
  table: Table<T>;
};

export function DataTablePreviousButton<T>(
  props: DataTablePreviousButtonProps<T>
) {
  const { table } = props;

  return (
    <Button
      onClick={table.previousPage}
      isDisabled={!table.getCanPreviousPage()}
      variant='outline'
    >
      {'<'}
    </Button>
  );
}
