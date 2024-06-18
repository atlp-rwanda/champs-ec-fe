'use client'

interface User {
    role?: string;
    isAdmin?: boolean;
  }
  
  function getUserFromLocalStorage(): User | null {
    const userString = localStorage.getItem('user');
  
    if (!userString) {
      return null;
    }
  
    try {
      return JSON.parse(userString) as User;
    } catch (error) {
      console.error('Error parsing user data from local storage:', error);
      return null;
    }
  }

  
  function checkIsAdminHelper(userData?: User): boolean {
    if (!userData) {
      return false;
    }
  
    if (userData.role === 'admin') {
      return true;
    }
    return userData.isAdmin === true;
  }
  export function checkIsAdmin(): boolean {
    const user = getUserFromLocalStorage();
  
    return checkIsAdminHelper();
  }
  