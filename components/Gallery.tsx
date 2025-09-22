
import React, { useState } from 'react';

const images = [
  "https://picsum.photos/id/106/800/600",
  "https://picsum.photos/id/163/800/600",
  "https://picsum.photos/id/219/800/600",
];

const Arrow: React.FC<{ direction: 'left' | 'right'; onClick: () => void }> = ({ direction, onClick }) => (
    <button
        onClick={onClick}
        className={`absolute top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors z-10 ${direction === 'left' ? 'left-4' : 'right-4'}`}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {direction === 'left' ? <polyline points="15 18 9 12 15 6"></polyline> : <polyline points="9 18 15 12 9 6"></polyline>}
        </svg>
    </button>
);


const Gallery: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto relative w-full max-w-4xl h-[60vh] rounded-lg overflow-hidden shadow-xl">
        <Arrow direction="left" onClick={prevSlide} />
        <div 
          className="w-full h-full bg-center bg-cover transition-transform ease-out duration-500"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        ></div>
        <Arrow direction="right" onClick={nextSlide} />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
                <div key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}></div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
