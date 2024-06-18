import React from 'react';
import { ReviewType } from '@/types/Product';

const ReviewProduct = ({rating, feedback}:ReviewType) => {
  return (
    <>
      <div className="border rounded-2xl">
          <div className="border">
             <span>{rating}</span>
             <p>{feedback}</p>
          </div>
      </div>
    </>
  );
};

export default ReviewProduct;
