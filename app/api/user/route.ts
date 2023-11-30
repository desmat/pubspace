// import { auth } from 'firebase-admin';
// import { getAuth } from 'firebase-admin/auth';
import { NextResponse } from 'next/server'
import { cookies } from "next/headers";
// import { app, init } from "@/services/auth";
import * as users from "@/services/users"; // import just to make sure Firebase Auth Admin has init'ed

// export const revalidate = 0
// false | 'force-cache' | 0 | number

export async function GET(request: Request) {
  // console.log('>> app.api.user.GET', request);  
  const { user } = await users.validateUserSession(request) as any;

  console.log('>> app.api.user.GET', { user });

  if (!user) {
    return NextResponse.json(
      { success: false, message: 'authentication failed' },
      { status: 401 }
    );
  }

  return NextResponse.json(user);
}

export async function POST(request: Request) {
  const { user: _user, authToken } = await users.validateUserSession(request) as any;
  const isAdmin = _user && (process.env.ADMIN_USERS?.split(/\s*\,\s*/) || []).includes(_user.email);

  console.log('>> app.api.user.POST', { _user, isAdmin });

  if (!_user) {
    return NextResponse.json(
      { success: false, message: 'authentication failed' },
      { status: 401 }
    );
  }

  const user = await users.setCustomUserClaims(_user.uid, { admin: isAdmin });

  //Generate auth token cookie
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const options = {
    name: "AuthToken",
    value: authToken,
    maxAge: expiresIn,
    httpOnly: true,
    secure: false,
  };

  //Add the cookie to the browser
  cookies().set(options);
  return NextResponse.json(user);
}

export async function DELETE(request: Request) {
  // console.log('>> app.api.user.DELETE', request);
  cookies().delete("AuthToken");
  return NextResponse.json({ status: "ok" });
}
