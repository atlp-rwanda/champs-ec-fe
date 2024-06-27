'use client';

import React, { useState } from 'react';
import type { RootState } from '@/redux/store';
import {
  IUSERCART,
  handleCartCount,
  handleChangeCartQuantity,
  handleRemoveAllCart,
  handleRemoveItemInCart,
} from '@/redux/slices/userCartSlice';
import trashImage from '../../public/delete.png';
import upAllow from '../../public/upperArrow.png';
import downAllow from '../../public/lowerArrow.png';
import backAllow from '../../public/cartAllow.png';
import shooes from '../../public/force.png';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '@/helpers/toast';
import Image from 'next/image';
import { handleCartInfoManipulation } from '@/hooks/userCart';
import { usePayments } from '@/hooks/payment';
import PopUpModels from './PopUpModels';

const URL = process.env.URL;

const CartContainer = (hideOverLay: any) => {
  const [itemNumber, setItemNumber] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [currentCartItem, setCurrentCartItem] = useState('');

  const { cart, error, loading, deleteCartLoading } = useAppSelector(
    (state: RootState) => state.userCartData,
  );

  const handleshow = hideOverLay;

  const dispatch = useAppDispatch();
  const allProduct = JSON.parse(localStorage.getItem('productItem') || '');
  const carts = handleCartInfoManipulation(cart as IUSERCART, allProduct);

  const deletesingleCartItem = (id: string) => {
    setCurrentCartItem(id);
    dispatch(handleRemoveItemInCart(id));
  };
  const {  handlePayment} = usePayments();

  const handleIncreaseCartItem = async (id: string) => {
    const updatedItems = carts;
    updatedItems.forEach((item: { product: string; quantity: number }) => {
      if (item.product === id) {
        const quantity = item.quantity + 1;
        const productId = item.product;
        dispatch(handleChangeCartQuantity({ quantity, productId }));
      }
    });
  };

  const handleDecreaseCartItem = async (id: string) => {
    const updatedItems = carts;
    updatedItems.forEach((item: { product: string; quantity: number }) => {
      if (item.product === id) {
        if (item.quantity > 1) {
          const quantity = item.quantity - 1;
          const productId = item.product;
          dispatch(handleChangeCartQuantity({ quantity, productId }));
        } else {
          showToast(
            "You are trying to make your Item quantity to be 0 ! if you don't want this product in cart please delete it it",
            'warning',
          );
        }
      }
    });
  };

  const decreaseCartMutation = useMutation({
    mutationFn: handleDecreaseCartItem,
    onSuccess: () => {},
  });

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string,
  ) => {
    const quantity = parseInt(e.target.value);
    if (!isNaN(quantity) || quantity > 0) {
      setItemNumber(Number(e.target.value));
      dispatch(handleChangeCartQuantity({ quantity, productId }));
    } else {
      setItemNumber(0);
    }

    //alert(productId)
  };

  const SetInputState = (quantity: number, productId: string) => {
    //alert(productId)
    setItemNumber(quantity);
    setIsChanging(true);
    setCurrentCartItem(productId);
  };
  const UnsetInputState = (quantity: number, productId: string) => {
    setItemNumber(quantity);
    setIsChanging(false);
    setCurrentCartItem(productId);
  };

  const RemoveAllCart = () => {
    dispatch(handleRemoveAllCart());
  };

  function formatNumber(cartPrice: number) {
    return cartPrice.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return (
    <div className="flex flex-col h-full justify-center w-full bg-[#F6F6F6] overflow-y-auto">
      <div className="flex gap-4 sm:mb-4  px-2 md:px-10">
        <Image
          src={backAllow}
          alt=""
          className="w-8 h-8"
          width={'4'}
          height={'4'}
          onClick={handleshow.hideOverLay}
        />
        <h3 className="w-full text-left font-semibold text-[#000] text-2xl">
          {' '}
          Shopping Cart
        </h3>
      </div>
      <hr className="border border-spacing-2 w-full mb-6" />
      <div className="text-white w-full mx-auto px-2 md:px-10 overflow-y-auto">
        {error && !cart ? (
          <div className="container h-[200px] flex justify-evenly rounded-lg shadow-lg p-2 mb-4 text-[#000000]">
            {`${error}`}
          </div>
        ) : (
          <>
            <p className="w-full text-left font-semibold text-[#000]">
              {`You have ${carts.length} item in your cart `}{' '}
            </p>
            {carts.map((prod, index: number) => (
              <div
                key={index}
                className="container bg-white w-full flex justify-evenly rounded-lg shadow-lg p-2 mb-4 text-[#000000]"
              >
                <div className="w-[70px] h-[80px] flex items-center justify-center">
                  <img
                    src={prod.thumbnail}
                    alt={'product image'}
                    width={'70'}
                    height={'80'}
                    onError={(e) => (e.currentTarget.src = '/product.png')}
                  />
                </div>
                <div className=" w-[100px] flex flex-col justify-center items-center overflow-hidden">
                  <span className="w-full flex h-full font-bold pb-3 justify-center items-center">
                    {prod.name}
                  </span>
                </div>
                <div
                  className={`w-[120px] h-[80px] flex items-center gap-4 justify-evenly`}
                >
                  {/* <h1>{prod.quantity}</h1> */}
                  <span
                    className="w-1/2"
                    onMouseEnter={() =>
                      SetInputState(prod.quantity, prod.product)
                    }
                    onMouseLeave={() => {
                      UnsetInputState(prod.quantity, prod.product);
                    }}
                  >
                    <input
                      key={prod.product}
                      type="text"
                      value={
                        isChanging && currentCartItem === prod.product
                          ? itemNumber
                          : prod.quantity
                      }
                      id={prod.product}
                      onChange={(e) => handleNumberChange(e, prod.product)}
                      className={`w-full p-1 ${isChanging && currentCartItem === prod.product ? 'border border-slate-700' : 'bg-white'}`}
                      disabled={
                        isChanging && currentCartItem === prod.product
                          ? false
                          : true
                      }
                    />
                  </span>
                  <div className="flex flex-col gap-2 w-1/2">
                    <Image
                      alt=""
                      src={upAllow}
                      className="w-4 h-3"
                      onClick={() => handleIncreaseCartItem(prod.product)}
                    />

                    <Image
                      alt=""
                      src={downAllow}
                      className="w-4 h-3"
                      onClick={() => decreaseCartMutation.mutate(prod.product)}
                    />
                  </div>
                </div>
                <div className="w-[70px] sm:w-[120px] h-[80px] flex items-center justify-center">
                  <h1>{formatNumber(prod.totalPrice as number)} RWF</h1>
                </div>
                <div
                  className="w-[50px] h-[80px] flex items-center justify-cente"
                  onClick={() => deletesingleCartItem(prod.product)}
                >
                  {deleteCartLoading && currentCartItem === prod.product ? (
                    <div className="border-t-4 border-b-4 border-blue-900 rounded-full w-4 h-4 animate-spin m-auto"></div>
                  ) : (
                    <button>
                      <Image
                        alt="delete"
                        src={trashImage}
                        className="w-6 h-6"
                      />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {carts && carts.length > 0 ? (
        <div className="w-full bottom-2 sm:max-w-full ">
          <div className="bg-[#E5E5E5] w-full h-30 flex flex-col items-end ">
            <div className="px-10 h-[60px] w-full flex justify-between font-semibold items-center">
              <span>Total Price</span>
              <span>{formatNumber(cart?.totalPrice as number)} RWF</span>
            </div>

            <div className="w-full flex items-end">
              {loading ? (
                <div className="border-t-4 border-b-4 border-blue-900 rounded-full w-6 h-6 animate-spin m-auto"></div>
              ) : (
                <button
                  className={`w-1/2 h-[40px] bg-primaryBlue  text-white flex justify-center items-center text-[20px] ${loading || carts.length == 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => {
                    RemoveAllCart();
                  }}
                >
                  Clear All
                </button>
              )}
       <button
        className={`w-1/2 h-[40px] bg-[#71C154] text-white flex justify-center items-center text-[20px] ${loading || carts.length === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={handlePayment}
        disabled={loading || carts.length === 0}
      >
        Place Order
      </button>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
   
    </div>
  );
};

export default CartContainer;
