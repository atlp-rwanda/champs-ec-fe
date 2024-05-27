import React from "react";
interface Properties {
  nameuse?: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  handle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputBox: React.FC<Properties> = ({
  nameuse,
  name,
  type,
  value,
  placeholder,
  handle,
}) => {
  return (
    <div className="w-[100%] mb-3">
      <p className="mb-0 text-[14px] font-medium text-black/80">{nameuse}</p>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handle}
        className="border rounded-s-sm border-black/30 text-[15px] w-[100%] p-2"
      />
    </div>
  );
};

export default InputBox;
