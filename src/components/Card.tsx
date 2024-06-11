import React from 'react';
import { MdOutlineRemoveRedEye, MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa6';
import { Cards } from '@/types/Product';
import Link from 'next/link';
// import { useRouter } from 'next/router';

function Card({
  productDescription,
  productPrice,
  productThumbnail,
  id,
}: Cards) {
  return (
    <div className="w-full sm:max-w-48 max-w-[80%] sm:mb-10 mb-3 sm:h-[17rem] h-[19rem] flex flex-col gap-3 bg-white border border-gray-100 shadow relative">
      <div className="flex justify-center h-[180px]">
        {productThumbnail && productThumbnail.length > 0 ? (
          <img
            src={productThumbnail}
            alt="default image"
            width={200}
            height={0}
          />
        ) : (
          <img src="./force.png" alt={'no image found'} />
        )}
      </div>
      <div className="sm:px-4 flex flex-col gap-1">
        <h5 className="max-w-1xl sm:text-[12px] text-[17px] sm:text-left sm:mx-0  mx-3 w font-semibold tracking-tight text-gray-900">
          {productDescription.substr(0, 50) + '...'}
        </h5>
        <div className="flex items-center justify-between">
          <span className="text-1xl sm:m-0 m-3 font-bold text-blue-400">
            ${productPrice}
          </span>
        </div>
      </div>
      <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition duration-300 ease-in-out bg-gray-200 bg-opacity-75">
        <Link href={`/products/${id}`}>
          <MdOutlineRemoveRedEye className="text-gray-700 mr-4 hover:text-blue-400 cursor-pointer" />
        </Link>
        <FaRegHeart className="text-gray-700 mr-4 hover:text-red-500 cursor-pointer" />
        <MdOutlineShoppingCart className="text-gray-700 hover:text-green-500 cursor-pointer" />
      </div>
    </div>
  );
}

export default Card;
