'use client';

import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { SignInResponse, signIn, useSession } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';

export default function SignIn() {
  const { status } = useSession();
  const searchParams = useSearchParams();

  // This will prevent from authenticated user accessing this screen
  // Also will redirect back the authenticated user from where he came
  // from after the successful sign in
  if (status === 'authenticated') {
    return redirect(searchParams.get('callbackUrl') ?? '/dashboard');
  }

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const promiseSignIn = new Promise<SignInResponse | undefined>(
      async (resolve, reject) => {
        const result = await signIn('credentials', {
          username: (event.target as any).username.value,
          password: (event.target as any).password.value,
          redirect: false,
        });

        console.log('RESULT', result);

        if (result == null || result.error != null) {
          return reject(result);
        }

        return resolve(result);
      }
    );

    toast.promise(promiseSignIn, {
      pending: 'Authenticating',
      success: 'Welcome to Parking Over Here 😁',
      error: 'Invalid credentials 🤯',
    });
  };

  return (
    <Flex minH='100vh' align='center' justify='center' bg='gray.50'>
      <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
        <Stack align='center'>
          <Heading fontSize='4xl'>Sign in to your account</Heading>
        </Stack>

        <Box rounded='lg' bg='white' boxShadow='lg' p={8}>
          <form action='#' onSubmit={onSubmitHandler}>
            <Stack spacing={4}>
              <FormControl id='email'>
                <FormLabel htmlFor='username'>Email address</FormLabel>
                <Input id='username' name='username' type='email' />
              </FormControl>

              <FormControl id='password'>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input id='password' name='password' type='password' />
              </FormControl>

              <Stack spacing={10}>
                <Stack
                  display='none'
                  direction={{ base: 'column', sm: 'row' }}
                  align='start'
                  justify='space-between'
                >
                  <Checkbox>Remember me</Checkbox>
                  <Text color='blue.400'>Forgot password?</Text>
                </Stack>

                <Button
                  type='submit'
                  color='white'
                  _light={{ bg: 'blue.300' }}
                  _dark={{ bg: 'blue.300' }}
                  _hover={{ bg: 'blue.500' }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
