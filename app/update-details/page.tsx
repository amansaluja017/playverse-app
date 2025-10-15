"use client"

import React, { useState } from "react";
import Container from "../components/Container";
import { sitka } from "../layout";
import Button from "../components/Button";
import OtpPanel from "../components/otpPanel";
import { apiClient } from "@/utils/api-client";
import { useRouter } from "next/navigation";

function page() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpSection, setOtpSection] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isVerified) {
      alert("Please verify your email first");
      return;
    }

    try {
      const response = await apiClient.updateDetails({name, email});

      if (!response) {
        alert("failed to update details")
      }
      console.log(response);

      router.push("/");
    } catch (error) {
      console.error(error);
      alert("internal error during update details");
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
    <Container>
      <div className="w-screen h-screen bg-[#0B031C] flex flex-col items-center p-20">
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
        <div>
          <h1 className={`text-[2.7rem] ${sitka.className}`}>Update Details</h1>
        </div>
        <div className="relative p-[2px] rounded-xl overflow-hidden bg-gradient-to-br from-[#0b2f68] to-[#982822] items-center justify-center">
          <div className="relative w-full h-full px-3 py-15 rounded-xl bg-[#0B031C]">
            <div className="items-center justify-center p-4">
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

                <div className="flex justify-between relative">
                  <div className="mt-5 absolute right-0">
                    <Button
                      type="submit"
                      buttonName="submit"
                      className="py-2 px-4"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default page;
