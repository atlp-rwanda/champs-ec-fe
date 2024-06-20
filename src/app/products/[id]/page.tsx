// BuyerProductView
'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa6';
import { useParams } from 'next/navigation';
import { Product } from '@/utils/requests';
import { ProductObj, ProductType, ReviewType, imageType } from '@/types/Product';
import Card from '@/components/Card';
import Review from '@/components/ReviewProduct';
import Header from '@/components/Header';
import Footer from '@/components/Footer'; 
import image from '../../../../public/product.png';
import { useQuery } from '@tanstack/react-query';

function Page() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { id } = useParams();
  const handleSwiper = (swiper: any) => {
    setThumbsSwiper(swiper);
  };
  const _id: string = id.toLocaleString();
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ['product', id],
    queryFn: async () => {
      try {
        const response: ProductType = (await Product.single(_id)) as ProductType;
        
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
    <div>
      <Header />
      <div className="w-full mb-5 mt-5 flex flex-col justify-center items-center">
        <div className="w-2/3 flex flex-col justify-center items-center gap-5">
          <div className="w-full flex">
            <div className="w-1/2">
              <div className="flex justify-center py-2">
                {productPictures && productPictures.length > 0 ? (
                  <Swiper
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                  >
                    {productPictures.map((image:imageType) => {
                      return (
                        <SwiperSlide key={image.imgId}>
                          <Image src={image.URL} alt='image' />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                ) : (
                  <Image src={image} alt={'no image found'} />
                )}
              </div>
              <div className="w-full flex space-x-4 justify-start mt-3">
                {productPictures && productPictures.length > 0 ? (
                  <div className="w-[500px] h-[15em] overflow-hidden">
                    <Swiper
                      onSwiper={handleSwiper}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper mycss"
                    >
                      {productPictures.map((image:imageType) => {
                        return (
                          <SwiperSlide key={image.imgId}>
                            <Image src={image.URL} alt='image'/>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </div>
                ) : (
                  <p className="text-red-500">no image found!</p>
                )}
              </div>
            </div>
            <div className="w-1/2 flex flex-col ml-10">
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
            </div>
          </div>
          <div className="w-full flex flex-col">
            <h2 className="font-medium text-2xl">Related products:</h2>
            <div className="w-full max-w-[100%]">
              <div className="product-grid flex justify-evenly mt-5">
                {relatedProducts && relatedProducts.length > 0 ? (
                  relatedProducts.map((product:ProductType) => (
                    <Card
                      key={product.id}
                      id={product.id}
                      productPrice={product.productPrice}
                      productThumbnail={product.productThumbnail}
                      productDescription={product.productDescription}
                    />
                  ))
                ) : (
                  <p className="text-red-500 w-full flex self-center">
                    No related products available.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col mt-10">
            <h2 className="font-medium text-2xl">Reviews:</h2>
            <div className="my-10">
              {reviews && reviews.length > 0 ? (
                reviews.map((review: ReviewType) => (
                  <Review
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
    </div>
  );
}

export default Page;
