// BuyerProductView
'use client';

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa6';
import { useParams } from 'next/navigation';
import { Product } from '@/utils/requests';
import { useQuery,RefetchOptions } from '@tanstack/react-query';
import { ProductType, ReviewType, imageType } from '@/types/Product';
import Review from '@/components/ReviewProduct';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Key } from 'react';//@ts-ignore
import ReactStars from "react-rating-stars-component";

import Button, {
  GreenButton,
  BlueBorderButton,
  DeleteButton,
} from '@/components/Button';
import ReviewCard from "@/components/ReviewCard";
import { averageReviews } from "@/utils/averageReviews";
import axios from "axios";
import request from "@/utils/axios";
import { showToast } from "@/helpers/toast";
import UpdateProductPopup from '@/components/Product/editProduct';
import router from "next/router";
import ConfirmDelete from "@/components/confirmDeletePopup";

function Page() {
  const { id } :any= useParams();
  const [items, setItems] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [showlModal, setShowmodal] = useState(false);

  useEffect(() => {
    if (!id) {
      setError('Invalid product ID');
    }
  }, [id]);

  const _id: string = id.toString();

  const { data, isLoading, error: queryError } = useQuery<any>({
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
      const [PopupOpen, setPopupOpen] = useState(false);
      const [Confirm,setConfirm]=useState(false)
    const handleOpenPopup = () => {
      setPopupOpen(true);
    };
    const handleClosePopup = () => {
      setPopupOpen(false);
    };

  if (isLoading) return <span>Loading...</span>;
  if (queryError) return <span>Error: {queryError.message}</span>;

  const {
    productThumbnail,
    productPictures,
    productName,
    productPrice,
    productDescription,
    reviews,
  } = data.product;

  const toggleConfirmPopup =()=>{
   setConfirm(!Confirm) 
  }

  
  const handleUpdate= async(id:string)=>{
   
    try{
      const res:any = await request.get(`/products/${id}`);
      
      setPopupOpen(true)
     // console.log(res)
      // console.log('id',id)
      // console.log(res.product)
     // return res.data

    }
    catch(error){
      console.log(error)
    }
  }


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
              <div className='block'>
                <ReactStars
                    count={5}
                    value={averageReviews(reviews)}
                    isHalf={true}
                    size={30}
                    activeColor="#ffd700"
                    edit={false}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-medium text-2xl">Description:</h2>
                <p className="w-full text-1xl">{productDescription}</p>
              </div>
              <div className="flex space-x-5">
                <GreenButton name="status" />
                <BlueBorderButton name="Edit" handle={()=>handleUpdate(_id)}  />
                <DeleteButton name="Delete" handle={() => toggleConfirmPopup()} />
              </div>
              {PopupOpen && <UpdateProductPopup isOpen={PopupOpen} onClose={handleClosePopup}  productId={_id} product={data.product} />}
            </div>
          </div>
          <div className="w-full flex flex-col">
            <h2 className="font-medium text-2xl">Reviews:</h2><Button name='Add Review' background='blue'></Button>
            <div>
              {reviews && reviews.length > 0 ? (
                reviews.map((review: ReviewType) => (
                  <ReviewCard
                    //key={review.id}
                    rating={review.rating}
                    feedback={review.feedback}
                    image={review.userProfile.profileImage}
                    firstName={review.userProfile.firstName}
                    lastName={review.userProfile.lastName}
                  />
                ))
              ) : (
                <p className="text-red-500">No ratings yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {Confirm
      ?
      <ConfirmDelete
        isOpen= {Confirm}
        productId={_id}
        toggleConfirmPopup={toggleConfirmPopup}
      //  refetch={refetch}
      />:''}
      <Footer />
      

    </>
  );
}


export default Page;

