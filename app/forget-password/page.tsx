"use client";

import React, { useState } from "react";
import OtpPanel from "../components/otpPanel";
import { sitka } from "../layout";
import { useRouter } from "next/navigation";

function forgetPassword() {
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmPassword] = useState<string>("");
  const [otpSection, setOtpSection] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const router = useRouter();

  const otpVerification = async () => {
    console.log("otp verification");

    if (!email) {
      alert("Please enter email");
      return;
    }

    try {
      const response = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (response.ok) {
        try {
          const response = await fetch("/api/auth/send-otp", {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
            }),
          });

          if (!response.ok) {
            throw new Error("failed to send otp");
          } else {
            console.log(response);

            const data = await response.json();
            console.log(data);
            setOtp(data.otp);
            setOtpSection(true);
          }
        } catch (error) {
          console.error(error);
          alert("failed to send otp");
        }
      }
    } catch (error) {
      console.error(error);
      alert("User not found");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/forget-password", {
        method: "PATCH",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
          confirmNewPassword
        })
      })

      if(response.ok) {
        alert("Your password is successfully changed")
        router.push("/login")
      } else {
        alert("failed to change the password")
      }
    } catch (error) {
      console.log(error)
      alert("server error: during changing the password")
    }
  }

  return (
    <div className="w-screen h-screen bg-[#0B031C] flex flex-col justify-center items-center">
      {otpSection && (
        <div className="absolute flex justify-center items-center z-10">
          <div
            onClick={() => setOtpSection(false)}
            className="absolute right-20 top-20 cursor-pointer z-20">
            <span className="text-white opacity-30">X</span>
          </div>
          <OtpPanel
            email={email}
            otpVerification={otpVerification}
            serverOtp={Number(otp)}
            setOtpSection={setOtpSection}
            setIsVerified={setIsVerified}
          />
        </div>
      )}
      <div className="relative w-[48rem] h-[40rem] p-[2px] rounded-xl overflow-hidden bg-gradient-to-r from-[#0b2f68] to-[#982822] items-center justify-center">
        <div className="relative w-full h-full p-6 rounded-xl bg-[#0B031C]">
          <div className="w-[77.1px] h-[30.5px] ml-10 mt-10">
            <img src="/logo.svg" alt="logo" />
          </div>

          <div>
            <h1 className={`font-heading text-[2.2rem] pl-10 mt-5 ${sitka.className}`}>
              Set Password
            </h1>
          </div>

          <div className="items-center justify-center p-5 pl-[10rem] pr-[10rem] pt-7">
            <form
              onSubmit={handleSubmit}
              autoComplete="true"
              className="flex flex-col">
              <div className="mt-5 flex flex-col">
                <label htmlFor="email">Email</label>
                <div className="relative">
                  <input
                    className="w-full mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid placeholder:text-sm placeholder:opacity-40"
                    id="email"
                    autoComplete="true"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div
                    onClick={otpVerification}
                    className="absolute right-0 bottom-0 top-[12px] rounded-tr-[27px] rounded-br-[27px] w-[79px] h-[42px] flex justify-center items-center cursor-pointer border #707070 border-solid bg-gradient-to-r from-[#0b2f68] to-[#982822]">
                    <span>verify</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col">
                <label htmlFor="password">New Password</label>
                <input
                  className="mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid placeholder:text-sm placeholder:opacity-40"
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
                  className="mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid placeholder:text-sm placeholder:opacity-40"
                  id="confirmPassword"
                  autoComplete="true"
                  type="password"
                  placeholder="Enter your confirm password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="relative flex justify-between">
                <div className="absolute right-3 p-[2px] rounded-2xl overflow-hidden border-animate bg-gradient-to-r from-[#0b2f68] to-[#982822] mt-5">
                  <button
                    type="submit"
                    className={`px-5 py-2 rounded-2xl bg-[#0B031C] cursor-pointer flex items-center justify-center text-[#edf4e3] font-medium ${sitka.className}`}>
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
