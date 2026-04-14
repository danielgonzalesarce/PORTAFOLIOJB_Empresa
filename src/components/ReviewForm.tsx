import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Send, CheckCircle } from 'lucide-react';

const ReviewForm = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Por favor, selecciona una calificación.');
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        name,
        role,
        company,
        content,
        rating,
        createdAt: serverTimestamp(),
      });
      setName('');
      setRole('');
      setCompany('');
      setContent('');
      setRating(0);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'reviews');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 text-sm placeholder:text-slate-400 font-lato focus:outline-none focus:ring-2 focus:ring-jb-blue/25 focus:border-jb-blue transition-all duration-200';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7 flex flex-col gap-5"
    >
      {/* Encabezado */}
      <div>
        <h4 className="text-xl font-bold text-jb-blue font-montserrat leading-tight">
          Comparte tu experiencia
        </h4>
        <p className="text-slate-500 text-sm mt-1 font-lato">
          Tu opinión nos ayuda a crecer cada día.
        </p>
      </div>

      {/* Estrellas */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-montserrat">
          Calificación
        </label>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
              aria-label={`${star} estrella${star > 1 ? 's' : ''}`}
            >
              <Star
                size={28}
                className={`transition-colors duration-150 ${
                  star <= (hover || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-slate-200'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Nombre */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
        required
        className={inputBase}
      />

      {/* Cargo / Empresa */}
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Cargo"
          className={inputBase}
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Empresa"
          className={inputBase}
        />
      </div>

      {/* Comentario */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="¿Qué te pareció nuestro servicio?"
        required
        rows={4}
        className={`${inputBase} resize-none`}
      />

      {/* Botón de envío + feedback */}
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 justify-center py-3 rounded-2xl bg-emerald-50 text-emerald-600 font-bold text-sm font-montserrat"
          >
            <CheckCircle size={18} />
            ¡Gracias por tu reseña!
          </motion.div>
        ) : (
          <motion.button
            key="submit"
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="
              flex items-center justify-center gap-2
              w-full py-3.5 rounded-2xl
              bg-jb-blue text-white
              font-bold text-sm font-montserrat tracking-wide
              hover:bg-jb-orange
              disabled:opacity-60 disabled:cursor-not-allowed
              transition-colors duration-200
              shadow-md hover:shadow-lg
            "
          >
            {isSubmitting ? (
              <span className="animate-pulse">Enviando...</span>
            ) : (
              <>
                <Send size={16} />
                Enviar reseña
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
};

export default ReviewForm;
