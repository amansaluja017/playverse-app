"use client";

import { useSession } from "next-auth/react";
import React, { useId } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchId = useId();

  return (
    <header className="max-w-full bg-[#0B031C]">
      <div className="flex items-center justify-between p-3 px-15">
        <div className="w-20 cursor-pointer">
          <img src="/logo.svg" alt="logo" />
        </div>

        <div>
          <i className="fa-solid fa-magnifying-glass relative left-[2rem] text-[#014C9A]"></i>
          <input
            id={searchId}
            type="text"
            placeholder="search"
            className="relative rounded-full border-2 border-[#014C9A] p-1 pl-10 pr-10"
            size={50}
          />
          <i className="fa-solid fa-microphone relative right-[2rem] text-[#014C9A] cursor-pointer"></i>
        </div>

        <div className="flex gap-10 items-center">
          <i className="fa-solid fa-bell text-2xl text-[#014C9A] cursor-pointer"></i>
          {session ? (
            <div className="rounded-full h-10 w-10 bg-blue-400 cursor-pointer">
              {/* <img src="" alt="avatar" /> */}
            </div>
          ) : (
            <div>
              <Button
                buttonName="login"
                className="py-2 px-5"
                onClick={() => router.push("/login")}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
