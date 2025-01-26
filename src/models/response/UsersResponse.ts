export interface UsersResponse {
    type: string;
    lastname: string;
    firstname: string;
    surname: string;
    email: string;
    isActive: boolean;
    phoneNumber: string;
    roles: string;
    createdAt: Date;
    updatedAt: Date;
    yl_fullname: string | null;
    yl_shortname: string | null;
}