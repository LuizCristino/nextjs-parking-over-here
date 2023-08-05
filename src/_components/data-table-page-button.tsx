import { Button, useColorModeValue } from '@chakra-ui/react';
import { Table } from '@tanstack/react-table';

export type DataTablePageButtonProps<T> = {
  page: string;
  current: number;
  table: Table<T>;
};

export function DataTablePageButton<T>(props: DataTablePageButtonProps<T>) {
  const { page, table, current } = props;

  const isCurrent = +page === current;

  const isDisabled = page === '...' || isCurrent;

  const currentColor = useColorModeValue('gray.100', 'gray.900');

  const onClickHandler = () => {
    if (!isDisabled) {
      table.setPageIndex(+page - 1);
    }
  };

  return (
    <Button
      variant={isCurrent ? 'solid' : 'outline'}
      isDisabled={isDisabled}
      onClick={onClickHandler}
      _disabled={
        isCurrent
          ? {
              backgroundColor: 'blue.300',
              color: currentColor,
              _hover: { backgroundColor: 'blue.300' },
            }
          : undefined
      }
    >
      {page}
    </Button>
  );
}
