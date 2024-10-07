"use client";

import { useEffect, useState} from "react";
import useIsMobile from "@/hooks/useIsMobile";
 
interface Curved{
    className?:string;
    height?:number;
    background?:string;
}

const Curved = ({className,background="#fff",height=300} : Curved) => {
    const isMobile = useIsMobile();
    const [radius, setRadius] = useState(0); // Nilai awal radius
    const [heightSvg, setHeightSvg] = useState(height);

    useEffect(() => {
        if(isMobile) setHeightSvg(height/0.25)
        const handleScroll = () => {
            const curvedSVG = document.getElementById("curvedSVG");
            if (curvedSVG) {
                const rect = curvedSVG.getBoundingClientRect();

                const newRadius = Math.max(rect.top - heightSvg, -100);
                setRadius(newRadius); // Update radius secara dinamis
            }
        };

        const handleScrollWithRAF = () => {
            requestAnimationFrame(handleScroll);
        };

        window.addEventListener("scroll", handleScrollWithRAF);

        return () => {
            window.removeEventListener("scroll", handleScrollWithRAF);
        };
    }, []);

    const getSvgPath = () => {
        if (typeof window === "undefined") return "";
        const windowWidth = window.innerWidth;
        console.log(`M 0 ${heightSvg} C ${windowWidth * 0.25} ${radius} ${windowWidth * 0.75} ${radius} ${windowWidth} ${height}`)
        return `M 0 ${heightSvg} C ${windowWidth * 0.25} ${radius} ${windowWidth * 0.75} ${radius} ${windowWidth} ${height}`;
    };

    return (
        <div className={`w-full h-[10   0vh] flex items-end ${className}`}>
            <svg width="100%" height={heightSvg} id="curvedSVG">
                <path
                    d={getSvgPath()}
                    fill={background}
                    style={{ transition: "d 0.3s ease out" }} 
                />
            </svg>
        </div>
    );
}

export default Curved;
