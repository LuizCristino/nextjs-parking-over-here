import { Box, Flex, FlexProps, Icon } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import Link from 'next/link';
import { UrlObject } from 'url';

export type NavItemProps = FlexProps & {
  icon?: IconType;
  children: ReactNode;
  href: string | UrlObject;
};

export function NavItem(props: NavItemProps) {
  const { icon, children, href, ...rest } = props;

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
