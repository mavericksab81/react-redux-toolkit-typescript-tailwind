export interface User {
    email?: string | null;
    token?: string | null;
    isAuthenticated: boolean;
}