import {UserObject} from "../../interfaces/user.ts";

export interface AuthState {
    user: UserObject | null;
    token: string;
    isAuthenticated: boolean;
}
