'use client';
import React, { useEffect, useState } from 'react';
import request from '@/utils/axios';
interface Product {
  productName: string;
  productPrice: number;
  productCurrency: string;
}
interface Order {
  id: string;
  Product: Product;
  quantity: number;
  totalAmount: number;
  deliveryStatus: string;
}
function Order() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const getOrders = async () => {
    try {
      const response: any = await request.get('/orders');
      if (response && Array.isArray(response.orders)) {
        setOrders(response.orders);
      } else {
        setError('Invalid data format received');
      }
    } catch (err) {
      setError('Failed to fetch orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="w-full py-4">
          <h3 className="font-semibold text-primaryBlue"></h3>
        </div>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="bg-white shadow-md rounded-lg p-4 ">No orders</div>;
  }
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="w-full py-4">
        <h3 className="font-semibold text-primaryBlue">Orders</h3>
      </div>
      <div className="flex flex-col gap-4">
        {orders.length === 0 ? (
          <div className="text-center text-gray-500">
            Your orders will appear here
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="flex flex-col">
              <span className="text-secondaryBlue text-sm">
                {order.Product.productName}
              </span>
              <span className="text-greenMain text-xs opacity-65">
                {`${order.quantity} x ${order.Product.productPrice} ${order.Product.productCurrency} - ${order.deliveryStatus}`}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default Order;
