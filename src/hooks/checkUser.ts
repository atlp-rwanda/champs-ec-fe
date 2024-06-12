'use client';

export const isAuthenticated = () => {
  const sessionAuth = localStorage.getItem('isLogged') || false;
  const isLogged = sessionAuth ? JSON.parse(sessionAuth) : false;
  return isLogged;
};
