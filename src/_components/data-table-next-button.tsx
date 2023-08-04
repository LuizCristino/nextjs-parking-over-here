import { Button } from '@chakra-ui/react';
import { Table } from '@tanstack/react-table';

export type DataTableNextButtonProps<T> = {
  table: Table<T>;
};

export function DataTableNextButton<T>(props: DataTableNextButtonProps<T>) {
  const { table } = props;

  return (
    <Button
      onClick={table.nextPage}
      isDisabled={!table.getCanNextPage()}
      variant='outline'
    >
      {'>'}
    </Button>
  );
}
