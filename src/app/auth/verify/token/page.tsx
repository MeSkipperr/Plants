'use client'
import Link from "next/link";

import {  useState } from "react";
import axios from 'axios';
import { useRouter ,useSearchParams} from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa6";
import OtpInput from "@/components/inputField/otpInput";
import { Toaster, toast } from 'sonner';



const VerifyToken = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const router = useRouter();
    const searchParams = useSearchParams();

    const [guessToken , setGuessToken] = useState('');
    
    const [checkToken, setCheckToken] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);

    const inputStyle ={
        border:"none",
        borderBottom: "1px solid #000",
        borderRadius: "0px",
        marginBottom:"2rem",
        fontWeight: 600, 
        fontSize:"1.5rem"
    }

    const verifyToken = async () => {
        setCheckToken(true);

        const token = searchParams.get('token');
        const nextPage = searchParams.get("next");
        if(!token || token.trim() === "" || guessToken.trim() === "" || !nextPage || nextPage.trim() === "" )  {
            setCheckToken(false)
            return toast.error('Missing or invalid token or next page');
        }
    
        const requestPromise = axios.post('/api/auth/verify-token', {
            tokenHex: token,
            tokenGuess: guessToken
        }, {
            headers: {
                Authorization: process.env.NEXT_PUBLIC_API_KEY || '',
                // 'Content-Type': 'application/json',
            },
        });
    
        toast.promise(
            requestPromise,
            {
                loading: 'Verifying token...',
                success: (response) => {
                    if (response.status === 200) {
                        router.push(`${nextPage}?guess=${guessToken}&token=${token}`);
                        return 'Token successfully verified!';
                    }
                    // throw new Error('Unexpected response status');
                },
                error: (error) => {
                    if (axios.isAxiosError(error)) {
                        const serverResponse = error.response?.data;
                        if (serverResponse?.errorCode === "TOKEN_EXPIRED") {
                            return "Token has expired. Please request a new one.";
                        } else if (serverResponse?.errorCode === "INVALID_TOKEN") {
                            return "Invalid token provided.";
                        }
                    }
                    return 'Verification failed. Please try again.';
                },
            }
        );
    
        requestPromise.finally(() => {
            setCheckToken(false);
        });
    };

    
    const verifyEmail = async ()=>{
        const userEmail = searchParams.get("email") ;

        if (!userEmail|| emailRegex.test(userEmail) ) {
            setCheckEmail(true)
            try {
                const response = await axios.get('/api/auth/verify-token', {
                    headers: {
                        Authorization: process.env.NEXT_PUBLIC_API_KEY,
                    },
                    params: {
                        userEmail: userEmail,
                        method:"number"
                    },
                });

                if(response.status === 200){
                    router.push(`/auth/verify/token?next=${searchParams.get('next')}&email=${userEmail}&token=${response.data.tokenEncrypt}`);
                }

                return ;
            } catch (error:unknown) {
                console.error("Unexpected error checking user:", error);
                return ;
            }finally{
                setCheckEmail(false);
            }
        };
    };


    
    
    return ( 
        <div className="w-full h-dvh flex justify-center items-center bg-[url('/background/leafplants.jpg')] bg-cover">
            <Toaster position="top-right" richColors />
            <div className="px-8  py-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white  rounded-md ">
                    <span className="w-full flex justify-between" onClick={()=>router.push('/auth/signin')}>
                        <FaArrowLeft className="m-2 text-red-500 cursor-pointer" size={20} />
                        <Link
                            href="/"
                            className="flex justify-end  gap-2 "   
                        >
                            <h1 className={`text-2xl  place-self-center text-second text-end font-kaftan`}>Plants</h1>
                        </Link>
                    </span>

                            <h2 className="text-2xl pt-4 font-semibold">Verify Your Token</h2>
                            <p className="text-base ">Please enter the verification token </p>
                            <p className="text-base pb-8">sent to your email address to proceed.</p>
                            <OtpInput length={8} onChange={setGuessToken} style={inputStyle} />
                            <p className="flex place-content-end cursor-pointer" onClick={verifyEmail}>{checkEmail?"Loading..." : "Send again?" }</p>
                            <button className="py-4 w-full bg-second rounded text-white" onClick={verifyToken}>
                                {checkToken?"Loading.." : "Next"}
                            </button>
                    <Link href="/auth/signin" className="flex w-full justify-center items-center py-4 text-sm text-gray-500">
                        <p>Already have an account? <span className="text-black tracking-wider ">Sign in</span></p>
                    </Link>
            </div>
        </div>
    );
}

export default VerifyToken;