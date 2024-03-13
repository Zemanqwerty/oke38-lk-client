import { AxiosResponse } from "axios";
import $api from "../http";
import { ApplicationsResponse } from "../models/response/ApplicationsResponse";
import { FilesResponse } from "../models/response/FilesResponse";

export default class ApplicationsService {
    static async getAllByUser(): Promise<AxiosResponse<ApplicationsResponse[]>> {
        return $api.get<ApplicationsResponse[]>('applications', {withCredentials: true});
    }

    static async getFilesByApplication(id: number): Promise<AxiosResponse<FilesResponse[]>> {
        return $api.get<FilesResponse[]>(`applications/${id}/files`, {withCredentials: true});
    }
}