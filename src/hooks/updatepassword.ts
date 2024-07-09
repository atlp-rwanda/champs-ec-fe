import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { RootState } from '@/redux/store';
import {
  PasswordData,
  updatePassword,
} from '@/redux/slices/UpdatePasswordSlice';
import { clearError } from '@/redux/slices/UpdatePasswordSlice';

function UpdatePassword() {
  const router = useRouter();
  const { loadings, erro } = useAppSelector(
    (state: RootState) => state.updatePassword,
  );
  const [success, setSuccess] = useState(false);

  const dispatch = useAppDispatch();

  const submit = async (FormData: PasswordData) => {
    const result = await dispatch(updatePassword(FormData));
    const resultStatus = await result.payload?.status;
    if (resultStatus === 200) {
      setSuccess(true);
    }
  };

  const handlemoduleButton = () => {
    window.location.reload();
    setSuccess(false);
  };

  const ClearDispatch = () => {
    dispatch(clearError());
  };
  return {
    submit,
    erro,
    FormData,
    success,
    handlemoduleButton,
    loadings,
    ClearDispatch,
  };
}

export default UpdatePassword;
