import { ShortApplicationsResponse } from "./ShortApplicationsResponse.dto";
import { UsersResponse } from "./UsersResponse";

export interface LastMessages {
    user: UsersResponse;
    application: ShortApplicationsResponse;
    isFile: boolean;
    messageClientId: number;
    sendDate: Date;
}