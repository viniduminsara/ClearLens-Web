import {UserObject} from "../../interfaces/user.ts";

export interface AuthState {
    user: UserObject | null;
    token: string;
    isAuthenticated: currentAuthState;
}

export enum currentAuthState {
    PENDING = "pending",
    SUCCESS = "success",
    FAILED = "failed",
}
