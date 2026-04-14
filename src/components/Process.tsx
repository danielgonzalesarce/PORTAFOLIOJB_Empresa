import React from "react";
import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { PROCESS_STEPS } from "../constants";

// ─── Step accent colors ───────────────────────────────────────────────────────
const STEP_ACCENTS = [
  "from-[#F46F0B] to-[#FDB907]",
  "from-[#41C4C0] to-cyan-200",
  "from-[#FDB907] to-[#F46F0B]",
  "from-[#096ACC] to-[#41C4C0]",
  "from-[#CE0B19] to-[#F46F0B]",
];

// Mapeo "arcoíris" de colores para los títulos de cada paso
const STEP_TITLE_COLORS = [
  "text-[#FDB907]", // Amarillo dorado
  "text-[#41C4C0]", // Cyan
  "text-[#F46F0B]", // Naranja
  "text-[#7DD3FC]", // Celeste
  "text-[#FDA4AF]", // Rosa suave
];

// ─── Motion variants ──────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Glass card base ─────────────────────────────────────────────────────────
const GLASS_BASE = `
  !relative !overflow-hidden
  !bg-white/10 !border-white/15
  backdrop-blur-md
  !rounded-3xl
  transition-all duration-300 ease-out
`;

// ─── Hover unificado para TODAS las tarjetas del grid ────────────────────────
// Una sola fuente de verdad: escala leve + sombra negra profunda.
// El "shadow-none!" en los BentoGridItem cancela el hover:shadow-xl nativo
// de Aceternity antes de aplicar nuestra sombra personalizada.
const CARD_HOVER = `
  hover:scale-[1.025]
  hover:shadow-[0_18px_45px_rgba(0,0,0,0.45)]
`;

// ─── Mascot header — SIN glow detrás ─────────────────────────────────────────
function MascotHeader() {
  return (
    <div className="relative w-full h-full min-h-[220px] flex items-end justify-center overflow-hidden">
      <img
        src="https://consultoradeasesoriaempresarialjb.com/wp-content/uploads/2026/03/JUBI_-_BLANCO-scaled.png"
        alt="Mascota Jubi"
        className="
          h-full w-auto max-h-[230px] object-contain object-bottom
          transition-transform duration-500 ease-out
          group-hover:scale-105
        "
        loading="lazy"
      />
    </div>
  );
}

// ─── Logo header ──────────────────────────────────────────────────────────────
function LogoHeader() {
  return (
    <div className="relative w-full h-full min-h-[80px] flex items-center justify-center px-10 overflow-hidden">
      <img
        src="https://consultoradeasesoriaempresarialjb.com/wp-content/uploads/2026/04/logoSinFondo.png"
        alt="Consultora JB"
        className="relative z-10 w-full max-w-[280px] h-auto object-contain"
        loading="lazy"
      />
    </div>
  );
}

