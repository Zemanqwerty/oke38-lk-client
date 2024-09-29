import { AxiosResponse } from "axios";
import $api from "../http";
import $apiLocalNetwork from "../httpLocalNetwork";
import { UsersResponse } from "../models/response/UsersResponse";

export default class UsersService {
    static async getAllUsers(pageNumber: number) {
        try {
            const res = await $api.get<UsersResponse[]>(`users/admin/all?page=${pageNumber}`, {withCredentials: true});
            if (res.status !== 200) {
                console.log(res);
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.get<UsersResponse[]>(`users/admin/all?page=${pageNumber}`, {withCredentials: true});
        }
    }

    static async createNewUser(
        type: string,
        role: string,
        lastname: string,
        firstname: string,
        surname: string,
        email: string,
        phoneNumber: string,
        password: string
    ) {
        try {
            const res = await $api.post(`users/admin/create`, {
                    type: type,
                    roles: role,
                    lastname: lastname,
                    firstname: firstname,
                    surname: surname,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: password,
                }, {withCredentials: true});

            if (res.status !== 201) {
                console.log(res);
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.post(`users/admin/create`, {
                type: type,
                roles: role,
                lastname: lastname,
                firstname: firstname,
                surname: surname,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
            }, {withCredentials: true});
        }
    }

    static async deleteUser(userEmail?: string) {
        try {
            const res = await $api.post(`users/admin/delete`, {email: userEmail}, {withCredentials: true});
            if (res.status !== 201) {
                console.log(res);
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.post(`users/admin/delete`, {email: userEmail}, {withCredentials: true});
        }
    }    

    static async setUserRole(userEmail?: string, newRole?: string) {
        try {
            const res = await $api.post(`users/admin/setRole`, {email: userEmail, role: newRole}, {withCredentials: true});
            if (res.status !== 201) {
                console.log(res);
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.post(`users/admin/setRole`, {email: userEmail, role: newRole}, {withCredentials: true});
        }
    }

    static async setUserName(userEmail?: string, newFirstName?: string, newLastName?: string, newSurname?: string) {
        try {
            const res = await $api.post(`users/admin/setName`, {email: userEmail, firstName: newFirstName, lastName: newLastName, surname: newSurname}, {withCredentials: true});
            if (res.status !== 201) {
                console.log(res);
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.post(`users/admin/setName`, {email: userEmail, firstName: newFirstName, lastName: newLastName, surname: newSurname}, {withCredentials: true});
        }
    }

    static async setUserPhoneNumber(userEmail?: string, newPhoneNumber?: string) {
        try {
            const res = await $api.post(`users/admin/setPhoneNumber`, {email: userEmail, phoneNumber: newPhoneNumber});
            if (res.status !== 201) {
                console.log(res);
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.post(`users/admin/setPhoneNumber`, {email: userEmail, phoneNumber: newPhoneNumber});
        }
    }
}