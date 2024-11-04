"use client"

import { useSearchParams } from 'next/navigation';

import InputField from "@/components/inputField";
import {  useState } from "react";
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const ResetPassword = () => {
    const searchParams = useSearchParams();

    const [userName, setUserName] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userConfirmPass, setUserConfirmPass] = useState('');
    const [errorPassword, setErrorPassword] = useState<string>("");
    
    const [loadingSignup, setLoadingSignup] = useState(false);


    const token = searchParams.get('token');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        

        if (userPass.length < 8 || !/\d/.test(userPass)) return
        
        if(userPass !==  userConfirmPass) return setErrorPassword('Password not match');
        setErrorPassword('')

        try {
            setLoadingSignup(true);
            const user = await signIn('credentials', {
                username: userName,
                password: userPass,
                email:userEmail,
                callbackUrl: callbackUrl || "/"
            });
            console.log(user)
        } catch (error) {
            console.error('Error submitting form:', error);
        }finally {
            setLoadingSignup(false);
        }
    };

    
    return (
        <div className="w-full h-dvh flex justify-center items-center bg-[url('/background/leafplants.jpg')] bg-cover">
            <div className="px-8  py-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white  rounded-md">
                    <Link
                        href="/"
                        className="flex justify-end  gap-2 "   
                    >
                        <h1 className={`text-2xl  place-self-center text-second text-end font-kaftan`}>Plants</h1>
                    </Link>
                    <h2 className="text-2xl pt-4 font-semibold">Reset Password</h2>
                    <p className="text-base pb-8 ">Please enter your password.</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
                        setErrorMsg={errorPassword}
                        />
                    <button type="submit" className="py-4 w-full bg-second rounded text-white">
                        {!loadingSignup?"Sign in":"Loading..."}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;