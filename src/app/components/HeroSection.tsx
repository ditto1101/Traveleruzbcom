import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1715540335594-2ad77795ba09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW1hcmthbmQlMjBSZWdpc3RhbiUyMGFyY2hpdGVjdHVyZSUyMFV6YmVraXN0YW58ZW58MXx8fHwxNzc1NDY5Nzc2fDA&ixlib=rb-4.1.0&q=80&w=1920",
  "https://images.unsplash.com/photo-1549111998-f924f13e46ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLaGl2YSUyMGFuY2llbnQlMjBjaXR5JTIwZGVzZXJ0JTIwVXpiZWtpc3RhbnxlbnwxfHx8fDE3NTQ2OTc3N3ww&ixlib=rb-4.1.0&q=80&w=1920",
  "https://images.unsplash.com/photo-1774810306527-bd6e74d36e34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWtoYXJhJTIwbW9zcXVlJTIwaGlzdG9yaWMlMjBVemJla2lzdGFufGVufDF8fHx8MTc3NTQ2OTc3N3ww&ixlib=rb-4.1.0&q=80&w=1920",
];

const CITIES = ["Tashkent", "Samarkand", "Bukhara", "Khiva", "Namangan"];
const TRANSPORT_TYPES = { en: ["Train", "Bus", "Private Car", "Tour Package"], ru: ["Поезд", "Автобус", "Авто", "Тур-пакет"], uz: ["Poyezd", "Avtobus", "Shaxsiy", "Tur-paket"] };

