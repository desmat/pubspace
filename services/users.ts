import { getFirebaseAuth } from "next-firebase-auth-edge/lib/auth";
import { firebaseAdminConfig } from "@/firestore-admin.config";
import { firebaseConfig } from "@/firestore.config";
import { User } from 'firebase/auth';

const {
  verifyIdToken,
  // verifyAndRefreshExpiredIdToken,
  getCustomIdAndRefreshTokens,
  handleTokenRefresh,
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
  // console.log("*** setUserCustomClaim", { ret });

  return getUser(uid);
}

export async function authenticateUser(request: any) {
  const authorization = request.headers.get("Authorization");

  let idToken;
  if (authorization?.startsWith("Bearer ")) {
    idToken = authorization.split("Bearer ")[1];
  }

  let tokens;
  if (idToken) {
    try {
      tokens = await verifyIdToken(idToken);
      console.log("*** validateUserSession", { tokens, idToken });
      const user = await getUser(tokens.uid);
      const refreshAndIdTokens = await getCustomIdAndRefreshTokens(idToken, firebaseConfig.apiKey || "");
      // console.log("*** validateUserSession ***", { user, idToken });
      return { user, refreshToken: refreshAndIdTokens.refreshToken };
    } catch (error: any) {
      console.warn("*** validateUserSession ***", { code: error.code, message: error.message, error });
      // throw 'authentication failed';
      return { error };
    }
  }  

  return {}
}

export async function validateUserSession(request: any) {
  const refreshToken = request.cookies.get("session")?.value;
  console.log("*** validateUserSession ***", { refreshToken });

  if (refreshToken) {
    try {
      // const tokens = await verifyIdToken(authToken);
      const handleredRefreshToken = await handleTokenRefresh(refreshToken, firebaseConfig.apiKey || "");
      console.log("*** validateUserSession", { refreshToken, handleredRefreshToken });

      const user = await getUser(handleredRefreshToken.decodedToken.uid);
      // console.log("*** validateUserSession ***", { user, refreshToken });
      return { user };
    } catch (error: any) {
      console.warn("*** validateUserSession ***", { code: error.code, message: error.message, error });
      // throw 'authentication failed';
      return { error };
    }
  }

  return {}
}
