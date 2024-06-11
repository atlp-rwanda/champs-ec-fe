'use client';
import React, { useState, useEffect, useRef } from 'react';
import ProductList from './ProductList';

export const ProductWithFilter = () => {
  const [Value, setValue] = useState('');
  const [locarstorage, SetLocal] = useState(null);
  const [activeButton, setActiveButton] = useState('All');
  const Options = [
    { laber: 'All', value: 1 },
    { laber: 'Rating', value: 2 },
    { laber: 'wishes', value: 3 },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      SetLocal(storedToken as any);
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

  return (
    <div className="w-full mb-10">
      <div className="container mt-10">
        {/* Filter with search  */}
        <div className="flex sm:gap-5 mb-10 sm:ml-24 gap-1 ">
          {locarstorage && (
            <>
              <button
                className={buttonClass('Featured')}
                onClick={() => handleButtonClick('Featured')}
              >
                Featured
              </button>
              <button
                className={buttonClass('wishes')}
                onClick={() => handleButtonClick('wishes')}
              >
                wishes
              </button>
              <button
                className={buttonClass('Electronics')}
                onClick={() => handleButtonClick('Electronics')}
              >
                Electronics
              </button>
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
          {locarstorage && (
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
          <div className="sm:w-[50%] w-[70%] relative ">
            <input
              type="text"
              placeholder="Search Product ..."
              className="p-2 py-3 border-2 sm:w-[60%] w-[80%] h-[35px] sm:h-[50px] relative "
            />
            <div className="absolute top-2 left-80 hover:cursor-pointer hidden sm:block">
              <img src="./Search.svg" alt="" className="w-[30px] " />
            </div>
          </div>
        </div>
        {/* Product Section */}
        <div className="sm:ml-5 sm:mt-20">
          <ProductList activeNav={activeButton} />
        </div>
      </div>
    </div>
  );
};
