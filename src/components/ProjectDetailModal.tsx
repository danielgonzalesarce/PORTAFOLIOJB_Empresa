import React, { useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import {
  X,
  AlertCircle,
  CheckCircle2,
  Rocket,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Cpu,
  Video,
  Quote,
} from "lucide-react";
import { Project } from "../types";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

// ─── Carrusel de imágenes con Embla ─────────────────────────────────────────
function ImageCarousel({
  images,
  projectName,
  onImageClick,
}: {
  images: string[];
  projectName: string;
  onImageClick: (img: string) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="space-y-3">
      {/* Viewport del carrusel */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex gap-3">
          {images.map((img, index) => (
            <div
              key={index}
              className="flex-[0_0_85%] sm:flex-[0_0_70%] min-w-0 relative group cursor-zoom-in"
              onClick={() => onImageClick(img)}
            >
              <div className="aspect-video rounded-xl overflow-hidden shadow-md border border-slate-100 relative">
                <img
                  src={img}
                  alt={`${projectName} — captura ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Franja de descripción inferior */}
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent px-4 py-3 rounded-b-xl">
                  <p className="text-white text-xs font-lato leading-tight">
                    Vista de <span className="font-bold">{projectName}</span>
                    {" — "}
                    Captura {index + 1}
                  </p>
                </div>
                {/* Overlay hover con lupa */}
                <div className="absolute inset-0 bg-jb-blue/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                  <span className="text-white text-xs font-bold bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm font-montserrat">
                    Ampliar imagen
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles de navegación */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={scrollPrev}
          aria-label="Imagen anterior"
          className="p-2.5 rounded-full border-2 border-jb-blue/15 text-jb-blue hover:bg-jb-blue hover:text-white hover:border-jb-blue transition-all duration-200 shadow-sm"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-xs text-slate-400 font-montserrat font-bold tracking-wider uppercase">
          {images.length} capturas
        </span>
        <button
          onClick={scrollNext}
          aria-label="Siguiente imagen"
          className="p-2.5 rounded-full border-2 border-jb-blue/15 text-jb-blue hover:bg-jb-blue hover:text-white hover:border-jb-blue transition-all duration-200 shadow-sm"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

// ─── Tarjeta-Cita de Valor (shortDescription) ────────────────────────────────
function ValueQuoteCard({ text }: { text: string }) {
  return (
    <div className="relative rounded-2xl bg-jb-blue overflow-hidden px-8 py-7">
      {/* Comillas decorativas — fondo translúcido */}
      <Quote
        size={96}
        className="absolute -top-4 -left-3 text-jb-orange opacity-20 pointer-events-none select-none"
        aria-hidden="true"
      />
      <Quote
        size={48}
        className="absolute bottom-3 right-4 text-white opacity-10 rotate-180 pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* Comillas de apertura visibles */}
      <Quote
        size={22}
        className="text-jb-orange mb-3 opacity-90"
        aria-hidden="true"
      />

      {/* Texto de la cita */}
      <p className="text-white font-lato text-lg leading-relaxed italic relative z-10">
        {text}
      </p>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  if (!project) return null;

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  const videoEmbedUrl = project.videoUrl
    ? getYouTubeEmbedUrl(project.videoUrl)
    : null;

  const hasMedia =
    videoEmbedUrl || (project.images && project.images.length > 0);

  // URLs dinámicas para WhatsApp
  const phone = "51912736437";

  const quoteMessage = encodeURIComponent(
    `Hola, me gustaría recibir más información y una cotización sobre el sistema *${project.name}*.`,
  );
  const quoteUrl = `https://wa.me/${phone}?text=${quoteMessage}`;

  const demoMessage = encodeURIComponent(
    `Hola, estoy interesado en el sistema *${project.name}*. Me gustaría agendar una *demo en vivo* (por Zoom o Google Meet) para ver cómo funciona y resolver algunas dudas.`,
  );
  const demoUrl = `https://wa.me/${phone}?text=${demoMessage}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-60 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.93, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.93, opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-hidden flex flex-col relative shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ══ STICKY HEADER ══════════════════════════════════════════════════ */}
          <div className="sticky top-0 z-20 bg-white border-b border-slate-100 px-7 py-4 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-xl font-black text-jb-blue font-montserrat leading-tight truncate">
                {project.name}
              </h2>
              <p className="text-xs text-slate-400 font-lato mt-0.5">
                {project.category ?? "Proyecto"}
                {videoEmbedUrl
                  ? " · Video demostrativo disponible"
                  : project.images?.length
                    ? " · Galería de capturas"
                    : ""}
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="shrink-0 p-2 rounded-full text-slate-400 hover:text-jb-red hover:bg-red-50 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* ══ SCROLLABLE BODY ════════════════════════════════════════════════ */}
          <div className="flex-1 overflow-y-auto">
            {/* ── 1. Video héroe ──────────────────────────────────────────────── */}
            {videoEmbedUrl && (
              <div className="px-7 pt-7 pb-5">
                <div
                  className="rounded-2xl p-3"
                  style={{
                    background: "rgba(18, 52, 152, 0.04)",
                    boxShadow:
                      "0 0 40px rgba(18, 52, 152, 0.18), 0 0 0 1.5px rgba(18, 52, 152, 0.15)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <Rocket size={14} className="text-jb-orange" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-500 font-montserrat">
                      Demo en vivo
                    </span>
                    <span className="ml-auto bg-jb-orange/10 text-jb-orange text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      Video
                    </span>
                  </div>
                  <div className="aspect-video w-full rounded-xl overflow-hidden border border-jb-blue/10">
                    <iframe
                      src={videoEmbedUrl}
                      title={`Video ${project.name}`}
                      className="w-full h-full border-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── 2. Carrusel de imágenes (Embla) ─────────────────────────────── */}
            {project.images && project.images.length > 0 && (
              <div className={`px-7 ${videoEmbedUrl ? "pb-5" : "pt-7 pb-5"}`}>
                {!videoEmbedUrl && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 font-montserrat">
                      Galería de capturas
                    </span>
                  </div>
                )}
                <ImageCarousel
                  images={project.images}
                  projectName={project.name}
                  onImageClick={setSelectedImage}
                />
              </div>
            )}

            {/* ── 3. Tarjeta-Cita de Valor (shortDescription) ─────────────────── */}
            {project.shortDescription && (
              <div className="px-7 pb-7">
                <ValueQuoteCard text={project.shortDescription} />
              </div>
            )}

            {/* Si no hay media, añade espacio superior */}
            {!hasMedia && !project.shortDescription && <div className="pt-7" />}
            {!hasMedia && project.shortDescription && <div className="" />}

            {/* ── 4. Problema & Solución + Beneficios ─────────────────────────── */}
            <div className="px-7 pb-7 grid sm:grid-cols-2 gap-5">
              {/* Tarjeta: El Problema */}
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                    <AlertCircle size={20} className="text-red-500" />
                  </div>
                  <h4 className="font-black text-sm uppercase tracking-widest text-red-600 font-montserrat">
                    El Problema
                  </h4>
                </div>
                <p className="text-slate-700 text-base leading-relaxed font-lato">
                  {project.problem}
                </p>
              </div>

              {/* Tarjeta: Solución + Beneficios */}
              <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} className="text-teal-600" />
                  </div>
                  <h4 className="font-black text-sm uppercase tracking-widest text-teal-700 font-montserrat">
                    Solución y Beneficios
                  </h4>
                </div>
                <p className="text-slate-700 text-base leading-relaxed font-lato">
                  {project.solution}
                </p>
                {project.benefits && (
                  <div className="flex items-start gap-2 pt-3 border-t border-teal-200">
                    <TrendingUp
                      size={15}
                      className="text-jb-orange mt-0.5 shrink-0"
                    />
                    <p className="text-slate-700 text-sm leading-relaxed font-lato font-semibold">
                      {project.benefits}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── 5. Tech badges ──────────────────────────────────────────────── */}
            <div className="px-7 pb-6">
              <div className="border-t border-slate-100 pt-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-montserrat mb-3">
                  Stack tecnológico
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 bg-jb-blue/5 border border-jb-blue/15 text-jb-blue px-3 py-1 rounded-full text-xs font-bold font-montserrat"
                    >
                      <Cpu size={10} />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-4" />
          </div>

          {/* ══ STICKY FOOTER — CTA de cierre de ventas ════════════════════════ */}
          <div className="sticky bottom-0 z-20 bg-white border-t border-slate-100 px-7 py-4">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <motion.a
                href={quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  flex-1 sm:flex-none
                  inline-flex items-center justify-center gap-2
                  px-8 py-3.5 rounded-2xl
                  bg-jb-orange text-white
                  font-black text-sm font-montserrat tracking-wide
                  shadow-lg shadow-jb-orange/30
                  hover:bg-jb-blue transition-colors duration-200
                  w-full sm:w-auto
                "
              >
                <Rocket size={16} />
                Cotizar sistema
              </motion.a>

              <motion.a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  flex-1 sm:flex-none
                  inline-flex items-center justify-center gap-2
                  px-6 py-3.5 rounded-2xl
                  border-2 border-jb-blue text-jb-blue
                  font-black text-sm font-montserrat tracking-wide
                  hover:bg-jb-blue hover:text-white transition-colors duration-200
                  w-full sm:w-auto
                "
              >
                <Video size={16} />
                Pedir demo en vivo
              </motion.a>

              <p className="text-slate-500 text-xs font-lato text-center sm:text-left leading-relaxed hidden sm:block">
                💡{" "}
                <span className="font-semibold text-slate-600">
                  Sistema Personalizable
                </span>{" "}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ══ LIGHTBOX — aislado del modal padre ═══════════════════════════ */}
        <AnimatePresence>
          {selectedImage &&
            (() => {
              const imgIndex = project.images?.indexOf(selectedImage) ?? -1;
              const captionIndex = imgIndex >= 0 ? imgIndex + 1 : "?";
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-70 flex flex-col items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setSelectedImage(null);
                  }}
                >
                  {/* Botón cerrar */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setSelectedImage(null);
                    }}
                    aria-label="Cerrar imagen"
                    className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white z-50"
                  >
                    <X size={32} />
                  </button>

                  {/* Flechas de navegación */}
                  {project.images && project.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          const currentIndex =
                            project.images!.indexOf(selectedImage);
                          const prevIndex =
                            (currentIndex - 1 + project.images!.length) %
                            project.images!.length;
                          setSelectedImage(project.images![prevIndex]);
                        }}
                        aria-label="Imagen anterior"
                        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white z-50"
                      >
                        <ChevronLeft size={40} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          const currentIndex =
                            project.images!.indexOf(selectedImage);
                          const nextIndex =
                            (currentIndex + 1) % project.images!.length;
                          setSelectedImage(project.images![nextIndex]);
                        }}
                        aria-label="Siguiente imagen"
                        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white z-50"
                      >
                        <ChevronRight size={40} />
                      </button>
                    </>
                  )}

                  {/* Imagen ampliada */}
                  <motion.img
                    key={selectedImage}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    src={selectedImage}
                    alt={`${project.name} — Pantalla ${captionIndex}`}
                    className="max-w-full max-h-[70vh] rounded-2xl shadow-2xl object-contain"
                    referrerPolicy="no-referrer"
                    onClick={(e) => e.stopPropagation()}
                  />

                  {/* Caja de descripción debajo de la imagen */}
                  <motion.div
                    key={`caption-${selectedImage}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mt-4 bg-jb-blue text-white px-6 py-3 rounded-xl max-w-2xl w-full text-center shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <p className="font-lato text-sm leading-relaxed">
                      Vista detallada de{" "}
                      <span className="font-black font-montserrat">
                        {project.name}
                      </span>
                      {" — "}
                      Pantalla {captionIndex}
                      {project.images && project.images.length > 1 && (
                        <span className="text-white/60 text-xs ml-2">
                          ({captionIndex} / {project.images.length})
                        </span>
                      )}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })()}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
