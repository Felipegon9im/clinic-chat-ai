
import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 px-8 text-center bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-light text-[#8FA893] mb-4">O que estão comentando</h2>
        <div className="w-24 h-1 bg-[#9F656A] mx-auto mb-10"></div>
        {/* Placeholder for testimonials. Using an illustration as in the screenshot */}
        <div className="flex justify-center items-center h-40">
           <svg width="150" height="100" viewBox="0 0 200 100">
            <text x="10" y="50" fontFamily="Arial, sans-serif" fontSize="14" fill="#4A4A4A">"Excelente atendimento e profissionais!"</text>
            <text x="140" y="70" fontFamily="Arial, sans-serif" fontSize="12" fill="#8FA893">- Maria S.</text>
           </svg>
        </div>
         <button className="mt-8 bg-gradient-to-r from-[#9F656A] to-[#804247] text-white py-3 px-10 rounded-lg font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg">
          ENTRAR EM CONTATO AGORA
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
