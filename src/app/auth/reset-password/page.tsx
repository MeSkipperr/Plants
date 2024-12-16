"use client"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import axios from "axios";
import { CircularProgress } from '@mui/material';
import InputField from "@/components/inputField";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { isValidEmail } from "@/libs/utils/validator";
import { Toaster, toast } from 'sonner';

const ResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [userEmail, setUserEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = searchParams.get("token");
        const guess = searchParams.get("guess");

        if (!token || token.trim() === "" || !guess || guess.trim() === "") {
            return router.push(`/`);
        }

        axios.post('/api/auth/verify-token', {
            tokenHex: token,
            tokenGuess: guess
        }, {
            headers: {
                Authorization: process.env.NEXT_PUBLIC_API_KEY || '',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status === 200) {
                    setUserEmail(response.data.decrypted.data.userEmail)
                    setIsLoading(false);
                } else {
                    router.push('/');
                }
            })
            .catch(() => {
                router.push('/');
            });
    }, []);

    const changePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        
        setSubmitLoading(true);
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const guess = urlParams.get("guess");

        // Validate tokens and input fields
        if (!token || token.trim() === "" || !guess || guess.trim() === "") {
            toast.error("Token or guess is missing.");
            setSubmitLoading(false); 
            return;
        }

        if (!isValidEmail(userEmail)) {
            toast.error("Invalid email format.");
            setSubmitLoading(false); 
            return;
        }

        if (password.trim() === "" || confirmPassword.trim() === "") {
            toast.error("Password fields cannot be empty.");
            setSubmitLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            setSubmitLoading(false); 
            return;
        }
        
        try {
            const responses = await toast.promise(
                axios.patch(
                    "/api/auth/reset-password", 
                    {
                        userEmail,
                        newPassword: password,
                        tokenHex: token,
                        tokenGuess: guess,
                    },
                    {
                        headers: {
                            Authorization: process.env.NEXT_PUBLIC_API_KEY || "",
                        },
                    }
                ),
                {
                    loading: "Updating password...",
                    success: "Password updated successfully!",
                    error: "Failed to update password. Please try again.",
                }
            );

            return router.push(`/auth/signin`);

        } catch (error) {
            console.error("Error during API call:", error);
        } finally{
            setSubmitLoading(false)
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-dvh flex justify-center items-center ">
                <CircularProgress />
            </div>
        );
    }
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

                <h2 className="text-2xl pt-4 font-semibold">Forget Password</h2>
                <p className="text-base  ">Please enter new password for </p>
                <p className="text-base pb-8 ">{userEmail}</p>
                <form onSubmit={changePassword}>
                    <InputField
                        inputType="password"
                        inputTitle="Password"
                        value={password}
                        onChange={(value) => setPassword(value as string)}
                    />
                    <InputField
                        inputType="password"
                        inputTitle="Confirm Password"
                        value={confirmPassword}
                        onChange={(value) => setConfirmPassword(value as string)}
                        errorMsg
                    />
                    <button className="py-4 w-full bg-second rounded text-white">
                        {submitLoading ? "Loading.." : "Change Password"}
                    </button>
                </form>
                <Link href="/auth/signin" className="flex w-full justify-center items-center py-4 text-sm text-gray-500">
                    <p>Already have an account? <span className="text-black tracking-wider ">Sign in</span></p>
                </Link>
            </div>
        </div>
    );
}

export default ResetPassword;