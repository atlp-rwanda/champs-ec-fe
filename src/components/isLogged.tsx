'use client';

export const checkUserLoggedIn = (): boolean => {
  if (typeof window !== 'undefined') {
    const userLocalStorage = localStorage.getItem("profile");
    if (userLocalStorage) {
      const userParse = JSON.parse(userLocalStorage);
      return !!userParse?.User;
    }
  }
  return false;
};
