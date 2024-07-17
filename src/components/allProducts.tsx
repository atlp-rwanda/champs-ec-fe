'use client';
import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import request from '@/utils/axios';

export const ProductWithFilter = () => {
  const [Value, setValue] = useState('');
  const [locarstorage, SetLocal] = useState(null);
  const [activeButton, setActiveButton] = useState('All');
  const [searchResults, setSearchResults] = useState([]);
  const [searched, setSearched] = useState(false); // New state for tracking if a search has been performed
  const router = useRouter();
  const Options = [
    { laber: 'All', value: 1 },
    { laber: 'wishes', value: 3 }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken: string | any = localStorage.getItem('profile');
      const ifuser = JSON.parse(storedToken);
      SetLocal(ifuser?.User?.Role.name as any);
    }
  }, []);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    setActiveButton(event.target.value);
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const buttonClass = (buttonName: string) =>
    `px-4 py-2  ${
      activeButton === buttonName ? 'bg-black text-white' : ''
    } focus:outline-none `;

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
      setSearched(true); // Set searched to true when a search is performed
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="w-full mb-10 flex justify-center items-center content-center">
      <div className="container mt-10 ">
        {/* Filter with search  */}
        <div className="flex sm:gap-5 mb-10 sm:ml-24 gap-1  ">
          {locarstorage === 'buyer' && (
            <>
              {/* <button
                className={buttonClass('Featured')}
                onClick={() => handleButtonClick('Featured')}
              >
                Shoes
              </button> */}
              <button
                className={buttonClass('wishes')}
                onClick={() => handleButtonClick('wishes')}
              >
                wishes
              </button>
              {/* <button
                className={buttonClass('Electronics')}
                onClick={() => handleButtonClick('Electronics')}
              >
                Cars
              </button> */}
            </>
          )}
          <button
            className={buttonClass('All')}
            onClick={() => handleButtonClick('All')}
          >
            All
          </button>
        </div>
        <div className="flex  justify-between gap-2  sm:ml-24 items-center">
          {locarstorage === 'buyer' && (
            <>
              <div className="ml-2 w-[40%] sm:px-5 sm:py-3 border-2 sm:m-2 flex gap-4 sm:w-[210px] items-center">
                <label htmlFor="" className="text-[9px] sm:text-sm ml-1">
                  {' '}
                  Sort By :
                </label>
                <select
                  id="sort"
                  onChange={handleSelect}
                  className="text-[10px] p-2 sm:text-sm"
                >
                  {Options &&
                    Options.map((el) => (
                      <option
                        className="sm:px-10 m-10 px-2 sm:text-sm text-[10px] "
                        key={el.value}
                        value={el.laber}
                      >
                        {el.laber}
                      </option>
                    ))}
                </select>
              </div>
            </>
          )}
          {/* Search  */}
          <form className="w-[50%] relative" onSubmit={handleSearch}>
            <div className="flex border-2 border-[#8F8F8F]">
              <input
                type="search"
                placeholder="Search Product ..."
                className="p-2 py-3 w-full border-none outline-none"
                value={Value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button type="submit" className="flex items-center justify-center p-2 bg-transparent text-[#8F8F8F]">
                <AiOutlineSearch size={24} />
              </button>
            </div>
          </form>
        </div>
        {/* Product Section */}
        <div className="sm:ml-5 sm:mt-20">
          {searched && searchResults.length === 0 ? (
            <p>No product found</p>
          ) : (
            <ProductList activeNav={activeButton} searchResults={searchResults} />
          )}
        </div>
      </div>
    </div>
  );
};
