
import React, { useState } from 'react';

function ReviewPopup() {
    const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false)
    const toggleReviewPopup = () => {
        setIsReviewPopupOpen(!isReviewPopupOpen);
    };

    return{
        isReviewPopupOpen, 
        setIsReviewPopupOpen, 
        toggleReviewPopup
    }
};

export default ReviewPopup;
  