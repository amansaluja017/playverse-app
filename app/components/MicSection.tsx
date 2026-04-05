"use client";

import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { poppins } from "../layout";

function MicSection({
  transcript,
  setMicSectionPanel,
  isListening,
  setIsListening,
}: {
  transcript: string;
  setMicSectionPanel: Dispatch<SetStateAction<boolean>>;
  isListening: boolean;
  setIsListening: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="h-[50%] w-[40%] flex flex-col justify-center items-center gap-4 rounded-2xl shadow-2xl bg-black fixed inset-0 m-auto z-50">
      <motion.div
        animate={
          isListening ?
            {
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

      <div className="text-center p-3">
        <p className={`${poppins.className} text-xl`}>{transcript}</p>
      </div>
    </div>
  );
}

export default MicSection;
