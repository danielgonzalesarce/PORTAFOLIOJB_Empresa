import React from "react";
import { motion } from "motion/react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpen,
  index,
}) => {
  // Paleta de acentos por categoría (fallback si el JSON no trae accentColor)
  const CATEGORY_COLORS: Record<string, string> = {
    Logística: "#41C4C0",
    "E-commerce": "#CE0B19",
    Gimnasio: "#FDB907",
    RRHH: "#096ACC",
    SaaS: "#123498",
    ERP: "#F46F0B",
    Educación: "#41C4C0",
  };

  const accentColor =
    project.accentColor ?? CATEGORY_COLORS[project.category] ?? "#123498";

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onClick={() => onOpen(project)}
      className="group relative bg-slate-50 cursor-pointer rounded-2xl lg:rounded-4xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col h-full transition-all duration-300"
    >
      {/* ── Área visual de mockups ─────────────────────────────────────────── */}
      <div className="relative w-full pt-[65%] overflow-hidden">
        {/* Fondo decorativo con color de acento */}
        <div
          className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.09] transition-opacity duration-500"
          style={{ backgroundColor: accentColor }}
        />

        {/* Mockups */}
        <div className="absolute inset-0 flex items-center justify-center p-6 lg:p-10 pointer-events-none">
          {/* Laptop Mockup */}
          <div className="relative z-10 w-[85%] drop-shadow-xl group-hover:scale-[1.03] transition-transform duration-700 ease-out will-change-transform">
            <div className="bg-slate-900 rounded-lg lg:rounded-xl p-1 lg:p-1.5 border-[3px] border-slate-700 shadow-xl">
              <img
                src={project.laptopImg}
                alt={`${project.name} — vista desktop`}
                className="rounded lg:rounded-lg w-full aspect-video object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            {/* Base del laptop */}
            <div className="mx-auto mt-0.5 h-1.5 w-[60%] bg-slate-700 rounded-b-sm" />
          </div>

          {/* Mobile Mockup — flotando en esquina inferior derecha */}
          <div className="absolute bottom-4 right-6 lg:bottom-6 lg:right-10 z-20 w-[24%] lg:w-[22%] drop-shadow-2xl group-hover:-translate-y-3 transition-transform duration-700 ease-out will-change-transform">
            <div className="bg-slate-900 rounded-[12px] lg:rounded-[20px] p-1 border-2 border-slate-700 aspect-9/19 shadow-2xl overflow-hidden">
              <img
                src={project.mobileImg}
                alt={`${project.name} — vista móvil`}
                className="w-full h-full object-cover rounded-[8px] lg:rounded-[14px]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Gradiente oscuro para el texto superpuesto */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] lg:h-1/2 bg-linear-to-t from-slate-900/95 via-slate-900/40 to-transparent z-30 pointer-events-none" />
      </div>

      {/* ── Texto superpuesto sobre el gradiente ──────────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-4 z-40 flex flex-col justify-end pointer-events-none">
        {/* Envoltorio del Badge y Título (Efecto Reveal: Baja en reposo, sube en hover) */}
        <div className="translate-y-8 lg:translate-y-10 group-hover:translate-y-0 transition-transform duration-300 ease-out">
          {/* Badge de categoría */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className="px-4 py-1.5 rounded-full text-[10px] font-bold text-white tracking-widest uppercase shadow-sm font-montserrat"
              style={{ backgroundColor: accentColor }}
            >
              {project.category}
            </span>
          </div>

          {/* Título */}
          <h3 className="text-2xl md:text-3xl lg:text-2xl font-extrabold text-white leading-tight font-montserrat drop-shadow-lg line-clamp-2 group-hover:text-jb-orange transition-colors duration-300">
            {project.name}
          </h3>
        </div>

        {/* Short description — aparece en hover con ligero deslizamiento adicional */}
        <p className="mt-3 text-white/80 text-[13px] font-lato leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out delay-75">
          {project.shortDescription}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
