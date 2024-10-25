'use client'
import Image from "next/image";
import { signIn } from 'next-auth/react';
import { useSearchParams  } from 'next/navigation';



const SignIn = () => {
    const searchParams = useSearchParams();

    const callbackUrl = searchParams.get('callbackUrl');


    return ( 
        <div className="w-full h-dvh flex justify-center items-center">
            <div className="px-8  py-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
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
            </div>
        </div>
    );
}

export default SignIn;