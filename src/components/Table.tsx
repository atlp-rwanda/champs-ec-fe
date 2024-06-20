'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import request from '@/utils/axios';
import { ProductType, ProductObj } from '@/types/Product';
import { Button, GreenButton } from "./Button"
const ProductsTable = () => {
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ['products'],
    queryFn: async () => {
      const response: ProductObj = await request.get(
        '/products?page=1&limit=10',
      );
      const data = response.products;
      return data;
    },
  });
  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error: {error.message}</span>;
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
        <thead className="text-xs text-gray-500 uppercase bg-gray-100 dark:text-gray-900">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Stock Level
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Discount
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((product:{
                    id: string;
                    productName: string;
                    stockLevel: string;
                    productCurrency: string;
                    productPrice: number;
                    productDiscount: number;
                  }, 
                  index: number) => (
            <tr
              key={product.id || index}
              className="odd:bg-white odd:dark:bg-white even:bg-white border-b dark:border-gray-200"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </th>
              <td className="px-6 py-4">{product.productName}</td>
              <td className="px-6 py-4">{product.stockLevel}</td>
              <td className="px-6 py-4">
                {product.productPrice} {product.productCurrency}
              </td>
              <td className="px-6 py-4">{product.productDiscount}</td>
              <td className="py-4">
                <Link href={`/sellers/products_/${product.id}`}>
                  <Button name="Details"/>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;