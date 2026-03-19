import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../constants';

const Process = () => {
  return (
    <section className="py-24 bg-jb-blue text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-jb-yellow text-sm font-bold uppercase tracking-widest mb-4">Metodología</h2>
          <h3 className="text-3xl md:text-4xl font-bold">Cómo <span className="text-jb-orange">Trabajamos</span></h3>
          <p className="text-blue-100 mt-4 max-w-2xl mx-auto">
            Nuestro proceso está diseñado para garantizar resultados de alta calidad y una entrega eficiente de tu solución digital.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2"></div>
          
          <div className="grid lg:grid-cols-5 gap-12 relative z-10">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -10 }}
                className="text-center group"
              >
                <div className="relative mb-8 inline-block">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 bg-jb-orange rounded-full flex items-center justify-center text-3xl font-bold shadow-xl border-4 border-jb-blue relative z-10 transition-colors group-hover:bg-jb-yellow group-hover:text-jb-blue"
                  >
                    {index + 1}
                  </motion.div>
                  {/* Pulse effect */}
                  <div className="absolute inset-0 bg-jb-orange rounded-full animate-ping opacity-20 group-hover:bg-jb-yellow"></div>
                  
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="lg:hidden absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-0.5 h-10 bg-white/20"></div>
                  )}
                </div>
                <motion.h4 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  className="text-xl font-bold mb-3 text-jb-yellow group-hover:text-white transition-colors"
                >
                  {step.title}
                </motion.h4>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                  className="text-blue-100 text-sm leading-relaxed"
                >
                  {step.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
