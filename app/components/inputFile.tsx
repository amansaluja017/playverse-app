"use client";

import React, { JSX } from "react";
import { motion, useAnimation } from "framer-motion";

function inputFile(): JSX.Element {
  const controls = useAnimation();
  return (
    <div className="flex justify-center ">
      <div className="w-[8rem] h-[8rem] bg-black rounded-2xl hover:drop-shadow-cyan-500/50 fill-cyan-300 drop-shadow-lg">
        <motion.div
          animate={controls}
          whileHover={{
            x: 20,
            y: 20,
            transition: { type: "spring", stiffness: 500, damping: 150 },
          }}
          onHoverEnd={() => {
            controls.start({
              x: 0,
              y: 0,
              transition: { type: "spring", stiffness: 100, damping: 12 },
            });
          }}
          className="w-full h-full p-[2px] overflow-hidden bg-gradient-to-br from-[#0b2f68] to-[#982822] rounded-2xl">
          <div className="w-full h-full bg-[#131111] rounded-2xl flex items-center justify-center cursor-pointer">
            <span className="text-7xl font-extralight">+</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default inputFile;
