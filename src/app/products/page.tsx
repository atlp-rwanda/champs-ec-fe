'use client';
import React, { useState, useEffect, Suspense } from 'react';
import Side from '../../components/Side';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductList from '@/components/ProductList';
import { useSearchParams } from 'next/navigation';
import request from '@/utils/axios';

function SuspenseWrapper() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      const queryParams = new URLSearchParams(searchParams.toString());
      try {
        const response:any = await request.get(`/search?${queryParams.toString()}`);
        setSearchResults(response);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchParams]);

  return (
    <>
      <Header/>
      
      <div className="w-full h-[50%] flex flex-col px-10 py-5">
        <div className="w-full flex justify-between px-10">
          <h1>All Products</h1>
          <div className="flex self-end">
            <select name="" id="" className="border">
              <option value="popular">Popular</option>
              <option value="recent">Recent</option>
              <option value="clothes">Clothes</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
        </div>
        <div className="w-full flex mx-auto px-10">
          <Side />
          <ProductList searchResults={searchResults} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuspenseWrapper />
    </Suspense>
  );
}
