"use client"
import Image from "next/image";
import { FaRegHeart ,FaHeart } from "react-icons/fa";
import { useSearchParams,useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

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


const PlantsProduct = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [category, setCategory] = useState<string | null>(null);

    const listCategory = ["indoor","outdoor","flowering","cacti"]

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        
        // Jika categoryParam ada
        if (categoryParam) {
            const lowercaseCategory = categoryParam.toLowerCase();

            setCategory(lowercaseCategory)
    
          // Jika category tidak ada dalam listCategory
        if (!listCategory.includes(lowercaseCategory)) {
            // Menghapus category dari URL
            const params = new URLSearchParams(searchParams.toString());
            params.delete('category');
            const newUrl = `/plants?${params.toString()}`;
            setCategory(null)
            // Navigasi ke URL baru tanpa param category
            router.push(newUrl);
        }
    }
    }, [searchParams, router]);


    const produtLike = false;
    return ( 
        <main className="w-full flex flex-col items-center ">
            <div className="w-full h-dvh flex flex-col pt-20 px-4 lg:w-3/4 place-self-center">
                <h1 className="font-kaftan text-second text-6xl capitalize">{category} plants </h1>
                <p className="py-4">Category</p>
                <div className="w-full   flex justify-start items-center gap-2 overflow-x-auto">
                    <button className="py-1 px-4 bg-lightGreen rounded-sm shadow-sm">All</button>
                    <button className="py-1 px-4 bg-lightGreen rounded-sm shadow-sm">Indoor</button>
                    <button className="py-1 px-4 bg-lightGreen rounded-sm shadow-sm">Outdoor</button>
                    <button className="py-1 px-4 bg-lightGreen rounded-sm shadow-sm">Flowering </button>
                    <button className="py-1 px-4 bg-lightGreen rounded-sm shadow-sm">Cacti </button>
                </div>
                <ul className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 pt-10">
                    {content.map((card, index) => (
                        <li key={index} className="w-full aspect-square bg-[#fff] shadow-lg p-2 lg:p-4">
                            <div className="w-full h-[70%]">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    width={1000}
                                    height={1000}
                                    className="  h-full object-contain bg-lightGreen "
                                />
                            </div>
                            <p className="font-semibold tracking-wide  pt-2 flex  items-center justify-between text-sm truncate lg:text-lg">
                                {card.title}
                                {produtLike? 
                                    <FaHeart className="text-red-500 cursor-pointer lg:size-5"/>
                                    :
                                    <FaRegHeart className="cursor-pointer lg:size-5"/>    
                                }
                            </p>
                            <p className="truncate text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <button className=" text-second  py-2 rounded-md text-sm lg:text-lg w-full flex items-center justify-between  self-start font-bold">
                                {card.price}
                                <p >Add to cart</p>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default PlantsProduct;