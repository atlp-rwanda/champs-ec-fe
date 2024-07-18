import React, { useState } from 'react';
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
import { handleUserAddCart, IUSERCART } from '@/redux/slices/userCartSlice';
import request from '@/utils/axios';
import { showToast } from '@/helpers/toast';
import { handleWishlistCount } from '@/redux/slices/wishlistSlice';
// import { useRouter } from 'next/router';

function Card({
  productName,
  productDescription,
  productPrice,
  productThumbnail,
  id,
  reviews,
}: Cards) {
  const [addProductToCart, setAddProductToCart] = useState(false);
  const { cart } = useAppSelector((state: RootState) => state.userCartData);

  const carts = cart as IUSERCART;
  const productId = id;

  const dispatch = useAppDispatch();
  const handleNewItem = () => {
    setAddProductToCart(true);
    dispatch(handleUserAddCart({ productPrice, productId }));
  };
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = defaultProductImage.src;
  };
  const { wishNumber } = useAppSelector((state: RootState) => state.wishlist);

  const handleAddRemoveWish = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const response: any = await request.post('/wishes', { productId: id });

    if (response.status == 200 || response.status == 203) {
      const { status } = response;
      dispatch(
        handleWishlistCount(
          status == 200 ? (await wishNumber) + 1 : (await wishNumber) - 1,
        ),
      );
      showToast(response.message, 'success');
    }
    console.log('this is response', response);
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
        <h5 className="text-sm font-semibold mb-1  text-gray-900 truncate capitalize-first">
          {productName.length < 30
            ? productName
            : `${productName.substring(0, 30)}...`}
        </h5>
        <p className="text-xs text-gray-700 mb-2 truncate">
          {productDescription.length < 50
            ? productDescription
            : `${productDescription.substring(0, 50)}...`}
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
            <MdOutlineRemoveRedEye
              className="text-gray-600  hover:text-blue-600 cursor-pointer"
              size={20}
            />
          </Link>
          <FaRegHeart
            className="text-gray-600 hover:text-red-500 cursor-pointer"
            size={20}
            onClick={handleAddRemoveWish}
          />
          <MdOutlineShoppingCart
            className={` hover:text-green-500 cursor-pointer ${
              addProductToCart ||
              carts.product.some((item) => item.product === id)
                ? 'text-red-600 pointer-events-none'
                : 'text-gray-600'
            }`}
            size={20}
            onClick={handleNewItem}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
