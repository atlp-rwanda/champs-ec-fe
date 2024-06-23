import React from 'react'
import { User,Cake } from 'lucide-react'
import { FaUser, FaEnvelope } from "react-icons/fa";
import { FaLocationDot,FaPhone } from "react-icons/fa6";
function About() {
    const items: any = [
        {
            icon: <FaUser className='text-green-500' />,
            details: "Male",
        },
        {
            icon: <Cake className='text-green-500' />,
            details: "Born June26,1927",
        },
        {
            icon: <FaLocationDot className='text-green-500' />,
            details: "2239 Kigali Rwanda KN 250 St",
        },
        {
            icon: <FaEnvelope className='text-green-500' />,
            details: "tchamianest@gmail.com",
        },
        {
            icon: <FaPhone className='text-green-500' />,
            details: "tchamianest@gmail.com",
        }
    ]
    return (
        <div className='bg-white shadow-md pl-5 w-[22%] pr-2 p-6 rounded-lg max-h-72'>
            <h3 className='font-semibold text-secondaryBlue text-[1rem] pr-5'>About</h3>
            <div>
                {items.map((item: any,index:number) => {
                    return (<div className={`flex flex-col ${index==4?" ":"border-b-[1px]"} py-3 pl-3 pr-0`}>
                        <div className='flex items-center gap-2'>
                            {item.icon}
                            <span className='text-secondaryBlue font-extralight text-[0.7rem]'>{item.details}</span>
                        </div>
                    </div>)
                })}
            </div>
        </div>
    )
}
export default About







