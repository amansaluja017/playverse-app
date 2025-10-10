"use client"

import { signOut } from 'next-auth/react'
import React from 'react'
import Button from '../components/Button'

function page() {
  return (
    <div>
        <Button buttonName='logout' className='px-4 py-2' onClick={() => signOut()} />
    </div>
  )
}

export default page