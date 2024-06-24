// BuyerProductView
'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Image from 'next/image'; //@ts-ignore
import ReactStars from 'react-rating-stars-component';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa6';
import { useParams } from 'next/navigation';
import { Product } from '@/utils/requests';
import {
  ProductObj,
  ProductType,
  ReviewType,
  imageType,
} from '@/types/Product';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import image from '../../../../public/product.png';
import { useQuery } from '@tanstack/react-query';
import ReviewCard from '@/components/ReviewCard';
import Button from '@/components/Button';
import { averageReviews } from '@/utils/averageReviews';
import { useAppDispatch } from '@/redux/store';
import { handleUserAddCart } from '@/redux/slices/userCartSlice';

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
        const response: ProductType = (await Product.single(
          _id,
        )) as ProductType;

        return response;
      } catch (error) {
        throw new Error('Error fetching product data');
      }
    },
  });
  if (isLoading) return <span>Loading...</span>;

  if (error) return <span>Error: {error.message}</span>;

  const {
    productPictures,
    productName,
    productPrice,
    productDescription,
    reviews,
  } = data.product;
  console.log('this is reviews >>>>>>>>>', reviews);
  console.log(' this is average reviews', productPictures);
  const { relatedProducts } = data;
  const dispatch = useAppDispatch();
  const handleNewItem = () => {
    const productId = data.product.id;
    dispatch(handleUserAddCart({ productPrice, productId }));
  };

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
                    {productPictures.map((image: imageType) => {
                      return (
                        <SwiperSlide key={image.imgId}>
                          <img src={image.url} alt="image" />
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
                      {productPictures.map((image: imageType) => {
                        return (
                          <SwiperSlide key={image.imgId}>
                            <img src={image.url} alt="image" />
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
                    <MdOutlineShoppingCart
                      onClick={() => {
                        handleNewItem();
                      }}
                    />
                  </div>
                </div>
                <span className="font-medium text-2xl text-blue-300">
                  RWF {productPrice}
                </span>
              </div>
              <div className="block">
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
            </div>
          </div>
          <div className="w-full flex flex-col ">
            <h2 className="font-medium text-2xl">Related products:</h2>
            <div className="w-full">
              <div className="product-grid flex justify-left gap-5 mt-5 mx-0">
                {relatedProducts && relatedProducts.length > 0 ? (
                  relatedProducts.map((product: ProductType) => (
                    <Card
                      key={product.id}
                      id={product.id}
                      productPrice={product.productPrice}
                      productThumbnail={product.productThumbnail}
                      productDescription={product.productDescription}
                      reviews={product.reviews}
                      productName={product.productName}
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
            <div className="flex">
              <h2 className="font-medium text-2xl mr-5">Reviews:</h2>
              <Button name="Add Review" background="blue"></Button>
            </div>
            <div className="my-10">
              {reviews && reviews.length > 0 ? (
                reviews.map((review: ReviewType) => (
                  <ReviewCard
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
      <Footer />
    </div>
  );
}

export default Page;
