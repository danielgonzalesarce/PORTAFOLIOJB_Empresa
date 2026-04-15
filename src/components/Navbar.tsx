import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Search as SearchIcon } from "lucide-react";
import Search from "./Search";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // ── Scroll listener ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Body lock when mobile menu is open ───────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isOpen]);

  // ── Global keyboard shortcut: Cmd/Ctrl + K ───────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#inicio", number: "01" },
    { name: "Proyectos", href: "#proyectos", number: "02" },
    { name: "Metodologia", href: "#Process", number: "03" },
    { name: "Testimonios", href: "#testimonios", number: "04" },
    { name: "FAQ", href: "#faq", number: "05" },
  ];

  // ── Framer Motion variants ───────────────────────────────────────────────────
  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
  };

  const panelVariants = {
    closed: { x: "100%" },
    open: {
      x: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      x: "100%",
      transition: { duration: 0.35, ease: [0.55, 0, 0.78, 0] },
    },
  };

  const linkContainerVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.04, staggerDirection: -1 },
    },
  };

  const linkItemVariants = {
    closed: { x: 40, opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { x: 40, opacity: 0, transition: { duration: 0.2 } },
  };

  const ctaVariants = {
    closed: { y: 20, opacity: 0 },
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
    },
  };

  // ── Search trigger button (shared between desktop, tablet, mobile) ───────────
  const SearchButton = ({ compact = false }: { compact?: boolean }) => (
    <motion.button
      onClick={() => setIsSearchOpen(true)}
      whileTap={{ scale: 0.92 }}
      aria-label="Buscar proyectos"
      className={`
        group flex items-center gap-2 transition-all duration-200
        ${
          compact
            ? // Mobile: icon-only circle
              "w-10 h-10 rounded-full hover:bg-slate-100/80 justify-center text-jb-blue"
            : // Desktop/tablet: pill with shortcut hint
              "px-3 py-2 rounded-xl border border-slate-100 hover:border-jb-blue/20 hover:bg-jb-blue/5 text-slate-400 hover:text-jb-blue"
        }
      `}
    >
      <SearchIcon
        size={compact ? 20 : 15}
        className={
          compact
            ? ""
            : "text-jb-blue/60 group-hover:text-jb-blue transition-colors"
        }
      />
      {!compact && (
        <>
          <span className="text-xs font-medium font-montserrat whitespace-nowrap">
            Buscar proyectos...
          </span>
          <kbd className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-slate-100 group-hover:bg-jb-blue/10 border border-slate-200 group-hover:border-jb-blue/20 text-slate-400 group-hover:text-jb-blue/60 font-mono transition-all">
            ⌘K
          </kbd>
        </>
      )}
    </motion.button>
  );

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          HEADER PRINCIPAL
      ══════════════════════════════════════════════════════════════════════ */}
      <header
        className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-300 ease-in-out ${
          isScrolled ? "top-0 px-0" : "top-0 lg:top-6 px-0 lg:px-6"
        }`}
      >
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`w-full flex items-center justify-between backdrop-blur-md transition-all duration-300 ease-in-out ${
            isScrolled
              ? "max-w-full bg-white/97 rounded-none shadow-md border-b border-slate-100/80 px-5 md:px-8 py-2.5"
              : "max-w-full lg:max-w-6xl bg-white/97 lg:bg-white/85 rounded-none lg:rounded-full shadow-lg border-b lg:border border-slate-100 lg:border-white/30 px-5 md:px-8 py-3 lg:py-2"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <a href="#inicio">
              <img
                src="https://consultoradeasesoriaempresarialjb.com/wp-content/uploads/2026/04/logoSinFondo.png"
                alt="Consultora JB"
                className={`w-auto object-contain transition-all duration-300 ${
                  isScrolled ? "h-9 md:h-10" : "h-10 md:h-10"
                }`}
                referrerPolicy="no-referrer"
              />
            </a>
          </div>

          {/* ── Desktop Nav (>= 1024px) ────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-bold text-jb-blue hover:text-jb-orange transition-colors"
              >
                {link.name}
              </a>
            ))}

            {/* Search pill — desktop */}
            <SearchButton compact={false} />

            <a
              href="#contacto"
              className="bg-jb-orange text-white px-7 py-3 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(253,185,7,0.3)] hover:shadow-[0_0_25px_rgba(253,185,7,0.5)] transition-all hover:-translate-y-0.5 active:scale-95"
            >
              Solicitar Información
            </a>
          </div>

          {/* ── Tablet Nav (768px – 1023px): links compactos + Search + CTA ── */}
          <div className="hidden md:flex lg:hidden items-center gap-4">
            {navLinks.slice(0, 4).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold text-jb-blue hover:text-jb-orange transition-colors tracking-wide uppercase"
              >
                {link.name}
              </a>
            ))}

            {/* Search icon — tablet */}
            <SearchButton compact={true} />

            <a
              href="#contacto"
              className="bg-jb-orange text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-[0_0_12px_rgba(253,185,7,0.25)] hover:shadow-[0_0_20px_rgba(253,185,7,0.45)] transition-all hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
            >
              Contactar
            </a>
          </div>

          {/* ── Mobile: Search icon + Hamburger (< 768px) ─────────────────── */}
          <div className="md:hidden flex items-center gap-1">
            {/* Search icon — mobile */}
            <SearchButton compact={true} />

            <motion.button
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100/80 transition-colors text-jb-blue"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.nav>
      </header>

      {/* ══════════════════════════════════════════════════════════════════════
          OVERLAY OSCURO (móvil)
      ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="fixed inset-0 z-40 bg-jb-blue/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════════
          PANEL FULLSCREEN (móvil) — desliza desde la derecha
      ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-50 w-[88vw] max-w-sm bg-white flex flex-col md:hidden shadow-2xl"
            style={{ willChange: "transform" }}
          >
            {/* Cabecera del panel */}
            <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-slate-100">
              <a href="#inicio" onClick={() => setIsOpen(false)}>
                <img
                  src="https://consultoradeasesoriaempresarialjb.com/wp-content/uploads/2026/04/logoSinFondo.png"
                  alt="Consultora JB"
                  className="h-9 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </a>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 text-jb-blue hover:bg-slate-200 transition-colors"
                whileTap={{ scale: 0.88 }}
                aria-label="Cerrar menú"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Links con stagger */}
            <motion.nav
              className="flex flex-col flex-1 px-7 pt-8 gap-1 overflow-y-auto"
              variants={linkContainerVariants}
              initial="closed"
              animate="open"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  variants={linkItemVariants}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center justify-between py-4 border-b border-slate-100 last:border-b-0"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[11px] font-bold text-jb-orange/70 tracking-wider tabular-nums">
                      {link.number}
                    </span>
                    <span className="text-[22px] font-bold text-jb-blue group-hover:text-jb-orange transition-colors leading-none tracking-tight">
                      {link.name}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-slate-300 group-hover:text-jb-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </motion.a>
              ))}

              {/* Search link inside mobile menu */}
              <motion.button
                variants={linkItemVariants}
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => setIsSearchOpen(true), 350);
                }}
                className="group flex items-center justify-between py-4 border-b border-slate-100 w-full text-left"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-[11px] font-bold text-jb-orange/70 tracking-wider tabular-nums">
                    06
                  </span>
                  <span className="text-[22px] font-bold text-jb-blue group-hover:text-jb-orange transition-colors leading-none tracking-tight">
                    Buscar
                  </span>
                </div>
                <SearchIcon
                  size={18}
                  className="text-slate-300 group-hover:text-jb-orange transition-all"
                />
              </motion.button>
            </motion.nav>

            {/* CTA fijo al fondo del panel */}
            <motion.div
              variants={ctaVariants}
              initial="closed"
              animate="open"
              className="px-7 pb-10 pt-5 border-t border-slate-100"
            >
              <a
                href="#contacto"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-jb-orange text-white font-bold text-base shadow-[0_4px_24px_rgba(253,185,7,0.35)] hover:shadow-[0_6px_32px_rgba(253,185,7,0.5)] active:scale-[0.97] transition-all"
              >
                Solicitar Información
                <ArrowUpRight size={18} />
              </a>
              <p className="text-center text-xs text-slate-400 mt-3 font-medium">
                Respuesta en menos de 24 h
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════════════
          BUSCADOR AÉREO — montado fuera del header para z-index limpio
      ══════════════════════════════════════════════════════════════════════ */}
      <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
