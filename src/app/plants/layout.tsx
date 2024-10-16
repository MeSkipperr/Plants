import type { Metadata } from "next";

import Navbar from "@/components/navbar";



export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
    };

export default function PlantsLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <body
            className={` antialiased `}
        >
            <Navbar transparent={false}/>
            {children}
        </body>
        </html>
    );
}   
