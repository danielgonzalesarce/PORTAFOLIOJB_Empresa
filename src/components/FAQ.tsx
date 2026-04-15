import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "¿Cuánto tiempo toma desarrollar un sistema web?",
    answer:
      "El tiempo de desarrollo varía según la necesidad. Un sistema hecho desde cero puede tomar de 4 a 6 semanas (básico) o de 3 a 6 meses (ERP a medida). Sin embargo, si optas por uno de nuestros sistemas ya establecidos, como nuestra plataforma de control de asistencia, y solo requiere personalización de marca (colores, logo y ajustes menores), podemos implementarlo en solo 1 a 2 semanas.",
  },
  {
    question: "¿Ofrecen soporte después de lanzar el proyecto?",
    answer:
      "Sí. Todos nuestros desarrollos incluyen un periodo de garantía y soporte técnico gratuito, cuya duración dependerá de la magnitud del sistema adquirido. Posterior a esto, ofrecemos planes de mantenimiento mensual muy económicos para garantizar que tu plataforma esté siempre segura, actualizada y funcionando sin interrupciones.",
  },
  {
    question: "¿Puedo integrar el nuevo sistema con herramientas que ya uso?",
    answer:
      "Claro que sí. Podemos integrar de forma ágil servicios de uso diario como WhatsApp o pasarelas de pago. Para conexiones más estructuradas, como un software contable específico o un CRM que ya uses en tu empresa, realizamos una evaluación técnica previa para confirmar la viabilidad y asegurarnos de que ambas plataformas se comuniquen a la perfección.",
  },
  {
    question: "¿El código fuente y los datos me pertenecen?",
    answer:
      "Tus datos operativos, registros y bases de datos son 100% tuyos; nosotros solo accedemos a ellos bajo tu autorización para fines estrictos de soporte o mantenimiento. Respecto al sistema, ofrecemos modelos flexibles: suscripciones (mensuales/anuales) o un plan de pago único que te otorga el derecho de uso del software. No comercializamos el código fuente por defecto, lo que nos permite mantener costos accesibles para ti. Si tu empresa requiere adquirir la propiedad intelectual completa del código, se evalúa bajo una cotización especial.",
  },
];

const FAQ = () => {
  // Cambio 1: Inicializado en 0 para que la primera pregunta esté abierta por defecto
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-340 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid md:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Columna Izquierda: Títulos y Mascota */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left sticky top-24">
            <div className="max-w-xs w-full">
              <h2 className="text-jb-blue text-sm font-bold uppercase tracking-widest mb-4">
                Preguntas Frecuentes
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Resolvemos tus <br className="hidden md:block" />
                <span className="text-jb-teal">dudas</span>
              </h3>
              <p className="mt-2 text-gray-600 hidden md:block text-lg">
                Respuestas a las consultas más habituales para que tomes la
                mejor decisión con total transparencia.
              </p>
            </div>

            {/* Imagen de la Mascota */}
            {/* Cambio 3: Reduje el margen superior (mt-4 md:mt-6) para subir a la mascota */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 md:mt-6 w-48 sm:w-56 md:w-64 lg:w-72"
            >
              {/* Cambio 4: Animación infinita de flotación (arriba y abajo) usando Framer Motion */}
              <motion.img
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src="https://consultoradeasesoriaempresarialjb.com/wp-content/uploads/2026/04/mascota2web.webp"
                alt="JUBI - Mascota Consultora JB"
                width={1128}
                height={1600}
                className="w-full h-auto object-contain drop-shadow-2xl"
                style={{
                  filter: "drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.1))",
                }}
              />
            </motion.div>
          </div>

          {/* Columna Derecha: Acordeón de Preguntas */}
          {/* Cambio 2: Añadido md:pt-14 lg:pt-16 para bajar el bloque y centrarlo respecto a la izquierda */}
          <div className="md:col-span-3 space-y-4 md:pt-14 lg:pt-16">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-jb-blue/40 transition-colors shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none group"
                >
                  <span className="md:text-lg font-bold text-gray-900 pr-8 group-hover:text-jb-blue transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`text-jb-orange transform transition-transform duration-300 shrink-0 ${activeIndex === index ? "rotate-180" : ""}`}
                    size={24}
                  />
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4 text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
