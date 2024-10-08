import { AxiosResponse } from "axios";
import $api from "../http";
import $apiLocalNetwork from "../httpLocalNetwork";
import { ApplicationsResponse } from "../models/response/ApplicationsResponse";
import { FilesResponse } from "../models/response/FilesResponse";
import { NewApplication } from "../models/requests/NewApplication";
import { saveAs } from 'file-saver';
import { EditApplicationData } from "../models/requests/EditApplicationData";
import { FilialsResponse } from "../models/response/FilialsResponse";
import { StatusesResponse } from "../models/response/StatusesResponse";

export default class ApplicationsService {
    static async getAllByUser(): Promise<AxiosResponse<ApplicationsResponse[]>> {
        try {
            const res = await $api.get<ApplicationsResponse[]>('applications', {withCredentials: true});
            if (res.status !== 200) {
                console.log(res);
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.get<ApplicationsResponse[]>('applications', {withCredentials: true});
        }
    }

    static async getAll(pageNumber: number): Promise<AxiosResponse<ApplicationsResponse[]>> {
        try {
            const res = await $api.get<ApplicationsResponse[]>(`applications/all/?page=${pageNumber}`, {withCredentials: true});
            if (res.status !== 200) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.get<ApplicationsResponse[]>(`applications/all/?page=${pageNumber}`, {withCredentials: true});
        }
    }

    static async getFilesByApplication(id: string): Promise<AxiosResponse<FilesResponse[]>> {
        try {
            const res = await $api.get<FilesResponse[]>(`applications/${id}/files`, {withCredentials: true});
            if (res.status !== 200) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.get<FilesResponse[]>(`applications/${id}/files`, {withCredentials: true});
        }
    }

    static async sendApplication(application: NewApplication): Promise<AxiosResponse | any>{
        const formData = new FormData();

        function appendFilesToFormData(formData: FormData, fieldName: string, files: File[]): void {
            files.forEach((file, index) => {
              formData.append(`${fieldName}`, file);
            });
        }
        
        // Добавляем данные в FormData

        appendFilesToFormData(formData, '10', application.applicationCopy);
        appendFilesToFormData(formData, '8', application.passportCopy);
        appendFilesToFormData(formData, '5', application.planeCopy);
        appendFilesToFormData(formData, '6', application.ownDocsCopy);
        appendFilesToFormData(formData, '7', application.powerOfAttorneyCopy);
        appendFilesToFormData(formData, '9', application.constituentDocsCopy);
        appendFilesToFormData(formData, '0', application.otherDocs);
        
        formData.append('reason', application.reason);
        formData.append('city', application.city);
        formData.append('address', application.address);
        formData.append('maxPower', application.maxPower);
        formData.append('powerLevel', application.powerLevel);
        formData.append('paymentsOption', application.paymentsOption);
        formData.append('provider', application.provider);
        
        try {
            const res = await $api.post(`applications`, formData, {headers: {"content-type": "multipart/form-data"}, withCredentials: true});
            if (res.status !== 201) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.post(`applications`, formData, {headers: {"content-type": "multipart/form-data"}, withCredentials: true});
        }
    }



    static async editApplicationData(application: EditApplicationData, id: number): Promise<AxiosResponse | any>{
        try {
            const res = await $api.post(`applications/${id}/edit`, application, {withCredentials: true});
            if (res.status !== 201) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.post(`applications/${id}/edit`, application, {withCredentials: true});
        }
    }

    static async deleteApplicationFiles(applicationId: number, fileId: number): Promise<AxiosResponse | any>{
        try {
            const res = await $api.delete(`applications/${applicationId}/deleteFile/${fileId}`, {withCredentials: true});
            if (res.status !== 200) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.delete(`applications/${applicationId}/deleteFile/${fileId}`, {withCredentials: true});
        }
    }

    static async downloadImage(filePath: string, fileName: string) {
        try {
            const res = await $api.get<Blob>(`${filePath}`, {withCredentials: true, responseType: 'blob'}).then((response) => {
                if (response.status !== 200) {
                    throw new Error();
                }
                const blob = new Blob([response.data]);
                saveAs(blob, `${fileName}`);
            });
        } catch {
            return await $apiLocalNetwork.get<Blob>(`${filePath}`, {withCredentials: true, responseType: 'blob'}).then((response) => {
                const blob = new Blob([response.data]);
                saveAs(blob, `${fileName}`);
            })
        }
    }

    static async setFilial(id: string, filialId: number) {
        try {
            const res = await $api.post<FilesResponse[]>(`applications/${id}/filial`, {filialId}, {withCredentials: true});
            if (res.status !== 201) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.post<FilesResponse[]>(`applications/${id}/filial`, {filialId}, {withCredentials: true});
        }
    }

    static async setNumberStatus(id: string, number: string | undefined, status: number | undefined) {
        try {
            const res = await $api.post<FilesResponse[]>(`applications/${id}/numberstatus`, {number, status}, {withCredentials: true});
            if (res.status !== 201) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.post<FilesResponse[]>(`applications/${id}/numberstatus`, {number, status}, {withCredentials: true});
        }
    }

    static async getFilialsForApplication(): Promise<AxiosResponse<FilialsResponse[]>> {
        try {
            const res = await $api.get<FilialsResponse[]>(`applications/getFilials`, {withCredentials: true});
            if (res.status !== 200) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.get<FilialsResponse[]>(`applications/getFilials`, {withCredentials: true});
        }
    }

    static async getStatusesForApplication(): Promise<AxiosResponse<StatusesResponse[]>> {
        try {
            const res = await $api.get<StatusesResponse[]>(`applications/getStatuses`, {withCredentials: true});
            if (res.status !== 200) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.get<StatusesResponse[]>(`applications/getStatuses`, {withCredentials: true});
        }
    }

    static async sendApplicationTo1c(applicationUUID: string): Promise<AxiosResponse> {
        try {
            const res = await $api.get(`applications/${applicationUUID}/sendTo1c`, {withCredentials: true});
            if (res.status !== 200) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.get(`applications/${applicationUUID}/sendTo1c`, {withCredentials: true});
        }
    }
}