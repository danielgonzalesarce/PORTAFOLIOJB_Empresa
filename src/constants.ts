import { Project, Service, Testimonial } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Sistema de Gestión Empresarial ERP',
    category: 'ERP & CRM',
    shortDescription: 'Plataforma integral para administración de clientes, ventas y reportes en tiempo real.',
    description: 'Un sistema robusto diseñado para centralizar todas las operaciones críticas de una empresa mediana, permitiendo una visión 360 del negocio.',
    problem: 'La empresa manejaba su información en múltiples hojas de cálculo desconectadas, lo que generaba duplicidad de datos y errores en los reportes financieros.',
    solution: 'Desarrollamos un ERP a medida con módulos de inventario, facturación electrónica, CRM y un dashboard analítico avanzado.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Cloud Deployment', 'Tailwind CSS'],
    results: 'Reducción del 40% en el tiempo de generación de reportes y eliminación total de discrepancias en el inventario.',
    imageUrl: 'https://picsum.photos/seed/erp/800/600',
    images: [
      'https://picsum.photos/seed/erp1/800/600',
      'https://picsum.photos/seed/erp2/800/600',
      'https://picsum.photos/seed/erp3/800/600',
      'https://picsum.photos/seed/erp4/800/600'
    ],
    demoUrl: 'https://example.com',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '2',
    name: 'Portal de E-commerce B2B',
    category: 'E-commerce',
    shortDescription: 'Solución de comercio electrónico optimizada para transacciones entre empresas.',
    description: 'Plataforma de ventas al por mayor con gestión de precios dinámicos según el perfil del cliente y pedidos masivos.',
    problem: 'El proceso de pedidos era manual vía teléfono y correo, saturando al equipo de ventas y retrasando los despachos.',
    solution: 'Implementamos un portal auto-gestionable donde los clientes corporativos pueden ver su historial, precios especiales y realizar pedidos 24/7.',
    technologies: ['Next.js', 'Express', 'MongoDB', 'Redis', 'AWS'],
    results: 'Incremento del 25% en las ventas mensuales y liberación de 15 horas semanales del equipo comercial.',
    imageUrl: 'https://picsum.photos/seed/ecommerce/800/600',
    images: [
      'https://picsum.photos/seed/ecommerce1/800/600',
      'https://picsum.photos/seed/ecommerce2/800/600',
      'https://picsum.photos/seed/ecommerce3/800/600'
    ],
    demoUrl: 'https://example.com',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '3',
    name: 'App de Seguimiento Logístico',
    category: 'Logística',
    shortDescription: 'Monitoreo en tiempo real de flotas y entregas de última milla.',
    description: 'Aplicación web progresiva (PWA) para conductores y panel de control para despachadores.',
    problem: 'Falta de visibilidad sobre la ubicación de los transportistas y retrasos constantes en las entregas sin notificación al cliente final.',
    solution: 'Sistema de rastreo GPS integrado con notificaciones automáticas vía WhatsApp y optimización de rutas.',
    technologies: ['Vue.js', 'Firebase', 'Google Maps API', 'Node.js'],
    results: 'Mejora del 95% en la puntualidad de entregas y reducción del 15% en costos de combustible.',
    imageUrl: 'https://picsum.photos/seed/logistics/800/600',
    images: [
      'https://picsum.photos/seed/logistics1/800/600',
      'https://picsum.photos/seed/logistics2/800/600',
      'https://picsum.photos/seed/logistics3/800/600'
    ],
    demoUrl: 'https://example.com',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '4',
    name: 'CRM Inmobiliario',
    category: 'ERP & CRM',
    shortDescription: 'Gestión de propiedades, agentes y clientes potenciales para agencias inmobiliarias.',
    description: 'Plataforma centralizada para el seguimiento del embudo de ventas de bienes raíces, desde la captación hasta la firma del contrato.',
    problem: 'Pérdida de leads por falta de seguimiento automatizado y desorganización en el catálogo de propiedades.',
    solution: 'Desarrollo de un CRM con embudos personalizables, integración con portales inmobiliarios y alertas automáticas.',
    technologies: ['React', 'NestJS', 'PostgreSQL', 'Docker'],
    results: 'Aumento del 30% en la tasa de conversión de leads a visitas programadas.',
    imageUrl: 'https://picsum.photos/seed/realestate/800/600',
    images: [
      'https://picsum.photos/seed/realestate1/800/600',
      'https://picsum.photos/seed/realestate2/800/600',
      'https://picsum.photos/seed/realestate3/800/600'
    ],
    demoUrl: 'https://example.com',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '5',
    name: 'Plataforma de Telemedicina',
    category: 'Salud',
    shortDescription: 'Consultas médicas virtuales con historial clínico electrónico integrado.',
    description: 'Sistema seguro y compatible con normativas de salud para realizar videollamadas médicas, emitir recetas y gestionar citas.',
    problem: 'Dificultad para atender pacientes en zonas remotas y alta tasa de inasistencia a consultas presenciales.',
    solution: 'Implementación de una sala de espera virtual, videoconsultas encriptadas y pasarela de pagos integrada.',
    technologies: ['Next.js', 'WebRTC', 'Node.js', 'Stripe', 'AWS HIPAA'],
    results: 'Más de 5,000 consultas virtuales realizadas en el primer semestre y reducción del 40% en inasistencias.',
    imageUrl: 'https://picsum.photos/seed/health/800/600',
    images: [
      'https://picsum.photos/seed/health1/800/600',
      'https://picsum.photos/seed/health2/800/600',
      'https://picsum.photos/seed/health3/800/600'
    ],
    demoUrl: 'https://example.com',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '6',
    name: 'Sistema POS Cloud',
    category: 'ERP & CRM',
    shortDescription: 'Punto de venta en la nube para múltiples sucursales con sincronización offline.',
    description: 'Software de caja registradora moderna que funciona en tablets y computadoras, manteniendo el inventario sincronizado en tiempo real.',
    problem: 'Cortes de internet paralizaban las ventas y el cuadre de caja entre sucursales tomaba horas.',
    solution: 'Arquitectura offline-first que permite seguir vendiendo sin conexión y sincroniza automáticamente al recuperar la red.',
    technologies: ['React', 'IndexedDB', 'GraphQL', 'Node.js'],
    results: 'Cero interrupciones en ventas por caídas de red y cuadre de caja automatizado en 5 minutos.',
    imageUrl: 'https://picsum.photos/seed/pos/800/600',
    images: [
      'https://picsum.photos/seed/pos1/800/600',
      'https://picsum.photos/seed/pos2/800/600',
      'https://picsum.photos/seed/pos3/800/600'
    ],
    demoUrl: 'https://example.com',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '7',
    name: 'LMS Corporativo',
    category: 'Educación',
    shortDescription: 'Plataforma de e-learning para capacitación y onboarding de empleados.',
    description: 'Sistema de gestión de aprendizaje con rutas personalizadas, evaluaciones interactivas y certificados automáticos.',
    problem: 'Altos costos en capacitaciones presenciales y dificultad para medir el progreso de los nuevos ingresos.',
    solution: 'Portal educativo gamificado con seguimiento de progreso en tiempo real y reportes para recursos humanos.',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS S3'],
    results: 'Ahorro del 60% en costos de capacitación y reducción del tiempo de onboarding a la mitad.',
    imageUrl: 'https://picsum.photos/seed/education/800/600',
    images: [
      'https://picsum.photos/seed/education1/800/600',
      'https://picsum.photos/seed/education2/800/600',
      'https://picsum.photos/seed/education3/800/600'
    ],
    demoUrl: 'https://example.com',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '8',
    name: 'Dashboard Financiero',
    category: 'Finanzas',
    shortDescription: 'Visualización de datos y proyecciones financieras para toma de decisiones.',
    description: 'Tablero de control interactivo que consolida información de múltiples cuentas bancarias y sistemas contables.',
    problem: 'La gerencia tomaba decisiones basadas en reportes financieros con un mes de retraso.',
    solution: 'Integración mediante APIs bancarias para mostrar flujo de caja, cuentas por cobrar y pagar en tiempo real.',
    technologies: ['React', 'D3.js', 'Python', 'FastAPI'],
    results: 'Visibilidad financiera en tiempo real, mejorando la liquidez de la empresa en un 15%.',
    imageUrl: 'https://picsum.photos/seed/finance/800/600',
    images: [
      'https://picsum.photos/seed/finance1/800/600',
      'https://picsum.photos/seed/finance2/800/600',
      'https://picsum.photos/seed/finance3/800/600'
    ],
    demoUrl: 'https://example.com',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '9',
    name: 'Marketplace B2C',
    category: 'E-commerce',
    shortDescription: 'Plataforma multi-vendedor para productos artesanales locales.',
    description: 'E-commerce donde múltiples artesanos pueden crear su tienda, subir productos y gestionar sus propios envíos.',
    problem: 'Pequeños productores no tenían los recursos para crear y mantener sus propias tiendas online.',
    solution: 'Marketplace centralizado con panel de administración para vendedores, cálculo de comisiones automático y pasarela de pagos dividida.',
    technologies: ['Next.js', 'Supabase', 'Stripe Connect', 'Tailwind CSS'],
    results: 'Más de 200 vendedores activos y un crecimiento mensual en ventas del 20%.',
    imageUrl: 'https://picsum.photos/seed/marketplace/800/600',
    images: [
      'https://picsum.photos/seed/marketplace1/800/600',
      'https://picsum.photos/seed/marketplace2/800/600',
      'https://picsum.photos/seed/marketplace3/800/600'
    ],
    demoUrl: 'https://example.com',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '10',
    name: 'Gestión de Flotas IoT',
    category: 'Logística',
    shortDescription: 'Monitoreo de telemetría y mantenimiento predictivo para vehículos pesados.',
    description: 'Plataforma que procesa datos de sensores IoT instalados en camiones para prevenir fallas mecánicas.',
    problem: 'Mantenimientos correctivos costosos y vehículos parados por fallas imprevistas en ruta.',
    solution: 'Dashboard de monitoreo en tiempo real que alerta sobre anomalías en temperatura, presión y consumo de combustible.',
    technologies: ['React', 'Node.js', 'InfluxDB', 'MQTT', 'AWS IoT'],
    results: 'Reducción del 35% en mantenimientos correctivos y aumento de la vida útil de la flota.',
    imageUrl: 'https://picsum.photos/seed/iot/800/600',
    images: [
      'https://picsum.photos/seed/iot1/800/600',
      'https://picsum.photos/seed/iot2/800/600',
      'https://picsum.photos/seed/iot3/800/600'
    ],
    demoUrl: 'https://example.com',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '11',
    name: 'Plataforma de Gestión Académica',
    category: 'Educación',
    shortDescription: 'Sistema integral para la gestión de tesis y sustentaciones universitarias.',
    description: 'Plataforma web que permite a los estudiantes gestionar el avance de sus tesis, recibir retroalimentación de asesores y agendar simulaciones de sustentación.',
    problem: 'Procesos manuales y desorganizados para el seguimiento de tesis, causando retrasos en la graduación.',
    solution: 'Sistema centralizado con flujos de aprobación, notificaciones automáticas y repositorio de documentos.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    results: 'Reducción del 50% en el tiempo de aprobación de tesis.',
    imageUrl: 'https://picsum.photos/seed/edu/800/600',
    images: [
      'https://picsum.photos/seed/edu1/800/600',
      'https://picsum.photos/seed/edu2/800/600'
    ],
    demoUrl: 'https://example.com',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '12',
    name: 'Sistema de Control de Inventarios',
    category: 'ERP & CRM',
    shortDescription: 'Control de stock en tiempo real con alertas de reabastecimiento.',
    description: 'Aplicación para gestionar inventarios de múltiples almacenes, con escaneo de códigos de barras y reportes de movimientos.',
    problem: 'Falta de control sobre el stock real, generando quiebres de inventario o sobrestock.',
    solution: 'Sistema con sincronización en tiempo real, alertas de stock mínimo y reportes de valorización de inventario.',
    technologies: ['TypeScript', 'Express', 'MongoDB', 'Docker'],
    results: 'Optimización del 30% en la gestión de compras y reducción de pérdidas por inventario.',
    imageUrl: 'https://picsum.photos/seed/inv/800/600',
    images: [
      'https://picsum.photos/seed/inv1/800/600',
      'https://picsum.photos/seed/inv2/800/600'
    ],
    demoUrl: 'https://example.com',
    videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw'
  }
];

