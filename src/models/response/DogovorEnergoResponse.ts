import { UsersResponse } from "./UsersResponse";

export interface DogovorEnergoResponse {
    dateOfCreateDogovor: Date;
    user: UsersResponse;
    dateOfCreateApplication: Date;
    applicationNumber: string;
    applicationDate: Date;
    application_status: string | null;
    address_epu: string;
    dogovorNumber: string;
    schetNumber: string;
    epuNumber: string;
    applicationId: string;
}