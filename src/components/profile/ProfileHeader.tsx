import React from 'react'
import { GreenButton } from '../Button'
import { MessageSquareText } from 'lucide-react';
function ProfileHeader() {
    return (
        <div className="bg-white w-[70%] mt-4 rounded-lg shadow-md">
            {/* Cover Image */}
            <div className="h-64 w-full bg-cover bg-center rounded-md" style={{ backgroundImage: 'url(https://randomuser.me/api/portraits/men/32.jpg)' }}></div>
            {/* Profile Info */}
            <div className="flex items-center px-10 py-5">
                <img
                    className="w-32 h-32 rounded-full border-4 border-white -mt-16 md:-mt-20"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Profile"
                />
                <div className="flex-grow">
                    <h1 className="text-2xl font-bold">Tchami Ernest</h1>
                    <p className="text-gray-500">Buyer</p>
                </div>
                <div className="space-x-2 flex justify-center items-center text-5rem p-10">
                    <button className='bg-green-500 p-2 rounded-full text-white'><MessageSquareText /></button>
                    <GreenButton name="Edit Profile" classNames='px-0 bg-green-500'/>
                    <button className="border-blue-500 text-blue-500 py-2 px-10 border">Log Out</button>
                </div>
            </div>
        </div>
    )
}
export default ProfileHeader

