import React from 'react';
import { motion } from 'motion/react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

// ─── Testimonials — Split Screen Layout ──────────────────────────────────────
//
//  Desktop (lg+):
//  ┌──────────────── 40% ─────────────────┬──────────────── 60% ──────────────┐
//  │  Título sección                      │                                   │
//  │  ─────────────── (sticky)            │   Infinite Marquee (2 filas)      │
//  │  ReviewForm                          │                                   │
//  └──────────────────────────────────────┴───────────────────────────────────┘
//
//  Móvil: Título → Carrusel → Formulario (apilado)

const Testimonials = () => {
  return (
    <section id="testimonios" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Encabezado de sección — visible en todas las pantallas ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-jb-blue font-montserrat">
            Lo que dicen{' '}
            <span className="text-jb-orange">nuestros clientes</span>
          </h3>
        </motion.div>

        {/* ── Split Screen Grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">

          {/* ── Columna derecha: Carrusel — primero en móvil ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="
              order-1 lg:order-2
              lg:col-span-7
              w-full
            "
          >
            <ReviewList />
          </motion.div>

          {/* ── Columna izquierda: Formulario (sticky en desktop) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="
              order-2 lg:order-1
              lg:col-span-5
              lg:sticky lg:top-28
            "
          >
            <ReviewForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
