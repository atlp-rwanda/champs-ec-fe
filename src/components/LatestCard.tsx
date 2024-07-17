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
    <div className="flex justify-center items-center flex-col shadow-lg border pb-2  ">
      <div className="sm:w-[250px] sm:min-w-[250px] h-[260px] min-w-[340px]    overflow-hidden   ">
        <div
          className="w-full pt-10  h-full bg-no-repeat bg-cover  transition-transform duration-500 ease-in-out transform hover:scale-110"
          style={{
            backgroundImage: `url(${imagelink || 'product.png'})`,
          }}
        ></div>
      </div>
      <div className="   w-full pl-2 ">
        <div className=" bg-white h-full w-full bottom-0 left-0">
          <h1 className=" font-semibold text-2xl  mb-2 capitalize">{name}</h1>
          <div className="flex gap-4">
            <p className="">Price:{price.toLocaleString()} RWF </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestCard;
