import { AxiosResponse } from "axios";
import $api from "../http";
import { ApplicationsResponse } from "../models/response/ApplicationsResponse";
import { FilesResponse } from "../models/response/FilesResponse";
import { NewApplication } from "../models/requests/NewApplication";
import { saveAs } from 'file-saver';

export default class ApplicationsService {
    static async getAllByUser(): Promise<AxiosResponse<ApplicationsResponse[]>> {
        return $api.get<ApplicationsResponse[]>('applications', {withCredentials: true});
    }

    static async getFilesByApplication(id: number): Promise<AxiosResponse<FilesResponse[]>> {
        return $api.get<FilesResponse[]>(`applications/${id}/files`, {withCredentials: true});
    }

    static async sendApplication(application: NewApplication): Promise<AxiosResponse | any>{
        const formData = new FormData();

        function appendFilesToFormData(formData: FormData, fieldName: string, files: File[]): void {
            files.forEach((file, index) => {
              formData.append(`${fieldName}`, file);
            });
        }
        
        // Добавляем данные в FormData

        try {
            // formData.append('applicationCopy', application.applicationCopy[0]);
            // formData.append('passportCopy', application.passportCopy[0]);
            // formData.append('planeCopy', application.planeCopy[0]);
            // formData.append('ownDocsCopy', application.ownDocsCopy[0]);
            // formData.append('powerOfAttorneyCopy', application.powerOfAttorneyCopy[0]);
            // formData.append('constituentDocsCopy', application.constituentDocsCopy[0]);
            // formData.append('otherDocs', application.otherDocs[0]);

            appendFilesToFormData(formData, 'applicationCopy', application.applicationCopy);
            appendFilesToFormData(formData, 'passportCopy', application.passportCopy);
            appendFilesToFormData(formData, 'planeCopy', application.planeCopy);
            appendFilesToFormData(formData, 'ownDocsCopy', application.ownDocsCopy);
            appendFilesToFormData(formData, 'powerOfAttorneyCopy', application.powerOfAttorneyCopy);
            appendFilesToFormData(formData, 'constituentDocsCopy', application.constituentDocsCopy);
            appendFilesToFormData(formData, 'otherDocs', application.otherDocs);
            
            formData.append('reason', application.reason);
            formData.append('city', application.city);
            formData.append('address', application.address);
            formData.append('maxPower', application.maxPower);
            formData.append('powerLevel', application.powerLevel);
            formData.append('paymentsOption', application.paymentsOption);
            formData.append('provider', application.provider);

            const response = $api.post(`applications`, formData, {headers: {"content-type": "multipart/form-data"}, withCredentials: true});

            return response
        } catch (e) {
            console.log(e);
        }
    }

    static async downloadImage(filePath: string, fileName: string) {
        $api.get<Blob>(`${filePath}`, {withCredentials: true, responseType: 'blob'}).then((response) => {
            const blob = new Blob([response.data]);
            saveAs(blob, `${fileName}`);
        })
    }
}