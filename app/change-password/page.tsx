"use client"

import React, { useState } from "react";
import Button from "../components/Button";
import { sitka } from "../layout";
import Container from "../components/Container";
import { apiClient } from "@/utils/api-client";
import { useRouter } from "next/navigation";

function page() {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await apiClient.updateDetails({
        oldPassword,
        confirmPassword,
        password: newPassword,
      });

      if (!response) {
        alert("failed to change the password");
        return;
      }

      router.push("/profile");
      console.log(response);
    } catch (error) {
      console.error(error);
      alert("internal error: failed to change the password");
    }
  };

  return (
    <Container>
      <div className="w-screen h-screen bg-[#0B031C] flex flex-col items-center p-20">
        <div>
          <h1 className={`text-[2.7rem] ${sitka.className}`}>
            Change Password
          </h1>
        </div>
        <div className="relative p-[2px] rounded-xl overflow-hidden bg-gradient-to-br from-[#0b2f68] to-[#982822] items-center justify-center">
          <div className="relative w-full h-full px-3 py-15 rounded-xl bg-[#0B031C]">
            <div className="items-center justify-center p-4">
              <form
                onSubmit={handleSubmit}
                autoComplete="true"
                className="flex flex-col px-[5rem]">
                <div className="flex flex-col gap-2">
                  <label className="" htmlFor="old_password">
                    Old Password
                  </label>
                  <input
                    className="p-2 pl-5 rounded-[27px] border #707070 border-solid placeholder:text-sm placeholder:opacity-40"
                    id="old_password"
                    type="password"
                    placeholder="Enter your old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    size={45}
                  />
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <label htmlFor="new_password">New Password</label>
                  <div className="relative">
                    <input
                      className="w-full p-2 pl-5 rounded-[27px] border #707070 border-solid placeholder:text-sm placeholder:opacity-40"
                      id="new_password"
                      type="password"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <label htmlFor="confirm_password">confirm Password</label>
                  <div className="relative">
                    <input
                      className="w-full p-2 pl-5 rounded-[27px] border #707070 border-solid placeholder:text-sm placeholder:opacity-40"
                      id="confirm_password"
                      type="password"
                      placeholder="Enter your confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
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
