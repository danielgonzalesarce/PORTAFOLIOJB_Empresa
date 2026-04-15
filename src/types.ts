export interface Project {
  // ─── Identificación ────────────────────────────────────────────────────────
  id: string;
  name: string;
  category: string;
  accentColor?: string;           // color hex para el acento de la tarjeta

  // ─── Textos (enfoque ventas B2B) ───────────────────────────────────────────
  shortDescription: string;       // hook de 1 línea que ataca el dolor del cliente
  problem: string;                // descripción del problema que tenía el cliente
  solution: string;               // lo que desarrollamos
  benefits?: string;              // resultados / métricas logradas

  // ─── Stack tecnológico ─────────────────────────────────────────────────────
  technologies: string[];

  // ─── Imágenes obligatorias para los mockups de la tarjeta ──────────────────
  laptopImg: string;              // captura desktop (relación 16:9)
  mobileImg: string;              // captura móvil (relación 9:19 aprox.)

  // ─── Media opcional para el modal ──────────────────────────────────────────
  images?: string[];              // galería de capturas para el carrusel
  demoUrl?: string;               // URL de demo en vivo
  videoUrl?: string;              // URL de YouTube para embed
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;        // 1-5
  createdAt: any;        // Firestore Timestamp
}