export const SERVICES: Service[] = [
  {
    title: 'Servicio Empresarial',
    description: 'Estrategias de crecimiento, optimización financiera y coaching profesional para potenciar tu negocio.',
    icon: 'TrendingUp'
  },
  {
    title: 'Servicio Web',
    description: 'Desarrollo de páginas web, soporte, mantenimiento y hosting gestionado premium.',
    icon: 'Monitor'
  },
  {
    title: 'Servicio Legal',
    description: 'Derecho empresarial, propiedad intelectual, derecho laboral y solución de conflictos.',
    icon: 'Shield'
  },
  {
    title: 'Servicio Pregrado y Posgrado',
    description: 'Asesoría en elaboración de tesis, simulaciones de sustentación y revisión de perfiles profesionales.',
    icon: 'GraduationCap'
  },
  {
    title: 'Capacitaciones Corporativas',
    description: 'Entrenamientos en habilidades blandas, ventas, marketing digital y seguridad en el trabajo.',
    icon: 'Users'
  },
  {
    title: 'Reclutamiento y Selección',
    description: 'Servicio integral de búsqueda y selección del mejor talento para tu organización.',
    icon: 'Search'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Carlos Mendoza',
    role: 'Gerente General',
    company: 'Distribuidora Norte',
    content: 'La implementación del ERP cambió radicalmente nuestra forma de trabajar. Ahora tenemos datos reales para tomar decisiones.',
    avatar: 'https://i.pravatar.cc/150?u=carlos',
    rating: 5
  },
  {
    name: 'Ana García',
    role: 'Directora de Operaciones',
    company: 'Logística Global',
    content: 'El sistema de seguimiento nos permitió recuperar la confianza de nuestros clientes. Un servicio profesional y de alta calidad.',
    avatar: 'https://i.pravatar.cc/150?u=ana',
    rating: 5
  },
  {
    name: 'Luis Torres',
    role: 'Director Académico',
    company: 'Instituto Tecnológico',
    content: 'La asesoría en la gestión de tesis fue impecable. Gracias a su plataforma, nuestros alumnos se gradúan a tiempo.',
    avatar: 'https://i.pravatar.cc/150?u=luis',
    rating: 5
  },
  {
    name: 'Elena Rodríguez',
    role: 'Dueña de Negocio',
    company: 'Artesanías del Perú',
    content: 'El marketplace nos abrió las puertas a nuevos mercados. La atención y el soporte técnico son de primer nivel.',
    avatar: 'https://i.pravatar.cc/150?u=elena',
    rating: 5
  },
  {
    name: 'Javier Huamán',
    role: 'Jefe de Logística',
    company: 'Transportes Rápidos',
    content: 'El sistema de gestión de flotas IoT nos ha permitido reducir costos de mantenimiento significativamente. Altamente recomendados.',
    avatar: 'https://i.pravatar.cc/150?u=javier',
    rating: 5
  },
  {
    name: 'María López',
    role: 'Directora de Marketing',
    company: 'Tech Solutions',
    content: 'Excelente servicio, superaron nuestras expectativas en el desarrollo de la web.',
    avatar: 'https://i.pravatar.cc/150?u=maria',
    rating: 5
  },
  {
    name: 'Juan Pérez',
    role: 'CEO',
    company: 'Innovatech',
    content: 'La plataforma de telemedicina es muy intuitiva y segura. Muy recomendados.',
    avatar: 'https://i.pravatar.cc/150?u=juan',
    rating: 4
  },
  {
    name: 'Sofía Martínez',
    role: 'Gerente de RRHH',
    company: 'Consultora Educativa',
    content: 'El LMS corporativo ha facilitado mucho nuestro proceso de onboarding.',
    avatar: 'https://i.pravatar.cc/150?u=sofia',
    rating: 5
  },
  {
    name: 'Pedro Gómez',
    role: 'Gerente de Finanzas',
    company: 'Finanzas S.A.',
    content: 'El dashboard financiero nos da una visión clara de nuestro flujo de caja en tiempo real.',
    avatar: 'https://i.pravatar.cc/150?u=pedro',
    rating: 5
  }
];

export const PROCESS_STEPS = [
  { title: 'Consulta Inicial', description: 'Nuestra primera consulta es 100% gratis para entender tus necesidades.' },
  { title: 'Análisis Personalizado', description: 'Evaluamos tu situación actual para diseñar la mejor estrategia.' },
  { title: 'Soluciones Específicas', description: 'Desarrollamos propuestas a medida basadas en tus objetivos.' },
  { title: 'Ejecución de Estrategias', description: 'Implementamos las soluciones con un equipo multidisciplinario.' },
  { title: 'Evaluación de Resultados', description: 'Medimos el impacto y aseguramos el éxito a largo plazo.' }
];
