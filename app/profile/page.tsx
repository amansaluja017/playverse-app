import React from "react";
import Container from "../components/Container";
import ProfileSection from "../components/ProfileSection";
import ProfileVideoSection from "../components/ProfileVideoSection";

function Profile() {
  return (
    <Container>
      <div className="bg-[#0B031C] flex text-white">
        <div className="w-[70%] flex">
          <ProfileVideoSection />
        </div>
        <div className="w-[30%] flex justify-start items-center flex-col p-8 shadow-2xl shadow-[#014C9A]/50">
          <ProfileSection />
        </div>
      </div>
    </Container>
  );
}

export default Profile;
