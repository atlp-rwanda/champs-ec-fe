import React from 'react';//@ts-ignore
import ReactStars from "react-rating-stars-component";

interface ReviewInterface {
    rating:number;
    feedback:string;
    image:string;
    firstName:string;
    lastName:string;
    buyerId?:string;
}

const ReviewCard: React.FC<ReviewInterface> =({ rating, feedback, image, firstName, lastName }) =>{
    return(
        <div className='block'>
            <div className="double-grid w-sm-[100%] w-md-[60%] w-[36%]  rounded-2xl border">
                <div className='flex items-center justify-center w-full'>
                    <img src={image} className="rounded-full h-[60px] w-[60px] border-black-1 "/>
                </div>
                <div className="wrap py-4">
                    <span className="text-[13px] font-bold capitalize">{firstName} {lastName}</span>
                    <ReactStars
                        count={5}
                        value={rating}
                        isHalf={true}
                        size={12}
                        activeColor="#ffd700"
                        edit={false}
                    />
                    <span className="text-[12px] bold">{feedback.length > 30 ? feedback.substring(0,30)+'...' : feedback}</span>
                </div>
            </div>
        </div>
    )
};
export default ReviewCard;