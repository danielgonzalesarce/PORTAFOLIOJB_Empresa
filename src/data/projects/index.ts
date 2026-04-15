/**
 * src/data/projects/index.ts
 *
 * Carga automática de todos los archivos .json en esta carpeta usando
 * import.meta.glob de Vite (eager = síncrono, sin lazy loading).
 *
 * ¿Cómo agregar un nuevo proyecto?
 *   1. Crea un archivo NombreProyecto.json en esta misma carpeta.
 *   2. Asegúrate de que cumpla la interfaz Project del types.ts.
 *   3. Vite lo detecta automáticamente — no hay nada más que tocar aquí.
 */

import { Project } from "../../types";

// Importa todos los .json de la carpeta de forma eager (síncrona)
const modules = import.meta.glob<Project>("./*.json", { eager: true });

// Construye el array ordenado alfabéticamente por nombre de archivo
export const PROJECTS: Project[] = Object.entries(modules)
  .sort(([fileA], [fileB]) => fileA.localeCompare(fileB)) // orden estable
  .map(([filePath, data]) => {
    // Usa el nombre del archivo como id de respaldo si el JSON no trae uno
    const fallbackId = filePath
      .replace("./", "")          // quita el ./
      .replace(".json", "")       // quita la extensión
      .toLowerCase()
      .replace(/\s+/g, "-");      // normaliza espacios a guiones

    return {
      ...data,
      id: data.id ?? fallbackId,
    };
  });

export default PROJECTS;
