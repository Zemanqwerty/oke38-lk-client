export interface Message {
    user: string;
    userRole: string;
    message: string | null;
    fileUrl: string | null;
    fileName: string | null;
    room: string;
}