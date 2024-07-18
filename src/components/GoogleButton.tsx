import { api_base_url } from '@/utils/axios';
import React from 'react';

const GoogleButton: React.FC = () => {
  return (
    <img
      src="/google.jpg"
      alt="Google"
      className=" cursor-pointer hover:scale-110"
      width={50}
      height={50}
      onClick={() => (window.location.href = `${api_base_url}/users/google`)}
    />
  );
};

export default GoogleButton;
