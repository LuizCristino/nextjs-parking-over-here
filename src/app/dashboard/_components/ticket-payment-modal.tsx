'use client';

import { GridInput } from '@/_components/grid-input';
import {
  Box,
  Button,
  FormLabel,
  GridItem,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { differenceInHours } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useState,
} from 'react';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { toast } from 'react-toastify';
import useSWR from 'swr';

type TicketPaymentModalProps = {
  ticket?: RemoteTicket;
};

const onClose = () => {};

type ResumedBill = Pick<RemoteCashRegister, 'id' | 'name' | 'value'>;

export function TicketPaymentModal(props: TicketPaymentModalProps) {
  const { ticket } = props;

  const router = useRouter();

  const { data: bills, isLoading } = useSWR<ResumedBill[]>(
    `/api/cash-register/bills`
  );

  const [selected, setSelected] = useState<
    Array<ResumedBill & { key: number; quantity: number }>
  >([]);

  useEffect(() => {
    if (ticket?.id == null) {
      /* Clear state after closing modal */
      setSelected([]);
    }
  }, [ticket?.id]);

  if (isLoading) {
    return null;
  }

  const onSubmitHandler = () => {
    const paymentBills = selected.reduce((acc, cur) => {
      if (cur.quantity <= 0) {
        return acc;
      }

      if (acc[cur.id] == null) {
        acc[cur.id] = 0;
      }

      acc[cur.id] += cur.quantity;

      return acc;
    }, {} as Record<string, number>);

    const payload = { bills: paymentBills };

    const response = fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/tickets/${ticket!.id}/pay`,
      { method: 'POST', body: JSON.stringify(payload) }
    );

    toast.promise(response, {
      pending: 'Saving...',
      error: 'Error',
      success: {
        render() {
          router.push('/dashboard');

          return 'Saved!';
        },
      },
    });
  };

  const addNewRow = () => {
    setSelected((prev) => [
      ...prev,
      {
        /* Key will always be incremental  */
        key: (prev[prev.length - 1]?.key ?? 0) + 1,
        id: '',
        name: '',
        value: 0,
        quantity: 0,
      },
    ]);
  };

  let total = 0;
  if (ticket != null) {
    const createdAtDate = new Date(ticket.created_at);
    const diffHours = differenceInHours(Date.now(), createdAtDate);
    total =
      ticket.vehicle.type.initial_price +
      ticket.vehicle.type.price_per_hour * diffHours;
  }

  const totalInBills = selected.reduce((acc, cur) => {
    return acc + cur.value * cur.quantity;
  }, 0);

  return (
    <Modal isOpen={ticket != null} onClose={onClose} size='xl'>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Ticket #{ticket?.id}</ModalHeader>

        <ModalCloseButton as={Link} href='/dashboard' />

        <ModalBody pb={6}>
          <HStack justifyContent='space-between'>
            <Text mb='4'>
              To pay:{' '}
              <Text as='span' fontWeight='bold'>
                ${(total / 100).toFixed(2)}
              </Text>
            </Text>

            <Text mb='4'>
              Total in bills:{' '}
              <Text as='span' fontWeight='bold'>
                ${(totalInBills / 100).toFixed(2)}
              </Text>
            </Text>
          </HStack>

          <Box>
            <SimpleGrid columns={6} spacing={4}>
              {selected.map((row) => (
                <RowComponent
                  key={row.key}
                  row={row}
                  onChange={setSelected}
                  bills={bills}
                />
              ))}

              <GridItem colStart={6} colSpan={1} justifySelf='center'>
                <IconButton
                  aria-label='add line'
                  color='white'
                  _light={{ bg: 'blue.500' }}
                  _dark={{ bg: 'blue.500' }}
                  _hover={{ bg: 'blue.700' }}
                  icon={<FiPlus />}
                  onClick={addNewRow}
                />
              </GridItem>
            </SimpleGrid>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            isDisabled={totalInBills < total}
            colorScheme='blue'
            _light={{ bg: 'blue.500' }}
            _dark={{ bg: 'blue.500' }}
            _hover={{ bg: 'blue.700' }}
            mr={3}
            onClick={onSubmitHandler}
          >
            Pay
          </Button>

          <Button as={Link} href='/dashboard'>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

type Row = ResumedBill & { key: number; quantity: number };

type RowComponentProps = {
  row: Row;
  bills?: ResumedBill[] | undefined;
  onChange: Dispatch<SetStateAction<Row[]>>;
};

const RowComponent = memo(function RowComponent(props: RowComponentProps) {
  const { row, onChange, bills } = props;

  const onSelectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange((prev) => {
      /* Finding which index is being altered */
      const index = prev.findIndex((p) => p.key === row.key);

      /* Get all data of the bill */
      const cash = bills?.find((b) => b.id === event.target.value);

      /* Update state to reflect the new selected bill */
      return [
        ...prev.slice(0, index),
        {
          ...prev[index],
          ...(cash ?? {
            id: '',
            name: '',
            value: 0,
            quantity: 0,
          }),
        },
        ...prev.slice(index + 1),
      ];
    });
  };

  const onQuantityHandler = (value: string) => {
    onChange((prev) => {
      const index = prev.findIndex((p) => p.key === row.key);

      return [
        ...prev.slice(0, index),
        { ...prev[index], quantity: +value },
        ...prev.slice(index + 1),
      ];
    });
  };

  const onRemoveHandler = () => {
    onChange((prev) => {
      const index = prev.findIndex((p) => p.key === row.key);

      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };

  return (
    <>
      <GridItem colSpan={3}>
        <FormLabel
          fontSize='sm'
          fontWeight='md'
          color='gray.700'
          mb={3}
          _dark={{ color: 'gray.50' }}
        >
          Bill
        </FormLabel>

        <Select placeholder='Select bill' onChange={onSelectHandler}>
          {bills?.map((bill) => (
            <option key={bill.id} value={bill.id}>
              {bill.name}
            </option>
          ))}
        </Select>
      </GridItem>

      <GridInput
        isDisabled={row.id === ''}
        colSpan={2}
        label='Quantity'
        type='number'
        min={1}
        step={1}
        value={row.quantity}
        // @ts-expect-error when type is number the onChange is
        // wrongly typed
        onChange={onQuantityHandler}
      />
      <GridItem colSpan={1} alignSelf='flex-end' justifySelf='center'>
        <IconButton
          aria-label='remove line'
          color='white'
          _light={{ bg: 'red.500' }}
          _dark={{ bg: 'red.500' }}
          _hover={{ bg: 'red.700' }}
          icon={<FiTrash />}
          onClick={onRemoveHandler}
        />
      </GridItem>
    </>
  );
});
