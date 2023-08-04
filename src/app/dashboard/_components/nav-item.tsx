'use client';

import { Box, Flex, FlexProps, Icon } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';
import { UrlObject } from 'url';
import { usePathname } from 'next/navigation';

export type NavItemProps = FlexProps & {
  icon?: IconType;
  children: ReactNode;
  href: string | UrlObject;
};

const REGEX_ROOT = /^\/dashboard$/i;

export function NavItem(props: NavItemProps) {
  const { icon, children, href, ...rest } = props;

  const pathname = usePathname();

  let isCurrent = false;
  if (new RegExp(`^${href}`, 'i').test(pathname)) {
    isCurrent = true;

    /* This will exclude from '/' being selected */
    if (!REGEX_ROOT.test(pathname) && REGEX_ROOT.test(String(href))) {
      isCurrent = false;
    }
  }

  return (
    <Box
      as={Link}
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        bg={isCurrent ? 'cyan.500' : ''}
        color={isCurrent ? 'white' : ''}
        _hover={{ bg: 'cyan.400', color: 'white' }}
        {...rest}
      >
        {icon != null ? (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{ color: 'white' }}
            as={icon}
          />
        ) : null}

        {children}
      </Flex>
    </Box>
  );
}
