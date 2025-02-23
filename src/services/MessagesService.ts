import { AxiosResponse } from "axios";
import $api from "../http";
import $apiLocalNetwork from "../httpLocalNetwork";
import { ApplicationsResponse } from "../models/response/ApplicationsResponse";
import { FilesResponse } from "../models/response/FilesResponse";
import { NewApplication } from "../models/requests/NewApplication";
import { saveAs } from 'file-saver';
import { Message } from "../models/response/MessageResponse";
import { LastMessages } from "../models/response/LastMessagesResponse.dto";


export default class MessagesService {
    static async getAllInChat(chatId: string): Promise<AxiosResponse<Message[]>> {
        const res = await $api.get<Message[]>(`messages/${chatId}/get`, {withCredentials: true});
        return res;
    }

    static async sendFiles(chatId: string, email: string | null, userRole: string, files: File[]): Promise<AxiosResponse> {
        const formData = new FormData();
        files.forEach(file => {
          formData.append('files', file);
        });
        formData.append('user', email ? email : '');
        formData.append('userRole', userRole);

        return await $api.post(`messages/${chatId}/sendFiles`, formData, {withCredentials: true});
    }

    static async getLastMessages(pageNumber: number): Promise<AxiosResponse<LastMessages[]>> {
        const res = await $api.get<LastMessages[]>(`messages/last`, {params: {page: pageNumber}, withCredentials: true});
        return res;
    }

    static async getAllMessagesCount(): Promise<AxiosResponse<number>> {
        const res = await $api.get<number>(`messages/count`, {withCredentials: true});
        return res;
    }
}