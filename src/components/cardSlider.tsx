"use client"
import React, { useState } from 'react';

const CardScroller = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [1, 2, 3, 4];

  const scrollLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const scrollRight = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gray-100">
      <div className="relative w-4/5 overflow-hidden flex justify-center items-center">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2"
          onClick={scrollLeft}
        >
          ‹
        </button>

        <div
          className="flex transition-transform duration-700 ease-out items-center"
          style={{
            transform: `translateX(${
              -currentIndex * (180 + 24) + 90 /* Adjust for centering */
            }px)` // 180 (card width) + 24 (total margin)
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`flex justify-center items-center m-3 transition-all duration-700 ease-out transform ${
                index === currentIndex
                  ? 'w-48 h-48 bg-red-500 text-white scale-110'
                  : 'w-32 h-32 bg-gray-300 scale-100'
              }`}
            >
              {card}
            </div>
          ))}
        </div>

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2"
          onClick={scrollRight}
        >
          ›
        </button>
      </div>

      <div className="absolute bottom-10 w-full flex justify-between px-10">
        <button
          className="bg-gray-800 text-white px-4 py-2"
          onClick={scrollLeft}
        >
          Kembali
        </button>
        <button
          className="bg-gray-800 text-white px-4 py-2"
          onClick={scrollRight}
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
};

export default CardScroller;
