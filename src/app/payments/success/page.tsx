'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Button from '@/components/Button';
//import Modal from '@/components/ConfirmPayment';
import { useRouter } from 'next/router';
import request from '@/utils/axios';
import Link from 'next/link';
import OrdersOverlay from '@/hooks/ordersOverlay';
import SideBarOverlay from '@/components/UsableSideOvelay';
import OrdersContainer from '@/components/OrdersContainer';


const View: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const { isOrdersOverlayOpen, toggleOrdersSlider } = OrdersOverlay();
  const [overlayComponent, setOverlayComponent] = useState<
  'cart' | 'notification' | null
>(null);
  const handleCloseOverlay = () => {
    setOverlayComponent(null);
  };
  const [isTruckOrderStatusModalOpen, setIsTruckOrderStatusModalOpen] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const handleOpenTruckOrdePopup = (orderId: string) => {
    setOrderId(orderId);
    setIsTruckOrderStatusModalOpen(true);
 };




  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response: any = await request.get('/orders');
        console.log('RESPONSE', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      {/* <Header /> */}
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      {isOrdersOverlayOpen ? (
          <OrdersContainer
            isOrdersOverlayOpen={isOrdersOverlayOpen}
            toggleOrdersSlider={toggleOrdersSlider}
          />
        ) : (
          ''
        )}
        <div className="mx-auto max-w-2xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
            Thanks for your order!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
            You successfully purchased products at champs bay.
          </p>
          <div className="space-y-4 sm:space-y-2">
            <div className="order-details">
   
            </div>

            <div className="flex items-center space-x-4">
       
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                 onClick={toggleOrdersSlider}
                // handle={() => handleOpenTruckOrdePopup(row.row.original.id)}
              >
                View Order
              </button>
          

              <Link href='/'>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              
              >
                Return to Shopping
              </button>
              </Link>
            </div>
          </div>
        </div>
        {/* {isOrdersOverlayOpen ? (
          <OrdersContainer
            isOrdersOverlayOpen={isOrdersOverlayOpen}
            toggleOrdersSlider={toggleOrdersSlider}
          />
        ) : (
          ''
        )} */}
      </section>
 
   
      

    </>
    )
};

export default View;
