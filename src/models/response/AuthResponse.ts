
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    email: string;
    status?: number;
}