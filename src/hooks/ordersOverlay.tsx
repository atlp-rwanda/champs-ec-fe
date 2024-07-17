
import React, { useState } from 'react';

function OrdersOverlay() {
    const [isOrdersOverlayOpen, setIsOrdersOverlayOpen] = useState(false)
    const toggleOrdersSlider = () => {
        setIsOrdersOverlayOpen(!isOrdersOverlayOpen);
    };

    return{
        isOrdersOverlayOpen, 
        setIsOrdersOverlayOpen, 
        toggleOrdersSlider
    }
};

export default OrdersOverlay
  