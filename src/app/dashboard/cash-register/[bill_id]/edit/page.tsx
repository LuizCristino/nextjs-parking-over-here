'use client';

import { GridForm } from '@/_components/grid-form';
import { GridFormTitle } from '@/_components/grid-form-title';
import { GridInput } from '@/_components/grid-input';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { FormEventHandler } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

export type CashRegisterEditProps = {
  params: { bill_id: string };
};

export default function CashRegisterEdit(props: CashRegisterEditProps) {
  const { params } = props;

  const { data: bill, isLoading } = useSWR<RemoteCashRegister>(
    `/api/cash-register/${params.bill_id}`
  );

  if (bill == null || isLoading) {
    return null;
  }

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();

    const form = Object.fromEntries(new FormData(evt.currentTarget).entries());

    const payload = {
      quantity: +form.quantity,
    };

    const response = fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/cash-register/${bill.id}`,
      { method: 'PATCH', body: JSON.stringify(payload) }
    );

    toast.promise(response, {
      pending: 'Saving...',
      error: 'Error',
      success: 'Saved!',
    });
  };

  return (
    <Box mt={[10, 0]}>
      <SimpleGrid
        display={{ base: 'initial', md: 'grid' }}
        columns={{ md: 3 }}
        spacing={{ md: 6 }}
      >
        <GridFormTitle
          title='Cash bill'
          description='This is the information of how many of this bills exists on the cash register'
        />

        <GridForm onSubmit={onSubmitHandler}>
          <GridInput
            isDisabled
            id='id'
            name='id'
            label='ID'
            colSpan={6}
            value={bill.id}
            fontWeight='bold'
          />

          <GridInput
            isDisabled
            label='Name'
            colSpan={[6, 2]}
            value={bill.name}
          />

          <GridInput
            id='value'
            name='value'
            label='Value'
            colSpan={[6, 2]}
            defaultValue={bill.value / 100}
            type='number'
            isDisabled
            min={0}
            step={0.01}
          />

          <GridInput
            id='quantity'
            name='quantity'
            label='Quantity'
            colSpan={[6, 2]}
            defaultValue={bill.quantity}
            type='number'
            min={0}
            step={1}
          />
        </GridForm>
      </SimpleGrid>
    </Box>
  );
}
