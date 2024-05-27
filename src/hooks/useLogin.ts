"use client"

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import loginValidation from "@/validations/LoginValidation";

const useLogin = () => {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');

    const URL = process.env.NEXT_PUBLIC_URL
    const router = useRouter();

    const HandleLogin = async (userEmail: string, userPasswd: string) => {
        try {
            const res = await axios.post(`${URL}/users/login`, {
                email: userEmail,
                password: userPasswd
            })
            if (res.status == 201) {
                setErrorMessage("THIS IS A SELLER");
                return;
            }
            localStorage.setItem("token", res.data.token)
            await router.push("/");
        } catch (error: any) {
            if (error.response.data.message) {
                setErrorMessage(error.response.data.message);
                return;
            }
            setErrorMessage(error.response.data.error)
        }
    };

    const Login = (e: any) => {
        e.preventDefault();
        const res = loginValidation.safeParse({ email, passwd })
        if (!res.success) {
            setErrorMessage(res.error.errors[0].message)
            return;
        }
        HandleLogin(email, passwd)
    }
    return {
        email,
        setEmail,
        passwd,
        setPasswd,
        errorMessage,
        Login,
        setErrorMessage
    }
}

export default useLogin
