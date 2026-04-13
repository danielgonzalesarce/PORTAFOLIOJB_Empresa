import React from "react";
import { motion } from "motion/react";
import { Play, ExternalLink } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  index: number; // Necesario para el efecto de apilamiento
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpen,
  index,
}) => {
  // Mapeo de colores basado en tu paleta oficial
  const colorMap: Record<string, string> = {
    Logística: "#41C4C0", // Turquesa
    "E-commerce": "#CE0B19", // Rojo Persa
    Gimnasio: "#FDB907", // Amarillo Hansa
    RRHH: "#096ACC", // Azul Marino
    SaaS: "#123498", // Azul Principal
  };

  const accentColor =
    project.accentColor || colorMap[project.category] || "#123498";

  // Obtener imágenes para los mockups
  const laptopImg =
    project.imageUrl ||
    (project.images && project.images[0]) ||
    "https://picsum.photos/800/450";
  const mobileImg =
    (project.images && project.images[1]) || "https://picsum.photos/400/800";

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      onClick={() => onOpen(project)}
      className="group relative bg-slate-50 cursor-pointer rounded-2xl lg:rounded-4xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col h-full transition-all duration-300"
    >
      {/* VISUALES PRINCIPALES */}
      <div className="relative w-full pt-[65%] flex items-center justify-center overflow-hidden">
        {/* Fondo decorativo */}
        <div
          className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-500"
          style={{ backgroundColor: accentColor }}
        />

        {/* Contenedor Mockups */}
        <div className="absolute inset-0 flex items-center justify-center p-6 lg:p-10 pointer-events-none">
          {/* Laptop Mockup */}
          <motion.div className="relative z-10 w-[85%] drop-shadow-xl group-hover:scale-[1.03] transition-transform duration-700 ease-out will-change-transform">
            <div className="bg-slate-900 rounded-lg lg:rounded-xl p-1 lg:p-1.5 border-[3px] border-slate-700 shadow-xl">
              <img
                src={laptopImg}
                alt={`${project.name} Desktop`}
                className="rounded lg:rounded-lg w-full aspect-video object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Mobile Mockup - Flotando */}
          <motion.div className="absolute bottom-4 right-6 lg:bottom-6 lg:right-10 z-20 w-[24%] lg:w-[22%] drop-shadow-2xl group-hover:-translate-y-3 transition-transform duration-700 ease-out will-change-transform">
            <div className="bg-slate-900 rounded-[12px] lg:rounded-[20px] p-1 border-2 border-slate-700 aspect-9/19 shadow-2xl overflow-hidden">
              <img
                src={mobileImg}
                alt={`${project.name} Mobile`}
                className="w-full h-full object-cover rounded-[8px] lg:rounded-[14px]"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>

        {/* Gradiente Oscuro Abajo para el texto */}
        <div className="absolute bottom-0 left-0 right-0 h-[60%] lg:h-1/2 bg-linear-to-t from-slate-900/95 via-slate-900/40 to-transparent z-30 pointer-events-none" />
      </div>

      {/* TEXTO Y CATEGORÍA SUPERPUESTO */}
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-40 flex flex-col justify-end pointer-events-none">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="px-4 py-1.5 rounded-full text-[10px] font-bold text-white tracking-widest uppercase shadow-sm"
            style={{ backgroundColor: accentColor }}
          >
            {project.category}
          </span>
        </div>
        <h3 className="text-2xl md:text-3xl lg:text-2xl font-extrabold text-white leading-tight font-montserrat drop-shadow-lg line-clamp-2 group-hover:text-jb-orange transition-colors duration-300">
          {project.name}
        </h3>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
