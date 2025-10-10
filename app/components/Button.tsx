import React from 'react'
import { sitka } from '../layout';

type buttonTypes = {
    className?: string,
    buttonName: string,
}

function Button({
    className,
    buttonName,
    ...props
}: buttonTypes & React.ComponentProps<"button">) {
  return (
    <div className="p-[2px] rounded-2xl overflow-hidden border-animate bg-gradient-to-br from-[#0b2f68] to-[#982822]">
        <button className={`rounded-2xl bg-[#0B031C] cursor-pointer flex items-center justify-center text-[#edf4e3] font-medium ${sitka.className} ${className}`} {...props}>{buttonName}</button>
    </div>
  )
}

export default Button;