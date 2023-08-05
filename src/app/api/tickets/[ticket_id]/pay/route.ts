import { authOptions } from '@/_config/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { resource } from '../../config';

export async function POST(
  request: NextRequest,
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

  return NextResponse.json({}, { status: res.status });
}
