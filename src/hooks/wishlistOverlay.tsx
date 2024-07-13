
import React, { useState } from 'react';

function WishlistOverlay() {
    const [isWishlistOverlayOpen, setIsWishlistOverlayOpen] = useState(false)
    const toggleWishlistSlider = () => {
        setIsWishlistOverlayOpen(!isWishlistOverlayOpen);
    };

    return{
        isWishlistOverlayOpen, 
        setIsWishlistOverlayOpen, 
        toggleWishlistSlider
    }
};

export default WishlistOverlay;
  