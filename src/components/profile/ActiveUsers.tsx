import React from 'react'
function ActiveUser() {
    const orders: any = [
        {
            name: "Shelby Goode",
            image: "https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-man-wearing-glasses-is-wearing-colorful-background-image_2905240.jpg",
            status: "online",
            time: "2 minutes ago"
        },
        {
            name: "Robert Bacins",
            image: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
            status: "online",
            time: "2 minutes ago"
        },
        {
            name: "John Carilo",
            image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            status: "online",
            time: "2 minutes ago"
        },
        {
            name: "Adreine Watson",
            image: "https://imgv3.fotor.com/images/gallery/a-man-profile-picture-with-blue-and-green-background-made-by-LinkedIn-Profile-Picture-Maker.jpg",
            status: "online",
            time: "2 minutes ago"
        },
    ]
    return (
        <div className='bg-white shadow-md rounded-lg pl-4 pb-4'>
            <div className='w-[100%]  py-4 '>
                <h3 className='font-semibold text-primaryBlue'>Active Seller</h3>
            </div>
            <div className='flex flex-col gap-4'>
                {
                    orders.map((order: any, index: any) => {
                        return (
                            <div className='flex justify-between items-center gap-2'>
                                <div className='flex gap-2'>
                                    <div>
                                        <img src={order.image} alt='profile' className='rounded-full w-10 h-10' />
                                        <div className='w-3 h-3 rounded-full bg-greenMain relative top-[-10px] left-7 border-2 border-white'></div>
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='text-secondaryBlue text-[.8rem]'>{order.name}</span>
                                        <span className='text-greenMain text-[.7rem] opacity-65'>{order.status}</span>
                                    </div>
                                </div>
                                <div className='flex gap-2 justify-center items-center text-primaryBlue'>
                                    <span className='text-[.5rem] pr-1 opacity-50'>{order.time}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default ActiveUser