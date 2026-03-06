"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Edit3Icon } from "lucide-react";

function ProfileSection() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="flex justify-center items-center flex-col gap-10 relative">
        <Edit3Icon onClick={() => router.push("/update-details")} className="text-red-500 absolute right-0 top-0 cursor-pointer" />
      <div className="flex items-center gap-4">
        <div className="h-30 w-30 rounded-full bg-green-700 flex justify-center items-center">
          {session?.user.image && (
            <img src={session.user.image} className="w-full h-full rounded-full" alt="profile image"></img>
          )}
        </div>
        <div className="flex items-center flex-col">
          <span className="text-3xl">{session?.user.name}</span>
          <span>{session?.user.email}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white rounded-full text-black flex justify-center items-center ">
          <button className="p-2 px-5 rounded-full cursor-pointer">
            Your Account
          </button>
        </div>

        <div className="bg-white rounded-full text-black flex justify-center items-center">
          <button className="p-2 px-5 rounded-full cursor-pointer">
            Your Videos
          </button>
        </div>

        <div className="bg-white rounded-full text-black flex justify-center items-center">
          <button className="p-2 px-5 rounded-full cursor-pointer">
            Manage
          </button>
        </div>

        <div className="bg-white rounded-full text-black flex justify-center items-center">
          <button
            onClick={() => router.push("/change-password")}
            className="p-2 px-5 rounded-full cursor-pointer">
            change password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
