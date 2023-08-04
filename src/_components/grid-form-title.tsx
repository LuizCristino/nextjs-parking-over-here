import {
  Box,
  GridItem,
  Heading,
  ResponsiveValue,
  Text,
} from '@chakra-ui/react';

export type GridFormTitleProps = {
  title?: string;
  description?: string;
  colSpan?: ResponsiveValue<number | 'auto'> | undefined;
};

export function GridFormTitle(props: GridFormTitleProps) {
  const { title, description, colSpan = { md: 1 } } = props;

  return (
    <GridItem colSpan={colSpan}>
      <Box px={[4, 0]}>
        <Heading fontSize='lg' fontWeight='bold' lineHeight='6' mb='1'>
          {title}
        </Heading>

        <Text fontSize='sm' color='gray.600' _dark={{ color: 'gray.400' }}>
          {description}
        </Text>
      </Box>
    </GridItem>
  );
}
