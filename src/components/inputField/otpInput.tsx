'use client';

import React, { useState, useRef, useEffect } from 'react';

interface OtpInputProps {
  length: number;
  onChange: (value: string) => void;
  typeNumber?: boolean;
  style?: React.CSSProperties;
  width?: number;
  color?: string;
  bgColor?: string;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  focusBorder?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length,
  onChange,
  typeNumber = true,
  onKeyPress,
  width = 40, // Default width per input
  color = '#000',
  bgColor = '#fff',
  style = {},
  focusBorder = "0 0 0 2px #3b82f6",
  
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    onChange(otp.join(''));
  }, [otp, onChange]);

  const handleChange = (index: number, newValue: string) => {
    if (!/^\d*$/.test(newValue) && typeNumber) return;
    if (newValue.length > 1) return; // Only allow one character

    const newOtp = [...otp];
    newOtp[index] = newValue;
    setOtp(newOtp);

    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text').slice(0, length).split('');
    const newOtp = otp.map((_, i) => pasteData[i] || '');
    setOtp(newOtp);
    inputRefs.current[pasteData.length - 1]?.focus();
  };

  const styles: { [key: string]: React.CSSProperties } = {
    inputStyle: {
      width: `${width}px`,
      height: '40px',
      textAlign: 'center',
      border: '2px solid #d1d5db', // border-gray-300
      borderRadius: '6px',
      backgroundColor: bgColor,
      color: color,
      outline: 'none',
      fontSize: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'box-shadow 0.2s ease-in-out',
      ...style  
    },
    focusStyle: {
      boxShadow: focusBorder, // ring-2 ring-blue-500

    },
    containerStyle: {
      display: 'flex',
      gap: '8px', // space-x-2
    },
  };

  return (
    <div style={styles.containerStyle}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          ref={(el) => {
            if (el) inputRefs.current[index] = el;
          }}
          onKeyPress={onKeyPress}
          style = {styles.inputStyle} 
        />
      ))}
    </div>
  );
};

export default OtpInput;
