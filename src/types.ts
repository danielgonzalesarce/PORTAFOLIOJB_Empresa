export interface Project {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  results: string;
  imageUrl: string;
  demoUrl: string;
  videoUrl?: string;
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
  rating: number; // 1-5
  createdAt: any; // Firestore Timestamp
}
