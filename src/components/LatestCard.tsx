import React from 'react';
interface Properties {
  imagelink: string;
  name: string;
  price: string;
  sellername: string;
  color?: string;
}
const LatestCard: React.FC<Properties> = ({
  imagelink,
  name,
  price,
  sellername,
  color,
}) => {
  return (
    <div className="w-[300px] min-w-[300px] h-[350px] p-2 rounded-lg overflow-hidden shadow-sm ">
      <div
        className="w-full pt-10 shadow-md h-full bg-no-repeat bg-cover rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-110"
        style={{
          backgroundImage: `url(${imagelink})`,
        }}
      >
        <div className=" bottom-0 left-0 pl-5 bg-opacity-50 w-full">
          <h1 className=" font-bold text-2xl text-[32px] mb-2">{name}</h1>
          <div className="flex gap-4">
            <p className="">Price:$ {price} </p>
            <p className="">Seller: {sellername}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestCard;
