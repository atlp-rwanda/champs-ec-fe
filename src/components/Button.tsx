"use client";
import React from "react";

interface Properties {
  name: string;
  handle?: () => void;
}
const Button: React.FC<Properties> = ({ name, handle }) => {
  return (
    <div>
      <button
        className="bg-blue-600 w-[100%] text-white p-1.5 px-10 rounded-s-sm hover:bg-blue-700"
        onClick={handle}
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
