// BuyerProductView
'use client';

import React from "react";
import Image from 'next/image';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa6';
import { useParams } from 'next/navigation';
import { Product } from '@/utils/requests';
import { useQuery } from '@tanstack/react-query';
import { ProductType, ReviewType, Cards, imageType } from '@/types/Product';
import produ from "../../../../../public/product.png"
import Review from '@/components/ReviewProduct';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Key } from 'react';
import {
  BackButton,
  Button,
  GreenButton,
  BlueBorderButton,
  DeleteButton,
} from '@/components/Button';

function Page() {
  const { id } = useParams();
  if (!id) {
    return <span>Error: Invalid product ID</span>;
  }
  const _id: string = id.toString();
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ['product', id],
    queryFn: async () => {
      try {
        const response = (await Product.single(_id)) as ProductType;
        return response;
      } catch (error) {
        throw new Error('Error fetching product data');
      }
    },
  });
  if (isLoading) return <span>Loading...</span>;

  if (error) return <span>Error: {error.message}</span>;

  const {
    productThumbnail,
    productPictures,
    productName,
    productPrice,
    productDescription,
    reviews,
  } = data.product;

  const { relatedProducts } = data;
  return (
    <>
      <Header />
      <div className="w-full mb-5 mt-5 flex flex-col justify-center items-center">
        <div className="w-1/2 flex flex-col justify-center items-center gap-5">
          <div className="w-full flex">
            <div className="w-1/2">
              {productThumbnail && productThumbnail.length > 0 ? (
                <img
                  src={productThumbnail}
                  alt="Product Image"
                  width={200}
                  height={100}
                />
              ) : (
                <img src="../../../../../public/product.png" alt={'no image found'} />
              )}
              <div>
                {productPictures && productPictures.length > 0 ? (
                  productPictures.map((picture: imageType) => (
                    <li key={picture.imgId}>
                      <img
                        src={picture.URL}
                        alt="Product Image"
                        width={90}
                        height={90}
                      />
                    </li>
                  ))
                ) : (
                  <p className="text-red-500">no image found!</p>
                )}
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-5">
              <div>
                <h1 className="font-medium text-2xl">{productName}</h1>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="p-3 rounded-full bg-gray-200 hover:bg-green-500 hover:text-white cursor-pointer">
                    <FaRegHeart />
                  </div>
                  <div className="p-3 rounded-full bg-gray-200 hover:bg-green-500 hover:text-white cursor-pointer">
                    <MdOutlineShoppingCart />
                  </div>
                </div>
                <span className="font-medium text-2xl text-blue-300">
                  ${productPrice}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-medium text-2xl">Description:</h2>
                <p className="w-full text-1xl">{productDescription}</p>
              </div>
              <div className="flex space-x-5">
                <GreenButton name="status" />
                <BlueBorderButton name="Edit" />
                <DeleteButton name="Delete" />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <h2 className="font-medium text-2xl">Reviews:</h2>
            <div>
              {reviews && reviews.length > 0 ? (
                reviews.map((review: ReviewType) => (
                  <Review
                    // key={review.id}
                    rating={review.rating}
                    feedback={review.feedback}
                  />
                ))
              ) : (
                <p className="text-red-500">No ratings yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Page;
