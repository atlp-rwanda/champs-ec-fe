import React, { useEffect, useRef, useState } from 'react';
import Button, { BackButton, CloseButton } from './Button';
import request from '@/utils/axios';
import { useQuery, useMutation, useQueryClient, RefetchOptions, QueryObserverResult } from "@tanstack/react-query";
import { toast } from 'react-toastify';//@ts-ignore
import ReactStars from "react-rating-stars-component";
import { showToast } from '@/helpers/toast';
interface ReviewProductInterface {
  isOpen: boolean,
  id: string | null;
  handleClose: () => void
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>;
}

export const ReviewProduct: React.FC<ReviewProductInterface> = ({ id,  isOpen, handleClose, refetch}) => {

  const dialogRef = useRef<HTMLDialogElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [feedbackError, setFeedbackErrro] = useState('');
  const [ratingError, setRatingError] = useState('');


  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal(); 
    } else if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]);
  const ratingChanged = async (newRating:any) => {
    setRating(newRating);
  };
  const mutation = useMutation({
    mutationFn: (feedback: string) => {
      return request.post(`/products/${id}/reviews`, { feedback, rating })
    },
    onError: (error) => console.log(error),
    onSuccess: async (data:any) => {
      showToast(data.message,  'success');
      await refetch();
      handleClose();
    },
  })

  const handleSubmitReiew = async () => {
    const feedback = textArea.current?.value as string;
    if(feedback.length < 10 && rating === 0 ){
      setFeedbackErrro("Feedback must have between 10 - 300 chars");
      setRatingError('Please add rating');
      return;
    }if(feedback.length < 10 || feedback.length > 300 ) {
      setFeedbackErrro("Feedback must have between 10 - 300 chars");
      return;
    }if(rating === 0){
      setRatingError('Please add rating');
      return;
    }
    await mutation.mutate(feedback);
  };
  return (
    <dialog ref={dialogRef} onClick={(e) => e.stopPropagation()} className='z-50 bg-white backdrop-filter backdrop-brightness-75 rounded shadow-lg w-[80%] py-6 px-4 sm:w-[30%] mx-auto'>
      <CloseButton background='primaryBlue' handle={handleClose} />
      <h1 className='text-[20px] text-center font-bold mt-5'>Review Product</h1>
      <div className='block py-10 px-5'>
        <div className='py-5'><span className=' font-bold text-[14px]'>Rating:</span> 
          <ReactStars
            count={5}
            onChange={ratingChanged}
            isHalf={true}
            size={30}
            activeColor="#ffd700"
          />
          <span className='h-[10px] text-red text-[11px]'>{ratingError ? ratingError : ''}</span>
        </div>
        <div className='pt-5'><span className=' font-bold text-[14px] block'>Feedback:</span>
          <textarea ref={textArea} className='border  w-full p-2 text-[13px]' rows={4}></textarea>
          <span className='h-[10px] text-red text-[11px]'>{feedbackError ? feedbackError : ''}</span>
        </div>
      </div>
      <div className='justify-center pb-4 flex w-full'>
        {mutation.isPending?(<div className="border-t-4 border-b-4 border-blue-900 rounded-full w-6 h-6 animate-spin m-auto"></div>):(<Button  background='green' name='Submit' handle={handleSubmitReiew}/>)}
        
      </div>
    </dialog >
  );
};

export default ReviewProduct;
