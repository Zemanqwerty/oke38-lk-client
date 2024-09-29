export interface ApplicationsResponse {
    createdAt: Date;
    uuid: string;
    address: string;
    maxPower: string;
    powerLevel: string;
    provider: string;
    status: string;
    paymentOption: string;
    userId?: number;
    userFirstName?: string;
    userLastName?: string;
    userSurname?: string;
    userEmail?: string;
    userPhoneNumber?: string;
    userClientType?: string;
    userType?: string;
    filial?: string | null;
    applicationNumber?: string | null;
    applicationDate?: Date | null;
    yl_fullname: string | null;
    yl_shortname: string | null;
    contact_familiya: string| null;
    vidzayavki: string | null;
    ststusoplaty: string | null;
}