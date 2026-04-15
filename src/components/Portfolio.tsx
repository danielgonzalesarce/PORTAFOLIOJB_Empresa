import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { PROJECTS } from "../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import { Project } from "../types";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Returns the count of projects per category */
function useCategoryCounts() {
  return useMemo(() => {
    const counts: Record<string, number> = { Todos: PROJECTS.length };
    PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return counts;
  }, []);
}

// ─── Filter Pills ────────────────────────────────────────────────────────────

interface FilterPillsProps {
  categories: string[];
  activeFilter: string;
  counts: Record<string, number>;
  onSelect: (cat: string) => void;
}

const FilterPills: React.FC<FilterPillsProps> = ({
  categories,
  activeFilter,
  counts,
  onSelect,
}) => (
  <div className="flex flex-wrap justify-center gap-2 mb-10">
    {categories.map((category) => {
      const isActive = activeFilter === category;
      return (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`
            relative px-5 py-2 rounded-xl font-bold text-sm transition-all
            font-montserrat flex items-center gap-2
            ${
              isActive
                ? "bg-jb-blue text-white shadow-lg shadow-jb-blue/20 scale-105"
                : "bg-gray-100 text-gray-500 hover:bg-jb-blue/5 hover:text-jb-blue border border-transparent"
            }
          `}
        >
          {category}
          {/* Count badge */}
          <span
            className={`
              text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none
              ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-gray-200 text-gray-400"
              }
            `}
          >
            {counts[category] ?? 0}
          </span>
          {/* Active underline indicator */}
          {isActive && (
            <motion.span
              layoutId="active-pill-indicator"
              className="absolute inset-0 rounded-xl ring-2 ring-jb-blue/30"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      );
    })}
  </div>
);

// ─── Mobile / Tablet Grid ────────────────────────────────────────────────────

interface MobileGridProps {
  projects: Project[];
  onOpen: (p: Project) => void;
}

const MobileGrid: React.FC<MobileGridProps> = ({ projects, onOpen }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const hasMore = visibleCount < projects.length;

  // Reset visible count whenever the filtered list changes
  useEffect(() => {
    setVisibleCount(6);
  }, [projects]);

  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <div>
      {/* Results counter */}
      <p className="text-center text-sm text-gray-400 font-montserrat mb-6">
        Mostrando{" "}
        <span className="text-jb-blue font-bold">{visibleProjects.length}</span>{" "}
        de <span className="text-jb-blue font-bold">{projects.length}</span>{" "}
        proyectos
      </p>

      {/* Grid: 1 col on mobile, 2 col on tablet (md) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              transition={{
                duration: 0.35,
                delay: i < 6 ? i * 0.05 : 0, // stagger only on first render
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="h-full"
            >
              <ProjectCard
                project={project}
                onOpen={onOpen}
                index={i}
                // Force cards to fill the grid cell height uniformly
                className="h-full"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center py-16 text-gray-400"
        >
          <span className="text-4xl mb-3">🔍</span>
          <p className="font-montserrat font-semibold text-gray-500">
            Sin proyectos en esta categoría
          </p>
          <p className="text-sm mt-1">Prueba seleccionando "Todos"</p>
        </motion.div>
      )}

      {/* Load more */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mt-10"
        >
          <button
            onClick={() => setVisibleCount((n) => n + 6)}
            className="
              group flex items-center gap-2 px-8 py-3
              border-2 border-jb-blue/20 text-jb-blue rounded-2xl
              font-bold font-montserrat text-sm
              hover:bg-jb-blue hover:text-white hover:border-jb-blue
              transition-all duration-200
            "
          >
            Ver más proyectos
            <span className="text-xs opacity-60 group-hover:opacity-100">
              ({projects.length - visibleCount} restantes)
            </span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

// ─── Desktop Carousel ────────────────────────────────────────────────────────

interface DesktopCarouselProps {
  projects: Project[];
  onOpen: (p: Project) => void;
}

const DesktopCarousel: React.FC<DesktopCarouselProps> = ({
  projects,
  onOpen,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [projects, emblaApi]);

  return (
    <div>
      <div className="embla" ref={emblaRef}>
        <div className="flex gap-6">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="flex-[0_0_100%] lg:flex-[0_0_50%] min-w-0 pr-6 lg:pr-8"
            >
              <ProjectCard project={project} onOpen={onOpen} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel navigation */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={scrollPrev}
          aria-label="Proyecto anterior"
          className="p-3 rounded-full border-2 border-jb-blue/10 text-jb-blue hover:bg-jb-blue hover:text-white transition-all shadow-sm"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Proyecto siguiente"
          className="p-3 rounded-full border-2 border-jb-blue/10 text-jb-blue hover:bg-jb-blue hover:text-white transition-all shadow-sm"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("Todos");

  const categoryCounts = useCategoryCounts();

  const categories = useMemo(() => {
    const cats = new Set(PROJECTS.map((p) => p.category));
    return ["Todos", ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "Todos") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="proyectos" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-jb-blue font-montserrat">
              Nuestros <span className="text-jb-orange">Proyectos</span>
            </h3>
          </motion.div>
        </div>

        {/* Filter pills — shared between both layouts */}
        <FilterPills
          categories={categories}
          activeFilter={activeFilter}
          counts={categoryCounts}
          onSelect={setActiveFilter}
        />

        {/*
         * LAYOUT SWITCH:
         *   - Mobile + Tablet (< lg): static grid with "load more"
         *   - Desktop (>= lg):        Embla carousel (original behaviour)
         */}
        <div className="block lg:hidden">
          {/* Re-mount MobileGrid on filter change so stagger animation replays */}
          <MobileGrid
            key={activeFilter}
            projects={filteredProjects}
            onOpen={setSelectedProject}
          />
        </div>

        <div className="hidden lg:block">
          <DesktopCarousel
            projects={filteredProjects}
            onOpen={setSelectedProject}
          />
        </div>

        {/* Section footer */}
        <div className="mt-16 flex flex-col items-center">
          <div className="w-24 h-1 bg-jb-orange/20 rounded-full mb-8" />
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contacto"
            className="px-12 py-4 bg-jb-orange text-white rounded-2xl font-bold text-lg hover:bg-jb-blue transition-all shadow-xl font-montserrat"
          >
            Cotizar un sistema similar
          </motion.a>
        </div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Portfolio;
