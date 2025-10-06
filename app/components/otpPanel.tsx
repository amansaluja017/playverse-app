import React, { JSX } from 'react'

function otpPanel(): JSX.Element {
  
  return (
    <div className='backdrop-blur-lg bg-gradient-to-br from-[#0b2f68]/40 to-[#982822]/40 w-[685px] h-[578px] rounded-[74px]'>
      <div className='flex flex-col items-center justify-center h-full w-full'>
          <div className='flex items-center flex-col gap-3'>
            <h4 className='font-bold text-2xl'>Verify your email</h4>
            <p>we send otp on your email jo*******3@gmail.com</p>
          </div>

          <div className='flex gap-3 mt-10'>
            <input className='border-2 border-white rounded-xl w-12 h-12 text-center' type="text" maxLength={1} />
            <input className='border-2 border-white rounded-xl w-12 h-12 text-center' type="text" maxLength={1} />
            <input className='border-2 border-white rounded-xl w-12 h-12 text-center' type="text" maxLength={1} />
            <input className='border-2 border-white rounded-xl w-12 h-12 text-center' type="text" maxLength={1} />
            <input className='border-2 border-white rounded-xl w-12 h-12 text-center' type="text" maxLength={1} />
            <input className='border-2 border-white rounded-xl w-12 h-12 text-center' type="text" maxLength={1} />
          </div>

          <div className='flex gap-4 mt-3'>
            <span>1:59</span>
            <span>Resend</span>
          </div>
      </div>
    </div>
  )
}

// 

export default otpPanel;