import React from 'react';
import { motion } from 'motion/react';
import { Send, Calendar } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-jb-orange relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-jb-blue/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            ¿Necesitas un sistema web para tu empresa?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Creamos soluciones digitales personalizadas que optimizan procesos y aumentan la eficiencia empresarial. No esperes más para dar el salto digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: ["0px 0px 0px rgba(18, 52, 152, 0)", "0px 0px 20px rgba(18, 52, 152, 0.4)", "0px 0px 0px rgba(18, 52, 152, 0)"] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-jb-blue text-white rounded-full font-bold text-lg hover:bg-white hover:text-jb-blue transition-all shadow-2xl"
            >
              Solicitar Cotización
              <Send size={20} />
            </motion.a>
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-jb-blue rounded-full font-bold text-lg hover:bg-jb-blue hover:text-white transition-all shadow-xl"
            >
              Agendar Asesoría
              <Calendar size={20} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
