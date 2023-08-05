import { authOptions } from '@/_config/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { resource } from '../config';

export async function GET(
  request: Request,
  { params }: { params: { log_id: string } }
) {
  const { log_id } = params;
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${resource}/${log_id}`,
    { method: 'GET', headers: { Authorization: 'Bearer ' + session.token } }
  );

  const { status } = res;
  const json = await res.json();

  return NextResponse.json<RemotePagination<RemoteTransactionLog>>(json, {
    status,
  });
}
