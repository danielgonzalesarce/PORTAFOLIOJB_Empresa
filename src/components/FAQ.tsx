import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: '¿Cuánto tiempo toma desarrollar un sistema web?',
    answer: 'El tiempo de desarrollo varía según la complejidad del proyecto. Un sistema básico puede tomar de 4 a 6 semanas, mientras que un ERP o plataforma a medida puede requerir de 3 a 6 meses. Siempre establecemos un cronograma claro desde el inicio.'
  },
  {
    question: '¿Ofrecen soporte después de lanzar el proyecto?',
    answer: 'Sí, todos nuestros proyectos incluyen un periodo de garantía y soporte técnico gratuito. Además, ofrecemos planes de mantenimiento mensual para asegurar que tu sistema esté siempre actualizado, seguro y funcionando al 100%.'
  },
  {
    question: '¿Puedo integrar el nuevo sistema con herramientas que ya uso?',
    answer: 'Absolutamente. Desarrollamos sistemas con capacidad de integración mediante APIs. Podemos conectar tu nueva plataforma con tu software contable, pasarelas de pago, CRMs existentes, WhatsApp, entre otros.'
  },
  {
    question: '¿El código fuente y los datos me pertenecen?',
    answer: 'Sí, al finalizar el proyecto y cancelar la totalidad del servicio, te entregamos la propiedad intelectual del código fuente y el control total sobre tus bases de datos y servidores.'
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-jb-blue text-sm font-bold uppercase tracking-widest mb-4">Preguntas Frecuentes</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Resolvemos tus <span className="text-jb-teal">dudas</span></h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-jb-blue/30 transition-colors shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
              >
                <span className="font-bold text-gray-900 pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`text-jb-orange transform transition-transform duration-300 flex-shrink-0 ${activeIndex === index ? 'rotate-180' : ''}`} 
                  size={24} 
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
