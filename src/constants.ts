import { Project, Service, Testimonial } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "1",
    name: "Sistema de Asistencia y gestion RRHH",
    category: "ERP",
    shortDescription:
      "Plataforma integral para administración de clientes, ventas y reportes en tiempo real.",
    description:
      "Un sistema robusto diseñado para centralizar todas las operaciones críticas de una empresa mediana, permitiendo una visión 360 del negocio.",
    problem:
      "La empresa manejaba su información en múltiples hojas de cálculo desconectadas, lo que generaba duplicidad de datos y errores en los reportes financieros.",
    solution:
      "Desarrollamos un ERP a medida con módulos de inventario, facturación electrónica, CRM y un dashboard analítico avanzado.",
    technologies: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Cloud Deployment",
      "Tailwind CSS",
    ],
    results:
      "Reducción del 40% en el tiempo de generación de reportes y eliminación total de discrepancias en el inventario.",
    imageUrl: "https://picsum.photos/seed/erp/800/600",
    images: [
      "https://picsum.photos/seed/erp1/800/600",
      "https://picsum.photos/seed/erp2/800/600",
      "https://picsum.photos/seed/erp3/800/600",
      "https://picsum.photos/seed/erp4/800/600",
    ],
    demoUrl: "https://example.com",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "2",
    name: "Sistema de Inventario con Escaner",
    category: "ERP",
    shortDescription:
      "Plataforma integral para administración de clientes, ventas y reportes en tiempo real.",
    description:
      "Un sistema robusto diseñado para centralizar todas las operaciones críticas de una empresa mediana, permitiendo una visión 360 del negocio.",
    problem:
      "La empresa manejaba su información en múltiples hojas de cálculo desconectadas, lo que generaba duplicidad de datos y errores en los reportes financieros.",
    solution:
      "Desarrollamos un ERP a medida con módulos de inventario, facturación electrónica, CRM y un dashboard analítico avanzado.",
    technologies: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Cloud Deployment",
      "Tailwind CSS",
    ],
    results:
      "Reducción del 40% en el tiempo de generación de reportes y eliminación total de discrepancias en el inventario.",
    imageUrl: "https://picsum.photos/seed/erp/800/600",
    images: [
      "https://picsum.photos/seed/erp1/800/600",
      "https://picsum.photos/seed/erp2/800/600",
      "https://picsum.photos/seed/erp3/800/600",
      "https://picsum.photos/seed/erp4/800/600",
    ],
    demoUrl: "https://example.com",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "3",
    name: "Ecommerce con ventas via Whatsapp",
    category: "ERP",
    shortDescription:
      "Plataforma integral para administración de clientes, ventas y reportes en tiempo real.",
    description:
      "Un sistema robusto diseñado para centralizar todas las operaciones críticas de una empresa mediana, permitiendo una visión 360 del negocio.",
    problem:
      "La empresa manejaba su información en múltiples hojas de cálculo desconectadas, lo que generaba duplicidad de datos y errores en los reportes financieros.",
    solution:
      "Desarrollamos un ERP a medida con módulos de inventario, facturación electrónica, CRM y un dashboard analítico avanzado.",
    technologies: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Cloud Deployment",
      "Tailwind CSS",
    ],
    results:
      "Reducción del 40% en el tiempo de generación de reportes y eliminación total de discrepancias en el inventario.",
    imageUrl: "https://picsum.photos/seed/erp/800/600",
    images: [
      "https://picsum.photos/seed/erp1/800/600",
      "https://picsum.photos/seed/erp2/800/600",
      "https://picsum.photos/seed/erp3/800/600",
      "https://picsum.photos/seed/erp4/800/600",
    ],
    demoUrl: "https://example.com",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Carlos Mendoza",
    role: "Gerente General",
    company: "Distribuidora Norte",
    content:
      "La implementación del ERP cambió radicalmente nuestra forma de trabajar. Ahora tenemos datos reales para tomar decisiones.",
    avatar: "https://i.pravatar.cc/150?u=carlos",
    rating: 5,
  },
  {
    name: "Ana García",
    role: "Directora de Operaciones",
    company: "Logística Global",
    content:
      "El sistema de seguimiento nos permitió recuperar la confianza de nuestros clientes. Un servicio profesional y de alta calidad.",
    avatar: "https://i.pravatar.cc/150?u=ana",
    rating: 5,
  },
  {
    name: "Luis Torres",
    role: "Director Académico",
    company: "Instituto Tecnológico",
    content:
      "La asesoría en la gestión de tesis fue impecable. Gracias a su plataforma, nuestros alumnos se gradúan a tiempo.",
    avatar: "https://i.pravatar.cc/150?u=luis",
    rating: 5,
  },
  {
    name: "Elena Rodríguez",
    role: "Dueña de Negocio",
    company: "Artesanías del Perú",
    content:
      "El marketplace nos abrió las puertas a nuevos mercados. La atención y el soporte técnico son de primer nivel.",
    avatar: "https://i.pravatar.cc/150?u=elena",
    rating: 5,
  },
  {
    name: "Javier Huamán",
    role: "Jefe de Logística",
    company: "Transportes Rápidos",
    content:
      "El sistema de gestión de flotas IoT nos ha permitido reducir costos de mantenimiento significativamente. Altamente recomendados.",
    avatar: "https://i.pravatar.cc/150?u=javier",
    rating: 5,
  },
  {
    name: "María López",
    role: "Directora de Marketing",
    company: "Tech Solutions",
    content:
      "Excelente servicio, superaron nuestras expectativas en el desarrollo de la web.",
    avatar: "https://i.pravatar.cc/150?u=maria",
    rating: 5,
  },
  {
    name: "Juan Pérez",
    role: "CEO",
    company: "Innovatech",
    content:
      "La plataforma de telemedicina es muy intuitiva y segura. Muy recomendados.",
    avatar: "https://i.pravatar.cc/150?u=juan",
    rating: 4,
  },
  {
    name: "Sofía Martínez",
    role: "Gerente de RRHH",
    company: "Consultora Educativa",
    content:
      "El LMS corporativo ha facilitado mucho nuestro proceso de onboarding.",
    avatar: "https://i.pravatar.cc/150?u=sofia",
    rating: 5,
  },
  {
    name: "Pedro Gómez",
    role: "Gerente de Finanzas",
    company: "Finanzas S.A.",
    content:
      "El dashboard financiero nos da una visión clara de nuestro flujo de caja en tiempo real.",
    avatar: "https://i.pravatar.cc/150?u=pedro",
    rating: 5,
  },
];

export const PROCESS_STEPS = [
  {
    title: "Consulta Inicial",
    description:
      "Nuestra primera consulta es 100% gratis para entender tus necesidades.",
  },
  {
    title: "Análisis Personalizado",
    description:
      "Evaluamos tu situación actual para diseñar la mejor estrategia.",
  },
  {
    title: "Soluciones Específicas",
    description: "Desarrollamos propuestas a medida basadas en tus objetivos.",
  },
  {
    title: "Ejecución de Estrategias",
    description:
      "Implementamos las soluciones con un equipo multidisciplinario.",
  },
  {
    title: "Evaluación de Resultados",
    description: "Medimos el impacto y aseguramos el éxito a largo plazo.",
  },
];
