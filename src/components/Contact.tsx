import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    try {
      // Estructura del mensaje para WhatsApp
      const whatsappMessage = `Hola, me gustaría recibir más información. Aquí están mis datos:

👤 *Nombre:* ${formData.name}
✉️ *Correo:* ${formData.email}
🏢 *Empresa:* ${formData.company || "No especificada"}

💬 *Mensaje:*
${formData.message}`;

      // Codificar el mensaje para la URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Enlace directo a WhatsApp (Número de Perú: 51 + 912736437)
      const whatsappUrl = `https://wa.me/51912736437?text=${encodedMessage}`;

      // Abrir WhatsApp en una nueva pestaña
      window.open(whatsappUrl, "_blank");

      // Mostrar mensaje de éxito y limpiar formulario
      setIsSubmitted(true);
      setFormData({ name: "", email: "", company: "", message: "" });

      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError("Hubo un error al procesar la solicitud.");
    }
  };

  return (
    <section id="contacto" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-jb-blue text-sm font-bold uppercase tracking-widest mb-4">
              Contacto
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Hablemos de tu{" "}
              <span className="text-jb-teal">Próximo Proyecto</span>
            </h3>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Estamos listos para ayudarte a transformar tu empresa. Completa el
              formulario o utiliza nuestros canales directos para una atención
              inmediata.
            </p>

            <div className="space-y-6">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=consultoriayasesoriajb@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group hover:translate-x-1 transition-transform"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-jb-blue group-hover:bg-jb-blue group-hover:text-white transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    Correo Electrónico
                  </p>
                  <p className="text-gray-900 font-bold break-all">
                    consultoriayasesoriajb@gmail.com
                  </p>
                </div>
              </a>
              <a
                href="https://wa.me/51912736437"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group hover:translate-x-1 transition-transform"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-jb-teal group-hover:bg-jb-teal group-hover:text-white transition-colors">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    WhatsApp
                  </p>
                  <p className="text-gray-900 font-bold">+51 912 736 437</p>
                </div>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Calle+los+Amancaes+310+Urb.+Canto+Bello+-+SJL,+Lima"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group hover:translate-x-1 transition-transform"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-jb-orange group-hover:bg-jb-orange group-hover:text-white transition-colors">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    Ubicación
                  </p>
                  <p className="text-gray-900 font-bold">
                    Calle los Amancaes 310 Urb. Canto Bello - SJL, Lima
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden"
          >
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    ¡Redirigiendo a WhatsApp!
                  </h4>
                  <p className="text-gray-600">
                    Continúa en la aplicación para enviar tu mensaje a nuestro
                    equipo.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium"
                >
                  <AlertCircle size={18} />
                  {error}
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-jb-blue focus:ring-2 focus:ring-jb-blue/20 outline-none transition-all"
                    placeholder="Ej. Juan Pérez"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Correo Corporativo *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-jb-blue focus:ring-2 focus:ring-jb-blue/20 outline-none transition-all"
                    placeholder="juan@empresa.com"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-jb-blue focus:ring-2 focus:ring-jb-blue/20 outline-none transition-all"
                  placeholder="Nombre de tu empresa"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-jb-blue focus:ring-2 focus:ring-jb-blue/20 outline-none transition-all resize-none"
                  placeholder="Cuéntanos sobre tu necesidad..."
                ></textarea>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                type="submit"
                className="w-full bg-jb-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-jb-navy transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                Enviar por WhatsApp
                <Send size={20} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
