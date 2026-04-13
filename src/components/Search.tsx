import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search as SearchIcon,
  X,
  ArrowUpRight,
  Tag,
  Layers,
} from "lucide-react";
import { PROJECTS } from "../constants";
import { Project } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Motion variants ──────────────────────────────────────────────────────────

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const panelVariants = {
  hidden: {
    opacity: 0,
    y: -32,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.97,
    transition: {
      duration: 0.22,
      ease: [0.55, 0, 0.78, 0],
    },
  },
};

const resultsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.05,
    },
  },
};

const resultItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Category pill ────────────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  ERP: "bg-blue-50 text-blue-700 border-blue-100",
  SaaS: "bg-emerald-50 text-emerald-700 border-emerald-100",
  "E-commerce": "bg-orange-50 text-orange-600 border-orange-100",
  default: "bg-slate-50 text-slate-600 border-slate-100",
};

function CategoryPill({ category }: { category: string }) {
  const colorClass = CATEGORY_COLORS[category] ?? CATEGORY_COLORS.default;
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${colorClass} font-montserrat tracking-wide`}
    >
      <Tag size={9} />
      {category}
    </span>
  );
}

// ─── Result card ──────────────────────────────────────────────────────────────

interface ResultCardProps {
  key?: React.Key;
  project: Project;
  isHighlighted: boolean;
  onSelect: (project: Project) => void;
  query: string;
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  const regex = new RegExp(
    `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark
        key={i}
        className="bg-jb-orange/20 text-jb-orange rounded-sm px-0.5 font-semibold not-italic"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

function ResultCard({
  project,
  isHighlighted,
  onSelect,
  query,
}: ResultCardProps) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isHighlighted && ref.current) {
      ref.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [isHighlighted]);

  return (
    <motion.button
      ref={ref}
      variants={resultItemVariants}
      onClick={() => onSelect(project)}
      className={`
        group w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left
        transition-all duration-150 border
        ${
          isHighlighted
            ? "bg-jb-blue/5 border-jb-blue/20"
            : "bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100"
        }
      `}
    >
      {/* Thumbnail */}
      <div className="relative shrink-0 w-14 h-14 rounded-lg overflow-hidden bg-slate-100">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-jb-blue/10 group-hover:bg-transparent transition-colors" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-jb-blue font-montserrat truncate leading-snug mb-1">
          {highlightText(project.name, query)}
        </p>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-1 mb-1.5">
          {highlightText(project.shortDescription, query)}
        </p>
        <CategoryPill category={project.category} />
      </div>

      {/* Arrow */}
      <ArrowUpRight
        size={16}
        className={`flex-shrink-0 transition-all duration-200 ${
          isHighlighted
            ? "text-jb-orange translate-x-0.5 -translate-y-0.5"
            : "text-slate-300 group-hover:text-jb-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        }`}
      />
    </motion.button>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-10 px-4 text-center"
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
        <SearchIcon size={20} className="text-slate-300" />
      </div>
      <p className="text-sm font-bold text-slate-500 font-montserrat mb-1">
        Sin resultados para "{query}"
      </p>
      <p className="text-xs text-slate-400">
        Intenta con otro nombre o categoría
      </p>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const CATEGORIES = [
  "Todos",
  ...Array.from(new Set(PROJECTS.map((p) => p.category))),
];

export default function Search({ isOpen, onClose }: SearchProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Reset on open/close ──────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveCategory("Todos");
      setHighlightedIndex(-1);
      // Delay focus so animation completes first
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ── Close on Escape ──────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // ── Filtered results ─────────────────────────────────────────────────────
  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.filter((p) => {
      const matchesCategory =
        activeCategory === "Todos" || p.category === activeCategory;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  // Reset highlight when results change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [results.length, query, activeCategory]);

  // ── Keyboard navigation ──────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && highlightedIndex >= 0) {
        handleSelect(results[highlightedIndex]);
      }
    },
    [results, highlightedIndex],
  );

  const handleSelect = useCallback(
    (project: Project) => {
      onClose();
      // Small delay so the modal mounts after search closes
      setTimeout(() => {
        const el = document.getElementById(`project-${project.id}`);
        if (el) el.click();
        else {
          // Fallback: scroll to portfolio section
          document
            .getElementById("proyectos")
            ?.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    },
    [onClose],
  );

  const showEmpty = query.trim().length > 0 && results.length === 0;
  const showResults = results.length > 0;
  const showInitialHint = !query.trim() && activeCategory === "Todos";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ──────────────────────────────────────────────────── */}
          <motion.div
            key="search-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] bg-jb-blue/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── Search panel ──────────────────────────────────────────────── */}
          <motion.div
            key="search-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              fixed z-[70]
              top-4 left-1/2 -translate-x-1/2
              w-[calc(100%-2rem)] max-w-2xl
              bg-white/97 backdrop-blur-xl
              rounded-2xl shadow-[0_32px_80px_rgba(0,51,102,0.18),0_0_0_1px_rgba(0,51,102,0.06)]
              overflow-hidden
            "
            role="dialog"
            aria-label="Buscador de proyectos"
            aria-modal="true"
          >
            {/* ── Input row ─────────────────────────────────────────────── */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
              <SearchIcon size={18} className="flex-shrink-0 text-jb-blue/50" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar proyectos, tecnologías..."
                className="
                  flex-1 bg-transparent text-jb-blue placeholder-slate-300
                  text-[15px] font-medium font-montserrat
                  outline-none border-none
                "
                autoComplete="off"
                spellCheck="false"
              />
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  onClick={() => setQuery("")}
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  <X size={12} className="text-slate-500" />
                </motion.button>
              )}
              <button
                onClick={onClose}
                className="flex-shrink-0 ml-1 text-xs font-bold text-slate-400 hover:text-jb-blue transition-colors font-montserrat hidden sm:block"
              >
                ESC
              </button>
            </div>

            {/* ── Category filters ──────────────────────────────────────── */}
            <div className="flex items-center gap-1.5 px-5 py-3 border-b border-slate-50 overflow-x-auto scrollbar-none">
              <Layers
                size={12}
                className="flex-shrink-0 text-slate-300 mr-0.5"
              />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    flex-shrink-0 text-[11px] font-bold px-3 py-1.5 rounded-lg
                    transition-all duration-150 font-montserrat border
                    ${
                      activeCategory === cat
                        ? "bg-jb-blue text-white border-jb-blue shadow-sm"
                        : "bg-transparent text-slate-400 border-slate-100 hover:border-jb-blue/20 hover:text-jb-blue hover:bg-jb-blue/5"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* ── Results ───────────────────────────────────────────────── */}
            <div className="max-h-[min(420px,55vh)] overflow-y-auto overscroll-contain">
              {/* Initial hint (no query, no filter) */}
              {showInitialHint && (
                <div className="px-5 py-4">
                  <p className="text-[11px] font-bold text-slate-300 font-montserrat uppercase tracking-widest mb-3">
                    Todos los proyectos ({PROJECTS.length})
                  </p>
                  <motion.div
                    variants={resultsVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-0.5"
                  >
                    {PROJECTS.map((project, i) => (
                      <ResultCard
                        key={project.id}
                        project={project}
                        isHighlighted={i === highlightedIndex}
                        onSelect={handleSelect}
                        query=""
                      />
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Active results */}
              {showResults && !showInitialHint && (
                <div className="px-5 py-4">
                  <p className="text-[11px] font-bold text-slate-300 font-montserrat uppercase tracking-widest mb-3">
                    {results.length} resultado{results.length !== 1 ? "s" : ""}
                  </p>
                  <motion.div
                    key={`${query}-${activeCategory}`}
                    variants={resultsVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-0.5"
                  >
                    {results.map((project, i) => (
                      <ResultCard
                        key={project.id}
                        project={project}
                        isHighlighted={i === highlightedIndex}
                        onSelect={handleSelect}
                        query={query}
                      />
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Empty state */}
              {showEmpty && <EmptyState query={query} />}
            </div>

            {/* ── Footer hint ───────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-5 py-2.5 bg-slate-50/70 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[10px] text-slate-300 font-medium">
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-400 font-mono text-[9px]">
                    ↑
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-400 font-mono text-[9px]">
                    ↓
                  </kbd>
                  navegar
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-300 font-medium">
                  <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-400 font-mono text-[9px]">
                    ↵
                  </kbd>
                  abrir
                </span>
              </div>
              <span className="text-[10px] text-slate-300 font-medium">
                {PROJECTS.length} proyectos disponibles
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
