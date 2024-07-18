'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Chart } from 'react-google-charts';
import { unstable_noStore as noStore } from 'next/cache';
import { useMutation, useQuery } from '@tanstack/react-query';
import request from '@/utils/axios';

import { toast } from 'react-toastify';
import { showToast } from '@/helpers/toast';

interface Params {
  user: any;
  data: any;
  categories: any;
  users: any;
}
export const options = {
  title: '',
};
const Chartssection: React.FC<Params> = ({ user, data, categories, users }) => {
  const ProductCategory = useRef<HTMLInputElement>(null);
  const data1 = [
    ['Task', 'Hours per Day'],
    [
      'availableProducts',
      data?.availableProducts >= 1 ? data?.availableProducts : 0,
    ],
    ['expiredProducts', data?.expiredProducts >= 1 ? data?.expiredProducts : 0],
    ['wishesStats', data?.wishesStats >= 1 ? data?.wishesStats : 0],
    ['productsStats', data?.productsStats >= 1 ? data?.productsStats : 0],
  ];

  const mutation = useMutation({
    mutationFn: (product_categories: string) => {
      return request.post(`/categories`, { categoryName: product_categories });
    },
    onError: (error: any) => {
      showToast(error.response.data.error, 'error');
    },

    onSuccess: async (result: any) => {
      window.location.reload();
    },

    onSettled: (result, error) => {
      showToast(error.response.data.message, 'error');
    },
  });

  const handleAddCategory = async () => {
    const product_categories = ProductCategory.current?.value as string;
    if (product_categories.length > 2) {
      await mutation.mutate(product_categories);
    } else {
      showToast(
        'Product category must be atleast 3 characters length',
        'error',
      );
    }
    //alert(product_categories)
  };

  return (
    <div className="flex gap-7 sm:w-[80%] h-full sm:flex-row flex-col w-full sm:justify-start sm:items-start justify-center items-center ">
      {user && user?.Role?.name === 'seller' ? (
        <div className="sm:w-[50%] w-[90%] border-[1px] p-2 px-4">
          <h1 className="font-semibold text-1xl">Seller statistics</h1>
          <Chart
            chartType="PieChart"
            data={data1}
            options={options}
            width={'90%'}
            height={'260px'}
          />
        </div>
      ) : (
        <div className="sm:w-[50%] w-[90%] border-[1px] p-2">
          <h1 className="font-bold text-1xl text-left mx-4 w-full mb-3">
            All Markert Users
          </h1>
          <div className=" sm:w-[90%] w-[100%] p-2 rounded-sm overflow-auto h-[250px]">
            <ul className="flex flex-col gap-3">
              {users &&
                users?.map((el: any) => (
                  <>
                    <li className="border-pink-300 border p-5" key={el.id}>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <div className="flex gap-2 ">
                            <h1 className="text-blue-500 font-bold p-0 m-0 ">
                              Names :
                            </h1>
                            <p className="p-0 m-0">{el.firstName}</p>
                          </div>
                          <div className="flex gap-2 ">
                            <h1 className="text-blue-500 font-bold p-0 m-0 ">
                              email :
                            </h1>
                            <p className="p-0 pl-4 m-0">{el.email}</p>
                          </div>
                        </div>
                        <div className="w-[30px] sm:block hidden">
                          <img
                            src={el.profileImage}
                            alt=""
                            className="w-[30px] h-[30px]  rounded-lg border "
                          />
                        </div>
                      </div>
                    </li>
                  </>
                ))}
            </ul>
          </div>
        </div>
      )}
      <div className="sm:w-[50%] w-[90%] border-[1px] h-[300px]  ">
        <div className="w-full flex justify-center mx-4 mt-2 items-center flex-col ">
          <h1 className="font-semibold text-1xl text-left mx-4 w-full mb-3">
            All Categolie On Market
          </h1>
          {user && user?.Role?.name === 'admin' && (
            <div className=" flex flex-col min-w-[80%] md:min-w-[80%] md:w-[80%] md:flex-row items-center justify-evenly py-2 mb-2 gap-4">
              <input
                className=" w-[100%] md:w-[70%] h-12  shadow-lg border border-slate-500"
                ref={ProductCategory}
              />
              <button
                className="sm:min-w-[30%] min-w-[100%] h-12 bg-primaryBlue px-4 text-white text-sm"
                onClick={handleAddCategory}
              >
                Add Category
              </button>
            </div>
          )}

          <div className=" w-[80%] p-2 rounded-sm overflow-auto h-[150px]">
            <ul className="flex flex-col gap-3">
              {categories &&
                categories?.map((el: any) => (
                  <>
                    <li className="bg-gray-100 p-5" key={el.id}>
                      <div className="flex gap-2 ">
                        <h1 className="text-blue-500 font-bold p-0 m-0 ">
                          Names :
                        </h1>
                        <p className="p-0 m-0">{el.categoryName}</p>
                      </div>
                    </li>
                  </>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chartssection;
