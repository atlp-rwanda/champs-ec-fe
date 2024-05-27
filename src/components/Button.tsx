'use client';
import React from 'react';

interface Properties {
  name: string;
  handle?: () => void;
  loading?: boolean;
}
const Button: React.FC<Properties> = ({ name, handle, loading }) => {
  return (
    <div>
      <button
        className="bg-blue-600 min-h-[40px] w-[100%] text-white p-1.5 px-10 rounded-s-sm hover:bg-blue-700 relative"
        onClick={handle}
      >
        {!loading && name}
        {loading && (
          <div className="border-t-4 border-b-4 border-white rounded-full w-6 h-6 animate-spin m-auto"></div>
        )}
      </button>
    </div>
  );
};

export default Button;
