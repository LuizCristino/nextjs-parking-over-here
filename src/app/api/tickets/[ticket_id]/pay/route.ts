import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { resource } from '../../config';
import { NextApiRequest } from 'next';

export async function POST(
  request: NextApiRequest,
  { params }: { params: { ticket_id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${resource}/${params.ticket_id}/pay`,
    {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + session.token,
        'Content-Type': 'application/json',
      },
      body: request.body,
      // @ts-ignore
      duplex: 'half',
    }
  );

  return NextResponse.json<RemotePagination<RemoteCashRegister>>(null, {
    status: res.status,
  });
}
