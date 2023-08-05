import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import {
  FiBook,
  FiDollarSign,
  FiFileText,
  FiHome,
  FiTag,
  FiTruck,
  FiUser,
} from 'react-icons/fi';
import { UrlObject } from 'url';
import { NavItem } from './nav-item';

export type LinkItemProps = {
  name: string;
  icon: IconType;
  href: UrlObject | string;
};

export type SidebarProps = BoxProps & {
  onClose: () => void;
};

const items: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, href: '/dashboard' },
  { name: 'Users', icon: FiUser, href: '/dashboard/users' },
  { name: 'Vehicles', icon: FiTruck, href: '/dashboard/vehicles' },
  { name: 'Vehicle Types', icon: FiTag, href: '/dashboard/vehicle-types' },
  { name: 'Tickets', icon: FiFileText, href: '/dashboard/tickets' },
  {
    name: 'Cash Register',
    icon: FiDollarSign,
    href: '/dashboard/cash-register',
  },
  {
    name: 'Transaction logs',
    icon: FiBook,
    href: '/dashboard/transaction-logs',
  },
];

export function SidebarContent(props: SidebarProps) {
  const { onClose, ...rest } = props;

  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex
        h='20'
        alignItems='center'
        mx='8'
        justifyContent={{ base: 'space-between', md: 'space-around' }}
      >
        <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
          POH
        </Text>

        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {items.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}
