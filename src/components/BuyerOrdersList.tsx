"use client"
import React, { useEffect, useState } from 'react';
import ReviewProduct from './ReviewProductPopup';
import { useQuery } from "@tanstack/react-query";
import requestAxios from '@/utils/axios';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { BackButton, ReviewButton } from './Button';
import TruckOrder from './TruckOrder';

type ordersTable = {
    No: number;
    id: string;
    productName: string;
    stockLevel: string;
    price: string;
    Product:{
        productName:string;
        stockLevel?:string;
        productPrice:number;
        productCurrency:string;
    }
}
type PaginationState = {
    pageIndex: number
    pageSize: number
}
const BuyerOrdersList = () => {
    const [isReviewProductModalOpen, setIsReviewProductModalOpen] = useState(false);
    const [isTruckOrderStatusModalOpen, setIsTruckOrderStatusModalOpen] = useState(false);
    const [productId, setProductId] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);
    const { isLoading, refetch, error, data } = useQuery<any>({
        queryKey: ['BuyerOrdersList'],
        queryFn: () => requestAxios.get('/orders'),
    });
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 7
      })
      var ordersData = data?.orders ?? [];
      const columns: ColumnDef<ordersTable>[] = [
        {
          header: 'No',
          accessorFn: (val: any, index: number) => index + 1,
          cell: (val: any) => <span> {val.getValue()}</span>
        },
        {
          header: 'Product Name',
          accessorFn: row => row.Product.productName,
          cell: (val: any) => <span> {val.getValue()} </span>
        },
         
        // {
        //   header: 'Stock Level',
        //   accessorFn: row => row.stockLevel,
        //   cell: (val: any) => <span> {val.getValue()}</span>
        // },
        {
          header: 'Price',
          accessorFn: row => row.Product.productPrice,
          cell: (row: any) => <>
            <span> {row.row.original.Product.productPrice}</span> <span>{ row.row.original.Product.productCurrency}</span>
          </>
        },
        {
          id: 'Action',
          header: () => <div className='text-center'>Action</div>,
          accessorFn: row => row.id,
          cell: (row: any) => (
            <div className='w-full flex justify-center gap-4 my-1.5 text-[15px]' >
                {row.row.original.isPaid ?
                    <ReviewButton
                        name= "Review"
                        handle={() => handleOpenReviewPopup(row.row.original.Product.id)}
                        className="btn-border-blue px-4 py-1 text-[13px]"
                    />
                    :
                    <ReviewButton
                        name="Pay Now"
                        className= "border-green px-3 py-1 text-[13px]"
                    />
                }
              <ReviewButton
                name="Details"
                handle={() => handleOpenTruckOrdePopup(row.row.original.id)}
                className="btn-bg-blue px-4 py-1.5 text-[13px]"
              />
            </div>
          )
        },
      ]
      const table = useReactTable({
        data: ordersData,
        columns,
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        state: {
          pagination
        }
    })
    const handleOpenTruckOrdePopup = (orderId: string) => {
       setOrderId(orderId);
       setIsTruckOrderStatusModalOpen(true);
    };

    const handleOpenReviewPopup  = (productId: string) => {
      setProductId(productId);
      setIsReviewProductModalOpen(true);
  };


    const handleClosePopup = () => {
        setIsReviewProductModalOpen(false);
        setProductId(null);
    };

  const handleCloseTruckOrderPopup=()=>{
       setOrderId(null);
       setIsTruckOrderStatusModalOpen(false);
  }
    return (
        <>
            <div className='w-[100%] block w-[100%]'>
                <span className='text-[20px] pb-5  px-3 block'> Orders</span>
                <div className='bg-white min-w-[100%] min-h-[100%] border rounded-b-lg rounded-[20px] py-4 px-2'>
                <>
                    <table className='text-black border-t-1 text-left w-[100%]  border-spacing-4'>
                      <thead className='text-[15px] h-[80px]'>
                        {table.getHeaderGroups().map(headerGroup =>
                        (<tr key={headerGroup.id}>
                          {
                            headerGroup.headers.map(header =>
                              <th key={header.id} className='border-b text-muted'>
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                              </th>
                            )
                          }
                        </tr>
                        ))}
                      </thead>
                      <tbody>
                        {table.getRowModel().rows.map(row => (
                          <tr key={row.id} className='border-b indent-0 text-[13px] py-6 w-full h-[50px]'>
                            {row.getVisibleCells().map(cell => (
                              <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className='flex gap-2 w-full justify-center mt-5 py-5 cursor-pointer'>
                      < div className='flex gap-3' >
                        <BackButton handle={() => table.previousPage()} isDisabled={!table.getCanPreviousPage()} />
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        < BackButton handle={() => table.nextPage()} isDisabled={!table.getCanNextPage()} rotate />
                      </div>
                    </div>
                  </>
                </div>
            </div >
            {isReviewProductModalOpen &&
                <ReviewProduct id={productId} isOpen={isReviewProductModalOpen} handleClose={handleClosePopup} refetch={refetch}/>
            }
            {isTruckOrderStatusModalOpen && 
            <TruckOrder id={orderId} isOpen={isTruckOrderStatusModalOpen} handleClose={handleCloseTruckOrderPopup}/>
          }
        </>
    );
};

export default BuyerOrdersList;
