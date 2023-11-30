import { getFirebaseAuth } from "next-firebase-auth-edge/lib/auth";
import { firebaseAdminConfig } from "@/firestore-admin.config";
import { firebaseConfig } from "@/firestore.config";
import { User } from 'firebase/auth';

const {
  verifyIdToken,
  getUser: _getUser,
  setCustomUserClaims: _setCustomUserClaims,
} = getFirebaseAuth(
  {
    projectId: firebaseAdminConfig.projectId || "",
    clientEmail: firebaseAdminConfig.clientEmail || "",
    privateKey: firebaseAdminConfig.privateKey || ""
  },
  firebaseConfig.apiKey || "",
);

export async function getUser(uid: string) {
  return _getUser(uid);
}

export function getUserName(user: User): string {
  return user?.isAnonymous ? "Anonymous" : user?.displayName || user?.email || "Noname";
}


export async function setCustomUserClaims(uid: string, obj: any) {
  const ret = await _setCustomUserClaims(uid, obj)
  console.log("*** setUserCustomClaim", { ret });

  return getUser(uid);
}

export async function validateUserSession(request: any) {
  let authToken;

  const authorization = request.headers.get("Authorization");
  if (authorization?.startsWith("Bearer ")) {
    authToken = authorization.split("Bearer ")[1];
  }
  
  if (!authToken) {
    authToken = request.cookies.get("AuthToken")?.value;    
  }

  // console.log("*** validateUserSession ***", { authToken });

  if (!authToken) {
    return {};
  }

  let tokens;
  if (authToken) {
    try {
      tokens = await verifyIdToken(authToken);
      // console.log("*** validateUserSession", { tokens });
      const user = await getUser(tokens.uid);
      // console.log("*** validateUserSession ***", { user });
      return { user, authToken };
    } catch (error) {
      console.warn("*** validateUserSession ***", { error });
      // throw 'authentication failed';
    }
  }

  return { authToken }
}
