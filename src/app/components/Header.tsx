import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, Globe, ChevronDown, MapPin, Compass, FileText, Info, BookOpen } from "lucide-react";
import { useLanguage, Language } from "../context/LanguageContext";
import { motion, AnimatePresence } from "motion/react";
import logoImg from "figma:asset/27b56e3b245628b6d5f41a5ac350e63ee52fde8b.png";

const LANG_LABELS: Record<Language, string> = {
  en: "EN",
  ru: "RU",
  uz: "UZ",
};

const LANG_FULL: Record<Language, string> = {
  en: "English",
  ru: "Русский",
  uz: "O'zbek",
};

export function Header() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { label: lang === "ru" ? "Туры" : lang === "uz" ? "Turlar" : "Tours", href: "/tours", icon: Compass },
    { label: lang === "ru" ? "Направления" : lang === "uz" ? "Yo'nalishlar" : "Destinations", href: "/routes", icon: MapPin },
    { label: lang === "ru" ? "Виза и советы" : lang === "uz" ? "Viza & Maslahat" : "Visa & Tips", href: "/about", icon: FileText },
    { label: lang === "ru" ? "О нас" : lang === "uz" ? "Biz haqimizda" : "About", href: "/about", icon: Info },
    { label: "Blog", href: "/about", icon: BookOpen },
  ];

  const bookLabel = lang === "ru" ? "Забронировать" : lang === "uz" ? "Bron qilish" : "Book a Tour";

  const isTransparent = isHome && !scrolled && !mobileOpen;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/97 backdrop-blur-2xl shadow-lg shadow-black/5 border-b border-[#E8E2D9]/60"
            : isTransparent
            ? "bg-transparent border-b border-white/10"
            : "bg-white/97 backdrop-blur-2xl border-b border-[#E8E2D9]/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group flex-shrink-0">
              <img
                src={logoImg}
                alt="traveluzb logo"
                width={350}
                height={350}
                className="h-[350px] w-auto object-contain"
                style={{ mixBlendMode: isTransparent ? "normal" : "multiply" }}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link, i) => (
                <Link key={link.href + i} to={link.href}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={{ y: -1 }}
                    className={`text-sm tracking-wide transition-colors hover:text-[#E8B84B] relative group ${
                      isTransparent ? "text-white/90" : "text-[#1C1C1E]/80"
                    }`}
                  >
                    {link.label}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1A3A5C] to-[#E8B84B] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    />
                  </motion.div>
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Language switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                    isTransparent
                      ? "text-white/90 hover:bg-white/10"
                      : "text-[#1C1C1E]/80 hover:bg-[#F5F3EF]"
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span className="font-medium">{LANG_LABELS[lang]}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-36 bg-white rounded-xl shadow-2xl border border-[#E8E2D9] overflow-hidden"
                    >
                      {(Object.keys(LANG_FULL) as Language[]).map((l) => (
                        <button
                          key={l}
                          onClick={() => { setLang(l); setLangOpen(false); }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#F5F3EF] transition-colors ${
                            lang === l ? "text-[#1A3A5C] font-semibold bg-[#F5F3EF]" : "text-[#1C1C1E]"
                          }`}
                        >
                          <span className="text-xs font-bold w-6">{LANG_LABELS[l]}</span>
                          <span>{LANG_FULL[l]}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Book CTA */}
              <Link
                to="/booking"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E8B84B] text-[#1A3A5C] text-sm font-semibold shadow-md hover:shadow-xl hover:scale-105 hover:bg-[#d4a73d] transition-all duration-200"
              >
                {bookLabel}
              </Link>

              {/* Mobile: lang + menu */}
              <div className="flex md:hidden items-center gap-2">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`p-2 rounded-lg transition-colors ${isTransparent ? "text-white" : "text-[#1C1C1E]"}`}
                >
                  <Globe className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className={`p-2 rounded-lg transition-colors ${isTransparent ? "text-white" : "text-[#1C1C1E]"}`}
                >
                  {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile lang dropdown */}
        <AnimatePresence>
          {langOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-[#E8E2D9] overflow-hidden"
            >
              <div className="flex gap-2 p-4">
                {(Object.keys(LANG_FULL) as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                      lang === l
                        ? "bg-[#1A3A5C] text-white"
                        : "bg-[#F5F3EF] text-[#1C1C1E]"
                    }`}
                  >
                    {LANG_FULL[l]}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: "rgba(26,58,92,0.97)", backdropFilter: "blur(20px)" }}
          >
            {/* Close button */}
            <div className="flex items-center justify-between p-6 pt-8">
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center">
                <img
                  src={logoImg}
                  alt="traveluzb logo"
                  className="h-[200px] w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="px-6 pt-4 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.href + i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-4 px-4 py-4 rounded-2xl text-white/80 hover:text-white hover:bg-white/10 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#E8B84B]/20 transition-colors">
                        <Icon className="w-4.5 h-4.5 text-[#E8B84B]" style={{ width: "18px", height: "18px" }} />
                      </div>
                      <span style={{ fontSize: "1.1rem", fontFamily: "'Playfair Display', serif" }}>{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="absolute bottom-0 left-0 right-0 p-6 space-y-3"
            >
              {/* Language switcher */}
              <div className="flex gap-2 mb-4">
                {(Object.keys(LANG_FULL) as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); }}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      lang === l
                        ? "bg-[#E8B84B] text-[#1A3A5C]"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {LANG_LABELS[l]} — {LANG_FULL[l]}
                  </button>
                ))}
              </div>
              <Link
                to="/booking"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#E8B84B] text-[#1A3A5C] font-bold text-base hover:bg-[#d4a73d] transition-colors"
              >
                {bookLabel}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close lang dropdown */}
      {langOpen && (
        <div
          className="fixed inset-0 z-[49]"
          onClick={() => setLangOpen(false)}
        />
      )}
    </>
  );
}