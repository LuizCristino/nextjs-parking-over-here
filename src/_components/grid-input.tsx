import {
  FormControl,
  FormLabel,
  GridItem,
  Input,
  InputProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  ResponsiveValue,
} from '@chakra-ui/react';
import { useMemo } from 'react';

export type GridInputProps = InputProps & {
  colSpan?: ResponsiveValue<number | 'auto'> | undefined;
  label?: string;
};

export function GridInput(props: GridInputProps) {
  const { colSpan, label, ...inputProps } = props;

  const htmlFor = inputProps?.id;

  const InputComponent = useMemo(() => {
    if (inputProps?.type === 'number') {
      return () => (
        <NumberInput {...(inputProps as any)}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      );
    }

    return () => (
      <Input
        type='text'
        focusBorderColor='brand.400'
        shadow='sm'
        w='full'
        rounded='md'
        {...inputProps}
      />
    );
  }, [inputProps]);

  return (
    <FormControl as={GridItem} colSpan={colSpan}>
      <FormLabel
        htmlFor={htmlFor}
        fontSize='sm'
        fontWeight='md'
        color='gray.700'
        mb={3}
        _dark={{ color: 'gray.50' }}
      >
        {label}
      </FormLabel>

      <InputComponent />
    </FormControl>
  );
}
