import React from 'react';
import { Facebook, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <span className="text-3xl font-display font-bold text-white mb-6 block">
              Consultora <span className="text-jb-orange">JB</span>
            </span>
            <p className="text-gray-400 max-w-md mb-8">
              Tu guía hacia el éxito empresarial y académico. Soluciones integrales basadas en compromiso, innovación y excelencia.
            </p>
            <div className="space-y-2 text-gray-400 mb-8">
              <p>Calle los Amancaes 310 Urb. Canto Bello - SJL, Lima</p>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=consultoriayasesoriajb@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">
                consultoriayasesoriajb@gmail.com
              </a>
              <p>+51 912 736 437</p>
            </div>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/ConsultoraJB" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-jb-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/consultorajb/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-jb-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/consultora-jb/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-jb-blue transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.tiktok.com/@consultorajb" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-jb-blue transition-colors">
                <svg size={20} viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13-.09-.26-.18-.38-.28v6.49c0 2.22-.55 4.42-2.02 6.06-1.64 1.82-4.11 2.85-6.56 2.73-2.53-.12-4.94-1.47-6.32-3.6-1.58-2.43-1.86-5.64-.73-8.29 1.08-2.53 3.51-4.4 6.25-4.82v4.03c-1.17.15-2.27.73-2.97 1.67-.84 1.13-1.05 2.61-.56 3.96.4 1.08 1.35 1.91 2.45 2.11 1.02.19 2.1-.08 2.92-.72.82-.65 1.27-1.68 1.27-2.73V.02z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#inicio" className="hover:text-jb-orange transition-colors">Inicio</a></li>
              <li><a href="#nosotros" className="hover:text-jb-orange transition-colors">Sobre Nosotros</a></li>
              <li><a href="#proyectos" className="hover:text-jb-orange transition-colors">Portafolio</a></li>
              <li><a href="#servicios" className="hover:text-jb-orange transition-colors">Servicios</a></li>
              <li><a href="#contacto" className="hover:text-jb-orange transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-jb-orange transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-jb-orange transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-jb-orange transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Consultora de Asesoría Empresarial JB. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
