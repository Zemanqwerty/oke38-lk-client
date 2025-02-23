import { UsersResponse } from "./UsersResponse";

export interface Message {
    user: UsersResponse;
    message: string | null;
    fileUrl: string | null;
    fileName: string | null;
    room: string;
}