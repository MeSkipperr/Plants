"use client "
import Curved from "@/components/curved";
import Navbar from "@/components/navbar";
import Image from "next/image";

import { MdSunny } from "react-icons/md";
import { GiWateringCan } from "react-icons/gi";
import { PiPlantFill } from "react-icons/pi";
import SlideCard from "@/components/slideCard";
import Card from "@/components/card";
import StarRating from "@/components/card/starRate";
import Footer from "@/components/footer";


const Home = () => {
    return (
        <main>
            <Navbar />
            <div className="w-full h-full relative flex flex-col">
                <div className="w-full relative flex justify-center flex-col z-20">
                    <div className="w-full flex justify-center items-center text-5xl text-white h-dvh bg-second sticky top-0">
                        <div className="relative h-full w-full flex justify-center items-center flex-col pb-[10%]">
                            <h1 className="text-3xl">PLANT MAKE LIFE</h1>
                            <h1 className="text-8xl lg:text-[20rem]   text-transparent font-outline-4">BETTER</h1>
                            <div className="absolute inset-0 flex justify-center items-end lg:items-center z-20  ">
                                <Image
                                    src="/assets/header.png"
                                    alt="lidah buaya"
                                    width={1920}
                                    height={1080}
                                    className="w-full lg:w-2/4 object-cover  place-self-end"
                                />
                                <div className="w-full lg:w-1/4 h-3/4  absolute flex justify-around items-end pb-16">
                                    <button className="text-lg lg:text-2xl font-semibold tracking-wider  bg-third px-7 py-2 lg:py-4 lg:px-10 rounded-md">Book Now</button>
                                    <button className="text-lg lg:text-2xl font-semibold tracking-wider  bg-primary text-second px-7 py-2 lg:py-4 lg:px-10 rounded-md">Explore</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <Curved background="rgb(255 250 250)" className="sticky top-0 h-[20vh]" />
                    </div>
                    <div className="">
                        <div className="w-full h-auto flex justify-center items-center text-white  bg-gray-600 sticky top-0 flex-col">
                            <div className="w-full h-auto lg:h-dvh  flex-col  flex items-center bg-primary ">
                                <div className="w-full lg:w-3/4 h-full  gap-6 relative flex flex-col lg:flex-row justify-center items-center">
                                    <div className="w-full h-auto lg:w-auto relative lg:h-3/4  flex justify-center items-end px-2 ">
                                        <div className="absolute bottom-0 sm:right-1/4 sm:left-1/4 right-2 left-2 lg:right-0 lg:left-0 place-items-center bg-second h-1/2 lg:h-3/4"></div>
                                        <Image
                                            src="/assets/monsteradeliciosa.png"
                                            alt="lidah buaya"
                                            width={1920}
                                            height={1080}
                                            className="w-3/4 lg:w-auto lg:h-full h-auto z-10  object-contain "
                                        />
                                    </div>
                                    <div className="lg:w-2 px-2 flex flex-grow flex-col text-second gap-2 justify-start items-start">
                                        <h3 className="text-lg lg:text-3xl font-semibold text-second">Indoor <span className="text-third font-semibold">Plants</span></h3>
                                        <h1 className="text-4xl lg:text-7xl text-second">MONSTEDERA</h1>
                                        <h1 className="text-4xl lg:text-7xl text-second">DELICIOSA</h1>
                                        <p className="text-lg lg:text-2xl w-3/4 text-second">Monstera deliciosa is a popular houseplant with large, fenestrated leaves that thrives in tropical environments.</p>
                                        <ul className="w-3/4 flex gap-4 py-4">
                                            <li className="flex flex-col justify-center items-center text-center">
                                                <MdSunny className="bg-third p-2 lg:p-4 text-4 lg:text-7xl rounded-full text-primary" />
                                                <span className="font-semibold text-base lg:text-xl">Sun</span>
                                                <p className="text-base lg:text-lg text-second">Bright, indirect light.</p>
                                            </li>
                                            <li className="flex flex-col justify-center items-center text-center">
                                                <GiWateringCan className="bg-third p-2 lg:p-4  text-4 lg:text-7xl  rounded-full text-primary" />
                                                <span className="font-semibold text-base lg:text-xl">Water</span>
                                                <p className="text-base lg:text-lg text-second">Keep soil consistently moist.</p>
                                            </li>
                                            <li className="flex flex-col justify-center items-center text-center">
                                                <PiPlantFill className="bg-third p-2 lg:p-4  text-4 lg:text-7xl rounded-full text-primary" />
                                                <span className="font-semibold text-base lg:text-xl">Soil</span>
                                                <p className="text-base lg:text-lg text-second">Use well-draining, loose soil.</p>
                                            </li>
                                        </ul>
                                        <button className="bg-second text-white py-4 px-5 rounded-md text-base lg:text-lg w-auto self-start">
                                            $30 - Add to cart
                                        </button>

                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-[80dvh]  flex-col  flex items-center bg-primary relative ">
                                <SlideCard />
                            </div>
                            <div className="w-full h-auto  flex-col  flex justify-center items-center bg-primary ">
                                <div className="w-3/4  h-auto flex-col  flex justify-center items-center relative gap-2">
                                    <p className="text-second px-2 text-xl font-semibold lg:text-4xl">Plant Categories</p>
                                    <ul className="w-full lg:w-3/4  h-auto grid grid-cols lg:grid-cols-2 gap-4 px-4">
                                        <Card />
                                    </ul>
                                </div>
                            </div>
                            <div className="w-full h-auto px-4 flex-col  flex justify-center items-center bg-primary ">
                                <p className="text-second px-2 text-xl font-semibold lg:text-4xl py-4">What people say</p>
                                <div className="w-full  lg:w-3/4 my-8 h-auto gap-2 rounded-sm   flex items-center justify-center bg-primary  relative overflow-x-auto snap-x snap-mandatory">
                                    <div className="snap-center border rounded-sm w-3/4 lg:w-[30%] aspect-video flex-shrink-0 flex justify-start items-center flex-col  shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-4 py-2  ">
                                        <h3 className="flex text-lg justify-between px-2 items-center w-full font-semibold text-second">Sarah J. <StarRating rating={5} /></h3>
                                        <p className="text-lg text-second">This website is super easy to use! I found my favorite plants quickly, and the prices are very affordable.</p>
                                    </div>
                                    <div className="snap-center border rounded-sm w-3/4 lg:w-[30%] aspect-video flex-shrink-0 flex justify-start items-center flex-col  shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-4 py-2  ">
                                        <h3 className="flex text-lg justify-between px-2 items-center w-full font-semibold text-second">Amir T.  <StarRating rating={4} /></h3>
                                        <p className="text-lg text-second">{`The variety of plants is amazing! I'm really happy with my purchase, and the delivery was fast.`}</p>
                                    </div>
                                    <div className="snap-center border rounded-sm w-3/4 lg:w-[30%] aspect-video flex-shrink-0 flex justify-start items-center flex-col  shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-4 py-2  ">
                                        <h3 className="flex text-lg justify-between px-2 items-center w-full font-semibold text-second">Lina S.<StarRating rating={4.5} /></h3>
                                        <p className="text-lg text-second">A delightful shopping experience! The diverse plant categories make me want to buy more.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[50dvh]"></div>
                <div className="w-full flex justify-center items-center text-white bg-second fixed bottom-0">
                    <Footer/>
                </div>
            </div>
        </main>
    );
}

export default Home;