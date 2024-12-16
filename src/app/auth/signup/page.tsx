'use client'
import Image from "next/image";
import Link from "next/link";


import InputField from "@/components/inputField";
import {  useState } from "react";
import { signIn } from 'next-auth/react';
import { useSearchParams,useRouter  } from 'next/navigation';
import axios, { AxiosError } from 'axios';

import { Toaster, toast } from 'sonner'

import { FaArrowLeft } from "react-icons/fa6";
import handleKeyPress from "@/libs/utils/handleKeyPress";

const SignUp = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const searchParams = useSearchParams();
    const router = useRouter();

    const callbackUrl = searchParams.get('callbackUrl');


    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userConfirmPass, setUserConfirmPass] = useState('');
    
    const [checkEmail, setCheckEmail] = useState(false);
    const [loadingSignup, setLoadingSignup] = useState(false);

    const [nextFormPage, setNextFormPage] = useState(false);

    const checkUserEmail = async ()=>{

        if (emailRegex.test(userEmail)) {
            setCheckEmail(true)
            try {
                await axios.get(`/api/user`, {
                params: {
                    userEmail: userEmail,
                },
                headers: {
                    Authorization: process.env.NEXT_PUBLIC_API_KEY || '', 
                },
                });
                toast.error('A user with this email already exists.');
                return ;
            } catch (error:unknown) {
                const axiosError = error as AxiosError;
                if (axiosError.response && axiosError.response.status === 404) {
                    setNextFormPage(true)
                } else {
                    toast.error('Unexpected error checking user');
                    console.error("Unexpected error checking user:", error);
                }
                return ;
            } finally{
                setCheckEmail(false);
            }
        };
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(
            !emailRegex.test(userEmail) ||
            !userName?.trim() ||
            !userPass?.trim() ||
            !userConfirmPass?.trim()
        ) return toast.error('Input cannot be empty!');

        if (userPass.length < 8 || !/\d/.test(userPass)) return toast.error('Password must be at least 8 characters and include a number!');
        
        if(userPass !==  userConfirmPass) return toast.error('Password not match');

        try {
            // Gunakan `toast.promise` untuk memantau proses asinkron
            await toast.promise(
                signIn('credentials', {
                username: userName,
                password: userPass,
                email: userEmail,
                callbackUrl: callbackUrl || "/",
            }),
            {
                loading: 'Signing up...',
                success: (user) => {
                if (user?.error === null && user?.status === 200 && user?.ok === true) {
                    window.location.href = user.url || "/";
                    return 'Sign-up successful!';
                    } else if (user?.error === "CredentialsSignin" && user?.status === 401) {
                    return 'Invalid credentials! Sign-up failed.';
                }
                    return 'Unexpected response from server.';
                },
                error: 'Sign-up failed. Please try again.',
                }
            );
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred during sign-up.');
        } finally {
            setLoadingSignup(false);
        }
        
    };

    return ( 
        <div className="w-full h-dvh flex justify-center items-center bg-[url('/background/leafplants.jpg')] bg-cover">
            <Toaster position="top-right" richColors />

            <div className="px-8  py-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white  rounded-md">
                    <span className="w-full flex justify-between" onClick={()=>router.push('/auth/signin')}>
                        <FaArrowLeft className="m-2 text-red-500 cursor-pointer" size={20} />
                        <Link
                            href="/"
                            className="flex justify-end  gap-2 "   
                        >
                            <h1 className={`text-2xl  place-self-center text-second text-end font-kaftan`}>Plants</h1>
                        </Link>
                    </span>
                    <h2 className="text-2xl pt-4 font-semibold">Create an account</h2>
                    <p className="text-base pb-8 ">Please enter your details.</p>
                    {
                        !nextFormPage  ? 
                            <>
                                <InputField
                                    inputType="email"
                                    inputTitle="Email"
                                    value={userEmail} 
                                    onChange={(value) => setUserEmail(value as string)}
                                    errorMsg
                                    onKeyPress={(event) => handleKeyPress(event, checkUserEmail)}
                                />
                                <button className="py-4 w-full bg-second rounded text-white" onClick={checkUserEmail}>
                                    {checkEmail?"Loading.." : "Next"}
                                </button>
                                <div className="flex justify-center items-center w-full h-10 relative">
                                    <span className="absolute bg-white px-4 text-gray-500 text-sm">Or sign in with</span>
                                    <div className="w-full border"></div>
                                </div>
                                <button className="flex items-center w-full justify-center bg-white border-2   py-4 rounded" onClick={() => signIn('google',  { callbackUrl: callbackUrl || '/' })}       >
                                    <Image
                                        src="/icons/google.svg" 
                                        alt="Google logo"
                                        className="w-6 h-6 mr-2"
                                        width={100}
                                        height={100}
                                    />
                                    Sign in with Google
                                </button>
                            </>
                        :
                        <>
                        <FaArrowLeft size={20} className="mb-4 cursor-pointer" onClick={()=>setNextFormPage(false)} />
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                                <InputField 
                                    inputType="username"
                                    inputTitle="Full Name"
                                    value={userName} 
                                    onChange={(value) => setUserName(value as string)}
                                    />
                                <InputField 
                                    inputType="password"
                                    inputTitle="Password"
                                    value={userPass} 
                                    onChange={(value) => setUserPass(value as string)}
                                    errorMsg
                                    />
                                <InputField 
                                    inputType="password"
                                    inputTitle="Confirm Password"
                                    value={userConfirmPass} 
                                    onChange={(value) => setUserConfirmPass(value as string)}
                                    errorMsg
                                    />
                                <button type="submit" className="py-4 w-full bg-second rounded text-white">
                                    {!loadingSignup?"Sign in":"Loading..."}
                                </button>
                        </form>
                        </>
                    }
                    <Link href="/auth/signin" className="flex w-full justify-center items-center py-4 text-sm text-gray-500">
                        <p>Already have an account? <span className="text-black tracking-wider font-semibold">Sign in</span></p>
                    </Link>
            </div>
        </div>
    );
}

export default SignUp;