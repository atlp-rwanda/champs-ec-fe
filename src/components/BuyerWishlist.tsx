"use client"
import React, { useState } from 'react';
import ReviewProduct from './ReviewProductPopup';
import { useMutation, useQuery } from "@tanstack/react-query";
import request from '@/utils/axios';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { BackButton, DeleteButton, ReviewButton } from './Button';
import { BsTrash } from "react-icons/bs";
import DeleteWishlistPopup from './DeleteWishlistPopup';
import { showToast } from '@/helpers/toast';
import { handleWishlistCount } from '@/redux/slices/wishlistSlice';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';

type ordersTable = {
    No: number;
    id: string;
    product:{
        productName: string;
        productThumbnail: string;
        stockLevel: string;
        productPrice: number;
        productCurrency:string;
    }
}
type PaginationState = {
    pageIndex: number
    pageSize: number
}
const BuyerWishList = () => {
    const [isDeleteWishlistModalOpen, setIsDeleteWishlistModalOpen] = useState(false);
    const [productId, setProductId] = useState<string>('');
    const [deleting, setDeleting] = useState('');
    const { wishNumber } = useAppSelector(
      (state: RootState) => state.wishlist
    )
    const dispatch = useAppDispatch();
    const { isLoading, refetch, error, data } = useQuery<any>({
        queryKey: ['BuyerWishList'],
        queryFn: () => request.get('/wishes')
    });

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 7
      })
      var wishesData = data?.wishes ?? [];
      console.log('this is wishes from the database', wishesData)
      const columns: ColumnDef<ordersTable>[] = [
        
        {
          header: 'Image',
          accessorFn: row => row.product.productThumbnail,
          cell: (val: any) => 
          <>
            <img src={val.getValue()} className='w-[60px] h-[40px] border-rounded-2'/>
          </>
        },
        {
          header: 'Product Name',
          accessorFn: row => row.product.productName,
          cell: (val: any) => <span> {val.getValue()} </span>
        },
        {
          header: 'Price',
          accessorFn: row => row.product.productPrice,
          cell: (row: any) => <>
            <span className='bold'> {row.row.original.product.productPrice.toLocaleString()}</span><span> {row.row.original.product.productCurrency}</span>
          </>
        },
        {
          id: 'Action',
          header: () => <div className='text-center'>Action</div>,
          accessorFn: row => row.id,
          cell: (row: any) => (
            <div className='flex w-full justify-center align-center'>
               <BsTrash className='text-[20px] cursor-pointer' onClick={() =>handleOpenWishlistPopup(row.row.original.product.id, 'product')}/>
            </div>
          )
        },
      ]
      const table = useReactTable({
        data: wishesData,
        columns,
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        state: {
          pagination
        }
    })
    const handleOpenWishlistPopup = (productId: string, deleting:string) => {
        setProductId(productId);
        setIsDeleteWishlistModalOpen(true);
        setDeleting(deleting);
    };

    const handleClosePopup = () => {
        setIsDeleteWishlistModalOpen(false);
        setProductId('');
    };

    const mutation = useMutation({
      mutationFn: () => {
        return request.delete('/wishes')
      },
      onError: (error) => console.log(error),
      onSuccess: async () => {
        dispatch(handleWishlistCount(await wishNumber - await wishNumber));
        showToast('successfully cleared your wish list','success')
        await refetch();
        handleClosePopup();
      
      },
    });

    const handleClearAll =() => {
      mutation.mutate();
    };
    return (
        <>
            <div className='w-[100%] block w-[100%]'>
                <span className='text-[25px]   px-3 block'> Wishlist </span>
                <div className='bg-white min-w-[100%] min-h-[100%]  rounded-b-lg rounded-[20px] py-4 px-2'>
                <>
                  <div className='min-h-[500px] overflow-hidden mb-3'>
                    <table className='text-black border-t-1 text-left w-[100%] border-spacing-4'>
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
                          <tr key={row.id} className='border-b indent-0 text-[13px] py-3 my-6  w-full  h-[70px]'>
                            {row.getVisibleCells().map(cell => (
                              <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                    <div className='f-right'>
                      <DeleteButton name='Clear All' handle={()=>handleOpenWishlistPopup(productId, 'wishlist')}/>
                    </div>
                  </>
                </div>
            </div >
            {isDeleteWishlistModalOpen &&
                <DeleteWishlistPopup deleting={deleting} id={productId} isOpen={isDeleteWishlistModalOpen} handleClose={handleClosePopup} refetch={refetch} handleClearWishlist={handleClearAll}/>
            }
        </>
    );
};

export default BuyerWishList;
