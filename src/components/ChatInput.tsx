// import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { msgObject } from './chatWrapper';
import { FaRegPaperPlane } from "react-icons/fa6";

interface ChatInputProps {
  handleMessage: (event: any) => void;
  handleSendMessage: (msgObject: msgObject) => void;
  message : string;
  currentUser: string;
  receiver: string;

}

const ChatInput: React.FC<ChatInputProps> = ({handleMessage, handleSendMessage, message, currentUser, receiver}) => {
  
  const sendMessage=(e: { preventDefault: () => void; })=>{
    e.preventDefault();
    handleSendMessage({
      senderId: currentUser,
      receiver: receiver,
      message: message,
    });
  }

  return (
    <>
      <form className="w-full h-full" name="msgForm" onSubmit={sendMessage}>
        <div className="triple-grid w-full h-full">
          <input
            type="text"
            id="message-input"
            placeholder="Type a message"
            className="h-full w-full bg-slate-100"
            value={message}
            onChange={handleMessage}
          />
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-green-400"
            onClick={sendMessage}
          >
            <FaRegPaperPlane className='text-2xl'/>
          </button>
        </div>
      </form>
    </>
  );
};

export default ChatInput;
