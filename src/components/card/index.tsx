"use client"
import Image from "next/image";
import {IoIosArrowForward  } from "react-icons/io";
import Link from "next/link";

const content = [
    {
        image: "/assets/lidahbuaya.png",
        title: "Lidah Buaya",
        price: "$10",
        star: 3.5
    },
    {
        image: "/assets/lidahmertua.png",
        title: "Lidah Mertua",
        price: "$15",
        star: 5
    },
    {
        image: "/assets/monsteradeliciosa.png",
        title: "Mostera Delicioasa",
        price: "$10",
        star: 4.5
    },
    {
        image: "/assets/lidahbuaya.png",
        title: "Lidah Buaya",
        price: "$10",
        star: 4.5
    },
]

interface CardProps {
    className?: string;
    // data: CardData[];
    url?:string;
}



const Card: React.FC<CardProps> = ({ className = '',url = "" }) => {
    return ( 
        <>
            {content.map((card, index) => (
                <li key={index} className={`w-full bg-lightGreen p-x aspect-video  flex flex-col justify-center items-center rounded-sm relative ${className}`}>
                    <Image
                    src={card.image}
                    alt={card.title}
                    width={1000}
                    height={1000}
                    className="  h-full object-contain  "
                    />
                    <p className="text-second text-lg lg:text-xl font-semibold  flex justify-between w-full absolute right-0 left-0 bottom-2 px-2">{card.title}
                        <Link href={url} className="text-base lg:text-lg  text-second flex justify-center items-center underline">
                            See more
                            <IoIosArrowForward/>
                        </Link>
                    </p>
                </li>
            ))}
        </>
    );
}

export default Card;