import {Address, Order, Product, UserObject} from "./user.ts";

export interface ApiObject {
    endpoint?: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: Record<string, unknown> | SignInObject | SignUpObject | Address | Order;
    authentication?: boolean;
    urlEncoded?: boolean;
    multipart?: boolean;
    toast?: boolean;
    loading?: boolean;
    state?: "login" | "renewToken";
}

export interface ApiResponse {
    success: boolean;
    statusCode?: number;
    message?: string;
    body: Product | Product[] | UserObject | TokenResponse | PaginatedProductResponse | Address[] | OrderWithHash
}

export interface TokenResponse {
    user: UserObject;
    token: string;
}

export interface PaginatedProductResponse {
    docs: Product[]
    totalPages: number
}

export interface SignUpObject {
    username: string;
    email: string;
    password: string;
}

export interface SignInObject {
    username: string;
    password: string;
}

export interface OrderWithHash {
    order: Order;
    hash: string;
}
