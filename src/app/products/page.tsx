'use client';
import React from 'react';
import Side from '../../components/Side';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductList from '@/components/ProductList';
import { checkIsAdmin } from '@/components/isAdmin';


function Page() {
  // const isAdmin = checkIsAdmin();
  
  // if (isAdmin) { 
  //   console.log('User is an admin!');
  // } else {
  //   console.log('User is not an admin.');
  // }

  return (
    <>
      <Header/>
      
      <div className="w-full h-[50%] flex flex-col px-10 py-5">
        <div className="w-full flex justify-between px-10">
          <h1>All Products</h1>
          <div className="flex self-end">
            <select name="" id="" className="border">
              <option value="volvo">Popular</option>
              <option value="saab">Recent</option>
              <option value="opel">Clothes</option>
              <option value="audi">Electronics</option>
            </select>
          </div>
        </div>
        <div className="w-full flex mx-auto px-10">
          <Side />
          <ProductList />
        </div>
      </div>
      <Footer />
     
    </>
  );
}

export default Page;