// ─── Step header: solo el badge numérico (sin línea) ────────────────────────
function StepBadge({ index, accent }: { index: number; accent: string }) {
  return (
    <div className="relative w-full flex items-start pt-1 z-10">
      <div
        className={`w-10 h-10 rounded-xl bg-linear-to-br ${accent} flex items-center justify-center shrink-0 shadow-lg`}
      >
        <span className="text-[13px] font-black text-white font-montserrat tracking-tight">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

// ─── Bloque de texto central: Título + separador + Descripción ───────────────
function StepTextBlock({
  title,
  description,
  accent,
  titleColor,
}: {
  title: string;
  description: string;
  accent: string;
  titleColor: string;
}) {
  return (
    <div className="flex flex-col gap-3 relative z-10">
      {/* Título en mayúsculas, grande */}
      <span
        className={`${titleColor} font-black text-2xl font-montserrat leading-tight tracking-tight uppercase`}
      >
        {title}
      </span>
      {/* Separador de acento grueso */}
      <div className={`h-[3px] w-12 rounded-full bg-linear-to-r ${accent}`} />
      {/* Descripción */}
      <span className="text-white/85 font-lato text-sm leading-relaxed">
        {description}
      </span>
    </div>
  );
}

function GhostNumber({ index }: { index: number }) {
  return (
    <span
      aria-hidden="true"
      className="
        absolute bottom-1 right-2
        text-[70px] font-black leading-none
        text-white/[0.07] select-none pointer-events-none
        font-montserrat tabular-nums
        transition-all duration-300 ease-out
        group-hover:text-white/15 group-hover:scale-110
        origin-bottom-right
        z-0
      "
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

// ─── Reusable step item builder ───────────────────────────────────────────────
// Layout propio (sin BentoGridItem) para control total del flexbox:
//  ┌─────────────────────────┐
//  │ [Badge]                 │  ← fijo arriba-izquierda
//  │                         │
//  │   TÍTULO                │  ← bloque centrado verticalmente
//  │   ────                  │    con flex-grow
//  │   Descripción           │
//  │                         │
//  │                    [02] │  ← número fantasma, abs. abajo-derecha
//  └─────────────────────────┘
function buildStepItem(
  step: { title: string; description: string },
  index: number,
  extraClass = "",
) {
  const accent = STEP_ACCENTS[index % STEP_ACCENTS.length];
  const titleColor = STEP_TITLE_COLORS[index % STEP_TITLE_COLORS.length];

  return (
    <motion.div
      key={step.title}
      variants={itemVariants}
      className={`
        ${GLASS_BASE}
        ${CARD_HOVER}
        ${extraClass}
        group
        flex flex-col
        p-5
        min-h-[168px]
      `}
    >
      {/* Badge — esquina superior izquierda */}
      <StepBadge index={index} accent={accent} />

      {/* Bloque de texto — centrado verticalmente con flex-grow */}
      <div className="flex-1 flex items-center py-3">
        <StepTextBlock
          title={step.title}
          description={step.description}
          accent={accent}
          titleColor={titleColor}
        />
      </div>

      {/* Número fantasma — anclado abs. en esquina inferior derecha */}
      <GhostNumber index={index} />
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const Process = () => {
  return (
    <section className="py-24 overflow-hidden relative bg-jb-blue">
      {/* Puntitos sutiles sobre el fondo azul corporativo */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <h3 className="text-4xl md:text-5xl font-bold text-white font-montserrat">
            Nuestra{" "}
            <span className="text-jb-orange">Metodología</span>
          </h3>
        </motion.div>

        {/* BENTO GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <BentoGrid
            className="
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-4
              gap-4
              auto-rows-[minmax(168px,auto)]
            "
          >
            {/* 1 — Mascot (square 1×1) */}
            <motion.div variants={itemVariants} className="contents">
              <BentoGridItem
                className={`
                  ${GLASS_BASE}
                  ${CARD_HOVER}
                  group
                  lg:col-span-1 lg:row-span-1
                  md:col-span-1
                  p-0!
                  shadow-none!
                `}
                header={<MascotHeader />}
                title=""
                description=""
              />
            </motion.div>

            {/* 2 — Logo (rectangle 2×1) — cristal blanco translúcido */}
            <motion.div variants={itemVariants} className="contents">
              <BentoGridItem
                className={`
                  ${CARD_HOVER}
                  relative! overflow-hidden!
                  bg-white/75! border-white/30!
                  backdrop-blur-md
                  rounded-3xl!
                  transition-all duration-300 ease-out
                  lg:col-span-2 lg:row-span-1
                  md:col-span-2
                  p-0!
                  shadow-none!
                `}
                header={<LogoHeader />}
                title=""
                description=""
              />
            </motion.div>

            {/* 3 — Step 01 (top-right, 1×1) */}
            {buildStepItem(PROCESS_STEPS[0], 0, "lg:col-span-1")}

            {/* 4–7 — Steps 02–05 (bottom row, 1×1 each) */}
            {PROCESS_STEPS.slice(1).map((step, i) =>
              buildStepItem(step, i + 1, "lg:col-span-1"),
            )}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
