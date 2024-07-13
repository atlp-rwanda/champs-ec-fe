'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
// @ts-ignore
import ReactStars from 'react-rating-stars-component';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart } from 'react-icons/fa6';
import { useParams } from 'next/navigation';
import { Product } from '@/utils/requests';
import { ProductType, ReviewType, imageType } from '@/types/Product';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import { averageReviews } from '@/utils/averageReviews';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';
import { handleUserAddCart, IUSERCART } from '@/redux/slices/userCartSlice';
import { handleWishlistCount } from '@/redux/slices/wishlistSlice';
import request from '@/utils/axios';
import { showToast } from '@/helpers/toast';
import ReviewWrapper from '@/components/ReviewsWrapper';
//import StripeProvider from '@/components/StripeProvider';

function Page() {
  const { wishNumber } = useAppSelector(
    (state: RootState) => state.wishlist
  )
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [addProductToCart, setAddProductToCart]=useState(false)
  
  const {cart} = useAppSelector(
    (state: RootState) => state.userCartData,
  );

  const carts=cart as IUSERCART
  const { id } = useParams();
  const handleSwiper = (swiper: any) => {
    setThumbsSwiper(swiper);
  };
  const _id: string = id.toLocaleString();
  const { data, isLoading, error , refetch} = useQuery<any>({
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
  if (error) return <span>Error: {error.message}</span>;
  const {
    productPictures,
    productName,
    productPrice,
    productDescription,
    reviews,
  } = data?.product || {};
  const { relatedProducts } = data || {};
  const dispatch = useAppDispatch();
  const handleNewItem = () => {
    const productId = data.product.id;
    dispatch(handleUserAddCart({ productPrice, productId }));
  };
  const handleAddRemoveWish = async(event: { preventDefault: () => void; })=>{
    event.preventDefault();
    const response:any = await request.post('/wishes', { productId:id });
    if(response.status == 200 || response.status == 203){
      const { status } = response;
      dispatch(handleWishlistCount(status  == 200 ? await wishNumber + 1 : await wishNumber - 1));
      showToast(response.message, 'success')
    }
    console.log('this is response', response)
    
  }
  return (
    <div>
      {/* // <StripeProvider> */}
      <Header />
      <>
        {isLoading ? (
          <div className="min-h-screen w-full justify-center items-center flex">
            <div className="border-t-4 border-b-4 border-blue-600 rounded-full w-20 h-20 animate-spin m-auto"></div>
          </div>
        ) : (
          <div className="w-[100%] my-5">
            <div className="w-[100%] p-3 sm:w-[60%] m-auto">
              <div className="w-[100%] gap-0 sm:gap-8 flex-col sm:flex-row flex">
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
                            onError={(e) =>
                              (e.currentTarget.src = '/product.png')
                            }
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
                <div className="w-full">
                  <div>
                    <h1 className="font-bold mt-5 text-2xl capitalize">
                      {productName}
                    </h1>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2 mt-5">
                      <div className="p-3 rounded-full bg-gray-200 hover:bg-green-500 hover:text-white cursor-pointer" onClick={handleAddRemoveWish}>
                        <FaRegHeart />
                      </div>
                      <div className={`p-3 rounded-full  hover:bg-green-500 hover:text-white cursor-pointer  '${(addProductToCart || carts.product.some(item => item.product ===data.product.id)) ?' bg-red-500 pointer-events-none':'pointer-events-auto bg-gray-200'}`}>
                        <MdOutlineShoppingCart
                        
                          onClick={() => {
                            handleNewItem();
                          }}
                        />
                      </div>
                    </div>
                    <span className="font-medium text-2xl text-green-400 mt-2">
                      <span className="font-bold text-3xl">
                        {productPrice.toLocaleString()}
                      </span>{' '}
                      RWF
                    </span>
                  </div>
                  <div className="block mt-2">
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
                </div>
              </div>
              <div className="w-[100%] sm:w-[100%] mt-[50px]">
                <h2 className="font-bold text-2xl">Related products:</h2>
                <div className="flex gap-3 mt-5 overflow-x-scroll hide-scrollbar">
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
              <div className="w-full flex flex-col mt-10">
              <ReviewWrapper productId={_id.trim()} refetch={refetch} reviews={reviews} />
              </div>
            </div>
           
          </div>
        )}
      </>
      <Footer />
      {/* </StripeProvider> */}
    </div>
  );
}
export default Page;