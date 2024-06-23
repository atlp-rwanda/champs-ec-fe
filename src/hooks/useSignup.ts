import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function useSignup() {
  const router = useRouter();
  const [showModal, setShowmodal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, []);

  // const [FormData, setFormData] = useState(initial);
  const [error, setError] = useState('');

  //BUTTON MODEL HANDLERS
  const handlemoduleButton = () => {
    router.push('/auth/login');
  };

  //show models handle function
  const handleShowModal = () => {
    setShowmodal(!showModal);
  };
  const submit = async (FormData: any) => {
    setLoading(true);

    try {
      ('use server');
      const response = await axios.post(
        `${process.env.URL}/users/signup`,
        {
          firstName: FormData.firstName,
          lastName: FormData.lasttName,
          email: FormData.email,
          password: FormData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (response) {
        setLoading(false);
        setShowmodal(!showModal);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.error);
      return;
    }
  };

  return {
    submit,
    handleShowModal,
    handlemoduleButton,
    setError,
    error,
    showModal,
    setShowmodal,
    FormData,
    loading,
  };
}

export default useSignup;
