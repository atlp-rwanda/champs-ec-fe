import React from 'react';
import { MdOutlineRemoveRedEye, MdOutlineShoppingCart } from "react-icons/md";
import Image from 'next/image';
import { FaRegHeart } from "react-icons/fa6";
import { Cards } from "../types/Product";
import image from "../../public/product.png"
import Link from 'next/link';
// import { useRouter } from 'next/router';

function Card({productDescription, productPrice, productThumbnail, id}: Cards) {

  return (
    <div className="w-full max-w-48 mb-10 h-[17rem] flex flex-col gap-3 bg-white border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700 relative">
      <div className='flex justify-center h-[180px]'>
      {productThumbnail && productThumbnail.length > 0 ? (<Image src= {productThumbnail} alt="default image" width={200} height={0} />
                ) : (
                  <Image src={image} alt={'no image found'} />
                )}
      </div>
      <div className="px-4 flex flex-col gap-1">
          <h5 className="max-w-1xl text-[12px] font-semibold tracking-tight text-gray-900 dark:text-white">
            {productDescription.substr(0,50)+'...'}
          </h5>
        <div className="flex items-center justify-between">
          <span className="text-1xl font-bold text-blue-400 dark:text-white">
            ${productPrice}
          </span>
        </div>
      </div>
      <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition duration-300 ease-in-out bg-gray-200 bg-opacity-75">
        <Link href={`/products/${id}`}><MdOutlineRemoveRedEye className="text-gray-700 mr-4 hover:text-blue-400 cursor-pointer" /></Link>
        <FaRegHeart className="text-gray-700 mr-4 hover:text-red-500 cursor-pointer" />
        <MdOutlineShoppingCart className="text-gray-700 hover:text-green-500 cursor-pointer" />
      </div>
    </div>
  );
}

export default Card;
