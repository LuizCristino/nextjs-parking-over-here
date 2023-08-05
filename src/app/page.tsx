import { authOptions } from '@/_config/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user == null) {
    redirect('/sign_in');
  } else {
    redirect('/dashboard');
  }

  return null;
}