export function HeroSection() {
  const { t, lang } = useLanguage();
  const [from, setFrom] = useState("Tashkent");
  const [to, setTo] = useState("Samarkand");
  const [transport, setTransport] = useState(TRANSPORT_TYPES[lang][0]);
  const [hotelStars, setHotelStars] = useState(0);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);

  const types = TRANSPORT_TYPES[lang];

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], [0, 200]);

  // Slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background slideshow with parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <AnimatePresence mode="sync">
          <motion.img
            key={imgIndex}
            src={HERO_IMAGES[imgIndex]}
            alt="Uzbekistan"
            className="w-full h-full object-cover scale-110"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        </AnimatePresence>

        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A5C]/85 via-[#1A3A5C]/55 to-[#1C1C1E]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/60 via-transparent to-transparent" />
        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-10">
        <div className="max-w-3xl">
          {/* Destination badge — Liquid Glass */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-7 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(232,184,75,0.25), rgba(255,220,120,0.15))",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(232,184,75,0.4)",
              boxShadow: "0 4px 24px rgba(232,184,75,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                width: "60%",
              }}
              animate={{ x: ["-100%", "250%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <MapPin className="w-3.5 h-3.5 text-[#E8B84B]" />
            </motion.div>
            <span className="text-[#F5D78C] text-sm tracking-widest font-semibold relative z-10 uppercase">
              {t("hero_badge")}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-white mb-6"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", lineHeight: 1.1 }}
          >
            {t("hero_title").split("\n").map((line, i) => (
              <motion.span
                key={i}
                className="block overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              >
                <motion.span
                  className="block"
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 1 ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5D78C] via-[#E8C574] to-[#E8B84B]">
                      {line}
                    </span>
                  ) : line}
                </motion.span>
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-white/75 text-lg leading-relaxed mb-10 max-w-xl"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t("hero_subtitle")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                to="/booking"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#E8B84B] text-[#1A3A5C] font-semibold shadow-2xl shadow-[#E8B84B]/40 overflow-hidden"
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                  style={{ width: "40%" }}
                />
                <span className="relative z-10">{t("hero_cta_primary")}</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>

            <motion.a
              href="#routes"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-medium transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              {t("hero_cta_secondary")}
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-10">
            {[
              { value: t("hero_stat_1"), label: t("hero_stat_1_label") },
              { value: t("hero_stat_2"), label: t("hero_stat_2_label") },
              { value: t("hero_stat_3"), label: t("hero_stat_3_label") },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.12, type: "spring" }}
                className="flex flex-col"
              >
                <span
                  className="text-2xl text-white"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                >
                  {stat.value}
                </span>
                <span className="text-white/50 text-sm mt-0.5">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Booking Widget — Glassmorphism */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-0 w-full">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl relative z-10 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow: "0 24px 64px rgba(26,58,92,0.18), 0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div className="p-5 md:p-6">
            {/* Header row */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#E8B84B]" />
                <div className="w-2 h-2 rounded-full bg-[#1A3A5C]/30" />
                <div className="w-2 h-2 rounded-full bg-[#1A3A5C]/15" />
              </div>
              <span
                className="text-sm text-[#1A3A5C] tracking-wider uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: "0.08em" }}
              >
                {t("quick_book_title")}
              </span>
            </div>

            {/* Row 1 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#1A3A5C]/60 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                  {t("quick_from")}
                </label>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B] transition-all hover:border-[#E8B84B]/40 cursor-pointer"
                >
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#1A3A5C]/60 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                  {t("quick_to")}
                </label>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B] transition-all hover:border-[#E8B84B]/40 cursor-pointer"
                >
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#1A3A5C]/60 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                  {t("quick_date")}
                </label>
                <input
                  type="date"
                  defaultValue={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                  className="px-3 py-2.5 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B] transition-all hover:border-[#E8B84B]/40 cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#1A3A5C]/60 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                  {t("quick_type")}
                </label>
                <select
                  value={transport}
                  onChange={(e) => setTransport(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B] transition-all hover:border-[#E8B84B]/40 cursor-pointer"
                >
                  {types.map(type => <option key={type}>{type}</option>)}
                </select>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Hotel Stars */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#1A3A5C]/60 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                  Mehmonxona
                </label>
                <select
                  value={hotelStars}
                  onChange={(e) => setHotelStars(Number(e.target.value))}
                  className="px-3 py-2.5 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B] transition-all hover:border-[#E8B84B]/40 cursor-pointer"
                >
                  <option value={0}>Har qanday</option>
                  {[1, 2, 3, 4, 5].map(s => <option key={s} value={s}>{s}★</option>)}
                </select>
              </div>

              {/* Adults */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#1A3A5C]/60 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                  Kattalar
                </label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9]">
                  <button
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-6 h-6 rounded-lg bg-white border border-[#E8E2D9] flex items-center justify-center text-[#1C1C1E] hover:bg-[#E8B84B] hover:text-white hover:border-[#E8B84B] transition-all text-sm font-bold"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center text-[#1C1C1E] font-semibold text-sm">{adults}</span>
                  <button
                    onClick={() => setAdults(Math.min(20, adults + 1))}
                    className="w-6 h-6 rounded-lg bg-white border border-[#E8E2D9] flex items-center justify-center text-[#1C1C1E] hover:bg-[#E8B84B] hover:text-white hover:border-[#E8B84B] transition-all text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#1A3A5C]/60 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                  Bolalar
                </label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9]">
                  <button
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-6 h-6 rounded-lg bg-white border border-[#E8E2D9] flex items-center justify-center text-[#1C1C1E] hover:bg-[#E8B84B] hover:text-white hover:border-[#E8B84B] transition-all text-sm font-bold"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center text-[#1C1C1E] font-semibold text-sm">{children}</span>
                  <button
                    onClick={() => setChildren(Math.min(10, children + 1))}
                    className="w-6 h-6 rounded-lg bg-white border border-[#E8E2D9] flex items-center justify-center text-[#1C1C1E] hover:bg-[#E8B84B] hover:text-white hover:border-[#E8B84B] transition-all text-sm font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="flex flex-col justify-end">
                <Link
                  to="/booking"
                  className="relative px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1A3A5C] to-[#243f6a] text-white text-sm font-semibold text-center hover:from-[#E8B84B] hover:to-[#d4a73d] hover:text-[#1A3A5C] hover:shadow-xl hover:shadow-[#E8B84B]/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                    style={{ width: "40%" }}
                  />
                  <span className="relative z-10">{t("quick_search")}</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image indicator dots */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setImgIndex(i)}
            className={`transition-all duration-500 rounded-full ${
              i === imgIndex ? "w-6 h-2 bg-[#E8B84B]" : "w-2 h-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <motion.div
            className="w-1.5 h-1.5 bg-[#E8B84B] rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
