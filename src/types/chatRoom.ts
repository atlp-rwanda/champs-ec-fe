import { Seller } from "./Product"
import { Message } from "./message"

export interface chatroomInterface {
    id?: string,
    users: Seller[]
    lastMessage? : Message
    messages? : Message[]
    currentUser? : string
    initiator: string
    isPrivate: boolean
}