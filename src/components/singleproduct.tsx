'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa6';
import { useParams, useRouter } from 'next/navigation';
import { Product } from '@/utils/requests';
import { useQuery } from '@tanstack/react-query';
import { ProductType, imageType } from '@/types/Product';
//@ts-ignore
import ReactStars from 'react-rating-stars-component';
import { BlueBorderButton, DeleteButton } from '@/components/Button';
import { averageReviews } from '@/utils/averageReviews';
import request from '@/utils/axios';
import ConfirmDelete from './confirmDeletePopup';
import Link from 'next/link';
import ReviewCard from './ReviewCard';
interface Properties {
  role: any;
}
const Singleproduct: React.FC<Properties> = ({ role }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [Confirm, setConfirm] = useState(false);
  const { id } = useParams();
  const [user, setUser] = useState<any>();
  const router = useRouter();
  useEffect(() => {
    const categ = async () => {
      const responsecat: any = await request.get('/categories');
      const user = localStorage.getItem('profile') || 'no';
      const finalUser = JSON.parse(user);
      setUser(finalUser.User);
    };
    categ();
  }, []);
  const toggleConfirmPopup = (prodid?: String) => {
    setConfirm(!Confirm);
  };
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

  if (error)
    return (
      <div className="capitalize flex flex-col items-center w-full h-full font-bold text-gray-400 text-3xl">
        <img src="/empty.avif" alt="Not found" className="w-[140px] h-[50%]" />
        Error Happening 💀
      </div>
    );
  const handleSwiper = (swiper: any) => {
    setThumbsSwiper(swiper);
  };
  const {
    productPictures,
    productName,
    productPrice,
    productDescription,
    reviews,
  } = data?.product || {};
  if (isLoading)
    return (
      <div className="min-h-screen w-full justify-center items-center flex">
        <div className="border-t-4 border-b-4 border-blue-600 rounded-full w-20 h-20 animate-spin m-auto"></div>
      </div>
    );
  return (
    <>
      <div className=" sm:mb-5 mb-10 mt-5 flex flex-col justify-start  w-[80%] sm:max-w-[1000px] items-start">
        <div className="w-full  flex flex-col justify-center  items-center gap-5">
          <div className="w-full flex sm:flex-row flex-col ">
            <div className="w-[100%] sm:w-1/2">
              <div className="flex justify-center py-2 ">
                <Swiper
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="rounded-lg min-w-[100%] box-border "
                >
                  {[
                    ...(!productPictures?.length
                      ? [
                          {
                            imgId: 'fail Image',
                            url: '/product.png',
                          },
                        ]
                      : productPictures),
                  ].map((image: imageType) => (
                    <SwiperSlide
                      key={image.imgId}
                      className="w-[100%] rounded-lg shadow-lg"
                    >
                      <img
                        src={image.url}
                        alt="image"
                        className="h-[400px] object-cover  min-w-[100%]"
                        onError={(e) => (e.currentTarget.src = '/product.png')}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="w-full flex space-x-4 justify-start mt-3">
                {productPictures && productPictures.length > 0 ? (
                  <div className="w-[100%] h-[5em] flex ">
                    <Swiper
                      onSwiper={handleSwiper}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className=" min-w-[100%] max-h-[100px] mySwiper4"
                    >
                      {productPictures.map((image: imageType) => (
                        <SwiperSlide
                          key={image.imgId}
                          className="opacity-[0.4]"
                        >
                          <img
                            src={image.url}
                            alt="image"
                            className="h-[100%] text-left rounded-lg object-cover w-[100%]"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                ) : (
                  <p className="text-red-500 capitalize">no image found!</p>
                )}
              </div>
            </div>
            <div className="sm:ml-10 ml-0 flex flex-col gap-5">
              <div>
                <h1 className="font-bold mt-5 text-2xl capitalize-first">
                  {productName}
                </h1>
              </div>
              <div className="flex flex-col gap-2">
                {role === 'buyer' && (
                  <div className="flex gap-2">
                    <div className="p-3 rounded-full bg-gray-200 hover:bg-green-500 hover:text-white cursor-pointer">
                      <FaRegHeart />
                    </div>
                    <div className="p-3 rounded-full bg-gray-200 hover:bg-green-500 hover:text-white cursor-pointer">
                      <MdOutlineShoppingCart />
                    </div>
                  </div>
                )}
                <span className="font-medium text-2xl text-green-400 mt-2">
                  <span className="font-bold text-3xl">
                    {productPrice?.toLocaleString()}
                  </span>{' '}
                  RWF
                </span>
              </div>
              <div className="block">
                <ReactStars
                  count={5}
                  value={averageReviews(reviews)}
                  isHalf={true}
                  size={30}
                  activeColor="#FFD700"
                  edit={false}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-2xl mt-2">Description:</h2>
                <p className="w-full text-1xl">{productDescription}</p>
              </div>
              {role === 'seller' && (
                <div className="flex space-x-5 gap-3">
                  <Link href={`/dashboard/product/${id}/edit`}>
                    <BlueBorderButton
                      name="Edit"
                      className="border border-blue-500 px-12 hover:bg-blue-500 hover:text-white py-2"
                    />
                  </Link>
                  <DeleteButton name="Delete" handle={toggleConfirmPopup} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {Confirm ? (
        <ConfirmDelete
          isOpen={Confirm}
          productId={id as string}
          toggleConfirmPopup={toggleConfirmPopup}
        />
      ) : (
        ''
      )}
      <div className="w-[100%] sm:w-[50%] px-9 pb-4 sm:px-0 flex flex-col sm:mt-5 mb-7">
        <h2 className="font-medium text-2xl mr-5">Reviews:</h2>
        <div className="my-5 mb-5">
          {reviews && reviews.length > 0 ? (
            reviews.map((review: any) => (
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
      </div>{' '}
    </>
  );
};
export default Singleproduct;
