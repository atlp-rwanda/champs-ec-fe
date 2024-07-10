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
        <h2 className="flex justify-center self-center text-bold text-2xl py-3">
          Messages
        </h2>
        <div className="w-full flex justify-center items-center">
          <input
            type="text"
            className="rounded-full border bg-gray-200 h-10 w-full max-w-[70%]"
          />
        </div>
        <hr className="my-3" />
        <div>
          {ListOfChatRooms}
        </div>
    </>
  );
}

export default ChatRoomsList;
