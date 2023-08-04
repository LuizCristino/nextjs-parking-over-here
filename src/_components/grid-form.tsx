import {
  Box,
  Button,
  GridItem,
  ResponsiveValue,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react';
import { FormEventHandler, ReactNode } from 'react';

export type GridFormProps = {
  children?: ReactNode;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  colSpan?: ResponsiveValue<number | 'auto'> | undefined;
};

export function GridForm(props: GridFormProps) {
  const { children, onSubmit, colSpan = { md: 2 } } = props;

  return (
    <GridItem mt={[5, null, 0]} colSpan={colSpan}>
      <Box
        as='form'
        onSubmit={onSubmit}
        rounded={[null, 'md']}
        overflow={{ sm: 'hidden' }}
      >
        <Stack
          px={4}
          py={5}
          p={[null, 6]}
          bg='white'
          _dark={{ bg: '#141517' }}
          spacing={6}
        >
          <SimpleGrid columns={6} spacing={6}>
            {children}
          </SimpleGrid>
        </Stack>

        <Box
          px={{ base: 4, sm: 6 }}
          py={3}
          bg='gray.50'
          _dark={{ bg: '#121212' }}
          textAlign='right'
        >
          <Button
            type='submit'
            colorScheme='brand'
            fontWeight='md'
            _light={{ bg: 'blue.300' }}
            _dark={{ bg: 'blue.300' }}
            _hover={{ bg: 'blue.500' }}
            _focus={{ shadow: '' }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </GridItem>
  );
}
