'use client';
import request from '@/utils/axios';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductObj, ProductType } from '@/types/Product';
import Card from '@/components/Card';
import { SkeletonProduct } from '@/components/Skeleton';
import { unstable_noStore as noStore } from 'next/cache';

const ProductList = () => {
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ['products'],
    queryFn: async () => {
      noStore();
      const response: ProductObj = await request.get(
        `/products?page=${1}&limit=${10}`,
      );
      const data = response.products;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div data-testid="loading">
        <SkeletonProduct />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <>
      <div className="mt-5 pl-20 w-full">
        {data && (
          <>
            <ul className="ml-2 flex flex-row justify-between flex-wrap items-center">
              {data.map(
                (
                  product: {
                    id: string;
                    productPrice: number;
                    productThumbnail: string;
                    productDescription: string;
                  },
                  i: number,
                ) => (
                  <Card
                    key={i.toString()}
                    id={product.id}
                    productPrice={product.productPrice}
                    productThumbnail={product.productThumbnail}
                    productDescription={product.productDescription}
                  />
                ),
              )}
            </ul>
          </>
        )}
        <nav aria-label="Page navigation example" className="mt-3">
          <ul className="w-full inline-flex -space-x-px text-sm justify-center">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ProductList;
