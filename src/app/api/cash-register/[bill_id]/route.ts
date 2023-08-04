import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextApiRequest } from 'next';

const resource = 'cash-register';

export async function GET(
  request: NextApiRequest,
  { params }: { params: { bill_id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${resource}/${params.bill_id}`,
    { method: 'GET', headers: { Authorization: 'Bearer ' + session.token } }
  ).then((res) => res.json());

  return NextResponse.json<RemotePagination<RemoteCashRegister>>(res, {
    status: 200,
  });
}

export async function PATCH(
  request: NextApiRequest,
  { params }: { params: { bill_id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${resource}/${params.bill_id}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + session.token,
        'Content-Type': 'application/json',
      },
      body: request.body,
      // @ts-ignore
      duplex: 'half',
    }
  );

  const json = await res.json();

  return NextResponse.json<RemotePagination<RemoteCashRegister>>(json, {
    status: res.status,
  });
}
