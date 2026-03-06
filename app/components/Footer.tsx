"use client";

import React, { useId } from "react";
import { sitka } from "../layout";
import {Copyright} from "lucide-react"

function Footer() {
  const contactId = useId();

  return (
    <footer className="bg-[#0E0227]">
      <div className="p-10 px-[7rem] flex justify-between">
        <div className="w-[15rem] flex justify-center">
          <img src="/assets/LOGO.svg" alt="logo" />
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <div>
            <span className={`${sitka.className} font-bold text-xl`}>
              Links
            </span>
            <div className="h-1 w-13 bg-gradient-to-r from-[#0b2f68] to-[#982822]"></div>
          </div>
          <div>
            <ul className="flex flex-col gap-2 opacity-40">
              <li className="cursor-pointer hover:underline">Home</li>
              <li className="cursor-pointer hover:underline">Account</li>
              <li className="cursor-pointer hover:underline">Info</li>
              <li className="cursor-pointer hover:underline">Feedback</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex flex-col items-center justify-center">
            <span className={`${sitka.className} font-bold text-3xl`}>
              Contact
            </span>
            <div className="h-1 w-23 bg-gradient-to-r from-[#0b2f68] to-[#982822]"></div>
          </div>

          <div className="relative">
            <div className="relative">
              <input
              id={contactId}
              type="email"
              placeholder="Enter your email"
              className="rounded-full border-2 px-4 py-2 placeholder:text-sm"
              size={35}
            />
            <div className="absolute h-full right-0 top-0 px-4 rounded-tr-[27px] rounded-br-[27px] flex justify-center items-center cursor-pointer bg-gradient-to-r from-[#0b2f68] to-[#982822]">
              <span>submit</span>
            </div>
            </div>
            <p className="text-sm mt-2 opacity-40">
              We will contact you shortly
            </p>
          </div>

          <div className="flex flex-col gap-2 justify-center opacity-40">
            <div className="flex gap-4 items-center">
              <img
                className="w-5 h-5 text-white"
                src="/assets/PHONE.svg"
                alt="phone icon"
              />
              <span>+91 9306234357</span>
            </div>

            <div className="flex gap-4 items-center">
              <img
                className="w-5 h-5 text-white"
                src="/assets/MAIL.svg"
                alt="phone icon"
              />
              <span>amansaluja017@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center relative bottom-3 flex justify-center items-center">
        <span className="opacity-40 text-sm flex justify-center items-center gap-1">copyright 2025<Copyright className="h-4 w-4"/></span>
        <span className="text-sm opacity-40">:www.playverse.com</span>
      </div>
    </footer>
  );
}

export default Footer;
