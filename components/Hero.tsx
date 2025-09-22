
import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="relative bg-[#FAF8F5] h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-[#9F656A] rounded-full opacity-50" style={{ borderRadius: '0 100% 100% 0 / 0 100% 100% 0' }}></div>
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-[#9F656A] rounded-full opacity-50" style={{ borderRadius: '100% 0 0 100% / 100% 0 0 100%' }}></div>
            <div className="absolute bottom-0 -left-1/4 w-2/3 h-2/3 bg-[#8FA893] rounded-full opacity-50" style={{ borderRadius: '0 100% 0 0 / 0 100% 0 0' }}></div>
            
            <div className="absolute top-20 right-20 opacity-30">
                <svg width="150" height="100" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 100V1H149" stroke="#8FA893" strokeWidth="0.5"/>
                    <path d="M1 100C1 50.5 35 1 75 1C115 1 149 50.5 149 100" stroke="#8FA893" strokeWidth="0.5" strokeDasharray="2 2"/>
                    <path d="M20 80C20 50 45 30 75 30C105 30 130 50 130 80" stroke="#8FA893" strokeWidth="0.5"/>
                </svg>
            </div>


            <div className="text-center z-10 px-4">
                <h1 className="text-4xl md:text-5xl font-light text-[#4A4A4A]">
                    "Padrão de beleza é você <br />
                    <span className="font-semibold text-[#9F656A]">sentir-se bem"</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-gray-600">
                    Clínica Vehe
                </p>
                <p className="text-md md:text-lg text-gray-500">
                    Oka Campeche, Florianópolis
                </p>
            </div>
        </section>
    );
};

export default Hero;
