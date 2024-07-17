'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Updatepassword } from '@/validations/Updatepassword';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import { LatestSection } from '@/components/LatestSection';
import Footer from '@/components/Footer';

import { HomeAds } from '@/components/HomeAds';

import { ProductWithFilter } from '@/components/allProducts';
import ChatPopUp from '@/hooks/ChatPopUp';
import ChatWrapper from '@/components/chatWrapper';
import Link from 'next/link';
import { MdOutlineChat } from 'react-icons/md';
import { checkUserLoggedIn } from '@/components/isLogged';

export interface FormDataType {
  confirmPassword: string;
  newPassword: string;
  oldPassword: string;
}

export default function Home() {
  const { isChatPopUpOpen, setIsChatPopUpOpen, toggleChatPopUp } = ChatPopUp();
  const [showlModal, setShowmodal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormDataType>({
    resolver: zodResolver(Updatepassword),
  });

  //Hooks

  const handleshow = () => {
    setShowmodal(!showlModal);
    reset();
  };

  return (
    <div className="sm:flex sm:justify-center sm:items-center sm:flex-col">
      <Header />
      <HeroSection />
      <main className="flex   flex-col items-center justify-between "></main>

      {/* The Image adds */}
      <HomeAds />
      {/* LAtest Product */}
      <LatestSection />
      {/* Product with Filter  */}
      <ProductWithFilter />
      {/* Ads with button  */}
      <div className="w-full  p-10 rounded-md sm:w-[90%] flex max-w-[1620px] mt-10 shadow-md px-10  content-center mb-20  bg-green-400 justify-center items-center">
        <div className="sm:w-[80%] w-full flex justify-between items-center ">
          <p className="font-semibold text-black/80 w-[50%]  sm:text-3xl">
            Get 25% off with our sponsor promo code
          </p>
          <Link href="/products">
            <button className="bg-white h-11 text-secondaryBlue border-secondaryBlue border-2 px-4 justify-center items-center flex hover:bg-secondaryBlue hover:text-white">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
      {/* Startttttttt */}
      <div className="absolute right-5 w-full flex justify-end items-end">
        {checkUserLoggedIn() && (
          <div className="fixed bottom-5 right-0 z-10 p-4 bg-green-300 rounded-full">
            <MdOutlineChat
              className="text-4xl cursor-pointer z-20"
              onClick={toggleChatPopUp}
            />
          </div>
        )}
        <div
          className={`${isChatPopUpOpen ? 'block fixed bottom-24' : 'hidden'} h-[30rem] w-full max-w-[20%]`}
        >
          {isChatPopUpOpen && (
            // <ChatRoomsList chatrooms= {chatrooms} currentUser = {currentUser as string}/>
            <ChatWrapper />
          )}
        </div>
      </div>
      {/* Enddddddddd */}
      {/* Footer Sections  */}
      <Footer />
    </div>
  );
}
