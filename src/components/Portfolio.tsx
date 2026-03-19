import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';
import { Project } from '../types';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('Todos');

  const categories = useMemo(() => {
    const cats = new Set(PROJECTS.map(p => p.category));
    return ['Todos', ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'Todos') return PROJECTS;
    return PROJECTS.filter(p => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="proyectos" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-jb-orange text-sm font-bold uppercase tracking-widest mb-4">Portafolio de Proyectos</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-jb-blue mb-6">
              Sistemas que <span className="text-jb-navy">Impulsan Negocios</span>
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Explora nuestras soluciones digitales ya desplegadas. Interactúa con las demos directamente y descubre cómo resolvemos problemas complejos con tecnología.
            </p>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-jb-blue text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-jb-blue/30'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ProjectCard 
                  project={project} 
                  onOpen={(p) => setSelectedProject(p)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-20 text-center">
          <p className="text-gray-500 mb-6">¿Tienes un proyecto en mente?</p>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center px-10 py-4 bg-jb-blue text-white rounded-full font-bold text-lg hover:bg-jb-orange transition-all shadow-xl"
          >
            Empezar un proyecto similar
          </a>
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
