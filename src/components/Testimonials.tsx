import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../constants';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 6;

  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = TESTIMONIALS.slice(indexOfFirstTestimonial, indexOfLastTestimonial);
  const totalPages = Math.ceil(TESTIMONIALS.length / testimonialsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-jb-blue text-sm font-bold uppercase tracking-[0.2em] mb-4">Testimonios</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-stone-900 tracking-tight">
            Lo que dicen <span className="text-jb-red">nuestros clientes</span>
          </h3>
          <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
            Historias de éxito que nos inspiran a seguir innovando y entregando excelencia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-white rounded-3xl shadow-sm border border-stone-100 relative overflow-hidden group hover:shadow-md transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 text-stone-100 group-hover:text-jb-blue/5 transition-colors" size={60} />
              
              <p className="text-stone-700 mb-8 relative z-10 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-bold text-stone-900">{testimonial.name}</h4>
                    <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">{testimonial.role} • {testimonial.company}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={`${
                        star <= testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-stone-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mb-24">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-white shadow border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-stone-700 font-medium">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-white shadow border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
        
        <div className="max-w-3xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-stone-900 mb-4">¿Quieres compartir tu experiencia?</h3>
            <p className="text-stone-600">Tu opinión nos ayuda a mejorar cada día. Déjanos tu reseña y forma parte de nuestra comunidad.</p>
          </div>
          <ReviewForm />
        </div>
        
        <div>
          <h3 className="text-3xl font-bold text-stone-900 mb-12 text-center">Reseñas recientes</h3>
          <ReviewList />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

