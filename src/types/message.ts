import { Seller } from "./Product";

export interface Message {
    id: string;
    senderId: string;
    sender: Seller;
    receiver: string;
    message: string;
    chatroomId?: string;
    createdAt: Date;
    updatedAt: Date;
    UserId?: string;
    ChatroomId?: string;
}