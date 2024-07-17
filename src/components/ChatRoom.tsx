import React from 'react'
import Image from 'next/image';
import profile from "../../public/brice.jpg"
import { Seller } from '@/types/Product'
import { Message } from "@/types/message"

interface chatroomIn {
    id?: string,
    users: Seller[]
    lastMessage? : Message
    messages? : Message[]
    currentUser? : string
    initiator: string
    isPrivate: boolean
    toogleDislay? : ()=> void;
    handleSelectChatroom : (chatroomId:string)=> void;
}

const ChatRoom:React.FC<chatroomIn>=({users, lastMessage, currentUser, initiator, isPrivate, toogleDislay, handleSelectChatroom, id})=> {
    let message: string;
    if(lastMessage){
        message = lastMessage.message
    }else{
        message ="No message yet"
    }
    let corenspondent: Seller;
    if (!isPrivate) {
        corenspondent = users.find(user => user.id == initiator) as Seller
    }else{
      corenspondent = users.find(user => user.id !== currentUser) as Seller
    }
    let fullName = corenspondent.firstName +" "+ corenspondent.lastName;

    const openChatroom=()=>{
        handleSelectChatroom(id as string);
    }
  return (
    <>
     <div className='double-grid border-b py-3' onClick={openChatroom}>
        <div className='flex justify-center items-center'>
            <Image src={corenspondent.profileImage} width={50} height={50} alt="avatar" className='rounded-full relative'/>
            <span className='relative h-3 w-3 rounded-full bg-green-400 top-4 right-3'></span>
        </div>
        <div className='flex flex-col text-left py-3'>
            <h3 className='text-xl font-bold text-blue-400'>{fullName.length>30? fullName.substring(0,30)+"...": fullName}</h3>
            <p className='text-gray-500'>
                {message? message.length > 20 ?  message.substring(0,20) + "...": message: "No message yet"}
            </p>
        </div>
     </div>
    </>
  )
}

export default ChatRoom;
