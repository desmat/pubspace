import { NextResponse } from 'next/server'
import { validateUserSession } from '@/services/users'

// export const revalidate = 0
// false | 'force-cache' | 0 | number

export async function GET(request: Request) {
  console.log('>> app.api.profiles.GET');

  const { user } = await validateUserSession(request)
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'authentication failed' },
      { status: 401 }
    );
  }

  return NextResponse.json({ user });
}
