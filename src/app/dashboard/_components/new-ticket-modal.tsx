'use client';

import {
  FormControl,
  FormLabel,
  GridItem,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import useSWR from 'swr';

export type NewTicketModalProps = {
  isOpen: boolean;
};

const onClose = () => {};

export function NewTicketModal(props: NewTicketModalProps) {
  const { isOpen } = props;

  const { data: vehicles, isLoading } =
    useSWR<RemoteDetailedVehicle[]>('/api/vehicles/all');

  if (isLoading) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>New Ticket</ModalHeader>

        <ModalCloseButton as={Link} href='/dashboard' />

        <ModalBody pb={6}>
          <SimpleGrid columns={6} spacing={4}>
            <GridItem colSpan={6}>
              <FormControl>
                <FormLabel>Vehicle</FormLabel>
                <AutoComplete openOnFocus creatable>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      color='inherit'
                      fontSize='1.2em'
                    >
                      <FiSearch />
                    </InputLeftElement>
                    <AutoCompleteInput placeholder='Search...' />
                  </InputGroup>
                  <AutoCompleteList>
                    {vehicles?.map((vehicle) => (
                      <AutoCompleteItem
                        key={vehicle.id}
                        value={vehicle.plate}
                        textTransform='capitalize'
                      >
                        {vehicle.plate}
                      </AutoCompleteItem>
                    ))}
                    <AutoCompleteCreatable />
                  </AutoCompleteList>
                </AutoComplete>
              </FormControl>
            </GridItem>
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
