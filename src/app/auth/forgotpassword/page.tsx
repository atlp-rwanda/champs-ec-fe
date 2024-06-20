'use client'
import { Button } from '@/components/Button'
import InputBox from '@/components/InputBox'
import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import resetValidation from '@/validations/RecoverValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import recover from '@/hooks/recover';
import PopUpModels from '@/components/PopUpModels';

type FormField = z.infer<typeof resetValidation>;
const ForgotPassword = () => {
  const { handlemoduleButton,success,recoverAccount,sendEmail, errorMessage, setErrorMessage, loading} = recover();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormField>({
    resolver: zodResolver(resetValidation),
  });
  const onSubmit = (data:FormField) => {

  recoverAccount(data.email)

  };
  return (
<>
<div className='  flex min-w-[100%] h-[100vh]  content-center justify-center  flex-col'>
      <div className='mt-7 flex content-center justify-center '>
      <div className=" w-full sm:max-w-xs md:max-w-md lg:max-w-lg px-4 items-center mb-5 text-center ">
          <h1 className="text-black text-[26px] ">
           Account Recovery
          </h1>
          <p className="text-[16px]  text-gray font-light h-10 mt-3">
            Please enter your email related to your champs bay account
          </p>
          </div>
      </div>

          <div className="flex flex-col justify-center items-center gap-1 mt-4 ">
    <form
    onSubmit={handleSubmit(onSubmit)}
   className="w-full sm:max-w-xs md:max-w-md lg:max-w-lg px-4 flex items-center flex-col"
  >
    
    <InputBox
      nameuse="Email:"
      type="text"
      placeholder="example@example.com"
      {...register('email')}
      error={errors.email?.message as string}
 
    />

    <div className=" gap-2 w-[100%]">
      <h1 className="font-medium text-warningRed text-[13px] w-[100%]">

      </h1>
    </div>
    <div className="w-[100%] mt-5">
      <Button name="Send" loading={loading}  />
    </div>
  </form>
  </div>
  </div>
  {success && (
        <PopUpModels
        handleButton={handlemoduleButton}
          testid="updatetest"
          bodyText=" Password reset Instructions sent via email "
          topText="Password Reset"
          iconImagelink="/Verified.png"
        />
      )}
</>
  )
}


export default ForgotPassword 


