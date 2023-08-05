import { authOptions } from '@/_config/auth';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { resource } from '../config';

export async function GET(
  request: NextRequest,
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
  request: NextRequest,
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
