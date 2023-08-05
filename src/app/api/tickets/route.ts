import { authOptions } from '@/_config/auth';
import { DEFAULT_VALUES } from '@/_config/default-values';
import { SafeCast } from '@/_utilities/safe-cast';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { resource } from './config';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const page = SafeCast.number(searchParams.get('page'), 1, { min: 1 });
  const perPage = SafeCast.number(
    searchParams.get('per_page'),
    DEFAULT_VALUES.ITEMS_PER_PAGE_MIN,
    {
      min: DEFAULT_VALUES.ITEMS_PER_PAGE_MIN,
      max: DEFAULT_VALUES.ITEMS_PER_PAGE_MAX,
    }
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${resource}?page=${page}&per_page=${perPage}`,
    { method: 'GET', headers: { Authorization: 'Bearer ' + session.token } }
  ).then((res) => res.json());

  return NextResponse.json<RemotePagination<RemoteTicket>>(res, {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(null, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/${resource}`,
    {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + session.token },
      body: request.body,
      // @ts-ignore
      duplex: 'half',
    }
  );
  try {
    const { status } = res;
    const json = await res.json();

    return NextResponse.json<RemoteTicket>(json, { status });
  } catch (e) {
    const json = await res.json();
    return NextResponse.json((e as Error).message, { status: 500 });
  }
}
