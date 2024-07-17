import React, { useEffect, useRef, useState } from 'react';
import { Button, BackButton, CloseButton } from './Button';
import request from '@/utils/axios';
import { useQuery, useMutation, useQueryClient, RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import InputBox from './InputBox';
import { toast } from 'react-toastify';

interface AssignRoleInterface {
  isOpen: boolean,
  id: string | null;
  handleClose: () => void
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>;
  isUserActive:boolean;
}

const DeactivateUser: React.FC<AssignRoleInterface> = ({ id, isUserActive, isOpen, handleClose, refetch}) => {

  const dialogRef = useRef<HTMLDialogElement>(null);
  const textInput = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const [isError, setIsError] = useState('');

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal(); 
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]);


  const mutation = useMutation({
    mutationFn: (reason: string) => {
      return request.patch(`/users/${id}/status`, { status:!isUserActive ? 'activate' :'deactivate', message:reason })
    },
    onError: (error) => console.log(error),
    onSuccess: async () => {
      toast('successfully updated user account status', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "success",
        });
      await refetch();
      handleClose();
     
    },
  })

  const handleDeactivation = async () => {
    const reason = textInput.current?.value as string;
    if (isUserActive && reason.length < 10) {
      setIsError("Reason must be at least 10 chars");
      return;
    }
    await mutation.mutate(!isUserActive ?'' : reason);
  };

  return (
    <dialog ref={dialogRef} onClick={(e) => e.stopPropagation()} className='z-50 bg-white backdrop-filter backdrop-brightness-75 rounded shadow-lg w-[80%] py-6 px-4 sm:w-[30%] mx-auto'>
      <CloseButton background='primaryBlue' handle={handleClose} />
      <div className='w-[100%] m-auto sm:w-[50%] my-12 '>
        <h1 className='text-[2vh] text-center my-5 font-bold'>{!isUserActive ? "Activate":"Deactivate"} User account</h1>
        {isUserActive ?
          <div className="my-1 mx-0 px-0">
            <span className='text-[14px]'>Reason for deactivation:*</span>
            <InputBox type='text' ref={textInput} error={isError}/>
          </div>
        :
          <div className="my-5">
            <span className='text-[13px]'>Are you sure you want to activate this user account?</span>
          </div>
        }
        <Button name={!isUserActive ? 'Activate User' : 'Deactivate User'} handle={handleDeactivation} loading={mutation.isPending} btnColor={!isUserActive ? 'btn-green' : 'btn-red'} />
      </div>
    </dialog >
  );
};

export default DeactivateUser;
