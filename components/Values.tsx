
import React from 'react';

const CrueltyFreeLogo = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#9F656A"/>
        <path d="M15.59 7.41L14.18 6 12 8.18 9.82 6 8.41 7.41 10.59 9.59 8.41 11.77l1.41 1.41L12 11.41l2.18 2.18 1.41-1.41L13.41 9.59l2.18-2.18zM12 14.5c-1.93 0-3.5-1.57-3.5-3.5H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-1.5c0 1.93-1.57 3.5-3.5 3.5z" fill="#9F656A"/>
        <text x="5" y="19" fontFamily="Arial" fontSize="3" fill="#9F656A">cruelty free</text>
    </svg>
);

const VeganFriendlyLogo = () => (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.03 16.2l-4.24-4.24 1.41-1.41 2.83 2.83 5.66-5.66 1.41 1.41-7.07 7.07z" fill="#8FA893"/>
        <text x="4" y="19" fontFamily="Arial" fontSize="3" fill="#8FA893">vegan friendly</text>
    </svg>
);


const Values: React.FC = () => {
  return (
    <section className="py-20 px-8 text-center bg-[#FAF8F5]">
      <div className="container mx-auto">
        <h3 className="text-2xl md:text-3xl font-light text-gray-700 mb-8">
          Não utilizamos produtos testados em animais.
        </h3>
        <div className="flex justify-center items-center space-x-12">
          <div className="flex flex-col items-center">
             <img src="https://i.imgur.com/Y5SMb0c.png" alt="Cruelty Free" className="h-20 w-20"/>
          </div>
          <div className="flex flex-col items-center">
            <img src="https://i.imgur.com/k28hWv7.png" alt="Vegan Friendly" className="h-20 w-20"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Values;
