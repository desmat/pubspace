import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { firebaseAdminConfig } from "@/firestore-admin.config";

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
