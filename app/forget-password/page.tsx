"use client"

import React, { useState } from "react";
import OtpPanel from "../components/otpPanel";

function forgetPassword() {
    const [email, setEmail] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmPassword] = useState<string>("");
    const [otpSection, setOtpSection] = useState<boolean>(false);


  return (
    <div className="w-screen h-screen bg-[#0B031C] flex flex-col justify-center items-center">
        {otpSection && (
          <div className="absolute flex justify-center items-center z-10">
            <div onClick={() => setOtpSection(false)} className="absolute right-20 top-20 cursor-pointer z-20">
              <span className="text-white opacity-30">X</span>
            </div>
            <OtpPanel />
          </div>
        )}
        <div className="relative w-[48rem] h-[40rem] p-[2px] rounded-xl overflow-hidden bg-gradient-to-r from-[#0b2f68] to-[#982822] items-center justify-center">
          <div className="relative w-full h-full p-6 rounded-xl bg-[#0B031C]">
            <div className="w-[77.1px] h-[30.5px] ml-10 mt-10">
              <img src="/logo.svg" alt="logo" />
            </div>

            <div>
              <h1 className="font-heading text-[2.2rem] pl-10 mt-5">Set Password</h1>
            </div>

            <div className="items-center justify-center p-5 pl-[10rem] pr-[10rem] pt-7">
              <form
                // onSubmit={handleSubmit}
                autoComplete="true"
                className="flex flex-col">

                <div className="mt-5 flex flex-col">
                  <label htmlFor="email">Email</label>
                  <div className="relative">
                    <input
                      className="w-full mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid"
                      id="email"
                      autoComplete="true"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div
                      onClick={() => setOtpSection(true)}
                      className="absolute right-0 bottom-0 top-[12px] rounded-tr-[27px] rounded-br-[27px] w-[79px] h-[42px] flex justify-center items-center cursor-pointer border #707070 border-solid bg-gradient-to-r from-[#0b2f68] to-[#982822]">
                      <span>verify</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col">
                  <label htmlFor="password">New Password</label>
                  <input
                    className="mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid"
                    id="password"
                    autoComplete="true"
                    type="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="mt-5 flex flex-col">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    className="mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid"
                    id="confirmPassword"
                    autoComplete="true"
                    type="password"
                    placeholder="Enter your confirm password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="relative flex justify-between">
                  <div className="absolute right-3 p-[2px] rounded-xl overflow-hidden border-animate bg-gradient-to-r from-[#0b2f68] to-[#982822] mt-5">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#0B031C] cursor-pointer flex items-center justify-center text-[#edf4e3] font-medium">
                      submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default forgetPassword;
