import React from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import ChatHeader from './ChatHeader';
import { Message } from '@/types/message';
import { Seller } from '@/types/Product';
import { msgObject } from './chatWrapper';
import { handleCartCount } from '@/redux/slices/userCartSlice';

interface chatConversation {
  messages: Array<Message>;
  message: string;
  users: Seller[];
  initiator?: string;
  isPrivate?: boolean;
  currentUser: string;
  toogleDislay: () => void;
  handleMessage: (event: any) => void;
  handleSendMessage: (msgObject: msgObject) => void;
}

const ChatConversation: React.FC<chatConversation> = ({
  users,
  initiator,
  isPrivate,
  currentUser,
  toogleDislay,
  message,
  messages,
  handleMessage,
  handleSendMessage,
}) => {
let corenspondent: Seller = {
  firstName: 'brice',
  lastName: 'kelly',
  profileImage:
    'https://res.cloudinary.com/dmems8p0a/image/upload/v1719443657/blogImages/ytrxftrfcjyz8psmr73t.jpg',
};
if (users.length) {
  if (!isPrivate) {
    corenspondent = users.find((user) => user.id == initiator) as Seller;
  } else {
    corenspondent = users.find((user) => user.id !== currentUser) as Seller;
  }
}

const allMessagesList = messages.map((message:Message)=>{
  return <ChatMessage 
   key={message.id}
   message={message.message}
   currentUser={currentUser}
   senderId = {message.senderId}
   firstName = {message.sender.firstName}
   lastName = {message.sender.lastName}
   profileImage = {message.sender.profileImage}
   createdAt = {message.createdAt}
   receiver = {message.receiver}
   isPrivate 
  />
})

  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <div className="w-full bg-gray-200">
          <ChatHeader
           firstName={corenspondent.firstName}
           lastName={corenspondent.lastName}
           profileImage={corenspondent.profileImage}
           toogleDislay={toogleDislay}
          />
        </div>
        <div className="h-[78%] w-full p-2 overflow-hidden overflow-y-auto scroll-double-shrinked">
          {allMessagesList}
        </div>
        <div className="h-[10%] w-full border">
          <ChatInput 
           handleMessage = {handleMessage}
           handleSendMessage = {handleSendMessage}
           message = {message}
           currentUser = {currentUser} 
           receiver = {corenspondent.id as string}
          />
        </div>
      </div>
    </>
  );
};

export default ChatConversation;
