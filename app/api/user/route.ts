import { auth } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { NextResponse } from 'next/server'
import { cookies, headers } from "next/headers";
// import { app, init } from "@/services/auth";
import * as users from "@/services/users"; // import just to make sure Firebase Auth Admin has init'ed

// export const revalidate = 0
// false | 'force-cache' | 0 | number

export async function GET(request: Request) {
  // console.log('>> app.api.user.GET', request);  
  const { user: decodedToken } = await users.validateUserSession(request) as any;

  console.log('>> app.api.user.GET', { decodedToken });  

  let user = {};
  if (decodedToken) {
    user = await auth().getUser(decodedToken.uid);
  }

  return NextResponse.json(user);  
}

export async function POST(request: Request) {
  const { user: decodedToken, authToken } = await users.validateUserSession(request) as any;
  const isAdmin = decodedToken && decodedToken.email == "desmat@gmail.com"; // just me for now

  console.log('>> app.api.user.POST', { decodedToken, isAdmin });

  if (!decodedToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  if (isAdmin) {
    await auth().setCustomUserClaims(decodedToken.uid, { admin: true });
  }

  //Generate auth token cookie
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const options = {
    name: "AuthToken",
    value: authToken,
    maxAge: expiresIn,
    httpOnly: true,
    secure: false,
  };

  // console.log('>> app.api.user.POST', { options });

  //Add the cookie to the browser
  cookies().set(options);

  const user = await auth().getUser(decodedToken.uid);
  return NextResponse.json(user);
}

export async function DELETE(request: Request) {
  // console.log('>> app.api.user.DELETE', request);
  cookies().delete("AuthToken");
  return NextResponse.json({ status: "ok" });
}
