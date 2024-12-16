'use client'
import Image from "next/image";
import Link from "next/link";
import { Toaster, toast } from 'sonner'

// import "@/style/inputStyle.css"
import InputField from "@/components/inputField";
import { useState } from "react";
import { signIn } from 'next-auth/react';
import { useSearchParams ,useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa6";



const SignIn = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const callbackUrl = searchParams.get('callbackUrl');

    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (userEmail?.trim() === "" || userPass?.trim() === "") {
            toast.error('Email and password cannot be empty!');
            return;
        }
        if (!emailRegex.test(userEmail)) {
            toast.error('Invalid email format!');
            return;
        }
        if (userPass.length < 8 || !/\d/.test(userPass)) {
            toast.error('Password must be at least 8 characters and include a number!');
            return;
        }
    
        setLoadingSubmit(true);
        try {
    
            // Show loading toast
            toast.promise(
                signIn('credentials', {
                    password: userPass,
                    email: userEmail,
                    callbackUrl: callbackUrl || "/",
                    redirect: false
                }),
                {
                    loading: 'Signing in...',
                    success:(user) => {
                        
                        if (user?.error === null && user?.status === 200 && user?.ok === true) {
                            window.location.href = user.url || "/";
                            return 'Sign-in successful!';
                        } else if (user?.error === "CredentialsSignin" && user?.status === 401) {
                            return 'Invalid credentials!';
                        }
                        return 'Unexpected response from server.';
                    },
                    error: 'Sign-in failed. Please try again later.',
                }
            );
        } catch (error) {
            toast.error('An error occurred during sign-in.');
            console.error('Error submitting form:', error);
        } finally {
            setLoadingSubmit(false);
        }
    };

    
    

    return ( 
        <div className="w-full h-dvh flex justify-center items-center bg-[url('/background/leafplants.jpg')] bg-cover" >
            <Toaster position="top-right" richColors />
            <div className="px-8  py-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white">
                    <span className="w-full flex justify-between" onClick={()=>router.push('/auth/signin')}>
                        <FaArrowLeft className="m-2 text-red-500 cursor-pointer" size={20} />
                        <Link
                            href="/"
                            className="flex justify-end  gap-2 "   
                        >
                            <h1 className={`text-2xl  place-self-center text-second text-end font-kaftan`}>Plants</h1>
                        </Link>
                    </span>
                    <h2 className="text-2xl pt-4 font-semibold">Welcome back</h2>
                    <p className="text-base pb-8 ">Please enter your details.</p>
                    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
                        <InputField
                        inputType="email"
                        inputTitle="Email"
                        value={userEmail} 
                        onChange={(value) => setUserEmail(value as string)}
                        />
                        <InputField
                        inputType="password"
                        inputTitle="Password"
                        value={userPass} 
                        onChange={(value) => setUserPass(value as string)}
                        />
                        <button type="submit" disabled={loadingSubmit} className={`py-4 w-full bg-second rounded text-white ${!loadingSubmit ? "cursor-pointer" : "cursor-progress"}`}>
                            {!loadingSubmit?"Sign in":"Loading..."}
                        </button>
                    </form>
                    <Link href="/auth/verify/email?next=/auth/reset-password" className="underline py-2">Forget password?</Link>
                    <div className="flex justify-center items-center w-full h-10 relative">
                        <span className="absolute bg-white px-4 text-gray-500 text-sm">Or sign in with</span>
                        <div className="w-full border"></div>
                    </div>
                    <button className="flex items-center w-full justify-center bg-white border-2   py-4 rounded" onClick={() => signIn('google',  { callbackUrl: callbackUrl || '/' })}    >
                        <Image
                            src="/icons/google.svg" 
                            alt="Google logo"
                            className="w-6 h-6 mr-2"
                            width={100}
                            height={100}
                        />
                        Sign in with Google
                    </button>
                    <Link href="/auth/signup" className="flex w-full justify-center items-center py-4 text-sm text-gray-500"><p >{"Don't have an account? "}<span className="text-black tracking-wider font-semibold">Sign up for free</span></p> </Link>
            </div>
        </div>
    );
}

export default SignIn;