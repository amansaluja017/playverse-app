"use client";

import React, {
  Dispatch,
  JSX,
  SetStateAction,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

function otpPanel({
  serverOtp,
  setOtpSection,
  setIsVerified,
  email,
  otpVerification,
}: {
  serverOtp: number;
  setOtpSection: Dispatch<SetStateAction<boolean>>;
  setIsVerified: Dispatch<SetStateAction<boolean>>;
  email: string;
  otpVerification: () => Promise<void>;
}): JSX.Element {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState<number>(59);
  const [timeLeftInMinutes, setTimeLeftInMinutes] = useState<number>(1);

  const otpRef = useRef<(HTMLInputElement | null)[]>([]);
  const resendRef = useRef<HTMLButtonElement>(null);
  const otpId = useId();

  const verifyOtp = () => {
    const value = otp.join("");

    if (serverOtp === Number(value)) {
      alert("otp verified");
      setOtpSection(false);
      setIsVerified(true);
    } else {
      alert("please enter valid otp");
    }
  };

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
    if (timeLeftInSeconds <= 0 && timeLeftInMinutes <= 0) {
      resendRef.current?.removeAttribute("disabled");
      return;
    } else if (timeLeftInMinutes > 0 || timeLeftInSeconds > 0) {
      resendRef.current?.setAttribute("disabled", "true");
    }

    const timer = setInterval(() => {
      setTimeLeftInSeconds((prev) => prev - 1);
    }, 1000);

    if (timeLeftInSeconds === 0) {
      setTimeLeftInSeconds(5);
      setTimeLeftInMinutes((prev) => prev - 1);
    }

    return () => clearInterval(timer);
  }, [timeLeftInSeconds, timeLeftInMinutes]);

  return (
    <div className="backdrop-blur-lg bg-gradient-to-br from-[#0b2f68]/40 to-[#982822]/40 w-[685px] h-[578px] rounded-[74px]">
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="flex items-center flex-col gap-3">
          <h4 className="font-bold text-2xl">Verify your email</h4>
          <p>we send otp on your email <span className="italic text-blue-700">{email}</span></p>
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
          <button
            className="cursor-pointer text-blue-900 disabled:opacity-45 disabled:cursor-not-allowed"
            ref={resendRef}
            onClick={() => {
              setTimeLeftInSeconds(59);
              setTimeLeftInMinutes(1);
              otpVerification();
            }}>
            Resend
          </button>
        </div>

        <div
          onClick={verifyOtp}
          className="rounded-2xl border-white border-2 mt-5">
          <button className="py-1 px-6 cursor-pointer">verify</button>
        </div>
      </div>
    </div>
  );
}

export default otpPanel;
