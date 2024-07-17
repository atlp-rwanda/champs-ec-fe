import React from 'react';
import ChatRoom from './ChatRoom';

interface chatroomsLists {
    chatrooms: any
    currentUser: string
    toogleDislay: ()=> void; 
    handleSelectChatroom: (chatroomId:string)=> void;
}
const ChatRoomsList:React.FC<chatroomsLists>=({chatrooms, currentUser, toogleDislay, handleSelectChatroom})=>{
    const ListOfChatRooms = chatrooms.map((chatroom:any)=>(
        <ChatRoom 
          key={chatroom.id}
          id= {chatroom.id}
          users={chatroom.users}
          lastMessage={chatroom.messages[chatroom.messages.length-1]}
          currentUser= {currentUser}
          initiator={chatroom.initiator}
          isPrivate={chatroom.isPrivate}
          toogleDislay={toogleDislay}
          handleSelectChatroom = {handleSelectChatroom}
        />
    ))
  return (
    <>
        <h2 className="flex justify-center self-center text-bold text-2xl py-5 bg-gray-100">
          Messages
        </h2>
        <hr />
        <div>
          {ListOfChatRooms}
        </div>
    </>
  );
}

export default ChatRoomsList;
