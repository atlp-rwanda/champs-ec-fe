import React from 'react';
import { MdOutlineRemoveRedEye, MdOutlineShoppingCart } from 'react-icons/md';
import Image from 'next/image'; //@ts-ignore
import ReactStars from 'react-rating-stars-component';
import { FaRegHeart } from 'react-icons/fa6';
import { Cards } from '../types/Product';
import image from '../../public/product.png';
import Link from 'next/link';
import { averageReviews } from '@/utils/averageReviews';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { handleUserAddCart } from '@/redux/slices/userCartSlice';

// import { useRouter } from 'next/router';

function Card({
  productName,
  productDescription,
  productPrice,
  productThumbnail,
  id,
  reviews,
}: Cards) {
  
const productId=id

const dispatch = useAppDispatch();
const handleNewItem=()=>{

dispatch(handleUserAddCart({productPrice,productId}));
}
  return (
    <div className="w-full max-w-[80%] sm:max-w-48 sm:mb-10 min-w-[200px] mr-3  ml-0 my-3 sm:h-[17rem] h-[19rem] flex flex-col bg-white border border-gray-100 shadow relative">
      <div className="flex justify-center h-[180px]">
        {productThumbnail && productThumbnail.length > 0 ? (
          <img
            src={productThumbnail}
            alt="default image"
            className="w-full h-[150px] text-[12px]"
          />
        ) : (
          <img src="./force.png" alt={'no image found'} />
        )}
      </div>
      <div className="sm:px-4 flex flex-col gap-1">
        <h5 className="max-w-1xl sm:text-[12px] text-[30px] sm:text-left sm:mx-0  mx-3 w font-semibold tracking-tight text-black-900">
          {productName.length < 30
            ? productName
            : productName.substring(0, 30) + '...'}
        </h5>
        <div className="block text-[12px] text-muted">
          {productDescription.length < 50
            ? productDescription
            : productDescription.substring(0, 50) + '...'}
        </div>
        <div className="flex items-center justify-between pb-3">
          <span className="text-1xl sm:m-0 m-3 font-bold text-green-400">
            {productPrice} RWF
          </span>
          <span className="block">
            <ReactStars
              count={5}
              value={averageReviews(reviews)}
              isHalf={true}
              size={13}
              activeColor="#ffd700"
              edit={false}
            />
          </span>
        </div>
      </div>
      <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition duration-300 ease-in-out bg-gray-200 bg-opacity-75">
        <Link href={`/products/${id}`}>
          <MdOutlineRemoveRedEye className="text-gray-700 mr-4 hover:text-blue-400 cursor-pointer" />
        </Link>
        <FaRegHeart className="text-gray-700 mr-4 hover:text-red-500 cursor-pointer" />
        <MdOutlineShoppingCart className="text-gray-700 hover:text-green-500 cursor-pointer"  onClick={() =>{handleNewItem()}} />
      </div>
    </div>
  );
}

export default Card;