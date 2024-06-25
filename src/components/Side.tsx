import React from 'react'
import Image from 'next/image'
import sideImage from "../../public/Rectangle 1403.png"

function Side() {
return (
    <>
    <div className='h-full w-[15rem] mt-5 flex flex-col justify-center items-center gap-10'>
            <div className='w-full border p-5 flex-col items-center justify-center  border-black'>
            <h2 className='border-b-[1px] border-black pb-2'>Filter Product</h2>
            <div className='m-3'>
                 <p>Categories</p>
                 <p className='text-blue-300'>Foods</p>
                 <p className='text-blue-300'>Property</p>
                 <p className='text-blue-300'>Shoes</p>
                 <p>Price</p>
            </div>
            <div>
                <div className='flex justify-between px-5 border'>
                    <span>RWF</span>
                    <span>2350</span>
                </div>
                <input type="range" className='w-full h-1 bg-black'/>
            </div>
            <div className='flex flex-col justify-center gap-2'>
                <h3>Size</h3>
                <div className='flex justify-center-between gap-3'>
                    <p className='border px-2 cursor-pointer'>small</p>
                    <p className='border px-2 cursor-pointer'>large</p>
                </div>
                <div className='flex justify-center-between gap-3'>
                    <p className='border px-2 cursor-pointer'>x-large</p>
                    <p className='border px-2 cursor-pointer'>xx-large</p>
                </div>
            </div>
            </div>
            <div className='w-full'>
            <img src='../../Rectangle 1403.png' width={200} height={200} alt={'side_Image'}/>
            </div>
        </div>
    </>
)
}

export default Side