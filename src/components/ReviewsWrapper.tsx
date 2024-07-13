import { ReviewType } from '@/types/Product';
import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import Button from './Button';
import ReviewPopup from '@/hooks/reviewPopup';
import ReviewProduct from './ReviewProductPopup';
import request from '@/utils/axios';

interface reviewWrapper{
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>;
    reviews:ReviewType[];
    productId:string;
}

const ReviewWrapper:React.FC<reviewWrapper>=({ refetch, reviews, productId })=>{
    const { isReviewPopupOpen, setIsReviewPopupOpen, toggleReviewPopup} = ReviewPopup();
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(()=>{
        const { User } = JSON.parse(localStorage.getItem('profile') as string);
        const { id } = User
        if(User){
            setCurrentUser(id)
        }
    })
 
    const { isLoading, error, data } = useQuery<any>({
        queryKey: ['CheckBuyerOrders'],
        queryFn: () => request.get('/orders'),
    });
    //setOrders(data)
    var ordersData = data?.orders ?? [];
    const canUserAddReview = ordersData.filter((item: { buyerId: any; productId:string; isPaid: any; }) => item.buyerId == currentUser && item.productId == productId && item.isPaid)
    return(
        <>
           <div className="w-full flex flex-col mt-10">
            <div className="flex">
              <h2 className="font-medium text-2xl mr-5">Reviews:</h2>
              {canUserAddReview.length ? 
                <Button name="Add Review" background="blue" handle={toggleReviewPopup}></Button>
              :"" }
            </div>
            <div className="my-10">
              {reviews && reviews.length > 0 ? (
                reviews.map((review: ReviewType) => (
                  <ReviewCard
                    rating={review.rating}
                    feedback={review.feedback}
                    image={review.userProfile.profileImage}
                    firstName={review.userProfile.firstName}
                    lastName={review.userProfile.lastName}
                  />
                ))
              ) : (
                <p className="text-red-500">No ratings yet.</p>
              )}
            </div>
          </div>
          {isReviewPopupOpen &&
              <ReviewProduct id={productId} isOpen={isReviewPopupOpen} handleClose={toggleReviewPopup} refetch={refetch}/>
            }
        </>
    )
};

export default ReviewWrapper;