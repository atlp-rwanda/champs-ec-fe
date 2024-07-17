'use client';
// pages/profile.tsx
import About from '@/components/profile/About';
import ActiveUser from '@/components/profile/ActiveUsers';
import Order from '@/components/profile/Order';
import ProfileHeader from '@/components/profile/ProfileHeader';
import Wishlist from '@/components/profile/wishlist';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import React from 'react';
const ProfilePage = () => {
  return (
    <div className="bg-gray-100 w-full flex flex-col items-center">
      <Header />
      <ProfileHeader />
      <div className="w-full max-w-7xl px-4 mt-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <About />
          </div>
          <div className="md:col-span-2 mb-4">
            <Wishlist />
          </div>
          <div className="md:col-span-1 flex flex-col gap-4 mb-4">
            <Order />

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default ProfilePage;
