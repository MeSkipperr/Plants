"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";
import Link from "next/link";
import StarRating from "./card/starRate";

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
    {
        image: "/assets/lidahmertua.png",
        title: "Lidah Mertua",
        price: "$15",
        star: 5
    },
    {
        image: "/assets/monsteradeliciosa.png",
        title: "Mostera Delicioasa aasss  sss aaaaa",
        price: "$10",
        star: 4.5
    },
];

const SlideCard = () => {
    const cards = [...content];
    const [currentIndex, setCurrentIndex] = useState(Math.floor(cards.length / 2));

    const divOverflow = useRef<HTMLDivElement | null>(null);
    const leftPadding = useRef<HTMLDivElement | null>(null);

    // Create refs for each card element with correct typing
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const goToNextCard = () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex((prevIndex) =>
                prevIndex === cards.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    const goToPreviousCard = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? cards.length - 1 : prevIndex - 1
            );
        }
    };

    useEffect(() => {
        if (divOverflow.current && cardRefs.current[currentIndex]) {
            const containerWidth = divOverflow.current.clientWidth;
            const card = cardRefs.current[currentIndex];
            const cardRect = card?.getBoundingClientRect();
            const containerRect = divOverflow.current.getBoundingClientRect();
            
            // Calculate the distance to scroll to center the middle card
            const scrollLeftValue = (cardRect.left + cardRect.width / 2) - (containerRect.left + containerWidth / 2);
            
            // Smooth scroll to the calculated position
            divOverflow.current.scrollTo({
                left: divOverflow.current.scrollLeft + scrollLeftValue,
                behavior: "smooth",
            });
            }
        }, [currentIndex, cards.length]);
    


    return (
        <div className="h-full w-full broder  lg:w-3/4 flex flex-col justify-center items-center   relative ">

                <div className="absolute  top-0 place-self-center bottom-0  left-0 w-1/4 h-3/4 lg:h-full  bg-gradient-to-r from-primary to-transparent flex justify-start items-center z-10">
                    <button className="p-5 mr-10 " onClick={goToPreviousCard}>
                        <IoIosArrowBack className="text-xl text-black"/>
                    </button>
                </div>
                <div className="absolute  top-0 place-self-center bottom-0  right-0 w-1/4 h-3/4 lg:h-full  bg-gradient-to-l from-primary to-transparent flex justify-end items-center z-10">
                    <button className="p-5 ml-10 " onClick={goToNextCard}>
                        <IoIosArrowForward className="text-xl text-black"/>
                    </button>
                </div>
            <div className={`w-full h-full flex gap-10 justify-start  items-center overflow-x-hidden whitespace-nowrap scroll-smooth  `} ref={divOverflow}>
                <div className="z-0 flex-shrink-0 flex justify-center items-center m-3 transition-all duration-700 ease-out transform w-[80rem] h-48 bg-primary scale-100 snap-center relative" ref={leftPadding}></div>

                {cards.map((card, index) => (
                    <div
                        key={index}
                        ref={(el) => {
                            cardRefs.current[index] = el;
                        }}
                        className={`flex-shrink-0 flex justify-center items-center m-3 snap-center transition-all duration-[500ms] ease-in-out transform ${index === currentIndex
                            ? "h-3/4 w-1/2 lg:w-1/3  lg:h-3/4 text-white scale-110 cursor-pointer relative  "
                            : "h-2/4 w-1/2 lg:w-1/3 scale-100 "
                            }`}
                    >
                        <Image
                            src={card.image}
                            alt={card.title}
                            width={1920}
                            height={1080}
                            className={` object-contain
                            ${index === currentIndex ? "w-auto h-full" : "w-auto h-3/4"}    
                            `}
                        />
                        {index===currentIndex &&
                            <div className="flex justify-between items-center gap-2 absolute bottom-10 px-4 py-2 w-auto max-w-[100%] lg:w-auto mb-10  place-items-center bg-second bg-opacity-50 rounded-lg">
                                <div className="text-lg flex flex-col font-semibold  w-2/4">
                                    <span className="flex">
                                        <StarRating rating={card.star}/>
                                    </span>
                                    <span className="truncate text-sm">{card.title}</span> 
                                    <span className="font-semibold text-base lg:text-lg">{card.price}</span>
                                </div>
                                <div className="flex flex-col justify-center  items-center gap-2 w-2/4 ">
                                    <Link href={""} className="py-2 px-2 text-sm bg-second rounded-sm">
                                        <button className="">+ Add to cart</button>
                                    </Link>
                                    <Link href={""} className="py-2 px-2 text-sm underline ">
                                        <button className="">Detail</button>
                                    </Link>
                                </div>
                            </div>
                        }
                    </div>
                ))}
                <div className="absolute right-0 left-0 bottom-20 lg:bottom-0  flex justify-center items-center gap-3  p-4 rounded-lg ">
                {cards.map((card, index) => (
                    <span
                    key={index}
                    className={`${
                        index === currentIndex
                        ? "size-2 bg-third shadow-lg transition-all duration-500 ease-in-out transform scale-125"
                        : "size-1 bg-second"
                    } rounded-full transition-all duration-500 ease-in-out`}
                    ></span>
                ))}
                </div>

                <div className="flex-shrink-0 flex justify-center items-center m-3 transition-all duration-700 ease-out transform w-[40rem] h-48 bg-primary scale-100 snap-center"></div>
                <div className="flex-shrink-0 flex justify-center items-center m-3 transition-all duration-700 ease-out transform w-[40rem] h-48 bg-primary scale-100 snap-center"></div>
            </div>


        </div>
    );
};

export default SlideCard;
