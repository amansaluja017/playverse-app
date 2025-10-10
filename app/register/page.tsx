"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import OtpPanel from "../components/otpPanel";
import { sitka } from "../layout";
import Button from "../components/Button";

function registerPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setComfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [otpSection, setOtpSection] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isVerified) {
      alert("Please verify your email first");
      return;
    }

    if (password !== confirmPassword) {
      alert("password and confirm password does not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          isVerified,
        }),
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("registration failed");
      }

      const data = await response.json();

      console.log(data);
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("failed to register user");
    }
  };

  const otpVerification = async () => {
    console.log("otp verification");

    if (!email) {
      alert("Please enter email");
      return;
    }

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
  };

  return (
    <>
      <div className="w-screen h-screen bg-[#0B031C] flex flex-col justify-center items-center">
        {otpSection && (
          <div className="absolute flex justify-center items-center z-10">
            <div
              onClick={() => setOtpSection(false)}
              className="absolute right-20 top-20 cursor-pointer z-20">
              <span className="text-white opacity-30">X</span>
            </div>
            <OtpPanel
              serverOtp={Number(otp)}
              setOtpSection={setOtpSection}
              setIsVerified={setIsVerified}
              email={email}
              otpVerification={otpVerification}
            />
          </div>
        )}

        <div className="relative w-[54rem] h-[43rem] p-[2px] rounded-xl overflow-hidden bg-gradient-to-br from-[#0b2f68] to-[#982822] items-center justify-center">
          <div className="relative w-full h-full p-6 rounded-xl bg-[#0B031C]">
            <div className="w-[77.1px] h-[30.5px] ml-10 mt-10">
              <img src="/logo.svg" alt="logo" />
            </div>

            <div>
              <h1 className={`text-[2.7rem] pl-10 ${sitka.className}`}>
                Create Account
              </h1>
              <p className="mt-[1.4px] mr-[103.4px] ml-[0.6px] pl-10 opacity-24 font-segoe-ui text-[1rem] leading-[1.37px] text-left text-[#edf4e3]">
                Dive into the new world
              </p>
            </div>

            <div className="items-center justify-center p-5 pl-[10rem] pr-[10rem] pt-7">
              <form
                onSubmit={handleSubmit}
                autoComplete="true"
                className="flex flex-col">
                <div className="flex flex-col">
                  <label className="" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid placeholder:text-sm placeholder:opacity-40"
                    id="name"
                    autoComplete="true"
                    type="text"
                    placeholder="Enter your name eg: John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mt-5 flex flex-col">
                  <label htmlFor="email">Email</label>
                  <div className="relative">
                    <input
                      className="w-full mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid placeholder:text-sm placeholder:opacity-40"
                      id="email"
                      autoComplete="true"
                      type="email"
                      placeholder="Enter your email eg: johndoe123@gmail.com"
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
                  <label htmlFor="password">Password</label>
                  <input
                    className="mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid placeholder:text-sm placeholder:opacity-40"
                    id="password"
                    autoComplete="true"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mt-5 flex flex-col">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    className="mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid placeholder:text-sm placeholder:opacity-40"
                    id="confirmPassword"
                    autoComplete="true"
                    type="password"
                    placeholder="Enter your confirm password"
                    value={confirmPassword}
                    onChange={(e) => setComfirmPassword(e.target.value)}
                  />
                </div>

                <div className="flex justify-between">
                  <div className="mt-3 flex gap-1 text-[#edf4e3] text-sm">
                    <span className={`${sitka.className}`}>Already have a account?</span>
                    <span
                      onClick={() => router.push("/login")}
                      className="cursor-pointer text-[#014c9a] hover:underline">
                      login
                    </span>
                  </div>
                  <div className="mt-5">
                    <Button type="submit" buttonName="Register" className="py-2 px-4" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default registerPage;
