"use client"

import React, { useState } from 'react';
import OtpInput from '@/components/inputField/otpInput';

const OtpPage: React.FC = () => {
  const [otp, setOtp] = useState<string>('');

  const inputStyle ={
    border:"none",
    borderBottom: "1px solid #000",
    borderRadius: "0px"
  }

  return (
    <div className="flex flex-col border w-full items-center justify-center min-h-screen">
      <h1 className="mb-4 text-xl font-bold">Masukkan Kode OTP</h1>
      <OtpInput length={8} onChange={setOtp} style={inputStyle} />
      <p className="mt-4">OTP: {otp}</p>
    </div>
  );
};

export default OtpPage;
