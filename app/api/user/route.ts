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
  // console.log('>> app.api.user.POST', request);
  // const authorization = headers().get("Authorization");

  // console.log('>> app.api.user.POST', { authorization });

  // if (!authorization?.startsWith("Bearer ")) {
  //   return NextResponse.json({ authenticated: false }, { status: 401 });
  // }

  // const idToken = authorization.split("Bearer ")[1];
  // // const decodedToken = await auth().verifyIdToken(idToken);
  const { user: decodedToken, authToken } = await users.validateUserSession(request) as any;
  const isAdmin = decodedToken && decodedToken.email == "desmat@gmail.com"; // just me for now

  console.log('>> app.api.user.POST', { decodedToken, isAdmin });

  if (!decodedToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  if (isAdmin) {
    await auth().setCustomUserClaims(decodedToken.uid, { admin: true });
  }

  //Generate session cookie
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // const sessionCookie = await auth().createSessionCookie(idToken, {
  //   expiresIn,
  // });
  // const options = {
  //   name: "session",
  //   value: sessionCookie,
  //   maxAge: expiresIn,
  //   httpOnly: true,
  //   secure: false,
  // };

  const options = {
    name: "AuthToken",
    value: authToken,
    maxAge: expiresIn,
    httpOnly: true,
    secure: false,
  };

  console.log('>> app.api.user.POST', { options });

  //Add the cookie to the browser
  cookies().set(options);

  const user = await auth().getUser(decodedToken.uid);
  return NextResponse.json(user);
}

export async function DELETE(request: Request) {
  console.log('>> app.api.user.DELETE', request);
  // const data: any = await request.json();
  cookies().delete("sessionIdToken");
  cookies().delete("AuthToken");
  
  return NextResponse.json({ status: "ok" });
}
