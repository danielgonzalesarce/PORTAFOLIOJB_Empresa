import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { Layout, Shield, GraduationCap, Users, Briefcase, Globe } from 'lucide-react';

const serviceGroups = [
  {
    title: 'Servicio Empresarial',
    icon: Briefcase,
    color: 'text-jb-orange',
    bg: 'bg-jb-orange/10',
    dot: 'bg-jb-orange',
    glowColor: 'rgba(244, 111, 11, 0.12)',
    techs: ['Estrategia de Crecimiento', 'Optimización Financiera', 'Marketing Digital', 'Gestión de RRHH', 'Operaciones y Logística']
  },
  {
    title: 'Servicio Académico',
    icon: GraduationCap,
    color: 'text-jb-blue',
    bg: 'bg-jb-blue/10',
    dot: 'bg-jb-blue',
    glowColor: 'rgba(18, 52, 152, 0.12)',
    techs: ['Elaboración de Tesis', 'Simulación de Sustentación', 'Diseño de Herramientas', 'Revisión de CV', 'Asesoría de Posgrado']
  },
  {
    title: 'Servicio Legal',
    icon: Shield,
    color: 'text-jb-teal',
    bg: 'bg-jb-teal/10',
    dot: 'bg-jb-teal',
    glowColor: 'rgba(65, 196, 192, 0.12)',
    techs: ['Derecho Empresarial', 'Propiedad Intelectual', 'Derecho Laboral', 'Solución de Conflictos', 'Branding Corporativo']
  },
  {
    title: 'Servicio Digital',
    icon: Globe,
    color: 'text-jb-navy',
    bg: 'bg-jb-navy/10',
    dot: 'bg-jb-navy',
    glowColor: 'rgba(9, 106, 204, 0.12)',
    techs: ['Desarrollo Web', 'Soporte y Mantenimiento', 'Hosting Premium', 'Reingeniería Digital', 'Stack Tecnológico']
  }
];

const TechCard: React.FC<{ group: typeof serviceGroups[0], idx: number }> = ({ group, idx }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      className="group relative p-8 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden"
    >
      {/* Spotlight Hover Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${group.glowColor},
              transparent 40%
            )
          `,
        }}
      />
      
      <div className="relative z-10">
        {/* Header: Stacked to prevent text wrapping issues */}
        <div className="flex flex-col items-start gap-5 mb-8">
          <div className={`w-14 h-14 rounded-2xl ${group.bg} ${group.color} flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-inner`}>
            <group.icon size={28} strokeWidth={1.5} />
          </div>
          <h4 className="text-2xl font-bold text-gray-900 tracking-tight">{group.title}</h4>
        </div>
        
        {/* Tech Pills */}
        <div className="flex flex-wrap gap-2.5">
          {group.techs.map((tech, i) => (
            <motion.div 
              key={tech} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (idx * 0.1) + (i * 0.05) + 0.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group/badge flex items-center gap-2 bg-white border border-gray-100 text-gray-600 px-3.5 py-2 rounded-xl text-sm font-medium shadow-sm transition-all hover:shadow-md hover:border-gray-200 cursor-default"
            >
              <span className={`w-2 h-2 rounded-full ${group.dot} group-hover/badge:scale-150 transition-transform duration-300`}></span>
              <span className="group-hover/badge:text-gray-900 transition-colors">{tech}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Technologies = () => {
  return (
    <section id="servicios" className="py-32 bg-gray-50/50 overflow-hidden relative">
      {/* Subtle Background Pattern & Glowing Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-jb-teal/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-jb-orange/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-jb-blue text-sm font-bold uppercase tracking-widest mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-jb-orange mr-2 animate-pulse"></span>
            Nuestras Especialidades
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight"
          >
            Servicios de <span className="text-transparent bg-clip-text bg-gradient-to-r from-jb-teal via-jb-blue to-jb-navy">Asesoría Integral</span>
          </motion.h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceGroups.map((group, idx) => (
            <TechCard key={group.title} group={group} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
