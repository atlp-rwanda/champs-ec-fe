import React from 'react'
function Order() {
    const orders: any = [
        {
            name: "Sneakers N12",
            desc: "Men's Shoes"
        },
        {
            name: "Toyota",
            desc: "Best car in city"
        },
        {
            name: "Girl Dress",
            desc: "tkacheanton dress"
        }
    ]
    return (
        <div className='bg-white shadow-md rounded-lg pl-10 pb-4'>
            <div className='w-[100%]  py-4 '>
                <h3 className='font-semibold text-primaryBlue'>Orders</h3>
            </div>
            <div className='flex flex-col gap-4'>
                {
                    orders.map((order: any, index: any) => {
                        return (
                            <div className='flex flex-col'>
                                <span className='text-secondaryBlue text-[.8rem]'>{order.name}</span>
                                <span className='text-greenMain text-[.7rem] opacity-65'>{order.desc}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Order






