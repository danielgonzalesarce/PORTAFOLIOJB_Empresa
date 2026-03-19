import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const ReviewForm = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      alert('¡Gracias por tu reseña!');
    } catch (error) {
      console.error('Error adding review: ', error);
      alert('Hubo un error al enviar tu reseña.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <h3 className="text-2xl font-bold text-jb-blue mb-6">Deja tu reseña</h3>
      
      <div className="flex gap-1 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              size={32}
              className={`${
                star <= (hover || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              } transition-colors`}
            />
          </button>
        ))}
      </div>

      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required className="w-full mb-4 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-jb-blue/20 focus:border-jb-blue transition-all" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Cargo" className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-jb-blue/20 focus:border-jb-blue transition-all" />
        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Empresa" className="p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-jb-blue/20 focus:border-jb-blue transition-all" />
      </div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="¿Qué te pareció nuestro servicio?" required className="w-full mb-6 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-jb-blue/20 focus:border-jb-blue transition-all h-32" />
      
      <button type="submit" disabled={isSubmitting} className="w-full bg-jb-blue text-white py-4 rounded-xl font-bold hover:bg-jb-navy transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
        {isSubmitting ? 'Enviando...' : 'Enviar Reseña'}
      </button>
    </form>
  );
};

export default ReviewForm;
