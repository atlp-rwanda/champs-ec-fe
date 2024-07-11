'use client'

import React,{useState, useEffect} from 'react'
import ChatConversation from './ChatConversation'
import ChatRoomsList from './ChatRoomsList'
import { createUser } from '@/utils/requests'
import { Seller } from '@/types/Product'
import { Message } from '@/types/message'
import { getCurrentUser } from '@/utils/getCurrentUser';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';
import { chatroomInterface } from "@/types/chatRoom"

export interface msgObject {
  senderId: string;
  receiver: string;
  message: string;
}

let socket: Socket;
const ChatWrapper= () => {
  const chatUrl = process.env.NEXT_PUBLIC_URL_CHAT as string;
  //socket connect

  const [chatrooms, setChatrooms] = useState([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser() as string);
  const [currentUserToken, setCurrentUserToken] = useState('');
  const [message, setMessage] = useState<string>('');
  const [display, setDisplay] = useState(false);
  const [selectedChatroom, setSelectedChatroom] = useState<chatroomInterface> ({
    id: "",
    initiator: "",
    users: [],
    isPrivate: false,
    messages: [],
  });

  useEffect(()=>{
    const user = localStorage.getItem("profile")
    if(user){
     const parseUser = JSON.parse(user)
     const { id } = parseUser.User;
     setCurrentUser(id);
    }
  },[]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const trimmedToken = token.split(' ')[1];
      setCurrentUserToken(trimmedToken);
      // const chatUrl = process.env.URL_CHAT as string
      console.log("Chatttttt urllllllll",chatUrl);
      socket = io(chatUrl, {
        auth: { token: trimmedToken },
      });
      
      socket.on('connect', () => {
        socket.emit('fetch all chatrooms');
      });
      
      socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
      });

    }
  }, [currentUserToken]);
  useEffect(() => {
    
    socket.on('all chatrooms', (receivedChatrooms) => {
      setChatrooms(receivedChatrooms);
    });
    
    return () => {
      socket.off('all chatrooms');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('update selected chatroom', (receivedChatroom) => {
      setSelectedChatroom(receivedChatroom);
    });

    return () => {
      socket.off('update selected chatroom');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('new message created broadcast', (newlyCreatedMessage) => {
        handleSelectChatroom(newlyCreatedMessage.ChatroomId);

      setMessage("");
    });

    return () => {
      socket.off('message created');
    };
  }, [socket]);


const handleMessage=(event: { preventDefault: () => void; target: { value: React.SetStateAction<string> } })=>{
 event.preventDefault();
 setMessage(event.target.value);
}

const handleSendMessage=(msgObject:msgObject)=>{
  const token = localStorage.getItem("token") as string
  const trimmedToken = token.split(' ')[1];

  socket.emit('create new message', msgObject)
  socket.off('message created');
};

  const toogleDisplay =()=>{
      setDisplay(!display);
  }

  function handleSelectChatroom(chatroomId:string){
    socket.emit("select chatroom", chatroomId)
    toogleDisplay()

  }
  
  return (
    <>
      <div className="relative z-50 w-full h-full shadow-2xl rounded-md bg-white">
        <div className="h-full chat-wrapper">
            {!display?
             <ChatRoomsList
             chatrooms= {chatrooms} 
             currentUser = {currentUser} 
             toogleDislay = {toogleDisplay}
             handleSelectChatroom = {handleSelectChatroom}
             />
             :
             <ChatConversation
             users = {selectedChatroom.users}
             initiator = {selectedChatroom.initiator}
             isPrivate ={selectedChatroom.isPrivate}
             currentUser = {currentUser}
             messages = {selectedChatroom.messages as Message[]}
             toogleDislay = {toogleDisplay}
             handleSendMessage = {handleSendMessage}
             handleMessage = {handleMessage}
             message = {message}
             />
            }

        </div>
      </div>
    </>
  )
}

export default ChatWrapper