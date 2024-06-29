import React from 'react';
import BuyerOrdersList from './BuyerOrdersList';

interface OrdersContainerInterface{
    toggleOrdersSlider?:()=>void; 
    isOrdersOverlayOpen?:boolean;
}
const OrdersContainer:React.FC<OrdersContainerInterface> = ({ isOrdersOverlayOpen, toggleOrdersSlider }) => {
    return (
        <>
            <div id="slideover-container" className={`w-full h-full fixed inset-200  border ${isOrdersOverlayOpen? '' : 'invisible'}`}>
                <div onClick={toggleOrdersSlider} id="slideover-bg" className={`w-full h-full duration-500 ease-out transition-all inset-200 absolute bg-gray-500 ${isOrdersOverlayOpen? 'opacity-50' : 'opacity-0'}`}></div>
                <div id="slideover" className={`w-[700px] bg-gray-200 h-full absolute right-0 mx-auto py-5 pl-8 duration-300 ease-out transition-all ${isOrdersOverlayOpen ? '' : 'translate-x-full'}`}>
                    <div onClick={toggleOrdersSlider} className="absolute cursor-pointer text-gray-600 top-0 w-8 h-8 flex items-center justify-center right-0 mt-5 mr-5">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                    <div className="flex justify-center w-full h-full mr-100 px-4">
                        <BuyerOrdersList/>
                    </div>
                </div>
            </div>
        </>
    );
};
export default OrdersContainer;