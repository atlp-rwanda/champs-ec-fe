"use client"
import React, { useState } from 'react';
import { BackButton, DisableButton, ReviewButton } from '@/components/Button';
import requestAxios from '@/utils/axios';
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ProductType } from '@/types/Product';
import SellerOrderDetail from './SellerOrderDetail';


type usersTable = {
  No: number,
  id: string,
  Product:ProductType,
  buyer:{firstName:string,lastName:string}
  quantity: string,
  totalAmount: string,
  deliveryDate: string,
  deliveryStatus: string
}

type PaginationState = {
  pageIndex: number
  pageSize: number
}


const SellerOrderList = () => {
  const [isUserActive, setIsUserActive] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isDeactivateUserModalOpen, setIsDeactivateUserModalOpen] = useState(false);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const { isLoading, refetch, error, data } = useQuery<any>({
    queryKey: ['SellerOrderList'],
    queryFn: () => requestAxios.get('/orders'),
  });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 8
  })
  var usersData = data?.orders ?? [];
 
  console.log("-----------------------------------------------------------",usersData)
  const columns: ColumnDef<usersTable>[] = [
    {
      header: 'No',
      accessorFn: (val: any, index: number) => index + 1,
      cell: (val: any) => <span> {val.getValue()}</span>
    },
    {
      header: 'Buyer Name',
      accessorFn: row => row.buyer.firstName +" "+ row.buyer.lastName,
      cell: (val: any) => <span> {val.getValue()}</span>
    },
    {
      header: 'Product Name',
      accessorFn: row => row.Product.productName,
      cell: (val: any) => <span> {val.getValue()}</span>
    },
    {
      header: 'Quantity',
      accessorFn: row => row.quantity,
      cell: (val: any) => <span> {val.getValue()}</span>
    },
    {
      header: 'Paid Amount',
      accessorFn: row => row.totalAmount,
      cell: (val: any) => <span> {val.getValue()}</span>
    },
    {
        header: 'Delivery Date',
        accessorFn: row => row.deliveryDate.split('T')[0],
        cell: (val: any) => <span> {val.getValue()}</span>
      },
    {
        header: 'Status',
        accessorFn: row => row.deliveryStatus        ,
        cell: (val: any) => <span> {val.getValue()}</span>
      },
    {
      id: 'Action',
      header: () => <div className='text-center'>Action</div>,
      accessorFn: row => row.id,
      cell: (row: any) => (
        <div className='w-full flex justify-center gap-4 my-1.5 text-[15px]' >
           <ReviewButton
                name="Details"
                handle={() =>  handleOpenOrderDetailPopup(row.row.original.id)}
                className="btn-bg-blue px-4 py-1.5 text-[13px]"
              />
        </div>
      )
    },
  ]

  const table = useReactTable({
    data: usersData,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination
    }
  })
 
  const handleOpenOrderDetailPopup=(orderId:string)=>{
    setOrderId(orderId);
    setIsOrderDetailModalOpen(true);
  }

  const handleClosePopup = () => {
    refetch()
    setOrderId(null);
    setIsOrderDetailModalOpen(false);
  };
 return (
    <>
      <div className='w-[100%] flex'>
        {isLoading ? (
          <div className='flex w-full min-h-[400px] justify-center items-center'>
            <div className="border-t-4 border-b-4 border-black rounded-full w-10 h-10 animate-spin m-auto"></div>
          </div>
        ) : (
          <div className='w-[100%] sm:w-[70%] min-h-[600px] mx-auto mt-10 py-6 px-10 border border-primaryGrey shadow rounded-[10px]'>
            {!data ? (
              <div className='capitalize flex flex-col items-center w-full h-full font-bold text-gray-400 text-3xl'>
                <img src='/empty.avif' alt="Not found" />
                Clients Orders not found
              </div>
            ) : (
              <>
                <h1 className='font-bold text-[20px] flex gap-8'>Clients Orders:<span className='text-primaryBlue hidden sm:block'>{Object.keys(usersData).length}</span></h1>
                <div className='w-[100%] m-auto mt-9'>
                  <table className='text-black border-t-1 text-left w-[100%] h-[300px] border-spacing-4'>
                    <thead className='text-[15px]'>
                      {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map(header => (
                            <th key={header.id} className='border-b'>
                              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className='border-b indent-0 text-[15px]'>
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
                    <div className='flex gap-3'>
                      <BackButton handle={() => table.previousPage()} isDisabled={!table.getCanPreviousPage()} />
                      {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                      <BackButton handle={() => table.nextPage()} isDisabled={!table.getCanNextPage()} rotate />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {isOrderDetailModalOpen && (
         <SellerOrderDetail id={orderId} isOpen={isOrderDetailModalOpen} handleClose={handleClosePopup}/>
      )}
    </>
  );
};

export default SellerOrderList;
