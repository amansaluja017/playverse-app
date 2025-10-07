"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
        <div className="relative w-[50rem] h-[37rem] p-[2px] rounded-xl overflow-hidden bg-gradient-to-br from-[#0b2f68] to-[#982822] items-center justify-center">
          <div className="relative w-full h-full p-6 rounded-xl bg-[#0B031C]">
            <div className="p-10">
              <div className="w-[77.1px] h-[30.5px] ml-10">
                <img src="/logo.svg" alt="logo" />
              </div>

              <div className="mt-3">
                <h1 className="font-heading text-[2rem] pl-10">
                  Welcome Back!
                </h1>
              </div>

              <div className="flex justify-center items-center mt-10">
                <h3 className="mt-[1.4px] font-bold pl-10 font-segoe-ui text-[2rem] leading-[1.37px] text-[#edf4e3]">
                  Login
                </h3>
              </div>

              <div className="items-center p-5 pl-[10rem] pr-[10rem] pt-7">
                <form
                  onSubmit={handleSubmit}
                  autoComplete="true"
                  className="flex flex-col">
                  <div className="mt-5 flex flex-col">
                    <label htmlFor="email">Email</label>

                    <input
                      className="mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid"
                      id="email"
                      autoComplete="true"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mt-5 flex flex-col">
                    <div className="flex justify-between items-center">
                      <label htmlFor="password">Password</label>
                    <span onClick={() => router.push("/forget-password")} className="text-sm text-blue-800 cursor-pointer hover:underline">forgot password?</span>
                    </div>
                    <input
                      className="mt-[0.8rem] p-2 pl-5 rounded-[27px] border #707070 border-solid"
                      id="password"
                      autoComplete="true"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-between">
                    <div className="mt-3 flex gap-1 text-[#edf4e3] text-sm">
                      <span>New user?</span>
                      <span
                        onClick={() => router.push("/register")}
                        className="cursor-pointer text-[#014c9a] hover:underline">
                        register
                      </span>
                    </div>
                    <div className="p-[2px] rounded-xl overflow-hidden border-animate bg-gradient-to-br from-[#0b2f68] to-[#982822] mt-5">
                      <button
                        type="submit"
                        className="py-2 px-6 rounded-xl bg-[#0B031C] cursor-pointer flex items-center justify-center text-[#edf4e3] font-medium">
                        login
                      </button>
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
