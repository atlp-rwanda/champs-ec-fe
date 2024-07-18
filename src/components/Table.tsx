'use client';
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import request from '@/utils/axios';
import { ProductType, ProductObj } from '@/types/Product';
import { Button, GreenButton } from './Button';
import ConfirmDelete from './confirmDeletePopup';
interface Properties {
  Role: string;
}
const updateStatus = async ({
  id,
  status,
}: {
  id: string;
  status: boolean;
}) => {
  const newStatus = !status;
  await request.patch(`/products/${id}/status`, {
    isAvailable: newStatus,
  });
};

const ProductsTable: React.FC<Properties> = ({ Role }) => {
  const [Confirm, setConfirm] = useState(false);
  const queryClient = useQueryClient();
  const [id, setID] = useState<string>();

  const toggleConfirmPopup = (prodid?: String) => {
    console.log(prodid, 'Product id');
    setID(prodid as string);
    setConfirm(!Confirm);
  };

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

  const mutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleStatus = async (id: string, status: boolean) => {
    mutation.mutate({ id, status });
  };

  if (isLoading)
    return (
      <div className="min-h-screen w-full justify-center items-center flex">
        <div className="border-t-4 border-b-4 border-blue-600 rounded-full w-20 h-20 animate-spin m-auto"></div>
      </div>
    );
  if (error)
    return (
      <div className="w-full">
        {Role === 'seller' && (
          <div className="w-full">
            {' '}
            <Link href="/dashboard/product/create">
              <button className="bg-blue-500 p-3 px-5 text-white font-semibold cursor-pointer  hover:bg-blue-700 duration-200">
                Add New Product
              </button>
            </Link>
          </div>
        )}
        <div className="capitalize flex flex-col items-center w-full h-full font-bold text-gray-400 text-3xl">
          <img
            src="/empty.avif"
            alt="Not found"
            className="w-[140px] h-[50%]"
          />
          No Product Available
        </div>
      </div>
    );
  return (
    <>
      <div className=" overflow-x-auto shadow-md sm:rounded-lg sm:w-[80%] w-full">
        {Role === 'seller' && (
          <div className="w-full">
            {' '}
            <Link href="/dashboard/product/create">
              <button className="bg-blue-500 p-3 px-5 text-white font-semibold cursor-pointer  hover:bg-blue-700 duration-200">
                Add New Product
              </button>
            </Link>
          </div>
        )}
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
                View
              </th>
              {Role === 'seller' && (
                <>
                  {' '}
                  <th scope="col" className="px-6 py-3 ">
                    Delete
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Update
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data?.map(
              (
                product: {
                  id: string;
                  productName: string;
                  stockLevel: string;
                  productCurrency: string;
                  productPrice: number;
                  productDiscount: number;
                  isAvailable: boolean;
                },
                index: number,
              ) => (
                <tr
                  key={product.id || index}
                  className="odd:bg-white odd:dark:bg-white even:bg-white border-b dark:border-gray-200"
                >
                  <th
                    // scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{product.productName}</td>
                  <td className="px-6 py-4">{product.stockLevel}</td>
                  <td className="px-6 py-4">
                    {product.productPrice?.toLocaleString()}{' '}
                    {product.productCurrency}
                  </td>
                  <td className="px-6 py-4">{product.productDiscount}</td>
                  <td className="py-4">
                    <Link href={`/dashboard/product/${product.id}`}>
                      <button className="w-[90px] py-2 bg-blue-500 hover:bg-blue-600 text-white">
                        View
                      </button>
                    </Link>
                  </td>
                  {Role === 'seller' && (
                    <>
                      <td className="py-4">
                        <button
                          onClick={() => toggleConfirmPopup(product.id)}
                          className="w-[90px] py-2 bg-red-500 hover:bg-red-600 text-white"
                        >
                          Delete
                        </button>
                      </td>
                      <td className="py-2">
                        <Link href={`/dashboard/product/${product.id}/edit`}>
                          <button className="w-[90px] py-2 bg-gray-500 hover:bg-gray-600 text-white">
                            Update
                          </button>
                        </Link>
                      </td>
                      <td className="py-2">
                        <button
                          className={`w-[90px] py-2 cursor-pointer ${product.isAvailable ? ' bg-green-500 hover:bg-green-600' : ' bg-orange-500 hover:bg-orange-600 '} text-white`}
                          onClick={() =>
                            handleStatus(product.id, product.isAvailable)
                          }
                        >
                          {product.isAvailable ? 'available' : 'unvailble'}
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
      {Confirm ? (
        <ConfirmDelete
          isOpen={Confirm}
          productId={id as string}
          toggleConfirmPopup={toggleConfirmPopup}
          //  refetch={refetch}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default ProductsTable;
