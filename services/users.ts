import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { auth } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirebaseAuth } from "next-firebase-auth-edge/lib/auth";
import { firebaseAdminConfig } from "@/firestore-admin.config";
import { firebaseConfig } from "@/firestore.config";


// import { authentication,  } from "next-firebase-auth-edge/lib/next/middleware";
// import { getTokensFromObject } from "next-firebase-auth-edge/lib/next/tokens";
// import { validateMiddlewareRequestCookies } from "next-firebase-auth-edge/lib/next/cookies";
// import { getFirebaseAuth,  } from "next-firebase-auth-edge/lib/auth";


if (getApps().length <= 0) {
  initializeApp({
    credential: cert(firebaseAdminConfig)
  });
}

export function getUser(uid: string): any {
  return new Promise((resolve, reject) => {
    const user = getAuth().getUser(uid);
    if (!user) {
      reject(`User not found: ${uid}`);
    }

    resolve(user);
  });
}

export async function validateUserSession(request: any) {

  let authToken = request.cookies.get("AuthToken")?.value; // request.headers.get("Authorization"); //headers().get("Authorization");

  if (!authToken) {
    const authorization = request.headers.get("Authorization");
    if (authorization?.startsWith("Bearer ")) {
      authToken = authorization.split("Bearer ")[1];
    }
  }

  console.log("*** validateUserSession ***", { authToken });
  
    //Validate if the cookie exist in the request
    if (!authToken) {
      return {};
    }

  // //Use Firebase Admin to validate the session cookie
  // // const firebaseAdmin = await import('firebase-admin');
  // const decodedClaims = await auth().verifySessionCookie(session, true);

  // console.log("*** validateUserSession ***", { decodedClaims });

  // if (!decodedClaims) {
  //   return undefined;
  // }

  // const user = await auth().getUser(decodedClaims.uid);
  // console.log("*** validateUserSession ***", { user });

  // return user;

  // @ts-ignore
  const {
    getCustomIdAndRefreshTokens,
    verifyIdToken,
    createCustomToken,
    handleTokenRefresh,
    getUser: getFirebaseUser,
    createUser,
    updateUser,
    deleteUser,
    verifyAndRefreshExpiredIdToken,
    setCustomUserClaims,
  } = getFirebaseAuth(
    {
      projectId: firebaseAdminConfig.projectId,
      clientEmail: firebaseAdminConfig.clientEmail,
      privateKey: firebaseAdminConfig.privateKey
    },
    firebaseConfig.apiKey,
  );

  // const method = request.method;
  // const url = request.url;
  // const authorization = request.headers.get("Authorization");
  // const idToken = authorization?.split("Bearer ")[1];
  // const idToken = request.cookies.get("idToken")?.value;
  // const sessionToken = request.cookies.get("session")?.value;
  // console.log("*** validateUserSession", { idToken });

  let tokens;
  if (authToken) {
    tokens = await verifyIdToken(authToken);
    console.log("*** validateUserSession", { tokens });
    const user = await getFirebaseUser(tokens.uid);
    console.log("*** validateUserSession ***", { user });

    return { user, authToken };
  }

  return { authToken }
}
