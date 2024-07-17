
import React, { useState } from 'react';

function ChatPopUp() {
    const [isChatPopUpOpen, setIsChatPopUpOpen] = useState(false)
    const toggleChatPopUp = () => {
        setIsChatPopUpOpen(!isChatPopUpOpen);
    };

    return{
        isChatPopUpOpen, 
        setIsChatPopUpOpen, 
        toggleChatPopUp
    }
};

export default ChatPopUp
  