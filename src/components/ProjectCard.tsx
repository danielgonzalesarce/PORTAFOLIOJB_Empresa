import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen }) => {
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const videoEmbedUrl = project.videoUrl ? getYouTubeEmbedUrl(project.videoUrl) : null;

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all flex flex-col h-full"
    >
      <div className="relative overflow-hidden aspect-video">
        {videoEmbedUrl ? (
          <iframe
            src={videoEmbedUrl}
            className="w-full h-full"
            title={project.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <motion.img
            src={project.imageUrl}
            alt={project.name}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-jb-blue text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {project.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-jb-blue/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onOpen(project)}
            className="bg-white text-jb-blue px-6 py-2 rounded-full font-bold hover:bg-jb-orange hover:text-white transition-colors"
          >
            Ver Detalles
          </motion.button>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h4 className="text-xl font-bold text-gray-900 group-hover:text-jb-blue transition-colors">
            {project.name}
          </h4>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Layers className="text-jb-teal flex-shrink-0 ml-2" size={20} />
          </motion.div>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-2">
          {project.shortDescription}
        </p>
        
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span key={tech} className="text-[10px] font-bold uppercase tracking-wider bg-jb-blue/10 text-jb-blue px-2 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpen(project)}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-jb-blue text-white py-3 rounded-xl font-bold hover:bg-jb-navy transition-colors text-sm"
            >
              Ver Proyecto
              {project.demoUrl ? <ExternalLink size={16} /> : null}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
