'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Side from '../../components/Side';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductList from '@/components/ProductList';
import { useSearchParams } from 'next/navigation';
import request from '@/utils/axios';

function SuspenseWrapper() {
  const searchParams = useSearchParams();
  const [Value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false); // New state for tracking if a search has been performed

  useEffect(() => {
    const fetchSearchResults = async () => {
      const queryParams = new URLSearchParams(searchParams.toString());
      if (searchQuery) {
        queryParams.set('query', searchQuery);
      }
      try {
        const response: any = await request.get(`/search?${queryParams.toString()}`);
        setSearchResults(response);
        setSearched(true);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchParams, searchQuery]);

  const handleSearch = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Search query:", Value);

    try {
      let queryParams: any = {};
      const trimmedValue = Value.trim();
      const numericValue = parseFloat(trimmedValue);

      if (!isNaN(numericValue)) {
        queryParams.minPrice = numericValue;
      } else if (!isNaN(numericValue)) {
        queryParams.maxPrice = numericValue;
      } else if (!isNaN(numericValue)) {
        queryParams.minPrice = numericValue;
        queryParams.maxPrice = numericValue;
      } else if (trimmedValue.length > 0) {
        queryParams.name = Value;
      } else if (trimmedValue.length > 0) {
        queryParams.category = Value;
      }

      const queryString = new URLSearchParams(queryParams).toString();
      console.log(queryString);
      const url = `/search?${new URLSearchParams(queryParams).toString()}`;
      const response: any = await request.get(url);

      setSearchResults(response);
      setSearched(true); 
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="w-full flex flex-col px-4 py-5 sm:px-10 sm:py-5">
        <div className="w-full flex flex-col sm:flex-row justify-between px-4 sm:px-10">
          <h1 className="text-lg sm:text-2xl">All Products</h1>
          <div className="flex flex-col sm:flex-row self-end mt-4 sm:mt-0">
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative flex items-center border px-2 py-1">
                <input type="text" name="search" placeholder="Search products" className="border-none outline-none"
                  value={Value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <button type="submit" className="flex items-center justify-center bg-transparent text-[#8F8F8F] absolute right-2">
                  <AiOutlineSearch size={24} />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row mx-auto px-4 sm:px-10">
          <Side />
          <div className="flex flex-wrap w-full">
            {searched && searchResults.length === 0 ? (
              <p>No product found</p>
            ) : (
              <ProductList searchResults={searchResults} />
            )}
          </div>
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
