'use client'
import Link from "next/link";

import InputField from "@/components/inputField";
import {  useState } from "react";
import axios from 'axios';
import { useRouter ,useSearchParams} from 'next/navigation';    
import { FaArrowLeft } from "react-icons/fa6";
import handleKeyPress from "@/libs/utils/handleKeyPress";


const VerifyEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const router = useRouter();
    const searchParams = useSearchParams();

    const [userEmail, setUserEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState<string>("");
    
    const [checkEmail, setCheckEmail] = useState(false);


    const verifyEmail = async ()=>{
        if (emailRegex.test(userEmail)) {
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
                setErrorEmail("A user with this email not exists.")
                console.error("Unexpected error checking user:", error);
                return ;
            }finally{
                setCheckEmail(false);
            }
        };
    };

    


    return ( 
        <div className="w-full h-dvh flex justify-center items-center bg-[url('/background/leafplants.jpg')] bg-cover">
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

                    <h2 className="text-2xl pt-4 font-semibold">Forget Password</h2>
                    <p className="text-base pb-8 ">Please enter your details.</p>
                    <InputField
                        inputType="email"
                        inputTitle="Email"
                        value={userEmail} 
                        onChange={(value) => setUserEmail(value as string)}
                        errorMsg
                        setErrorMsg={errorEmail}
                        onKeyPress={(event) => handleKeyPress(event, verifyEmail)}
                    />
                    <button className="py-4 w-full bg-second rounded text-white" onClick={verifyEmail}>
                        {checkEmail?"Loading.." : "Next"}
                    </button>
                    <Link href="/auth/signin" className="flex w-full justify-center items-center py-4 text-sm text-gray-500">
                        <p>Already have an account? <span className="text-black tracking-wider ">Sign in</span></p>
                    </Link>
            </div>
        </div>
    );
}

export default VerifyEmail;