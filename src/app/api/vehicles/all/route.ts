import { authOptions } from '@/_config/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const resource = 'vehicles';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${resource}/all`,
    { method: 'GET', headers: { Authorization: 'Bearer ' + session.token } }
  ).then((res) => res.json());

  return NextResponse.json<RemoteDetailedVehicle[]>(res, {
    status: 200,
  });
}
