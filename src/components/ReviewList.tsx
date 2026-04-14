import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Review } from '../types';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

// Datos estáticos como fallback mientras no haya reseñas en Firebase
const FALLBACK_REVIEWS: Review[] = TESTIMONIALS.map((t, i) => ({
  id: `static-${i}`,
  name: t.name,
  role: t.role,
  company: t.company,
  content: t.content,
  rating: t.rating,
  createdAt: null as any,
}));

// ─── Avatar colorido con inicial ────────────────────────────────────────────
const AVATAR_COLORS = [
  'bg-[#123498]',
  'bg-[#F46F0B]',
  'bg-[#41C4C0]',
  'bg-[#FDB907]',
  'bg-[#CE0B19]',
  'bg-[#096ACC]',
];

function getAvatarColor(name: string): string {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

// ─── Tarjeta de reseña ───────────────────────────────────────────────────────
interface ReviewCardProps {
  key?: React.Key;
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
  const initial = review.name?.charAt(0).toUpperCase() ?? '?';
  const avatarColor = getAvatarColor(review.name ?? '');

  return (
    <article
      className="
        relative overflow-hidden
        bg-white border border-slate-100
        rounded-3xl shadow-sm
        p-6
        min-w-[280px] max-w-[380px] w-[320px]
        flex flex-col gap-4
        shrink-0
        transition-shadow duration-300
        hover:shadow-md
      "
    >
      {/* Comillas decorativas gigantes en el fondo */}
      <Quote
        size={80}
        className="absolute -bottom-3 -right-2 text-slate-100 pointer-events-none select-none"
        aria-hidden="true"
      />

      {/* Estrellas — esquina superior derecha */}
      <div className="flex items-center justify-between">
        {/* Avatar + nombre */}
        <div className="flex items-center gap-3">
          <div
            className={`
              ${avatarColor}
              w-10 h-10 rounded-full
              flex items-center justify-center
              text-white font-black text-base font-montserrat
              shrink-0
            `}
            aria-hidden="true"
          >
            {initial}
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm leading-tight font-montserrat">
              {review.name}
            </p>
            {(review.role || review.company) && (
              <p className="text-xs text-slate-400 leading-tight">
                {[review.role, review.company].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
        </div>

        {/* Estrellas */}
        <div className="flex gap-0.5 shrink-0">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={13}
              className={
                star <= review.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-slate-200'
              }
            />
          ))}
        </div>
      </div>

      {/* Contenido de la reseña */}
      <p className="text-slate-600 text-sm leading-relaxed relative z-10 line-clamp-4">
        "{review.content}"
      </p>
    </article>
  );
}

// ─── Fila de marquee ─────────────────────────────────────────────────────────
function MarqueeRow({
  reviews,
  direction,
}: {
  reviews: Review[];
  direction: 'left' | 'right';
}) {
  // Duplicar el array para que el loop infinito sea invisible
  const repeated = [...reviews, ...reviews, ...reviews, ...reviews];
  const cls =
    direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div className="overflow-hidden w-full marquee-fade">
      <div className={`${cls} gap-4`}>
        {repeated.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

// ─── ReviewList principal ─────────────────────────────────────────────────────
const ReviewList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Review[];
        setReviews(data);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'reviews');
      },
    );
    return () => unsubscribe();
  }, []);

  // Si Firebase aún no tiene reseñas, muestra los testimonios estáticos como preview
  const displayReviews = reviews.length > 0 ? reviews : FALLBACK_REVIEWS;

  // Dividir en 2 filas intercaladas
  const row1 = displayReviews.filter((_, i) => i % 2 === 0);
  const row2 = displayReviews.filter((_, i) => i % 2 !== 0);

  // Garantizar mínimo de tarjetas para que el loop sea continuo
  const ensureMin = (arr: Review[], min = 4): Review[] => {
    if (arr.length === 0) return [];
    let result = [...arr];
    while (result.length < min) result = [...result, ...arr];
    return result;
  };

  return (
    <div className="flex flex-col justify-center gap-6 h-full">
      <MarqueeRow reviews={ensureMin(row1)} direction="left" />
      {row2.length > 0 && (
        <MarqueeRow reviews={ensureMin(row2)} direction="right" />
      )}
    </div>
  );
};

export default ReviewList;

