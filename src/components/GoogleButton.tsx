import loginGoogle from '@/hooks/loginGoogle';
import Image from 'next/image';
import React from 'react';

const GoogleButton: React.FC = () => {
  return (
    <Image
      src="/google.jpg"
      alt="Google"
      className=" cursor-pointer"
      width={50}
      height={50}
      onClick={() => loginGoogle()}
    />
  );
};

export default GoogleButton;
