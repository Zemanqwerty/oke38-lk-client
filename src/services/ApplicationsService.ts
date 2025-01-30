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
import { DogovorEnergoResponse } from "../models/response/DogovorEnergoResponse";
import { ContractResponse } from "../models/response/ContractResponse";
import { ContractDocsResponse } from "../models/response/ContractDocsResponse";

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

    static async getById(id: string): Promise<AxiosResponse<ApplicationsResponse>> {
        try {
            const res = await $api.get<ApplicationsResponse>(`applications/application/${id}`, {withCredentials: true});
            if (res.status !== 200) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.get<ApplicationsResponse>(`applications/application/${id}`, {withCredentials: true});
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

    static async getDogovorFilesByApplication(id: string): Promise<AxiosResponse<ContractDocsResponse[]>> {
        try {
            const res = await $api.get<ContractDocsResponse[]>(`applications/dogovorenergo/${id}/files`, {withCredentials: true});
            if (res.status !== 200) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.get<ContractDocsResponse[]>(`applications/dogovorenergo/${id}/files`, {withCredentials: true});
        }
    }

    static async setDogovorFiles(id: string, paymentFile: File | undefined, dogovorFile: File | undefined) {
        const formData = new FormData();

        function appendFilesToFormData(formData: FormData, fieldName: string, file: File): void {
            formData.append(`${fieldName}`, file);
        }
        
        // Добавляем данные в FormData

        paymentFile ? appendFilesToFormData(formData, 'paymentFile', paymentFile) : console.log('');
        dogovorFile ? appendFilesToFormData(formData, 'dogovorFile', dogovorFile) : console.log('');
        
        try {
            const res = await $api.post(`applications/dogovorenergo/${id}/setfiles`, formData, {headers: {"content-type": "multipart/form-data"}, withCredentials: true});
            if (res.status !== 201) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.post(`applications/dogovorenergo/${id}/setfiles`, formData, {headers: {"content-type": "multipart/form-data"}, withCredentials: true});
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

    static async setNumberStatus(id: string, number: string | undefined, status: number | undefined, date: Date | undefined) {
        try {
            const res = await $api.post<FilesResponse[]>(`applications/${id}/numberstatus`, {number, status, date}, {withCredentials: true});
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

    static async getAllDogovorEnergo(pageNumber: number): Promise<AxiosResponse<DogovorEnergoResponse[]>> {
        try {
            const res = await $api.get<DogovorEnergoResponse[]>(`applications/dogovorenergo/?page=${pageNumber}`, {withCredentials: true});
            if (res.status !== 200) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.get<DogovorEnergoResponse[]>(`applications/dogovorenergo/?page=${pageNumber}`, {withCredentials: true});
        }
    }

    static async getDogovorEnergoByApplicationId(id: string): Promise<AxiosResponse<DogovorEnergoResponse>> {
        try {
            const res = await $api.get<DogovorEnergoResponse>(`applications/dogovorenergo/${id}`, {withCredentials: true});
            if (res.status !== 200) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.get<DogovorEnergoResponse>(`applications/dogovorenergo/${id}`, {withCredentials: true});
        }
    }

    static async getContractDataByApplicationId(id: string): Promise<AxiosResponse<ContractResponse>> {
        try {
            const res = await $api.get<ContractResponse>(`applications/contract/${id}`, {withCredentials: true});
            if (res.status !== 200) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.get<ContractResponse>(`applications/contract/${id}`, {withCredentials: true});
        }
    }

    static async setDogovorEnergoData(applicationId: string, nomerLS: string | undefined, dogovorNumber: string | undefined, epuNumber: string | undefined, dateOfCreateDogovor: string | undefined) {
        try {
            const res = await $api.post<AxiosResponse>(`applications/dogovorenergo/${applicationId}/edit`, {nomerLS, dogovorNumber, epuNumber, dateOfCreateDogovor}, {withCredentials: true});
            if (res.status !== 201) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.post<AxiosResponse>(`applications/dogovorenergo/${applicationId}/edit`, {nomerLS, dogovorNumber, epuNumber, dateOfCreateDogovor}, {withCredentials: true});
        }
    }

    static async getApplicationWorkingFiles(applicationUuid: string): Promise<AxiosResponse<FilesResponse[]>> {
        try {
            const res = await $api.get<FilesResponse[]>(`applications/${applicationUuid}/workingFiles`, {withCredentials: true});
            if (res.status !== 200) {
                throw new Error();
            }
            return res;
        } catch {
            return await $apiLocalNetwork.get<FilesResponse[]>(`applications/${applicationUuid}/workingFiles`, {withCredentials: true});
        }
    }
}