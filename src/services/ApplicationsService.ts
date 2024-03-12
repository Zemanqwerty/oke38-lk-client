import { AxiosResponse } from "axios";
import $api from "../http";
import { ApplicationsResponse } from "../models/response/ApplicationsResponse";

export default class ApplicationsService {
    static async getAllByUser(): Promise<AxiosResponse<ApplicationsResponse[]>> {
        return $api.get<ApplicationsResponse[]>('applications', {withCredentials: true});
    }

    // static async registration(type: string,
    //                             lastname: string,
    //                             firstname: string,
    //                             surname: string,
    //                             email: string,
    //                             phoneNumber: string,
    //                             password: string): Promise<AxiosResponse<AuthResponse>> 
    // {
    //     return $api.post<AuthResponse>('users/sign-up', {type, lastname, firstname, surname, email, phoneNumber, password});
    // }

    // static async logout(): Promise<void> {
    //     return $api.get('/auth/logout');
    // }

    // static async requestForResetPassword(email: string): Promise<AxiosResponse<AuthResponse>> {
    //     return $api.post<AuthResponse>('users/request-for-reset', {email});
    // }

    // static async resetPassword(password: string, link: string | undefined): Promise<AxiosResponse<AuthResponse>> {
    //     return $api.post<AuthResponse>(`users/reset-password/${link}`, {password})
    // }
}