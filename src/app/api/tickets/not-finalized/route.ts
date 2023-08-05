import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { resource } from '../config';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${resource}/not-finalized`,
    { method: 'GET', headers: { Authorization: 'Bearer ' + session.token } }
  ).then((res) => res.json());

  return NextResponse.json<RemoteTicket[]>(res, {
    status: 200,
  });
}
