'use client';

import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { MobileNav } from './_components/mobile-nav';
import { SidebarContent } from './_components/sidebar-content';
import { useSession } from 'next-auth/react';

export type DashboardLayoutProps = {
  children?: ReactNode;
};

export default function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const session = useSession();
  const bgColor = useColorModeValue('gray.100', 'gray.900');

  if (session.data?.user == null) {
    return null;
  }

  return (
    <Box minH='100vh' bg={bgColor}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }} p='4'>
        {children}
      </Box>
    </Box>
  );
}
