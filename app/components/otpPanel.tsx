"use client";

import React, { JSX, useEffect, useId, useRef, useState } from "react";

function otpPanel(): JSX.Element {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState<number>(59);
  const [timeLeftInMinutes, setTimeLeftInMinutes] = useState<number>(1);

  const otpRef = useRef<(HTMLInputElement | null)[]>([]);
  const otpId = useId();

  const handleOtp = (value: string, i: number) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[i] = value;
    setOtp(newOtp);

    if (value && i < otp.length - 1) {
      otpRef.current[i + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "Backspace" && i > 0 && !otp[i]) {
      otpRef.current[i - 1]?.focus();
    }
  };

  useEffect(() => {
    if (timeLeftInSeconds <= 0 && timeLeftInMinutes <= 0) return;

    const timer = setInterval(() => {
      setTimeLeftInSeconds((prev) => prev - 1);
    }, 1000);

    if (timeLeftInSeconds === 0) {
      setTimeLeftInSeconds(59);
      setTimeLeftInMinutes((prev) => prev - 1);
    }

    return () => clearInterval(timer);
  }, [timeLeftInSeconds, timeLeftInMinutes]);

  const handleResend = () => {
    setTimeLeftInMinutes(1);
    setTimeLeftInSeconds(59);
  };

  return (
    <div className="backdrop-blur-lg bg-gradient-to-br from-[#0b2f68]/40 to-[#982822]/40 w-[685px] h-[578px] rounded-[74px]">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="flex items-center flex-col gap-3">
          <h4 className="font-bold text-2xl">Verify your email</h4>
          <p>we send otp on your email jo*******3@gmail.com</p>
        </div>

        <div className="flex gap-3 mt-10">
          {otp.map((value, i) => (
            <input
              className="border-2 border-white rounded-xl w-12 h-12 text-center"
              key={i}
              id={otpId + i}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleOtp(e.target.value, i)}
              ref={(el) => {
                otpRef.current[i] = el;
              }}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>

        <div className="flex gap-4 mt-3">
          {timeLeftInSeconds > 0 && (
            <span>
              {timeLeftInSeconds < 10
                ? `${timeLeftInMinutes}:0${timeLeftInSeconds}`
                : `${timeLeftInMinutes}:${timeLeftInSeconds}`}
            </span>
          )}
          <span
            className="cursor-pointer text-blue-900"
            onClick={() => handleResend()}>
            Resend
          </span>
        </div>

        <div className="rounded-2xl border-white border-2 mt-5">
          <button className="py-1 px-6 cursor-pointer">verify</button>
        </div>
      </div>
    </div>
  );
}

export default otpPanel;
