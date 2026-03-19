import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError("Por favor, completa todos los campos obligatorios.");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      setIsLoading(false);
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Por favor, ingresa un número de teléfono válido.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Hubo un error al enviar la solicitud.');
      }

      setIsSubmitted(true);
      
      // Construct Gmail pre-fill URL
      const subject = encodeURIComponent("Nueva solicitud de contacto");
      const body = encodeURIComponent(`
Nombre: ${formData.name}
Correo: ${formData.email}
Teléfono: ${formData.phone}
Empresa: ${formData.company || "No especificada"}
Mensaje: ${formData.message}
      `.trim());
      
      const gmailUrl = `https://mail.google.com/mail/u/0/?fs=1&to=consultoriayasesoriajb@gmail.com&su=${subject}&body=${body}&tf=cm`;
      
      // Open Gmail in a new tab
      window.open(gmailUrl, '_blank');

      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hubo un error al enviar la solicitud.');
    } finally {
      setIsLoading(false);
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
            <h2 className="text-jb-blue text-sm font-bold uppercase tracking-widest mb-4">Contacto</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Hablemos de tu <span className="text-jb-teal">Próximo Proyecto</span>
            </h3>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Estamos listos para ayudarte a transformar tu empresa. Completa el formulario o utiliza nuestros canales directos para una atención inmediata.
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
                  <p className="text-xs text-gray-400 font-bold uppercase">Correo Electrónico</p>
                  <p className="text-gray-900 font-bold break-all">consultoriayasesoriajb@gmail.com</p>
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
                  <p className="text-xs text-gray-400 font-bold uppercase">WhatsApp</p>
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
                  <p className="text-xs text-gray-400 font-bold uppercase">Ubicación</p>
                  <p className="text-gray-900 font-bold">Calle los Amancaes 310 Urb. Canto Bello - SJL, Lima</p>
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
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">¡Mensaje Enviado!</h4>
                  <p className="text-gray-600">
                    Gracias por contactarnos. Un asesor se comunicará contigo a la brevedad posible.
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
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo *</label>
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
                  <label className="block text-sm font-bold text-gray-700 mb-2">Correo Corporativo *</label>
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

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-bold text-gray-700 mb-2">Número de Contacto *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-jb-blue focus:ring-2 focus:ring-jb-blue/20 outline-none transition-all"
                    placeholder="Ej. +51 987 654 321"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-bold text-gray-700 mb-2">Empresa</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-jb-blue focus:ring-2 focus:ring-jb-blue/20 outline-none transition-all"
                    placeholder="Nombre de tu empresa"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-bold text-gray-700 mb-2">Mensaje *</label>
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
                transition={{ delay: 0.7 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-jb-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-jb-navy transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar Solicitud
                    <Send size={20} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
