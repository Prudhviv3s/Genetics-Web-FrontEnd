import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { Header } from '../components/Header';
import { Button } from '../components/Button';

export default function OTPVerificationScreen() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = () => {
    navigate('/role-selection');
  };

  return (
    <MobileContainer>
      <Header title="Verify Email" />
      
      <div className="p-6 flex flex-col min-h-[calc(100vh-64px)] justify-center">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <Shield size={40} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Verify Your Email
          </h2>
          <p className="text-sm text-gray-600 px-4">
            We've sent a 6-digit verification code to<br />
            <span className="font-medium text-gray-900">your.email@example.com</span>
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ))}
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Didn't receive the code?
          </p>
          <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
            Resend Code
          </button>
        </div>

        <Button onClick={handleVerify} fullWidth>
          Verify Email
        </Button>
      </div>
    </MobileContainer>
  );
}