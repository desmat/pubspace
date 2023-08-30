import { User } from "firebase/auth";

export type Profile = {
    id?: string,
    user: User,
}
