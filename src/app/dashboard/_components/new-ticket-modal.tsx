'use client';

import {
  Button,
  FormControl,
  FormLabel,
  GridItem,
  InputGroup,
  InputLeftElement,
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
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';
import useSWR from 'swr';

export type NewTicketModalProps = {
  isOpen: boolean;
};

type NewTicketFormData = {
  id_vehicle: string | undefined;
  vehicle_plate: string;
  vehicle_type: string;
};

const onClose = () => {};

export function NewTicketModal(props: NewTicketModalProps) {
  const { isOpen } = props;

  const router = useRouter();

  const vehicles = useSWR<RemoteDetailedVehicle[]>('/api/vehicles/all');

  const vehicleTypes = useSWR<RemoteVehicleType[]>('/api/vehicle-types/all');

  const methods = useForm<NewTicketFormData>({});

  const [id_vehicle, vehicle_plate] = methods.watch([
    'id_vehicle',
    'vehicle_plate',
  ]);

  const showSelectType = vehicle_plate != null && id_vehicle == null;

  useEffect(() => {
    if (showSelectType === false) {
      methods.setValue('id_vehicle', undefined);
    }
  }, [showSelectType]);

  const onSubmitHandler = (values: NewTicketFormData) => {
    const { id_vehicle, vehicle_plate, vehicle_type } = values;

    const payload = {} as NewTicketFormData;

    if (id_vehicle) {
      payload.id_vehicle = id_vehicle;
    } else {
      payload.vehicle_plate = vehicle_plate;
      payload.vehicle_type = vehicle_type;
    }

    const response = fetch(`${process.env.NEXT_PUBLIC_URL}/api/tickets/`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((res) => {
      if (res.ok) {
        return res;
      } else {
        throw new Error('' + res.status);
      }
    });

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

  useEffect(() => {
    if (!isOpen) {
      methods.reset();
    }
  }, [isOpen]);

  if (vehicles.isLoading || vehicleTypes.isLoading) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>New Ticket</ModalHeader>

        <ModalCloseButton as={Link} href='/dashboard' />

        <ModalBody pb={6}>
          <FormProvider {...methods}>
            <SimpleGrid columns={6} spacing={4}>
              <GridItem colSpan={6}>
                <VehiclePlateAutoComplete vehicles={vehicles.data} />
              </GridItem>

              <GridItem colSpan={6}>
                {showSelectType ? (
                  <VehicleTypeSelect vehicleTypes={vehicleTypes.data} />
                ) : null}
              </GridItem>
            </SimpleGrid>
          </FormProvider>
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            colorScheme='blue'
            _light={{ bg: 'blue.500' }}
            _dark={{ bg: 'blue.500' }}
            _hover={{ bg: 'blue.700' }}
            onClick={methods.handleSubmit(onSubmitHandler)}
          >
            Park
          </Button>

          <Button as={Link} href='/dashboard'>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

type VehiclePlateAutoCompleteProps = { vehicles?: RemoteDetailedVehicle[] };
type AutoCompleteChangeEvent = {
  value: string;
  label?: string;
  originalValue?: string;
  noFilter?: boolean;
  creatable?: boolean;
};
function VehiclePlateAutoComplete(props: VehiclePlateAutoCompleteProps) {
  const { vehicles = [] } = props;

  const { control, setValue } = useFormContext<NewTicketFormData>();

  return (
    <Controller
      control={control}
      name='vehicle_plate'
      render={({ field: { value: formValue, onChange } }) => (
        <FormControl>
          <FormLabel>Vehicle</FormLabel>
          <AutoComplete
            openOnFocus
            creatable
            onChange={(value: string, evt: AutoCompleteChangeEvent) => {
              onChange(value);
              setValue(
                'id_vehicle',
                evt?.creatable == null
                  ? vehicles.find((vehicle) => vehicle.plate === value)?.id
                  : undefined
              );
            }}
          >
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
              {vehicles.map((vehicle) => (
                <AutoCompleteItem
                  key={vehicle.id}
                  value={vehicle.plate}
                  label={vehicle.plate}
                  textTransform='capitalize'
                >
                  {vehicle.plate}
                </AutoCompleteItem>
              ))}

              <AutoCompleteCreatable>
                {({ value }) => <Text>Add {value}</Text>}
              </AutoCompleteCreatable>
            </AutoCompleteList>
          </AutoComplete>
        </FormControl>
      )}
    />
  );
}

type VehicleTypeSelectProps = {
  vehicleTypes?: RemoteVehicleType[];
};
function VehicleTypeSelect(props: VehicleTypeSelectProps) {
  const { vehicleTypes = [] } = props;

  const { control } = useFormContext<NewTicketFormData>();

  return (
    <Controller
      control={control}
      name='vehicle_type'
      render={({ field: { value, onChange } }) => (
        <Select
          placeholder='Select an vehicle type'
          value={value}
          onChange={onChange}
        >
          {vehicleTypes.map((vehicleType) => (
            <option key={vehicleType.id} value={vehicleType.id}>
              {vehicleType.name}
            </option>
          ))}
        </Select>
      )}
    />
  );
}
