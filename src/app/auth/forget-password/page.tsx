'use client'
import Link from "next/link";

import InputField from "@/components/inputField";
import {  useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa6";


const SignUp = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const router = useRouter();

    const [userEmail, setUserEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState<string>("");


    const [verifyCode, setVerifyCode] = useState<number | undefined>(undefined);
    const [encodeToken, setEncodeToken] = useState<string>("");
    const [verifyTokenLoading, setVerifyTokenLoading] = useState<boolean>(false);
    const [tokenError, setTokenError] = useState<string>("");
    
    const [checkEmail, setCheckEmail] = useState(false);

    const [sendAgainLoading, setSendAgainLoading] = useState<boolean>(false);

    const [nextFormPage, setNextFormPage] = useState(false);

    const nextHandle = async ()=>{
        if (emailRegex.test(userEmail)) {
            setCheckEmail(true)
            setSendAgainLoading(true)
            try {
                const response = await axios.get('/api/auth/verify-token', {
                    headers: {
                        Authorization: process.env.NEXT_PUBLIC_API_KEY,
                    },
                    params: {
                        userEmail: userEmail,
                    },
                });
                setEncodeToken(response.data.token);    
                setNextFormPage(true)
                console.log(response.data.token)
                return ;
            } catch (error:unknown) {
                setErrorEmail("A user with this email not exists.")
                console.error("Unexpected error checking user:", error);
                return error;
            }finally{
                setCheckEmail(false);
                setSendAgainLoading(false)
            }
        };
    };

    const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            await nextHandle();
        }
    };
    const verifyToken = async () => {
        setVerifyTokenLoading(true);
        if (!verifyCode) return;
    
        console.log("encodeToken:", encodeToken);
        try {
            const response = await axios.post('/api/auth/verify-token', 
                { tokenEncode: encodeToken, tokenDecode: verifyCode },
                {
                    headers: {
                        Authorization: process.env.NEXT_PUBLIC_API_KEY,
                    },
                }
            );
    
            console.log("Verification Response:", response);
            if (response.status === 200) {
                console.log("Redirecting to reset-password");
                await router.push(`/auth/reset-password?token=${encodeToken}&inputToken=${verifyCode}`);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                // If error is an AxiosError and contains response data, use its message
                setTokenError(error.response.data.message || "An error occurred");
            } else {
                // Handle any other type of error or unexpected issues
                setTokenError("An unexpected error occurred");
            }
            console.error("Verification error:", error);
        } finally {
            setVerifyTokenLoading(false);
        }
    };

    return ( 
        <div className="w-full h-dvh flex justify-center items-center bg-[url('/background/leafplants.jpg')] bg-cover">
            <div className="px-8  py-6 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white  rounded-md ">
                    {/* <span className="w-full flex justify-end">
                        <FaTimes className="m-2 text-red-500 cursor-pointer" size={20} />
                    </span> */}
                    <Link
                        href="/"
                        className="flex justify-end  gap-2 "   
                    >
                        <h1 className={`text-2xl  place-self-center text-second text-end font-kaftan`}>Plants</h1>
                    </Link>
                    {
                        !nextFormPage  ? 
                        <>
                                <h2 className="text-2xl pt-4 font-semibold">Forget Password</h2>
                                <p className="text-base pb-8 ">Please enter your details.</p>
                                <InputField
                                    inputType="email"
                                    inputTitle="Email"
                                    value={userEmail} 
                                    onChange={(value) => setUserEmail(value as string)}
                                    errorMsg
                                    setErrorMsg={errorEmail}
                                    onKeyPress={handleKeyPress}
                                />
                                <button className="py-4 w-full bg-second rounded text-white" onClick={nextHandle}>
                                    {checkEmail?"Loading.." : "Next"}
                                </button>
                            </>
                        :
                        <>
                            <FaArrowLeft size={20} className="mb-4 cursor-pointer" onClick={()=>setNextFormPage(false)} />
                            <h2 className="text-2xl pt-4 font-semibold">Enter Verification Code</h2>
                            <p className="text-base  ">{`To open this link, enter the code we just`}</p>
                            <p className="text-base pb-8 ">{`emailed to ${userEmail}.`}</p>
                            <InputField
                                inputType="Number"
                                inputTitle="Enter code"
                                value={verifyCode} 
                                onChange={(value) => setVerifyCode(typeof value === "string" ? parseInt(value) : value)}
                                errorMsg
                                setErrorMsg={tokenError}
                            />
                            <p className="flex justify-end"> <span className=" underline tracking-wider cursor-pointer" onClick={nextHandle}>
                                {
                                    sendAgainLoading ? 
                                    "Loading" :
                                    "Send again"
                                }
                            </span></p>
                            <button className="py-4 w-full bg-second rounded text-white" onClick={verifyToken}>
                                {verifyTokenLoading?"Loading.." : "Verify"}
                            </button>
                        </>
                    }
                    <Link href="/auth/signin" className="flex w-full justify-center items-center py-4 text-sm text-gray-500">
                        <p>Already have an account? <span className="text-black tracking-wider ">Sign in</span></p>
                    </Link>
            </div>
        </div>
    );
}

export default SignUp;