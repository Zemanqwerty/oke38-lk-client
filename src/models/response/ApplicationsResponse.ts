export interface ApplicationsResponse {
    createdAt: Date;
    id: number;
    uuid: string;
    city: string;
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
}