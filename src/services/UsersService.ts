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
            return $apiLocalNetwork.get<UsersResponse[]>(`users/admin/all?page=${pageNumber}`, {withCredentials: true});
        }
    }
}