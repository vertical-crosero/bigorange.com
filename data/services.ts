export type ServiceCategory = "personas" | "empresas" | "responsabilidad";

export type Service = {
  id: number;
  category: ServiceCategory;
  title: string;
  description: string;
};

export const categories: Record<
  ServiceCategory,
  { label: string; short: string; description: string }
> = {
  personas: {
    label: "Seguros personales",
    short: "Personas",
    description: "Vida, salud, hogar, autos y accidentes para ti y tu familia."
  },
  empresas: {
    label: "Seguros empresariales",
    short: "Empresas",
    description: "Activos, transporte, cumplimiento y continuidad operativa."
  },
  responsabilidad: {
    label: "Responsabilidad civil",
    short: "RC",
    description: "Respaldo patrimonial ante reclamaciones de terceros."
  }
};

export const services: Service[] = [
  { id: 1, category: "personas", title: "Seguros medicos internacionales", description: "Acceso a redes clinicas y hospitalarias fuera del pais, con cobertura para emergencias, hospitalizacion, cirugias y asistencia en viaje." },
  { id: 2, category: "personas", title: "Seguros de vida", description: "Proteccion financiera para tu familia ante fallecimiento o incapacidad permanente." },
  { id: 3, category: "personas", title: "Salud nacional e internacional", description: "Planes de atencion medica dentro y fuera de Colombia, con especialistas, examenes, tratamientos y hospitalizacion." },
  { id: 4, category: "personas", title: "Accidentes personales", description: "Indemnizaciones y asistencia economica frente a lesiones, incapacidad o fallecimiento accidental." },
  { id: 5, category: "personas", title: "Accidentes para estudiantes", description: "Proteccion durante actividades academicas, deportivas y recreativas." },
  { id: 6, category: "personas", title: "Seguro de hogar", description: "Cobertura para vivienda y bienes frente a incendio, terremoto, robo, danos por agua y responsabilidad civil." },
  { id: 7, category: "personas", title: "Seguro de automoviles", description: "Proteccion ante accidentes, hurto, danos propios y a terceros, con asistencia en carretera." },
  { id: 8, category: "personas", title: "SOAT", description: "Seguro obligatorio para atencion medica inmediata en accidentes de transito." },
  { id: 9, category: "empresas", title: "Seguros empresariales", description: "Soluciones para proteger activos, operaciones y continuidad de empresas de distintos tamanos." },
  { id: 10, category: "empresas", title: "Seguro de transporte", description: "Cobertura para mercancias durante trayectos terrestres, maritimos o aereos." },
  { id: 11, category: "empresas", title: "Sector hidrocarburos", description: "Proteccion para instalaciones, equipos, operaciones y responsabilidades del sector energetico." },
  { id: 12, category: "empresas", title: "Seguro de cumplimiento", description: "Garantia para obligaciones contractuales y legales ante entidades publicas o privadas." },
  { id: 13, category: "empresas", title: "Seguro todo riesgo", description: "Cobertura integral para bienes, maquinaria, equipos y activos empresariales." },
  { id: 14, category: "empresas", title: "Seguro de arrendamiento", description: "Proteccion para propietarios e inmobiliarias frente a incumplimientos de pago y danos al inmueble." },
  { id: 15, category: "responsabilidad", title: "Responsabilidad civil", description: "Respaldo frente a reclamaciones por danos materiales, lesiones o perjuicios involuntarios a terceros." },
  { id: 16, category: "responsabilidad", title: "RC profesional medica", description: "Proteccion para profesionales de la salud ante reclamaciones por presuntos errores u omisiones." },
  { id: 17, category: "responsabilidad", title: "RC para clinicas y hospitales", description: "Cobertura para instituciones de salud frente a reclamaciones derivadas de la prestacion de servicios medicos." }
];
