'use client';

import { showToast } from '@/helpers/toast';
import { io } from 'socket.io-client';

const URL: string = process.env.NEXT_PUBLIC_SOCKET_APP_ENV as string;
const socket = io(URL);

export const socketInit = (token: string) => {
  function decodeToken(token: string) {
    const [header, payload, signature] = token.split('.');
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);
    return parsedPayload;
  }

  const decodedtokenone = decodeToken(token);
  const userID = decodedtokenone.id;

  socket.on('connect', () => {
    socket.emit('joinRoom', userID);
    console.log('client connected successful', userID);
  });

  socket.on('productUnavailable', (data) => {
    console.log('Product wishe', data);
    showToast('New Notification', 'info');
  });
};

export const decodeToken = (token: string) => {
  const [header, payload, signature] = token.split('.');
  const decodedPayload = atob(payload);
  const parsedPayload = JSON.parse(decodedPayload);
  return parsedPayload;
};
