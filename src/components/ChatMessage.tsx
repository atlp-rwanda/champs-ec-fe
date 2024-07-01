import React, { ReactNode } from 'react';
import chatwallpaper from '../../public/chat-wallpaper (1).jpg';
import { formatTime } from '@/utils/formatTime';
import { Seller } from '@/types/Product';

interface chatmsg {
  message: string;
  currentUser: string;
  senderId: string;
  receiver: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  createdAt: Date | ReactNode;
  isPrivate: boolean;
}
const ChatMessage: React.FC<chatmsg> = ({
  message,
  currentUser,
  senderId,
  receiver,
  isPrivate,
  createdAt,
  firstName,
  lastName,
}) => {
  const dateStr = formatTime(createdAt);
  const names = firstName + ' ' + lastName;
  return (
    <>
      <div className="p-2">
        <div className={currentUser === senderId ? 'u2 chat' : 'u1 chat'}>
        {currentUser !== senderId && (
          <span className="block text-[12px] self-end text-black italic">{names}</span>
        )}
          <span className="block text-base">{message}</span>
          <span className="block text-[10px] text-black italic text-right px-2 py-1">
            {dateStr as ReactNode}
          </span>
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
