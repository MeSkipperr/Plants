import Curved from "@/components/curved";
import Navbar from "@/components/navbar";
import Image from "next/image";

import { MdSunny } from "react-icons/md";
import { GiWateringCan } from "react-icons/gi";
import { PiPlantFill } from "react-icons/pi";
import SlideCard from "@/components/slideCard";

export default function Home() {
  return (
    <main className="w-full">
      <Navbar/>
      <div className="w-full h-[210dvh] relative flex flex-col">
        <div className="w-full h-dvh bg-second flex justify-center text-white text-5xl fixed items-center ">
          <div className="relative h-full w-full flex justify-center items-center flex-col pb-[10%]">
            <h1 className="text-3xl">PLANT MAKE LIFE</h1>
            <h1 className="text-8xl lg:text-[20rem]   text-transparent font-outline-4">BETTER</h1>
            <div className="absolute inset-0 flex justify-center items-end lg:items-center z-20 pt-[10%] ">
              <Image 
              src="/assets/header.png"
              alt="lidah buaya"
              width={1920}
              height={1080}
              className="w-full lg:w-2/4"
              />
              <div className="w-full lg:w-1/4 h-3/4  absolute flex justify-around items-end pb-16">
                <button className="text-lg lg:text-2xl font-semibold tracking-wider  bg-third px-7 py-2 lg:py-4 lg:px-10 rounded-md">Book Now</button>
                <button className="text-lg lg:text-2xl font-semibold tracking-wider  bg-primary text-second px-7 py-2 lg:py-4 lg:px-10 rounded-md">Explore</button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-auto  text-5xl flex justify-center items-center z-10  flex-col">
          <Curved background="rgb(255 250 250)"/>
          <div className="w-full h-auto lg:h-dvh  flex-col  flex items-center bg-primary ">
            <div className="w-full lg:w-3/4 h-full  gap-6 relative flex flex-col lg:flex-row justify-center items-center">
              <div className="w-full h-auto lg:w-auto relative lg:h-3/4  flex justify-center items-end px-2">
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
                    <MdSunny className="bg-third p-2 lg:p-4 text-4 lg:text-7xl rounded-full text-primary"/>
                    <span className="font-semibold text-base lg:text-xl">Sun</span>
                    <p className="text-base lg:text-lg text-second">Bright, indirect light.</p>
                  </li>
                  <li className="flex flex-col justify-center items-center text-center">
                    <GiWateringCan className="bg-third p-2 lg:p-4  text-4 lg:text-7xl  rounded-full text-primary"/>
                    <span className="font-semibold text-base lg:text-xl">Water</span>
                    <p className="text-base lg:text-lg text-second">Keep soil consistently moist.</p>
                  </li>
                  <li className="flex flex-col justify-center items-center text-center">
                    <PiPlantFill className="bg-third p-2 lg:p-4  text-4 lg:text-7xl rounded-full text-primary"/>
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
          <div className="w-full h-[80dvh]  flex-col  flex items-center bg-primary relative border-red-500 border">
            <SlideCard/>
          </div>
          <div className="w-full h-dvh  flex-col  flex items-center bg-primary ">
          </div>
        </div>
      </div>
    </main>
  );
}


// <div className="w-full h-dvh flex-col lg:flex-row flex items-center justify-center bg-primary px-2 ">
// <div className="w-full h-1/4 lg:w-1/4 lg:h-2/4 rounded-md mt-10 flex justify-center items-end relative border">
//   <div className="absolute inset-10 mt-20 bg-second"></div>
  // <Image 
  //   src="/assets/monsteradeliciosa.png"
  //   alt="lidah buaya"
  //   width={1920}
  //   height={1080}
  //   className="w-[150%] h-full z-10 border object-contain"
  //   />
// </div>
// <div className="w-full h-auto lg:h-full lg:w-1/2 border-2 flex flex-grow lg:flex-grow-0"></div>
// <Image 
//   src="/assets/monsteradeliciosa.png"
//   alt="lidah buaya"
//   width={1920}
//   height={1080}
//   className="w-full lg:w-2/4"
//   />
// </div>