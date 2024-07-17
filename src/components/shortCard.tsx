import React from 'react';
interface Carddata {
  name: string;
  number: string;
  bgcolor?: string;
  imagelink?: string;
  numbercolor?: string;
  namecolor?: string;
}
const ShortCard: React.FC<Carddata> = ({
  name,
  number,
  bgcolor,
  imagelink,
  namecolor,
  numbercolor,
}) => {
  return (
    <div
      className={`min-w-[35%]   h-[120px] sm:h-[160px] ${bgcolor ? bgcolor : 'bg-pink-200'}   rounded-lg border sm:p-2 `}
    >
      <img
        src={imagelink}
        alt="wishImage"
        className="sm:w-[40px] w-[30px] mt-2"
      />
      <h1
        className={`font-bold sm:text-2xl sm:mt-5 mt-3 ${numbercolor ? numbercolor : 'text-gray-700'} `}
      >
        {number}
      </h1>
      <p
        className={`sm:text-1xl font-thin ${namecolor ? namecolor : 'text-blue-500'} `}
      >
        {name}
      </p>
    </div>
  );
};

export default ShortCard;
