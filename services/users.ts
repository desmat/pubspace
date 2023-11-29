import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirebaseAuth } from "next-firebase-auth-edge/lib/auth";
import { firebaseAdminConfig } from "@/firestore-admin.config";
import { firebaseConfig } from "@/firestore.config";

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

  // console.log("*** validateUserSession ***", { authToken });

  //Validate if the cookie exist in the request
  if (!authToken) {
    return {};
  }

  // @ts-ignore
  const {
    verifyIdToken,
    getUser: getFirebaseUser,
  } = getFirebaseAuth(
    {
      projectId: firebaseAdminConfig.projectId,
      clientEmail: firebaseAdminConfig.clientEmail,
      privateKey: firebaseAdminConfig.privateKey
    },
    firebaseConfig.apiKey,
  );

  let tokens;
  if (authToken) {
    tokens = await verifyIdToken(authToken);
    // console.log("*** validateUserSession", { tokens });
    const user = await getFirebaseUser(tokens.uid);
    // console.log("*** validateUserSession ***", { user });

    return { user, authToken };
  }

  return { authToken }
}
