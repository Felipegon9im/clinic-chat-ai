
import React from 'react';

const Welcome: React.FC = () => {
  return (
    <section className="py-20 px-8 md:px-16 text-center">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-light text-[#8FA893] mb-6">Bem vindo a clínica Vehe</h2>
        <p className="text-base md:text-lg leading-relaxed text-gray-600">
          A clínica vehe é a união da odontologia e da biomedicina, duas lindas profissões que uniram forças para entregar atendimentos personalizados, cuidadosos e responsáveis, com uso de produtos diferenciados, não testados em animais em um ambiente confortável e ecologicamente sustentável.
        </p>
      </div>
    </section>
  );
};

export default Welcome;
