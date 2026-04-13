import React from "react";
import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { PROCESS_STEPS } from "../constants";

// ─── Step accent colors ───────────────────────────────────────────────────────
const STEP_ACCENTS = [
  "from-jb-orange to-jb-yellow",
  "from-jb-turquoise to-cyan-400",
  "from-jb-yellow to-jb-orange",
  "from-violet-400 to-jb-turquoise",
  "from-jb-orange to-rose-400",
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

// ─── Shared glass overrides ───────────────────────────────────────────────────
const GLASS_BASE = `
  !bg-white/[0.04] !border-white/[0.08]
  hover:!border-white/[0.15]
  !rounded-3xl
  transition-all duration-300
`;

// ─── Mascot header (square tile) ─────────────────────────────────────────────
function MascotHeader() {
  return (
    <div className="relative w-full h-full min-h-[190px] flex items-end justify-center overflow-hidden group">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(253,185,7,0.10),transparent)]" />
      <img
        src="https://consultoradeasesoriaempresarialjb.com/wp-content/uploads/2026/03/JUBI_-_BLANCO-scaled.png"
        alt="Mascota Jubi"
        className="
          relative z-10 h-full w-auto max-h-[210px] object-contain object-bottom
          transition-transform duration-700 ease-out
          group-hover:scale-105 group-hover:-translate-y-1
          drop-shadow-[0_8px_32px_rgba(253,185,7,0.18)]
        "
        loading="lazy"
      />
    </div>
  );
}

// ─── Logo header (horizontal rectangle) ──────────────────────────────────────
function LogoHeader() {
  return (
    <div className="relative w-full h-full min-h-[80px] flex items-center justify-center px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_50%_50%,rgba(255,255,255,0.03),transparent)]" />
      <img
        src="https://consultoradeasesoriaempresarialjb.com/wp-content/uploads/2026/04/logoSinFondo.png"
        alt="Consultora JB"
        className="relative z-10 w-full max-w-[260px] h-auto object-contain"
        loading="lazy"
      />
    </div>
  );
}

// ─── Step sub-components ──────────────────────────────────────────────────────
function StepHeader({ index, accent }: { index: number; accent: string }) {
  return (
    <div className="relative w-full flex items-center gap-2.5 pt-1">
      <div
        className={`w-8 h-8 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center shrink-0 shadow-lg`}
      >
        <span className="text-[11px] font-black text-white font-montserrat">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className={`h-px flex-1 bg-gradient-to-r ${accent} opacity-30`} />
      {/* Ghost number */}
      <span className="absolute -right-1 -top-3 text-[64px] font-black leading-none text-white/[0.04] select-none pointer-events-none font-montserrat tabular-nums">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

function StepAccentBar({ accent }: { accent: string }) {
  return (
    <div
      className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent} opacity-80 rounded-t-3xl`}
    />
  );
}

// ─── Reusable step item builder ───────────────────────────────────────────────
function buildStepItem(
  step: { title: string; description: string },
  index: number,
  extraClass = "",
) {
  const accent = STEP_ACCENTS[index % STEP_ACCENTS.length];
  return (
    <motion.div key={step.title} variants={itemVariants} className="contents">
      <BentoGridItem
        className={`
          ${GLASS_BASE}
          group !pt-5 !pb-4 !px-5
          hover:!-translate-y-1
          ${extraClass}
        `}
        header={<StepHeader index={index} accent={accent} />}
        icon={<StepAccentBar accent={accent} />}
        title={
          <span className="text-white font-bold text-[14px] font-montserrat group-hover:text-jb-yellow transition-colors duration-300">
            {step.title}
          </span>
        }
        description={
          <span className="text-white/50 text-[12px] group-hover:text-white/65 transition-colors duration-300">
            {step.description}
          </span>
        }
      />
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const Process = () => {
  return (
    <section className="py-24 bg-jb-blue overflow-hidden relative">
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-jb-orange/[0.07] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-jb-turquoise/[0.07] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="inline-block text-jb-yellow text-xs font-black uppercase tracking-[0.25em] mb-4 font-montserrat">
            Metodología
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-white font-montserrat tracking-tight">
            Cómo <span className="text-jb-orange">Trabajamos</span>
          </h3>
          <p className="text-white/45 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Nuestro proceso está diseñado para garantizar resultados de alta
            calidad y una entrega eficiente de tu solución digital.
          </p>
        </motion.div>

        {/*
          BENTO GRID — desktop layout (4 col × 2 row):

          ┌──────┬─────────────┬──────┐
          │ MASC │    LOGO     │ S.01 │  row 1  (mascot 1×1, logo 2×1, step01 1×1)
          ├──────┼──────┬──────┼──────┤
          │ S.02 │ S.03 │ S.04 │ S.05 │  row 2  (4 × 1×1)
          └──────┴──────┴──────┴──────┘
        */}
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
              gap-3
              auto-rows-[minmax(168px,auto)]
            "
          >
            {/* 1 — Mascot (square: 1×1) */}
            <motion.div variants={itemVariants} className="contents">
              <BentoGridItem
                className={`
                  ${GLASS_BASE}
                  lg:col-span-1 lg:row-span-1
                  md:col-span-1
                  !p-0 overflow-hidden
                  bg-gradient-to-b from-white/[0.06] to-white/[0.02]
                `}
                header={<MascotHeader />}
                title=""
                description=""
              />
            </motion.div>

            {/* 2 — Logo (rectangle: 2×1) */}
            <motion.div variants={itemVariants} className="contents">
              <BentoGridItem
                className={`
                  ${GLASS_BASE}
                  lg:col-span-2 lg:row-span-1
                  md:col-span-2
                  !p-0 overflow-hidden
                  bg-gradient-to-br from-white/[0.07] to-white/[0.02]
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="#contacto"
            className="
              inline-flex items-center gap-3
              px-10 py-4 rounded-2xl
              bg-jb-orange text-white
              font-black text-sm font-montserrat tracking-wide
              shadow-[0_8px_32px_rgba(229,89,0,0.35)]
              hover:shadow-[0_12px_40px_rgba(229,89,0,0.5)]
              hover:-translate-y-0.5
              active:scale-[0.97]
              transition-all duration-200
            "
          >
            Iniciar mi proyecto
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
