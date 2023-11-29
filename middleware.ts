// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getFirebaseAuth,  } from "next-firebase-auth-edge/lib/auth";
import { firebaseAdminConfig } from "@/firestore-admin.config";
import { firebaseConfig } from "@/firestore.config";

export async function middleware(request: NextRequest) {
  const method = request.method;
  const url = request.nextUrl.pathname;

  // console.log("*** middleware", { request });
  console.log("*** middleware", { url, method });

  if (url == "/api/user" && ["POST", "DELETE"].includes(method)) {
    console.log("*** middleware PUBLIC USER PATH");
    return NextResponse.next();
  }

  if (!["POST", "PUT", "DELETE"].includes(method)) {
    console.log("*** middleware PUBLIC NON-MUTATING PATH");
    return NextResponse.next();
  }

  // @ts-ignore
  const {
    verifyIdToken,
  } = getFirebaseAuth(
    {
      projectId: firebaseAdminConfig.projectId,
      clientEmail: firebaseAdminConfig.clientEmail,
      privateKey: firebaseAdminConfig.privateKey
    },
    firebaseConfig.apiKey,
  );

  // const sessionCookie = request.cookies.get("session")?.value || "";
  // console.log("*** middleware", { sessionCookie });

  // const tokens = await verifyIdToken(sessionCookie);
  // console.log("*** middleware", { tokens });

  // const authorization = request.headers.get("Authorization");
  // const idToken = authorization?.split("Bearer ")[1];
  // const sessionIdToken = request.cookies.get("sessionIdToken")?.value;
  // const sessionToken = request.cookies.get("session")?.value;

  // console.log("*** middleware", { method, url, idToken, sessionIdToken, sessionToken });

  const authToken = request.cookies.get("AuthToken")?.value;
  
  if (authToken) {
    const tokens = await verifyIdToken(authToken);
    console.log("*** middleware", { tokens });
    if (tokens) {
      return NextResponse.next();
    }
  }

  return NextResponse.json(
    { success: false, message: 'authentication required' },
    { status: 401 }
  )
}

// guard all api calls (logic will only look at mutating methods)
export const config = {
  matcher: ['/api/:path*'],
}
