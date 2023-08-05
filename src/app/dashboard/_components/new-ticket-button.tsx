import { Box, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';

export function NewTicketButton() {
  const onClickHandler = () => {};

  return (
    <Box
      onClick={onClickHandler}
      position='fixed'
      bottom='20px'
      right='16px'
      zIndex={3}
    >
      <IconButton
        as={Link}
        href='/dashboard/?modal=new-ticket'
        aria-label='add new ticket'
        size='lg'
        icon={<FiPlus />}
        variant='solid'
        color='white'
        _light={{ bg: 'blue.500' }}
        _dark={{ bg: 'blue.500' }}
        _hover={{ bg: 'blue.300' }}
      />
    </Box>
  );
}
