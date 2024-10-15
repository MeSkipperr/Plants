"use client"
import { useState } from "react";

const Footer = () => {
    // const [userEmail, setUserEmail] = useState("");
    return ( 
        <div className="w-full h-[50dvh]  bg-second flex flex-col  bottom-0 justify-center items-center px-2">
            <div className="w-full  h-full   flex  justify-center items-center flex-col gap-2">
                <h1 className="text-5xl lg:text-9xl  font-kaftan tracking-widest ">Plants</h1>
                <p className="text:lg lg:text-2xl text-center">Join our newsletter to keep up to date with us!</p>
                <div className="flex gap-4 w-full lg:w-1/4">
                    <input type="email" name="" id="" placeholder="Email" className="w-3/4 py-2 px-4 rounded-md text-black"/>
                    <button className="bg-third text-white  text-sm lg:text-base rounded-md px-4 py-2 flex items-center gap-2">Subscribe</button>
                </div>
            </div>
        </div>
    );
}

export default Footer;