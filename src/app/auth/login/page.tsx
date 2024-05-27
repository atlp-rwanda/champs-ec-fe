"use client";

import Link from "next/link";
import Button from '@/components/Button';
import InputBox from "@/components/InputBox";
import Image from "next/image"
import useLogin from "@/hooks/useLogin";

export default function Login() {
    const { email, setEmail, setPasswd, passwd, Login, errorMessage } = useLogin();

    return (
        <>
            <main
                className="h-screen w-screen  bg-no-repeat bg-cover flex justify-center items-center  flex-col "
                style={{
                    backgroundImage: "url('/Background.png')",
                }}>
                <div className="max-w-[300px] justify-center items-center mb-5 ">
                    <h1 className="text-white text-[40px] font-bold text-center">
                        Welcome!
                    </h1>
                    <p className="text-[10px] text-center text-white font-light h-10 mt-3">
                        Use these awesome forms to login or create new account in your
                        project for free.
                    </p>
                </div>
                <div className="sm:w-[90%] sm:max-w-[450px] w-[90%] p-4  shadow-lg bg-white pb-10">
                    <div className="w-[100%] justify-center flex flex-col gap-1 items-center mt-6">
                        <h1 className="text-blue-500 font-medium mb-3">Register with</h1>
                        <Image
                            src="/google.jpg"
                            alt="Google"
                            className="shadow hover:w-[52px] cursor-pointer"
                            width={50}
                            height={50}
                        />
                        <h1 className="text-black text-[10px] mt-2">Or</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-1 mt-4 ">
                        <form onSubmit={Login} className="w-[90%] flex items-center flex-col">
                            <InputBox
                                nameuse="Email"
                                name="email"
                                type="text"
                                placeholder="Enter Email"
                                value={email}
                                handle={(e) => setEmail(e.target.value)}
                            />
                            <InputBox
                                nameuse="Password"
                                name="password"
                                type="password"
                                placeholder="Enter Password"
                                value={passwd}
                                handle={(e) => setPasswd(e.target.value)}
                            />
                            <div className=" gap-2 w-[100%]">
                                <h1 className="font-medium text-red-400 text-[13px] text-center w-[100%]">
                                    {errorMessage}
                                </h1>
                            </div>
                            <div className="w-[100%] mt-5">
                                <Button name="Log in" />
                            </div>
                        </form>
                        <div className="w-[90%] mt-3">
                            <div className="w-[100%] flex justify-center items-center justify-between mt-5">
                                <Link href="/" className="text-[13px] mb-4 text-blue-500">Forgot Password?</Link>
                            </div>
                            <div className="w-[100%] flex justify-left items-center gap-2">
                                <p className="text-[13px] mb-0">Do you have an account? </p>
                                <a
                                    href="#"
                                    className="text-blue-500 text-[13px] font-medium hover:text-blue-700"
                                >
                                    Sign Up
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </>
    );
}
