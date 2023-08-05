import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiDollarSign, FiMoreVertical } from 'react-icons/fi';
import { differenceInHours, format } from 'date-fns';
import Link from 'next/link';

export function PendingTicket(props: RemoteTicket) {
  const {
    id,
    vehicle: {
      plate,
      type: { initial_price, price_per_hour },
    },
    created_at,
  } = props;

  const createdAtDate = new Date(created_at);
  const diffHours = differenceInHours(Date.now(), createdAtDate);
  const total = initial_price + price_per_hour * diffHours;

  return (
    <Card maxW='md'>
      <CardHeader>
        <Flex gap='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Heading size='md'>{plate}</Heading>
          </Flex>

          <IconButton
            variant='ghost'
            colorScheme='gray'
            aria-label='See menu'
            icon={<FiMoreVertical />}
          />
        </Flex>
      </CardHeader>

      <CardBody>
        <VStack alignItems='flex-start'>
          <Text>Entered: {format(createdAtDate, 'dd/MM HH:mm')}</Text>
          <Text>Elapsed time: {diffHours}h</Text>
          <Text>
            Total:{' '}
            <Text as='span' fontWeight='bold'>
              ${(total / 100).toFixed(2)}
            </Text>
          </Text>
        </VStack>
      </CardBody>

      <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{ '& > button': { minW: '136px' } }}
      >
        <Button
          as={Link}
          href={`/dashboard/?modal=${id}`}
          flex='1'
          variant='ghost'
          leftIcon={<FiDollarSign />}
        >
          Pay
        </Button>
      </CardFooter>
    </Card>
  );
}
