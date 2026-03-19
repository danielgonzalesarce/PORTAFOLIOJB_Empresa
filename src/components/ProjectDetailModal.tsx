import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Info, CheckCircle2, AlertCircle, Rocket, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  if (!project) return null;

  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const videoEmbedUrl = project.videoUrl ? getYouTubeEmbedUrl(project.videoUrl) : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-3xl overflow-hidden flex flex-col relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div>
              <h3 className="text-2xl font-bold text-jb-blue">{project.name}</h3>
              <p className="text-gray-500 text-sm">
                Detalles del Proyecto {videoEmbedUrl && project.images?.length ? 'con Video y Galería' : videoEmbedUrl ? 'y Video Demostrativo' : 'y Demo Interactiva'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-jb-red"
            >
              <X size={28} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-grow overflow-y-auto">
            <div className="grid lg:grid-cols-5 gap-0 h-full">
              {/* Info Sidebar */}
              <div className="lg:col-span-2 p-8 bg-gray-50 border-r border-gray-100 space-y-8">
                <section>
                  <div className="flex items-center gap-2 text-jb-red mb-3">
                    <AlertCircle size={20} />
                    <h4 className="font-bold uppercase text-xs tracking-widest">El Problema</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{project.problem}</p>
                </section>

                <section>
                  <div className="flex items-center gap-2 text-jb-teal mb-3">
                    <CheckCircle2 size={20} />
                    <h4 className="font-bold uppercase text-xs tracking-widest">La Solución</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{project.solution}</p>
                </section>

                <section>
                  <div className="flex items-center gap-2 text-jb-orange mb-3">
                    <Rocket size={20} />
                    <h4 className="font-bold uppercase text-xs tracking-widest">Resultados</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{project.results}</p>
                </section>

                <section>
                  <h4 className="font-bold uppercase text-xs tracking-widest text-gray-400 mb-4">Tecnologías</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-lg text-xs font-medium shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                <div className="pt-6">
                  <a
                    href={videoEmbedUrl ? project.videoUrl : project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-jb-orange text-white py-4 rounded-2xl font-bold hover:bg-jb-blue transition-all shadow-lg transform hover:-translate-y-1"
                  >
                    {videoEmbedUrl ? 'Abrir video en nueva pestaña' : 'Abrir en nueva pestaña'}
                    <ExternalLink size={18} />
                  </a>
                  <p className="text-center text-[10px] text-gray-400 mt-4">
                    ¿Necesitas un sistema similar? <a href="#contacto" onClick={onClose} className="text-jb-blue underline">Contáctanos</a>
                  </p>
                </div>
              </div>

              {/* Demo Viewport / Media Content */}
              <div className="lg:col-span-3 bg-gray-100 flex flex-col overflow-y-auto">
                {/* Browser Header (Sticky) */}
                <div className="bg-gray-800 p-3 flex items-center gap-2 sticky top-0 z-20">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-grow mx-4 bg-gray-700 rounded-md py-1 px-3 text-[10px] text-gray-400 font-mono truncate">
                    {videoEmbedUrl ? project.videoUrl : project.demoUrl}
                  </div>
                </div>

                <div className="flex-grow p-6 space-y-8">
                  {/* Video Section */}
                  {videoEmbedUrl && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-jb-blue flex items-center gap-2">
                          <Rocket size={18} className="text-jb-orange" />
                          Video Demostrativo
                        </h4>
                        <span className="bg-jb-orange/10 text-jb-orange text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          En Vivo
                        </span>
                      </div>
                      <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                        <iframe
                          src={videoEmbedUrl}
                          title={`Video ${project.name}`}
                          className="w-full h-full border-none"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  {/* Gallery Section */}
                  {project.images && project.images.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-bold text-jb-blue flex items-center gap-2">
                        <Info size={18} className="text-jb-teal" />
                        Galería de Capturas
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {project.images.map((img, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedImage(img)}
                            className="aspect-video rounded-xl overflow-hidden shadow-md border-2 border-white cursor-pointer group relative"
                          >
                            <img
                              src={img}
                              alt={`${project.name} screenshot ${index + 1}`}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-jb-blue/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-xs font-bold bg-jb-blue/80 px-3 py-1 rounded-full backdrop-blur-sm">
                                Ver Imagen
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Fallback to Demo Iframe if no video and no images */}
                  {!videoEmbedUrl && (!project.images || project.images.length === 0) && (
                    <div className="h-full min-h-[400px] rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                      <iframe
                        src={project.demoUrl}
                        title={`Demo ${project.name}`}
                        className="w-full h-full border-none"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lightbox for Gallery Images */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white z-50"
              >
                <X size={32} />
              </button>

              {/* Navigation Arrows */}
              {project.images && project.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentIndex = project.images!.indexOf(selectedImage);
                      const prevIndex = (currentIndex - 1 + project.images!.length) % project.images!.length;
                      setSelectedImage(project.images![prevIndex]);
                    }}
                    className="absolute left-4 md:left-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white z-50"
                  >
                    <ChevronLeft size={40} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const currentIndex = project.images!.indexOf(selectedImage);
                      const nextIndex = (currentIndex + 1) % project.images!.length;
                      setSelectedImage(project.images![nextIndex]);
                    }}
                    className="absolute right-4 md:right-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white z-50"
                  >
                    <ChevronRight size={40} />
                  </button>
                </>
              )}

              <motion.img
                key={selectedImage}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-full rounded-xl shadow-2xl object-contain"
                referrerPolicy="no-referrer"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
