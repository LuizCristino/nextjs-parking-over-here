import { HStack, IconButton } from '@chakra-ui/react';
import { DisplayColumnDef } from '@tanstack/react-table';
import { usePathname, useRouter } from 'next/navigation';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';
import { toast } from 'react-toastify';

export type DataTableActionRowProps = {
  noEdit: boolean;
  noExclusion: boolean;
};

export function DataTableActionRow<T>(
  props?: Partial<DataTableActionRowProps>
): DisplayColumnDef<T> {
  const { noEdit = false, noExclusion = false } = props ?? {};

  return {
    header: 'Actions',
    cell: (info) => {
      const pathname = usePathname();
      const router = useRouter();

      const itemPath = `${pathname}/${(info.row.original as any).id}`;

      return (
        <HStack spacing={2} justifyContent='flex-end'>
          <IconButton
            size='sm'
            variant='ghost'
            aria-label='details'
            icon={<FiEye />}
            onClick={() => router.push(itemPath)}
          />

          {noEdit ? null : (
            <IconButton
              size='sm'
              variant='ghost'
              aria-label='edit'
              icon={<FiEdit />}
              onClick={() => router.push(`${itemPath}/edit`)}
            />
          )}

          {noExclusion ? null : (
            <IconButton
              size='sm'
              variant='ghost'
              aria-label='delete'
              colorScheme='red'
              onClick={() => toast.error('Not yet implemented')}
              icon={<FiTrash />}
            />
          )}
        </HStack>
      );
    },
  };
}
