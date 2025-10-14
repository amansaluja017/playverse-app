"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { sitka } from "../layout";
import Button from "../components/Button";

function loginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      alert("invalid credentials");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-[#0B031C] flex flex-col justify-center items-center">
        <div className="relative p-[2px] rounded-xl overflow-hidden bg-gradient-to-br from-[#0b2f68] to-[#982822] items-center justify-center">
          <div className="relative p-[4rem] w-full h-full rounded-xl bg-[#0B031C]">
            <div className="">
              <div className="">
                <img className="w-20" src="/logo.svg" alt="logo" />
              </div>

              <div className="mt-2">
                <h1 className={`font-heading text-[2rem] ${sitka.className}`}>
                  Welcome Back!
                </h1>
              </div>

              <div className="flex justify-center items-center mt-4">
                <h3 className={`font-bold ${sitka.className} text-[2.5rem] text-[#edf4e3]`}>
                  Login
                </h3>
              </div>

              <div className="items-center mt-4">
                <form
                  onSubmit={handleSubmit}
                  autoComplete="true"
                  className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>

                    <input
                      className="p-2 pl-5 rounded-[27px] border #707070 border-solid placeholder:text-sm placeholder:opacity-40"
                      id="email"
                      autoComplete="true"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      size={45}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="password">Password</label>
                    <span onClick={() => router.push("/forget-password")} className="text-sm text-blue-800 cursor-pointer hover:underline">forgot password?</span>
                    </div>
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

                  <div className="flex justify-between">
                    <div className="flex gap-1 text-[#edf4e3] text-sm">
                      <span className={`${sitka.className}`}>New user?</span>
                      <span
                        onClick={() => router.push("/register")}
                        className="cursor-pointer text-[#014c9a] hover:underline">
                        register
                      </span>
                    </div>
                    <div className="mt-5">
                      <Button buttonName="login" className="py-2 px-5" type="submit" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default loginPage;
