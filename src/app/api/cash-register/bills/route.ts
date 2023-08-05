import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextApiRequest } from 'next';
import { resource } from '../config';

export async function GET(request: NextApiRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${resource}/bills`,
    { method: 'GET', headers: { Authorization: 'Bearer ' + session.token } }
  ).then((res) => res.json());

  return NextResponse.json<Pick<RemoteCashRegister, 'id' | 'name' | 'value'>>(
    res,
    { status: 200 }
  );
}
