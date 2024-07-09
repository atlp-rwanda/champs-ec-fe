import React, { useEffect, useRef } from 'react';
import { Button, CloseButton, DeleteButton } from './Button';
import request from '@/utils/axios';
import {
  useMutation,
  useQueryClient,
  RefetchOptions,
  QueryObserverResult,
} from '@tanstack/react-query';

import { showToast } from '@/helpers/toast';
import { useRouter } from 'next/navigation';

interface DeleteProductInterface {
  isOpen: boolean;
  productId: string;
  toggleConfirmPopup: () => void;
  refetch?: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<any, Error>>;
}

const ConfirmDelete: React.FC<DeleteProductInterface> = ({
  productId,
  isOpen,
  toggleConfirmPopup,
  refetch,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  const mutation = useMutation({
    mutationFn: () => {
      return request.delete(`/products/${productId}`);
    },
    onError: (error) => console.log(error),
    onSuccess: async () => {
      showToast('Product has been deleted', 'success');
      // await refetch();
      toggleConfirmPopup();
      window.location.reload();
    },
  });
  const handleDelete = () => {
    return mutation.mutate();
  };
  return (
    <dialog
      ref={dialogRef}
      onClick={(e) => e.stopPropagation()}
      className="z-50 bg-white backdrop-filter backdrop-brightness-75 rounded shadow-lg w-[80%] py-6 px-4 sm:w-[30%] mx-auto"
    >
      <CloseButton background="primaryBlue" handle={toggleConfirmPopup} />
      <div className="w-[100%] m-auto sm:w-[50%] my-12 ">
        <h1 className="text-[2vh] text-center my-5 font-bold">
          {' '}
          Delete Product
        </h1>

        <div className="my-5">
          <span className="text-[13px]">
            Are you sure you want to delete this product?
          </span>
        </div>

        <DeleteButton
          name="Delete"
          loading={mutation.isPending}
          btnColor="btn-red"
          handle={handleDelete}
        />
      </div>
    </dialog>
  );
};

export default ConfirmDelete;
