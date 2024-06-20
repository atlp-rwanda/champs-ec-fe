import React, { forwardRef } from 'react';
interface Properties {
  nameuse?: string;
  type: string;
  value?:string;
  placeholder?: string;
  error?: string;
 
}
const InputBox = forwardRef<HTMLInputElement, Properties>(
  ({ nameuse, type, placeholder, error, ...rest }, ref) => {
    return (
      <div className="w-[100%] mb-3">
        <p className="mb-0 text-[14px] font-medium text-black/80">{nameuse}</p>
        <input
          type={type}
          placeholder={placeholder}
          ref={ref}
          className={`border rounded-s-sm border-black/30 text-[12px] w-[100%] p-2 ${error && 'border-red-400'}`}
          {...rest}
        />
        {error && <p className="text-red-500 text-[10px] ">{error}</p>}
      </div>
    );
  },
);
InputBox.displayName = 'InputBox';
export default InputBox;
