'use client';
import React, { useEffect, useState } from 'react';
import { VscTag } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getUserProfile } from '@/redux/slices/profileSlice';
import request from '@/utils/axios';
import { Cylinder, Trash, Loader } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
interface Product {
  id: string;
  productThumbnail: string;
  stockLevel: number;
  productName: string;
  productPrice: number;
  productCurrency: string;
}
interface Wish {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  product: Product;
}
const WishlistSkeleton = () => (
  <div className="bg-white shadow-md rounded-lg">
    <div className="w-full pl-16 py-4 border-b mb-4">
      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
    </div>
    <div className="animate-pulse space-y-8 px-16">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex flex-col space-y-4 border-b pb-4">
          <div className="flex justify-between w-full items-center">
            <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
          </div>
          <div className="w-full aspect-video bg-gray-200 rounded-md"></div>
          <div className="w-full flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="flex gap-8">
              <div className="h-6 bg-gray-200 rounded w-16"></div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
const Wishlist: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.userProfile,
  );
  const [wishlist, setWishlist] = useState<Wish[]>([]);
  const [loadingWishId, setLoadingWishId] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserProfile());
      } catch (err) {
        console.error('Error fetching user profile:', err);
      }
    };
    fetchData();
  }, [dispatch]);
  const getWishlist = async () => {
    try {
      const response: any = await request.get('/wishes');
      setWishlist(response.wishes);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getWishlist();
  }, []);
  const removeWish = async (wishId: string) => {
    setLoadingWishId(wishId);
    try {
      await request.post('/wishes', { productId: wishId });
      toast.success('Wishlist item removed successfully');
      getWishlist();
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove wishlist item');
    } finally {
      setLoadingWishId(null);
    }
  };
  if (error) return <div>Error: {error}</div>;
  if (!user || loading) return <WishlistSkeleton />;
  return (
    <div className="bg-white shadow-md rounded-lg">
      <div className="w-full pl-16 py-4 border-b mb-4">
        <h3 className="font-semibold text-primaryBlue">Wished Products</h3>
      </div>
      <div className="flex flex-col gap-8 px-16">
        {wishlist?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Your wishlist will appear here
          </div>
        ) : (
          wishlist?.map((wish) => (
            <div
              key={wish.id}
              className="flex flex-col items-center gap-4 border-b pb-4"
            >
              <div className="flex justify-between w-full items-center">
                <button
                  onClick={() => removeWish(wish.productId)}
                  className="text-red-500 text-2xl font-semibold"
                  disabled={loadingWishId === wish.productId}
                >
                  {loadingWishId === wish.productId ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <Trash />
                  )}
                </button>
              </div>
              <div className="w-full aspect-video rounded-md overflow-hidden">
                <Link href={`/products/${wish.product.id}`}>
                  <img
                    src={wish.product.productThumbnail}
                    alt={wish.product.productName}
                    className="w-full h-full object-contain"
                  />
                </Link>
              </div>
              <div className="w-full text-blue-900 flex justify-between items-center text-sm">
                <span className="font-semibold text-lg">
                  {wish.product.productName}
                </span>
                <div className="flex gap-8">
                  <div className="flex items-center gap-1">
                    <Cylinder className="text-2xl text-green-500" />
                    <span className="text-secondaryBlue">
                      {wish.product.stockLevel}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <VscTag className="text-2xl text-green-500" />
                    <span className="text-secondaryBlue">
                      {wish.product.productPrice} {wish.product.productCurrency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
export default Wishlist;
