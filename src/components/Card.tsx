import React from 'react';
import { MdOutlineRemoveRedEye, MdOutlineShoppingCart } from 'react-icons/md';
import Image from 'next/image'; //@ts-ignore
import ReactStars from 'react-rating-stars-component';
import { FaRegHeart } from 'react-icons/fa6';
import { Cards } from '../types/Product';
import image from '../../public/product.png';
import defaultProductImage from '../../public/product-default.png';
import Link from 'next/link';
import { averageReviews } from '@/utils/averageReviews';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { handleUserAddCart } from '@/redux/slices/userCartSlice';

function Card({
  productName,
  productDescription,
  productPrice,
  productThumbnail,
  id,
  reviews,
}: Cards) {

  const productId = id;
  const dispatch = useAppDispatch();
  const handleNewItem = () => {
    dispatch(handleUserAddCart({ productPrice, productId }));
  }
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = defaultProductImage.src;
  };
  return (
    <div className="relative w-full max-w-[80%] sm:max-w-48 sm:mb-10 min-w-[200px] mx-3 my-6 sm:h-[17rem] h-[19rem] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <Link href={`/products/${id}`}>
        <div className="overflow-hidden p-3">
          <img 
            src={productThumbnail || '../../public/product-default.png'} 
            alt={productName} 
            className="w-full h-32 object-contain transition-transform duration-300"
            onError={handleImageError}
          />
        </div>
      </Link>
      <div className="px-3 pb-3">
        <h5 className="text-sm font-semibold mb-1  text-gray-900 truncate">
          {productName.length < 30 ? productName : `${productName.substring(0, 30)}...`}
        </h5>
        <p className="text-xs text-gray-700 mb-2 truncate">
          {productDescription.length < 50 ? productDescription : `${productDescription.substring(0, 50)}...`}
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-green-500">
            {productPrice.toLocaleString()} RWF
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
        <div className="flex justify-end space-x-4">
          <Link href={`/products/${id}`}>
            <MdOutlineRemoveRedEye className="text-gray-600  hover:text-blue-600 cursor-pointer" size={20} />
          </Link>
          <FaRegHeart className="text-gray-600 hover:text-red-500 cursor-pointer" size={20} />
          <MdOutlineShoppingCart className="text-gray-600 hover:text-green-500 cursor-pointer" size={20} onClick={handleNewItem} />
        </div>
      </div>
    </div>
  );
}

export default Card;

