export const maxDuration = 300;
// export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server'
import { getMenus, createMenu } from '@/services/menus';
import { validateUserSession } from '@/services/users';

export async function GET(request: Request) {
  console.log('>> app.api.menus.GET');

  const menus = await getMenus();
  return NextResponse.json({ menus });
}

export async function POST(request: Request) {
  console.log('>> app.api.menus.POST', request);
  const { user } = await validateUserSession(request);
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'authentication failed' },
      { status: 401 }
    );
  }

  const data: any = await request.json();
  const menu = await createMenu(user, data.name, data.type, data.numItems || 5);
  return NextResponse.json({ menu });
}
