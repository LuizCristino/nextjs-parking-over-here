'use client';

import { GridForm } from '@/_components/grid-form';
import { GridFormTitle } from '@/_components/grid-form-title';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import useSWR from 'swr';

export type CashRegisterEditProps = {
  params: { bill_id: string };
};

export default function CashRegisterEdit(props: CashRegisterEditProps) {
  const { params } = props;
  const { data: bill, isLoading } = useSWR(
    `/api/cash-register/${params.bill_id}`
  );

  return (
    <Box mt={[10, 0]}>
      <pre>{JSON.stringify(bill, null, 2)}</pre>
      <SimpleGrid
        display={{ base: 'initial', md: 'grid' }}
        columns={{ md: 3 }}
        spacing={{ md: 6 }}
      >
        <GridFormTitle
          title='Cash bill'
          description='This is the information of how many of this bills exists on the cash register'
        />

        <GridForm>
          <FormControl as={GridItem} colSpan={[6, 3]}>
            <FormLabel
              htmlFor='first_name'
              fontSize='sm'
              fontWeight='md'
              color='gray.700'
              _dark={{ color: 'gray.50' }}
            >
              First name
            </FormLabel>
            <Input
              type='text'
              name='first_name'
              id='first_name'
              autoComplete='given-name'
              mt={1}
              focusBorderColor='brand.400'
              shadow='sm'
              size='sm'
              w='full'
              rounded='md'
            />
          </FormControl>

          <FormControl as={GridItem} colSpan={[6, 3]}>
            <FormLabel
              htmlFor='last_name'
              fontSize='sm'
              fontWeight='md'
              color='gray.700'
              _dark={{
                color: 'gray.50',
              }}
            >
              Last name
            </FormLabel>
            <Input
              type='text'
              name='last_name'
              id='last_name'
              autoComplete='family-name'
              mt={1}
              focusBorderColor='brand.400'
              shadow='sm'
              size='sm'
              w='full'
              rounded='md'
            />
          </FormControl>

          <FormControl as={GridItem} colSpan={[6, 4]}>
            <FormLabel
              htmlFor='email_address'
              fontSize='sm'
              fontWeight='md'
              color='gray.700'
              _dark={{
                color: 'gray.50',
              }}
            >
              Email address
            </FormLabel>
            <Input
              type='text'
              name='email_address'
              id='email_address'
              autoComplete='email'
              mt={1}
              focusBorderColor='brand.400'
              shadow='sm'
              size='sm'
              w='full'
              rounded='md'
            />
          </FormControl>

          <FormControl as={GridItem} colSpan={[6, 3]}>
            <FormLabel
              htmlFor='country'
              fontSize='sm'
              fontWeight='md'
              color='gray.700'
              _dark={{
                color: 'gray.50',
              }}
            >
              Country / Region
            </FormLabel>
            <Select
              id='country'
              name='country'
              autoComplete='country'
              placeholder='Select option'
              mt={1}
              focusBorderColor='brand.400'
              shadow='sm'
              size='sm'
              w='full'
              rounded='md'
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </Select>
          </FormControl>

          <FormControl as={GridItem} colSpan={6}>
            <FormLabel
              htmlFor='street_address'
              fontSize='sm'
              fontWeight='md'
              color='gray.700'
              _dark={{
                color: 'gray.50',
              }}
            >
              Street address
            </FormLabel>
            <Input
              type='text'
              name='street_address'
              id='street_address'
              autoComplete='street-address'
              mt={1}
              focusBorderColor='brand.400'
              shadow='sm'
              size='sm'
              w='full'
              rounded='md'
            />
          </FormControl>

          <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
            <FormLabel
              htmlFor='city'
              fontSize='sm'
              fontWeight='md'
              color='gray.700'
              _dark={{
                color: 'gray.50',
              }}
            >
              City
            </FormLabel>
            <Input
              type='text'
              name='city'
              id='city'
              autoComplete='city'
              mt={1}
              focusBorderColor='brand.400'
              shadow='sm'
              size='sm'
              w='full'
              rounded='md'
            />
          </FormControl>

          <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
            <FormLabel
              htmlFor='state'
              fontSize='sm'
              fontWeight='md'
              color='gray.700'
              _dark={{
                color: 'gray.50',
              }}
            >
              State / Province
            </FormLabel>
            <Input
              type='text'
              name='state'
              id='state'
              autoComplete='state'
              mt={1}
              focusBorderColor='brand.400'
              shadow='sm'
              size='sm'
              w='full'
              rounded='md'
            />
          </FormControl>

          <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
            <FormLabel
              htmlFor='postal_code'
              fontSize='sm'
              fontWeight='md'
              color='gray.700'
              _dark={{
                color: 'gray.50',
              }}
            >
              ZIP / Postal
            </FormLabel>
            <Input
              type='text'
              name='postal_code'
              id='postal_code'
              autoComplete='postal-code'
              mt={1}
              focusBorderColor='brand.400'
              shadow='sm'
              size='sm'
              w='full'
              rounded='md'
            />
          </FormControl>
        </GridForm>
      </SimpleGrid>
    </Box>
  );
}
