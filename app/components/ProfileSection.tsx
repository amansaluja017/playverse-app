"use client"

import { useSession } from 'next-auth/react';
import React from 'react'

function ProfileSection() {
  const { data: session, status } = useSession();

  return (
    <div className='flex justify-center items-center flex-col gap-10'>
        <div className='flex items-center gap-4'>
            <div className='h-30 w-30 rounded-full bg-green-700'></div>
            <div className='flex items-center flex-col'>
                <span className='text-3xl'>{session?.user.name}</span>
                <span>{session?.user.email}</span>
            </div>
        </div>

        <div className='grid grid-cols-2 gap-5'>
            <div className='bg-white rounded-full text-black flex justify-center items-center '>
                <button className='p-2 px-5 rounded-full cursor-pointer'>Your Account</button>
            </div>

            <div className='bg-white rounded-full text-black flex justify-center items-center'>
                <button className='p-2 px-5 rounded-full cursor-pointer'>Your Videos</button>
            </div>

            <div className='bg-white rounded-full text-black flex justify-center items-center'>
                <button className='p-2 px-5 rounded-full cursor-pointer'>Manage</button>
            </div>

            <div className='bg-white rounded-full text-black flex justify-center items-center'>
                <button className='p-2 px-5 rounded-full cursor-pointer'>Deactivate</button>
            </div>
        </div>
    </div>
  )
}

export default ProfileSection