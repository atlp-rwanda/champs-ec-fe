import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { CloseButton } from './Button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { unstable_noStore as noStore } from 'next/cache';
import request from '@/utils/axios';
interface ReviewProductInterface {
  isOpen: boolean;
  id: string | null;
  handleClose: () => void;
}
const SellerOrderDetail: React.FC<any> = ({ id, isOpen, handleClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState('');
  useEffect(() => {
    refetch();
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const { isLoading, refetch, error, data } = useQuery<any>({
    queryKey: ['SellerOrdersDetails'],
    queryFn: async () => {
      noStore();
      const response = request.get(`/orders/${id}`);
      return response;
    },
  });

  const handleOrderStatus = useMutation({
    mutationFn: ({ status, id }: { status: string; id: string }) => {
      return request.post(`/orders/${id}/status`, { status });
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdate = (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as string;
    handleOrderStatus.mutate({ status, id });
    setStatus(status);
  };

  let orderData: any;
  if (data) {
    orderData = data.orders;
    localStorage.setItem('order', JSON.stringify(data));
  }

  function formatNumber(cartPrice: number) {
    return cartPrice.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const extractDateTime = (dateTimeString: string) => {
    const dateObj = new Date(dateTimeString);
    const date = dateObj.toISOString().split('T')[0];
    const time = dateObj.toTimeString().split(' ')[0];
    const newDate = date + ' ' + time;
    return newDate;
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => e.stopPropagation()}
      className="z-50 bg-white backdrop-filter backdrop-brightness-75 rounded shadow-lg w-[95%] md:w-[70%] lg:w-[50%] py-6 px-4  mx-auto ]"
    >
      <div className="w-full flex px-5">
        <span className="w-1/2 flex items-center">
          <span className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
            <img src="../../Vector.png" className="w-3 h-5" />
          </span>
          <h1 className="px-3 font-bold text-[25px]">Orders</h1>
        </span>
        <span className="flex  w-1/2 items-end justify-end">
          <CloseButton background="primaryBlue" handle={handleClose} />
        </span>
      </div>

      {isLoading ? (
        <div className="border-t-4 border-b-4 border-blue-900 rounded-full w-6 h-6 animate-spin m-auto"></div>
      ) : (
        <>
          <div>
            {handleOrderStatus.isPending ? (
              ''
            ) : (
              <div className="w-full flex px-5 border-b-2 border-blue-500 pb-4">
                <div className="w-1/2  mt-5">
                  <h1 className="text-[20px] mt-5">
                    By{' '}
                    <span className="font-bold">
                      {orderData.buyer.firstName} {orderData.buyer.lastName}
                    </span>{' '}
                    from{' '}
                    <span className="font-bold">
                      {orderData.buyer.billingAddress}
                    </span>
                  </h1>
                </div>

                <div className="w-1/2 items-end flex justify-center">
                  <select
                    className="capitalize focus:outline-none border border-blue-500 text-center text-black shadow outline-none text-[15px]  font-medium  focus:ring-black
              focus:border-black w-[15vh] p-[5px] cursor-pointer rounded-md py-1.5"
                    onChange={handleUpdate}
                    value={orderData.deliveryStatus}
                  >
                    <option
                      key={'Pending'}
                      value={'Pending'}
                      className="option capitalize w-[120px] h-[30px] bg-primaryGrey focus:bg-primaryGrey text-black px-3 py-2"
                    >
                      <span>Pending</span>
                    </option>
                    <option
                      key={'Shipped'}
                      value={'Shipped'}
                      className="option capitalize h-[30px] bg-primaryGrey focus:bg-primaryGrey text-black px-3 py-2"
                    >
                      <span>Shipped</span>
                    </option>
                    <option
                      key={'Delivered'}
                      value={'Delivered'}
                      className="option capitalize h-[30px] bg-primaryGrey focus:bg-primaryGrey text-black px-3 py-2"
                    >
                      <span>Delivered</span>
                    </option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="block py-10 px-5">
            {/* --------------------------------------product details start here --------------------------------------------------------------------------- */}
            <h3 className="w-full font-bold pb-4">PRODUCT DETAILS</h3>
            <div className="w-full flex">
              <div className="w-full flex flex-col">
                <span className="text-[14px] pb-2">Item</span>
                <span className=" font-medium text-[14px]">
                  {orderData && orderData.Product.productName}
                </span>
              </div>

              <div className="w-full flex flex-col">
                <span className="text-[14px] pb-2">QTY</span>
                <span className=" font-medium text-[14px]">
                  {orderData && orderData.quantity}
                </span>
              </div>
              <div className="w-full flex flex-col">
                <span className="text-[14px] pb-2">Unit Price</span>
                <span className=" font-medium text-[14px]">
                  {orderData && formatNumber(orderData.Product.productPrice)}{' '}
                  RWF
                </span>
              </div>
              <div className="w-full flex flex-col">
                <span className="text-[14px] pb-2">Total Price</span>
                <span className=" font-medium text-[14px]">
                  {orderData && formatNumber(orderData.totalAmount)} RWF
                </span>
              </div>
            </div>
            {/* --------------------------------------payment details start here --------------------------------------------------------------------------- */}
            <h3 className="w-full font-bold mt-10 pb-4">PAYMENT DETAILS</h3>
            <div className="w-full flex">
              <div className="w-full flex flex-col">
                <span className="text-[14px] pb-2">Name on Card</span>
                <span className=" font-medium text-[14px]">
                  {orderData.buyer.firstName} {orderData.buyer.lastName}
                </span>
              </div>

              <div className="w-full flex flex-col">
                <span className="text-[14px] pb-2">Amount</span>
                <span className=" font-medium text-[14px]">
                  {orderData && formatNumber(orderData.totalAmount)} RWF
                </span>
              </div>
              <div className="w-full flex flex-col">
                <span className="text-[14px] pb-2">Date</span>
                <span className=" font-medium text-[14px]">
                  {orderData && extractDateTime(orderData.createdAt)}
                </span>
              </div>
              <div className="w-full flex flex-col">
                <span className="text-[14px] pb-2">Payment status</span>
                <span className=" font-medium text-[14px]">
                  {orderData && orderData.isPaid ? 'Paid' : 'not paid'}
                </span>
              </div>
            </div>
            {/* --------------------------------------order details start here --------------------------------------------------------------------------- */}
            <h3 className="w-full font-bold mt-12 pb-4">DELIVERY DETAILS</h3>
            <div className="w-full flex">
              <div className="w-1/3 flex flex-col">
                <span className="text-[14px] pb-2 font-medium">Seller</span>
                <span className="text-[14px] pb-1">
                  {orderData.Product.seller.firstName}{' '}
                  {orderData.Product.seller.lastName}
                </span>
                <span className="text-[14px] pb-1 w-full break-all">
                  {orderData.Product.seller.email}
                </span>
                <span className="text-[14px] pb-1">
                  {orderData.Product.seller.phone}
                </span>
                <span className=" text-[14px] pb-1">
                  {orderData.Product.seller.billingAddress}
                </span>
              </div>

              <div className="w-1/3 flex flex-col items-center ">
                <img
                  alt="delivery"
                  src={orderData.Product.productThumbnail}
                  className="w-[50%]"
                />
              </div>

              <div className="w-1/3 flex flex-col px-4 mx-auto break-all">
                <span className="text-[14px] pb-2 font-medium">Buyer</span>
                <span className="text-[14px] pb-1 text-wrap">
                  {orderData.buyer.firstName} {orderData.buyer.lastName}
                </span>
                <span className="text-[14px] pb-1">
                  {orderData.buyer.email}
                </span>
                <span className="text-[14px] pb-1">
                  {orderData.buyer.phone}
                </span>
                <span className=" text-[14px] pb-1">
                  {orderData.buyer.billingAddress}
                </span>
              </div>
            </div>
            <div className="w-full flex items-center">
              <div className="w-1/3 flex flex-col">
                <div className="flex flex-col pt-4">
                  <span className=" font-medium text-[14px]">Shipped Date</span>
                  <span className="text-[14px]">
                    {orderData && extractDateTime(orderData.createdAt)}
                  </span>
                </div>
              </div>

              <div className="w-1/3 flex flex-col items-center ">
                <span className=" font-medium text-[20px] text-green-400">
                  Status: {orderData && orderData.deliveryStatus}
                </span>
              </div>

              <div className="w-1/3 flex flex-col px-4 mx-auto">
                <div className="flex flex-col pt-4">
                  <span className="text-[14px] font-semibold">
                    Expected Delivery
                  </span>
                  <span className="text-[14px]">
                    {orderData && extractDateTime(orderData.deliveryDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
};

export default SellerOrderDetail;
