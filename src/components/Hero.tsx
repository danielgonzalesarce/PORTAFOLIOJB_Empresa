import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { ChevronRight, ShieldCheck, Star, Zap, Code, Database, Cloud, Smartphone, Cpu } from 'lucide-react';

const Hero = () => {
  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Floating Icons Data
  const floatingIcons = [
    { Icon: Code, top: '15%', left: '5%', delay: 0, color: 'text-jb-orange' },
    { Icon: Cloud, top: '10%', right: '10%', delay: 1, color: 'text-jb-teal' },
    { Icon: Database, bottom: '20%', left: '10%', delay: 2, color: 'text-white/50' },
    { Icon: Smartphone, bottom: '15%', right: '5%', delay: 1.5, color: 'text-jb-orange' },
    { Icon: Cpu, top: '45%', left: '45%', delay: 0.5, color: 'text-jb-teal' },
  ];

  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-jb-blue perspective-1000">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      {/* Animated Glowing Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-jb-teal/20 blur-[120px] rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-jb-orange/10 blur-[150px] rounded-full pointer-events-none"
      />

      {/* Floating Tech Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.color} opacity-30 pointer-events-none hidden md:block`}
          style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            delay: item.delay,
            ease: "easeInOut" 
          }}
        >
          <item.Icon size={32} />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="relative z-20">
            {/* Trust Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <ShieldCheck size={18} className="text-jb-teal" />
              <span>Consultora Tecnológica Certificada</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
            >
              Tu guía hacia el <br className="hidden md:block" /> éxito <span className="text-jb-orange relative inline-block">
                empresarial
                {/* Animated Underline SVG */}
                <motion.svg 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
                  className="absolute w-full h-4 -bottom-2 left-0 text-jb-orange" 
                  viewBox="0 0 100 10" 
                  preserveAspectRatio="none"
                >
                  <motion.path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" strokeLinecap="round" />
                </motion.svg>
              </span> <br className="hidden md:block" /> y académico
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed font-light"
            >
              Transformamos empresas mediante estrategias personalizadas que impulsan el crecimiento sostenible y el éxito a largo plazo. Soluciones integrales basadas en compromiso, innovación y excelencia.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <a
                href="#proyectos"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-jb-orange text-white rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(242,125,38,0.4)]"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]"></div>
                <span className="relative flex items-center">
                  Ver Proyectos
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </span>
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-md hover:scale-105"
              >
                Solicitar Asesoría
              </a>
            </motion.div>
          </div>

          {/* Right Column: 3D Interactive Visuals */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="hidden lg:block relative perspective-[2000px] h-[600px] flex items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* 3D Container */}
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full max-w-lg mx-auto"
            >
              {/* Main Image Card */}
              <div 
                className="relative rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-jb-navy"
                style={{ transform: "translateZ(0px)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-jb-blue/40 to-transparent z-10 mix-blend-overlay"></div>
                <img
                  src="https://media.istockphoto.com/id/1830163120/es/foto/grupo-de-programadores-inform%C3%A1ticos-hablando-mientras-trabajan-en-la-oficina-de-ti.jpg?s=612x612&w=0&k=20&c=6Ldjzq8HTSQbdai_zCqPxKSK8gz1IuWJ7nKKCkP69RQ="
                  alt="Equipo de programadores trabajando"
                  className="w-full h-auto object-cover opacity-90"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Metric Card (Parallax Effect) */}
              <motion.div 
                style={{ transform: "translateZ(80px)" }}
                className="absolute -bottom-10 -left-10 z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex items-center gap-5"
              >
                <div className="relative w-16 h-16 bg-jb-teal/20 rounded-full flex items-center justify-center text-jb-teal border border-jb-teal/30">
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-jb-teal/40 rounded-full"
                  />
                  <Zap size={32} />
                </div>
                <div>
                  <p className="text-sm text-white/80 font-medium uppercase tracking-wider mb-1">Rendimiento</p>
                  <p className="text-4xl font-bold text-white">99.9%</p>
                </div>
              </motion.div>

              {/* Secondary Floating Element */}
              <motion.div 
                style={{ transform: "translateZ(50px)" }}
                className="absolute -top-8 -right-8 z-20 bg-jb-navy/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl flex items-center gap-3"
              >
                <div className="w-3 h-3 bg-jb-orange rounded-full animate-pulse"></div>
                <span className="text-white font-medium text-sm">Sistemas Activos</span>
              </motion.div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
