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

        <div className="relative p-[2px] rounded-xl overflow-hidden bg-gradient-to-br from-[#0b2f68] to-[#982822] items-center justify-center">
          <div className="relative w-full h-full p-6 rounded-xl bg-[#0B031C]">
            <div className="p-4">
              <img className="max-w-20" src="/logo.svg" alt="logo" />

              <div>
                <h1 className={`text-[2.7rem] ${sitka.className}`}>
                  Create Account
                </h1>
                <p className="opacity-24 font-segoe-ui text-[1rem] leading-[1.37px] text-[#edf4e3]">
                  Dive into the new world
                </p>
              </div>
            </div>

            <div className="items-center justify-center p-5">
              <form
                onSubmit={handleSubmit}
                autoComplete="true"
                className="flex flex-col px-[5rem]">
                <div className="flex flex-col gap-2">
                  <label className="" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="p-2 pl-5 rounded-[27px] border #707070 border-solid placeholder:text-sm placeholder:opacity-40"
                    id="name"
                    autoComplete="true"
                    type="text"
                    placeholder="Enter your name eg: John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    size={45}
                  />
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <label htmlFor="email">Email</label>
                  <div className="relative">
                    <input
                      className="w-full p-2 pl-5 rounded-[27px] border #707070 border-solid placeholder:text-sm placeholder:opacity-40"
                      id="email"
                      autoComplete="true"
                      type="email"
                      placeholder="Enter your email eg: johndoe123@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div
                      onClick={otpVerification}
                      className="absolute right-0 top-0 h-full px-5 rounded-tr-[27px] rounded-br-[27px] flex justify-center items-center cursor-pointer bg-gradient-to-br from-[#0b2f68] to-[#982822]">
                      <span>verify</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <label htmlFor="password">Password</label>
                  <input
                    className="p-2 pl-5 rounded-[27px] border #707070 border-solid placeholder:text-sm placeholder:opacity-40"
                    id="password"
                    autoComplete="true"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    className="p-2 pl-5 rounded-[27px] border #707070 border-solid placeholder:text-sm placeholder:opacity-40"
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
                    <span className={`${sitka.className}`}>
                      Already have a account?
                    </span>
                    <span
                      onClick={() => router.push("/login")}
                      className="cursor-pointer text-[#014c9a] hover:underline">
                      login
                    </span>
                  </div>
                  <div className="mt-5">
                    <Button
                      type="submit"
                      buttonName="Register"
                      className="py-2 px-4"
                    />
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
