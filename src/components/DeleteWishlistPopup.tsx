import React, { useEffect, useRef } from 'react';
import { Button, CloseButton, DeleteButton } from './Button';
import request from '@/utils/axios';
import { useMutation,  RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { showToast } from '@/helpers/toast';
import { handleWishlistCount } from '@/redux/slices/wishlistSlice';
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store';

interface DeleteWishlistInterface {
  isOpen: boolean,
  id: string | null;
  handleClose: () => void
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>;
  deleting:string;
  handleClearWishlist:()=>void;
}

const DeleteWishlistPopup: React.FC<DeleteWishlistInterface> = ({ id, isOpen, handleClose, refetch, deleting, handleClearWishlist}) => {
  const { wishNumber } = useAppSelector(
    (state: RootState) => state.wishlist
  )
  const dispatch = useAppDispatch();
  
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal(); 
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const mutation = useMutation({
    mutationFn: () => {
      return request.post('/wishes', {productId:id} )
    },
    onError: (error) => console.log(error),
    onSuccess: async (data:any) => {
      const { status } = data;
      dispatch(handleWishlistCount(status  == 200 ? await wishNumber + 1 : await wishNumber - 1));
      showToast(data.message ,'success')
      await refetch();
      handleClose();
     
    },
  })

  const handleDeletion = async () => {
    mutation.mutate();
  };
  const action = deleting == 'product'? handleDeletion : handleClearWishlist;
  return (
    <dialog ref={dialogRef} onClick={(e) => e.stopPropagation()} className='z-50 bg-white backdrop-filter backdrop-brightness-75 rounded shadow-lg w-[80%] py-6 px-4 sm:w-[30%] mx-auto'>
      <CloseButton  background={'bg-red'} handle={handleClose} />
      <div className='w-[100%] m-auto sm:w-[50%] my-12 '>
        <h1 className='text-[2vh] text-center my-5 font-bold'>Delete Wished Prroduct</h1>
          <div className="my-5">
            <span className='text-[13px]'>Are you sure you want to {deleting == 'product' ? 'remove this product from your wish list?' : 'clear your wish list?!'}</span>
          </div>
        <DeleteButton name="Delete" handle={action} loading={mutation.isPending} btnColor='btn-red' background='red' />
      </div>
    </dialog >
  );
};

export default DeleteWishlistPopup;
