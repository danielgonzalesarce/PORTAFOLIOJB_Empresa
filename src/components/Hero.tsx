import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";

// ── Imágenes de fondo (tecnología / oficinas modernas) ───────────────────────
const BG_IMAGES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1920&q=80",
];

const INTERVAL_MS = 4000;

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto-avance del slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % BG_IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-[95vh] flex items-center pt-24 pb-16 overflow-hidden bg-jb-blue"
    >
      {/* ══════════════════════════════════════════════════════════════════
          LAYER 1 — Background Image Slider (crossfade)
      ══════════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Zoom-out sutil para dar sensación de movimiento */}
            <motion.div
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{
                duration: INTERVAL_MS / 1000 + 1.8,
                ease: "linear",
              }}
              className="absolute inset-0"
            >
              <img
                src={BG_IMAGES[current]}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-center"
                draggable={false}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          LAYER 2 — Overlay degradado asimétrico
          Más opaco abajo-izquierda (texto), más transparente arriba-derecha
      ══════════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            linear-gradient(
              115deg,
              rgba(18, 52, 152, 0.93) 0%,
              rgba(18, 52, 152, 0.82) 30%,
              rgba(18, 52, 152, 0.60) 55%,
              rgba(18, 52, 152, 0.30) 75%,
              rgba(18, 52, 152, 0.12) 100%
            ),
            linear-gradient(
              to top,
              rgba(18, 52, 152, 0.70) 0%,
              transparent 45%
            )
          `,
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════
          LAYER 3 — Contenido
      ══════════════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Etiqueta superior */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="mb-1 md:mb-1"
        >
          <span className="text-jb-orange font-bold uppercase tracking-[0.3em] text-xs md:text-sm">
            Diseño & Desarrollo Web
          </span>
        </motion.div>

        {/* Título gigante */}
        <motion.h1 className="font-extrabold text-white leading-[0.9] tracking-tighter mb-8 font-montserrat flex flex-col">
          {/* "Creamos" */}
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.2,
            }}
            className="text-[3rem] md:text-[5rem] lg:text-[7rem]"
          >
            Creamos
          </motion.span>

          {/* "Experiencias" con gradiente animado */}
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: 0,
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              opacity: {
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.35,
              },
              y: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.35 },
              backgroundPosition: {
                duration: 6,
                repeat: Infinity,
                ease: "linear",
                delay: 0.35,
              },
            }}
            className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#FFFFFF,#aaaaaa,#aaaaaa,#FFFFFF)] bg-size-[200%_auto] text-[3.8rem] md:text-[7.5rem] lg:text-[9rem] pb-2 md:pb-6"
          >
            Experiencias
          </motion.span>

          {/* "Digitales." */}
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.5,
            }}
            className="text-[3rem] md:text-[5rem] lg:text-[7rem]"
          >
            Digitales.
          </motion.span>
        </motion.h1>

        {/* Descripción y botones */}
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.65 }}
            className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-lato"
          >
            Te ayudamos con la estética y potencia tecnológica para tu negocio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.8 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <a
              href="#proyectos"
              className="group relative inline-flex items-center justify-center px-8 py-4 w-full sm:w-auto bg-jb-orange text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(242,125,38,0.5)] font-montserrat"
            >
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
              <span className="relative flex items-center">
                Ver Proyectos
                <ChevronRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </span>
            </a>

            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-8 py-4 w-full sm:w-auto bg-white/10 border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-md hover:scale-105 font-montserrat"
            >
              Solicitar Asesoría
            </a>
          </motion.div>
        </div>

        {/* Dots del slider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex items-center gap-2 mt-14"
        >
          {BG_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Imagen ${i + 1}`}
              className="transition-all duration-500 rounded-full"
              style={{
                width: i === current ? "28px" : "8px",
                height: "8px",
                background:
                  i === current
                    ? "rgba(242, 125, 38, 1)" // jb-orange
                    : "rgba(255, 255, 255, 0.35)",
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
