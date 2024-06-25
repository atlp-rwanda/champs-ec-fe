'use client';
import request from '@/utils/axios'; // Assuming request uses axios for HTTP requests
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductObj, ProductType, ReviewType } from '@/types/Product';
import Card from '@/components/Card';
// import { SkeletonProduct } from '@/components/Skeleton';
import { unstable_noStore as noStore } from 'next/cache';
import { SkeletonProduct } from '@/components/Skeleton';
import { storeAllProduct } from '@/redux/slices/userCartSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

interface ProdductProps {
  activeNav?: String;
}
const ProductList: React.FC<ProdductProps> = ({ activeNav }) => {
  const [activeButton, setActiveButton] = useState(1);

  const fetchUrl = (nav: string) => {
    switch (nav) {
      case 'All':
        return `/products?page=${activeButton}&limit=10`;
      case 'Electronics':
        return '/products/electronics?page=1&limit=10';
      case 'wishes':
        return `/wishes?page=${activeButton}&limit=10`;
      case 'Featured':
        return '/products/Featured?page=1&limit=10';
      case 'Featured':
        return '/products/Featured?page=1&limit=10';
      default:
        return `/products?page=${activeButton}&limit=10`;
    }
  };

  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useQuery<any>({
    queryKey: ['products', activeNav, activeButton],
    queryFn: async () => {
      noStore();
      const response: any = await request.get(fetchUrl(activeNav as string));

      let data;
      if (response.products) {
        data = response.products;
        dispatch(storeAllProduct(data));
        return data;
      } else if (response.data) {
        const allProduct: any = await request.get(`/products`);
        const filterdeArray = allProduct.products.filter((el1: any) =>
          response.data.some((el: any) => el1.id === el.product.id),
        );
        data = filterdeArray;
      }

      // const data = response.products;

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
  const buttonClass = (buttonName: number) =>
    `px-4 py-2  ${
      activeButton === buttonName
        ? 'flex bg-gray-400 text-blue-600 items-center justify-center px-3 h-8 leading-tight  border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
        : 'flex bg-white text-blue-600 items-center justify-center px-3 h-8 leading-tight  border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
    } focus:outline-none `;

  //button Next
  const setButoon = (event: number) => {
    setActiveButton(event);
  };

  //next Button
  const NextPage = () => {
    setActiveButton((prev) => (prev === 5 ? prev : prev + 1));
  };
  const PreviewPage = () => {
    setActiveButton((prev) => (prev === 1 ? prev : prev - 1));
  };
  if (isLoading) {
    return <div>{/* <SkeletonProduct /> */}</div>;
  }

  if (error) {
    <div data-testid="loading">
      <SkeletonProduct />
    </div>;
  }

  if (!data) {
    return <div>No products found.</div>;
  }

  return (
    <div className="mt-5  sm:pl-20 w-full flex content-center flex-col items-left justify-center ">
      {data && (
        <>
          <ul className="sm:ml-2 flex flex-row   items-center justify-center sm:justify-start max-w-[1400px] sm:px-6  gap-2 flex-wrap ">
            {data.map(
              (
                product: {
                  id: string;
                  productPrice: number;
                  productThumbnail: string;
                  productDescription: string;
                  productName: string;
                  reviews: ReviewType[];
                },
                i: number,
              ) => (
                <Card
                  key={i.toString()}
                  id={product.id}
                  productPrice={product.productPrice}
                  productThumbnail={product.productThumbnail}
                  productDescription={product.productDescription}
                  productName={product.productName}
                  reviews={product.reviews}
                />
              ),
            )}
          </ul>
        </>
      )}
      <nav aria-label="Page navigation example" className="mt-3">
        <ul className="w-full inline-flex -space-x-px text-sm justify-center">
          <li>
            <button
              onClick={PreviewPage}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            >
              Previous
            </button>
          </li>
          <li>
            <button onClick={() => setButoon(1)} className={buttonClass(1)}>
              1
            </button>
          </li>
          <li>
            <button onClick={() => setButoon(2)} className={buttonClass(2)}>
              2
            </button>
          </li>
          <li>
            <button onClick={() => setButoon(3)} className={buttonClass(3)}>
              3
            </button>
          </li>
          <li>
            <button onClick={() => setButoon(4)} className={buttonClass(4)}>
              4
            </button>
          </li>
          <li>
            <button onClick={() => setButoon(5)} className={buttonClass(5)}>
              5
            </button>
          </li>
          <li>
            <button
              onClick={NextPage}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;
