
import React from 'react';

const MapSection: React.FC = () => {
  return (
    <section className="py-0">
      <div className="w-full h-[50vh] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3535.021025064097!2d-48.5134786854938!3d-27.62340698282711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9527393bd8555555%3A0x28f73e7e8b9487ef!2sCl%C3%ADnica%20Vehe!5e0!3m2!1sen!2sus!4v1684333031207!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Clinic Location"
        ></iframe>
        <div className="absolute bottom-10 left-10 bg-white p-6 rounded-lg shadow-2xl max-w-sm">
            <h4 className="font-bold text-lg text-[#4A4A4A]">Clínica Vehe, Oka Floripa</h4>
            <p className="text-gray-600 mt-1">SC-405, 4397 - Campeche, Florianópolis - SC, SALA 113</p>
            <a href="#" className="text-blue-600 hover:underline mt-2 inline-block">Ver mapa ampliado</a>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
