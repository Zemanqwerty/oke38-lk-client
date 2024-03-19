import { AxiosResponse } from "axios";
import $api from "../http";
import { AuthResponse } from "../models/response/AuthResponse";
import $apiLocalNetwork from "../httpLocalNetwork";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        try {
            const res = await $api.post<AuthResponse>('auth/sign-in', {email, password}, {withCredentials: true});
            if (res.status !== 201) {
                throw new Error();
            }
            return res;
        } catch {
            return $apiLocalNetwork.post<AuthResponse>('auth/sign-in', {email, password}, {withCredentials: true});
        }
    }

    static async registration(type: string,
                                lastname: string,
                                firstname: string,
                                surname: string,
                                email: string,
                                phoneNumber: string,
                                password: string): Promise<AxiosResponse<AuthResponse>> 
    {
        try {
            const res = await $api.post<AuthResponse>('users/sign-up', {type, lastname, firstname, surname, email, phoneNumber, password});
            if (res.status !== 201) {
                throw new Error();
            }
            return res;
        } catch {
            return $apiLocalNetwork.post<AuthResponse>('users/sign-up', {type, lastname, firstname, surname, email, phoneNumber, password});
        }
    }

    static async logout(): Promise<AxiosResponse> {
        try {
            const res = await $api.get('/auth/logout');
            if (res.status !== 200) {
                throw new Error();
            }
            return res
        } catch {
            return $apiLocalNetwork.get('/auth/logout');
        }
    }

    static async requestForResetPassword(email: string): Promise<AxiosResponse<AuthResponse>> {
        try {
            const res = await $api.post<AuthResponse>('users/request-for-reset', {email});
            if (res.status !== 201) {
                throw new Error();
            }
            return res;
        } catch {
            return $apiLocalNetwork.post<AuthResponse>('users/request-for-reset', {email});
        }
    }

    static async resetPassword(password: string, link: string | undefined): Promise<AxiosResponse<AuthResponse>> {
        try {
            const res = await $api.post<AuthResponse>(`users/reset-password/${link}`, {password});
            if (res.status !== 201) {
                throw new Error();
            }
            return res;
        } catch {
            return $apiLocalNetwork.post<AuthResponse>(`users/reset-password/${link}`, {password});
        }
    }
}