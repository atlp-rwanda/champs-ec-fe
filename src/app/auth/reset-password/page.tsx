'use client'
import React from 'react';
import InputBox from '@/components/InputBox';
import {Button} from '@/components/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import passwordValidation from '@/validations/ResetValidation';
import ResetPassword from '@/hooks/reset';
import PopUpModels from '@/components/PopUpModels';

type FormField = z.infer<typeof passwordValidation>;

const resetpassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormField>({
    resolver: zodResolver(passwordValidation),
  });
   const { success,handlemoduleButton,HandleReset,sendPassword, errorMessage, setErrorMessage, loading} = ResetPassword();


  const onSubmit: SubmitHandler<FormField> = (data,reset) => {
    setErrorMessage('');
    sendPassword(data.password,data.confirmPassword);
  };



  return (
    <>
    <div className='  flex min-w-[100%] h-[100vh]  content-center justify-center  flex-col'>
      <div className='mt-7 flex content-center justify-center '>
      <div className="  w-full sm:max-w-xs md:max-w-md lg:max-w-lg px-4 items-center mb-5 text-center ">
          <h1 className="text-black text-[26px] ">
            Reset Your Password
          </h1>
          <p className="text-[16px]  text-gray font-light h-10 mt-3">
            Please insert your new password you'd like to use
          </p>
          </div>
      </div>
    <div className="flex flex-col justify-center items-center gap-1 mt-4 ">
    <form
     onSubmit={handleSubmit(onSubmit)}
    className="w-full sm:max-w-xs md:max-w-md lg:max-w-lg px-4 flex items-center flex-col"
  >
              <InputBox
              value={''} type="password"
              nameuse="New Password"
              placeholder="New Password"
              {...register('password')}
              error={errors.password?.message as string}              />
              <InputBox
              value={''} type="Password"
              nameuse="Confirm Password"
              placeholder="Confirm Password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message as string}              />
    <div className=" gap-2 w-[100%]">
      <h1 className="font-medium text-warningRed text-[13px] w-[100%]">
      {errorMessage}
      </h1>
    </div>
    <div className="w-[100%] mt-5">
      <Button name="Reset" loading={loading} />
    </div>
  </form>

  </div>
  </div>
  {success && (
        <PopUpModels
          handleButton={handlemoduleButton}
          testid="updatetest"
          bodyText=" Your password has been reset. "
          topText="Password Reset  ✅"
          iconImagelink="/Verified.png"
        />
      )}
  </>
  )
}
export default resetpassword


