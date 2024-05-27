import React, { useState } from 'react';
import axios from 'axios';

function useSignup() {
  const [showModal, setShowmodal] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [FormData, setFormData] = useState(initial);
  const [error, setError] = useState('');
  //BUTTON MODEL HANDLERS
  const handlemoduleButton = () => {
    window.location.href = '/auth/login';
  };
  //show models handle function
  const handleShowModal = () => {
    setShowmodal(!showModal);
  };
  const submit = async (FormData: any) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/users/signup`,
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
      return console.log('error here', error.response.data.error);
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
