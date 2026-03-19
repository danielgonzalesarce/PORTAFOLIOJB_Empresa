import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/51912736437"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] hover:scale-110 transition-all z-50 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} />
      {/* Tooltip */}
      <span className="absolute right-16 bg-white text-gray-800 px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap pointer-events-none border border-gray-100">
        ¡Chatea con nosotros!
        {/* Triangle pointer */}
        <span className="absolute top-1/2 -right-2 transform -translate-y-1/2 border-8 border-transparent border-l-white"></span>
      </span>
    </a>
  );
};

export default WhatsAppButton;
