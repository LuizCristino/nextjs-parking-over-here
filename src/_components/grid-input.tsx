import {
  FormControl,
  FormLabel,
  GridItem,
  Input,
  InputProps,
  ResponsiveValue,
} from '@chakra-ui/react';

export type GridInputProps = {
  colSpan?: ResponsiveValue<number | 'auto'> | undefined;
  label?: string;
  inputProps?: InputProps;
};

export function GridInput(props: GridInputProps) {
  const { colSpan, label, inputProps } = props;

  const htmlFor = inputProps?.id;

  return (
    <FormControl as={GridItem} colSpan={colSpan}>
      <FormLabel
        htmlFor={htmlFor}
        fontSize='sm'
        fontWeight='md'
        color='gray.700'
        mb='1'
        _dark={{ color: 'gray.50' }}
      >
        {label}
      </FormLabel>

      <Input
        type='text'
        focusBorderColor='brand.400'
        shadow='sm'
        size='sm'
        w='full'
        rounded='md'
        {...inputProps}
      />
    </FormControl>
  );
}
