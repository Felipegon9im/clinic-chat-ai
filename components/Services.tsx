
import React from 'react';

interface ServiceCardProps {
  title: string;
  bgColor: string;
  textColor: string;
  services: { title: string; items: string[] };
  corporateServices: { title: string; items: string[] };
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, bgColor, textColor, services, corporateServices }) => {
  return (
    <div className={`p-10 md:p-12 rounded-lg shadow-lg ${bgColor} ${textColor}`}>
      <h3 className="text-2xl font-semibold uppercase tracking-widest mb-6">{title}</h3>
      <div className="space-y-4 text-left">
        <p className="font-semibold">{services.title}</p>
        <ul className="list-none space-y-2">
          {services.items.map((item, index) => (
            <li key={index}>- {item}</li>
          ))}
        </ul>
        <p className="font-semibold pt-4">{corporateServices.title}</p>
        <ul className="list-none space-y-2">
          {corporateServices.items.map((item, index) => (
            <li key={index}>- {item}</li>
          ))}
        </ul>
      </div>
      <button className="mt-8 bg-white text-[#4A4A4A] py-3 px-8 rounded-md font-semibold hover:bg-gray-100 transition-colors shadow-md">
        SAIBA MAIS
      </button>
    </div>
  );
};

const Services: React.FC = () => {
  const odontoServices = {
    title: "Nossos tratamentos:",
    items: [
      "Profilaxia (limpeza dentária)",
      "Restaurações",
      "Extrações dentárias",
      "Clareamento",
      "Estética dental (facetas de resina, facetas de porcelana, lentes de contato dental, etc.)",
      "Preenchimento com ácido hialurônico",
      "Aplicação de Botox",
      "Ortodontia (aparelhos)",
      "Próteses Dentárias",
      "Entre outros",
    ],
  };

  const esteticaServices = {
    title: "Estética facial:",
    items: [
      "Gerenciamento de pele",
      "Tratamento para acnes e melasmas",
      "Controle do envelhecimento facial",
      "Limpeza de pele",
      "Entre outros"
    ],
  };
    
  const esteticaCorporateServices = {
      title: "Estética corporal:",
      items: [
          "Gerenciamento de flacidez",
          "Tratamentos para gordura localizada",
          "Tratamento para estrias",
          "Tratamento para cicatrizes",
          "Entre outros"
      ]
  };

  return (
    <section className="py-20 px-8 md:px-16 bg-[#FAF8F5]">
      <div className="container mx-auto grid md:grid-cols-2 gap-12">
        <ServiceCard
          title="Odontologia"
          bgColor="bg-[#9F656A]"
          textColor="text-white"
          services={odontoServices}
          corporateServices={{title: "", items: []}}
        />
        <ServiceCard
          title="Estética"
          bgColor="bg-[#8FA893]"
          textColor="text-white"
          services={esteticaServices}
          corporateServices={esteticaCorporateServices}
        />
      </div>
    </section>
  );
};

export default Services;
