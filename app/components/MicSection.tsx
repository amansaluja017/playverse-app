"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

function MicSection({
  transcript,
  setMicSectionPanel,
  isListening,
  setIsListening
}: {
  transcript: string;
  setMicSectionPanel: Dispatch<SetStateAction<boolean>>;
  isListening: boolean,
  setIsListening: Dispatch<SetStateAction<boolean>>
}) {

  return (
    <div className="h-[30rem] w-[30rem] flex justify-center items-center rounded-2xl shadow-2xl bg-black fixed inset-0 m-auto z-50">
      <motion.div
        animate={
          isListening
            ? {
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 0px #014C9A",
                  "0 0 20px #014C9A",
                  "0 0 0px #014C9A",
                ],
              }
            : { scale: 1, boxShadow: "0 0 0px #FFD700" }
        }
        transition={{
          duration: 1,
          repeat: isListening ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="rounded-full cursor-pointer"
        onClick={() => {
          setIsListening(false);
          setMicSectionPanel(false);
        }}>
        <Mic size={150} className="p-4 bg-[#014C9A] rounded-full" />
      </motion.div>

      <div>
        <p>{transcript}</p>
      </div>
    </div>
  );
}

export default MicSection;
