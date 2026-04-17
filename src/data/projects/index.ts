import { Project } from "../../types";

// Importa todos los .json de la carpeta de forma eager (síncrona)
const modules = import.meta.glob<Project>("./*.json", { eager: true });

// Construye el array ordenado alfabéticamente por nombre de archivo
export const PROJECTS: Project[] = Object.entries(modules)
  .sort(([fileA], [fileB]) => fileA.localeCompare(fileB)) // orden estable
  .map(([filePath, data]) => {
    // Usa el nombre del archivo como id de respaldo si el JSON no trae uno
    const fallbackId = filePath
      .replace("./", "") // quita el ./
      .replace(".json", "") // quita la extensión
      .toLowerCase()
      .replace(/\s+/g, "-"); // normaliza espacios a guiones

    return {
      ...data,
      id: data.id ?? fallbackId,
    };
  });

export default PROJECTS;
