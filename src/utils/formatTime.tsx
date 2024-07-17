
import { ReactNode } from "react";

export const formatTime=(dateString : Date | ReactNode)=> {
    const date = new Date(dateString as Date);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  