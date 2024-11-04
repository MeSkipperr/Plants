'use client'
import Image from "next/image";
import Link from "next/link";

// import "@/style/inputStyle.css"
import InputField from "@/components/inputField";
import { useState } from "react";
import { signIn } from 'next-auth/react';
import { useSearchParams  } from 'next/navigation';



const SignIn = () => {
    const searchParams = useSearchParams();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const callbackUrl = searchParams.get('callbackUrl');

    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(userEmail?.trim() === ""|| userPass?.trim()==="") return
        if (!emailRegex.test(userEmail)) return

        if (userPass.length < 8 || !/\d/.test(userPass)) return

        try {
            setLoadingSubmit(true);
            const user = await signIn('credentials', {
                password: userPass,
                email:userEmail,
                callbackUrl: callbackUrl || "/",
                redirect: false
            });
            if (user?.error === null && user?.status === 200 && user?.ok === true) {
                // Redirect if the sign-in is successful
                window.location.href = user.url || "/";
            } else if (user?.error === "CredentialsSignin" && user?.status === 401) {
                // Handle the error case, don't redirect
                console.error('Invalid credentials. Sign-in failed.');
            } else {
                console.log('Unexpected response:', user);
            }
    
    
            console.log(user)
            return
        } catch (error) {
            console.error('Error submitting form:', error);
            return
        }finally {
            setLoadingSubmit(false);
        }
    }

    return ( 
        <div className="w-full h-dvh flex justify-center items-center bg-[url('/background/leafplants.jpg')] bg-cover" >
            <div className="px-8  py-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white">
                    <Link
                        href="/"
                        className="flex justify-end  gap-2 "   
                    >
                        <h1 className={`text-2xl  place-self-center text-second text-end font-kaftan`}>Plants</h1>
                    </Link>
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
                        <button type="submit" className="py-4 w-full bg-second rounded text-white">
                            {!loadingSubmit?"Sign in":"Loading..."}
                        </button>
                    </form>
                    <Link href="/auth/forget-password" className="underline py-2">Forget password?</Link>
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