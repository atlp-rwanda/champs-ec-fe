'use client';
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Button from '@/components/Button';
import { otpValidation } from '@/validations/otpValidations';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RootState } from '../redux/store';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  handleOTPVerification,
  resendOTPCode,
} from '@/redux/slices/2faAuthenticationSlice';
import GlobarPopUp from './UsablePopUp';

interface OtpVerifyInterface {
  isOpen: boolean;
}
const OtpVerify: React.FC<OtpVerifyInterface> = ({ isOpen }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [input, setInput] = useState(Array(6).fill(''));
  const itemsRef = useRef<(HTMLInputElement | null)[]>([]);

  const URL = process.env.NEXT_PUBLIC_URL;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, newOtp, isAuthenticated } = useAppSelector(
    (state: RootState) => state.sellerOTP,
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/sellers');
    }
  }, [isAuthenticated]);

  const ResendCode = async () => {
    setInput(Array(6).fill(''));
    let otp = input.join('');
    dispatch(resendOTPCode(otp));
  };

  const VerifyOtp = async () => {
    var otp = input.join('');
    const result = otpValidation.safeParse({ otp });
    dispatch(handleOTPVerification(otp));
  };
  const HandleInput = (
    index: number,
    element: React.ChangeEvent<null | HTMLInputElement>,
  ) => {
    const value = element.target.value;
    const newValue = [...input];
    if (value === '') {
      newValue[index] = value;
      setInput(newValue);
      if (itemsRef.current[index]?.value === '') {
        itemsRef.current[index - 1]?.focus();
      }
      return;
    }
    if (value.length > 1) return;
    newValue[index] = value;
    setInput(newValue);
    if (index < itemsRef.current.length - 1) {
      itemsRef.current[index + 1]?.focus();
    }
  };
  return (
    <>
      {isOpen && (
        <GlobarPopUp width="sm:w-[60%]">
          <img
            src="/otp_removebg.png"
            alt="OTP LOGO"
            width={100}
            height={100}
            className="m-auto"
          />
          <h2
            className="text-[30px] text-center m-2"
            data-testid="trigger-element"
          >
            Two Step Verification
          </h2>
          <div className="w-[90%] sm:w-[50%] md:w-[70%] m-auto mt-10">
            <p className="text-center sm:text-[20px] text-[13px]">
              We have sent a verification code via your email please enter here
            </p>
          </div>
          <div className="flex justify-center p-4 gap-5 w-[100%] m-auto">
            {input.map((value, index) => (
              <input
                data-testid="otpInput"
                key={index}
                type="number"
                className="min-h-[80px] w-[10%] sm:w-[6%] border border-black rounded-[10px] text-[30px] text-center inputOtp"
                value={value}
                onChange={(e) => HandleInput(index, e)}
                ref={(el: any) => (itemsRef.current[index] = el)}
              />
            ))}
          </div>
          <div>
            <h1 className="text-center text-warningRed text-[15px] my-4 sm:text-[20px]">
              {error}
            </h1>
          </div>
          <div className="m-auto w-[90%] sm:w-[50%] flex flex-col md:flex-row gap-2">
            {newOtp ? (
              <p>Wait for new OTP code ........ </p>
            ) : (
              <>
                <p>Didn't get the code?</p>
                <Link href="#" onClick={ResendCode} className="text-greenMain">
                  Resend code
                </Link>
              </>
            )}
          </div>
          <div className="w-[90%] sm:w-[50%] m-auto mt-5">
            {loading ? (
              <div className="border-t-4 border-b-4 border-blue-900 rounded-full w-6 h-6 animate-spin m-auto"></div>
            ) : (
              <Button name="Verify" data-testid="verify" handle={VerifyOtp} />
            )}
          </div>
        </GlobarPopUp>
      )}
    </>
  );
};
export default OtpVerify;
