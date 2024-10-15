'use client'
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { useState,useEffect } from "react";

type NavbarType= {
    transparent?:boolean
}

const Navbar = ({transparent=true}:NavbarType) => {
    const [scrolled, setScrolled] = useState(!transparent);

    useEffect(() => {
    const handleScroll = () => {
        const offset = window.scrollY;
        const height = window.innerHeight * 0.60;
        if (offset > height) {
        setScrolled(true);
        } else {
        setScrolled(false);
        }

        if(!transparent){
            setScrolled(true)
        }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, []);

    return ( 
        <>
        <div className={`w-full  px-2 h-16 flex justify-center items-center z-50 fixed ${scrolled ? "bg-white border-b" : "bg-transparent "}  transition-all`}>
            <div className="w-full lg:w-3/4 flex justify-between items-center  ">
                <Link
                href="/"
                className="flex justify-center  gap-2"   
                >
                <h1 className={`text-xl  place-self-center  font-kaftan tracking-widest ${scrolled ? 'text-black' : 'text-white'}`}>PLANTS</h1>
                </Link>
                <div className="flex justify-center gap-4 items-center">
                    <Link href="/" className={`text-hover hidden lg:block ease-in ${scrolled ? 'text-black' : 'text-white'}`}>Home</Link>
                    <Link href="/" className={`text-hover hidden lg:block ease-in ${scrolled ? 'text-black' : 'text-white'}`}>About</Link>
                    <Link href="/" className={`text-hover hidden lg:block ease-in ${scrolled ? 'text-black' : 'text-white'}`}>Product</Link>
                    <Link href="/" className={`text-hover hidden lg:block ease-in ${scrolled ? 'text-black' : 'text-white'}`}>Cart</Link>
                    <Link href="/" className={`text-hover hidden lg:block ease-in ${scrolled ? 'text-black' : 'text-white'}`}>Login</Link>
                    <button className="bg-third text-white  text-sm lg:text-base rounded-md px-4 py-2 flex items-center gap-2">Book Now<FaArrowRight /></button>
                </div>
            </div>
        </div>
        </>

    );
}

export default Navbar;
