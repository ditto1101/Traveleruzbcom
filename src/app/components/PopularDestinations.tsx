import { useRef } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const DESTINATIONS = [
  {
    id: "samarkand",
    city: "Samarkand",
    tagline_uz: "Ipak yo'lining toji",
    tagline_ru: "Жемчужина Шёлкового пути",
    tagline_en: "Crown of the Silk Road",
    image: "https://images.unsplash.com/photo-1730368580427-9b8919e97cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW1hcmthbmQlMjBSZWdpc3RhbiUyMGdvbGRlbiUyMGhvdXIlMjBzdW5zZXR8ZW58MXx8fHwxNzc3MTMyNjY5fDA&ixlib=rb-4.1.0&q=80&w=600",
    href: "/routes/tashkent-samarkand",
    tours: 12,
  },
  {
    id: "bukhara",
    city: "Bukhara",
    tagline_uz: "2500 yillik tarix shahri",
    tagline_ru: "Город 2500-летней истории",
    tagline_en: "City of 2,500 Years",
    image: "https://images.unsplash.com/photo-1774812309306-6cbb0679afa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWtoYXJhJTIwYW5jaWVudCUyMG1vc3F1ZSUyMGhpc3RvcmljJTIwYmx1ZXxlbnwxfHx8fDE3NzcxMzI2Njl8MA&ixlib=rb-4.1.0&q=80&w=600",
    href: "/routes/samarkand-bukhara",
    tours: 9,
  },
  {
    id: "khiva",
    city: "Khiva",
    tagline_uz: "Jonli muzey shahar",
    tagline_ru: "Город-музей под открытым небом",
    tagline_en: "An Open-Air Museum",
    image: "https://images.unsplash.com/photo-1766133334847-7a9cd4dfca8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLaGl2YSUyMGFuY2llbnQlMjB3YWxsZWQlMjBjaXR5JTIwVXpiZWtpc3RhbnxlbnwxfHx8fDE3NzcxMzI2Njl8MA&ixlib=rb-4.1.0&q=80&w=600",
    href: "/routes",
    tours: 7,
  },
  {
    id: "tashkent",
    city: "Tashkent",
    tagline_uz: "Zamonaviy Markaziy Osiyo poytaxti",
    tagline_ru: "Современная столица Центральной Азии",
    tagline_en: "The Modern Capital",
    image: "https://images.unsplash.com/photo-1774810305765-52542714e548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUYXNoa2VudCUyMG1vZGVybiUyMGNpdHklMjBza3lsaW5lJTIwVXpiZWtpc3RhbnxlbnwxfHx8fDE3NzcxMzI2NzB8MA&ixlib=rb-4.1.0&q=80&w=600",
    href: "/routes",
    tours: 15,
  },
  {
    id: "fergana",
    city: "Fergana Valley",
    tagline_uz: "Ipak va hunarmandchilik vodiysi",
    tagline_ru: "Долина шёлка и ремёсел",
    tagline_en: "Valley of Silk & Crafts",
    image: "https://images.unsplash.com/photo-1758169744470-097641049fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGZXJnYW5hJTIwc2lsayUyMHdlYXZpbmclMjBjcmFmdCUyMGFydGlzYW4lMjBVemJla2lzdGFufGVufDF8fHx8MTc3NzEzMjY4Mnww&ixlib=rb-4.1.0&q=80&w=600",
    href: "/tours",
    tours: 5,
  },
  {
    id: "nurata",
    city: "Nurata",
    tagline_uz: "Cho'l yulduzi va qo'ylar",
    tagline_ru: "Звезда пустыни и белые овцы",
    tagline_en: "Desert Star & White Sheep",
    image: "https://images.unsplash.com/photo-1745155541534-0b611f491762?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDZW50cmFsJTIwQXNpYSUyMGRlc2VydCUyMHN0ZXBwZSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzcxMzI2NzR8MA&ixlib=rb-4.1.0&q=80&w=600",
    href: "/tours",
    tours: 4,
  },
];

export function PopularDestinations() {
  const { lang } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const getTagline = (d: typeof DESTINATIONS[0]) => {
    if (lang === "ru") return d.tagline_ru;
    if (lang === "uz") return d.tagline_uz;
    return d.tagline_en;
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 280 : -280, behavior: "smooth" });
  };

  const title = lang === "ru" ? "Популярные направления" : lang === "uz" ? "Mashhur Yo'nalishlar" : "Popular Destinations";
  const subtitle = lang === "ru"
    ? "Откройте для себя самые красивые города Узбекистана"
    : lang === "uz"
    ? "O'zbekistonning eng go'zal shaharlarini kashf eting"
    : "Explore the most beautiful cities of Uzbekistan";

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8B84B]/10 text-[#E8B84B] text-xs font-semibold tracking-wider uppercase mb-3">
              <MapPin className="w-3 h-3" />
              {lang === "ru" ? "Направления" : lang === "uz" ? "Yo'nalishlar" : "Destinations"}
            </span>
            <h2 className="text-[#1C1C1E]" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
              {title}
            </h2>
            <p className="text-[#5A6478] mt-2 text-base max-w-lg">{subtitle}</p>
          </motion.div>

          {/* Scroll arrows */}
          <div className="hidden md:flex items-center gap-2">
            <motion.button
              onClick={() => scroll("left")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] flex items-center justify-center text-[#1A3A5C] hover:bg-[#1A3A5C] hover:text-white hover:border-[#1A3A5C] transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => scroll("right")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl bg-[#1A3A5C] flex items-center justify-center text-white hover:bg-[#E8B84B] transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ scrollSnapAlign: "start", minWidth: "220px" }}
            >
              <Link to={dest.href} className="group block text-center">
                {/* Circular / rounded-square image */}
                <div className="relative w-[200px] h-[200px] mx-auto mb-4 rounded-3xl overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.city}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A5C]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  {/* Tours count badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-xs font-bold text-[#1A3A5C]">
                    {dest.tours} tours
                  </div>
                  {/* Arrow on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-[#E8B84B] flex items-center justify-center shadow-lg">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* City name */}
                <h3 className="text-[#1C1C1E] mb-1 group-hover:text-[#1A3A5C] transition-colors" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}>
                  {dest.city}
                </h3>

                {/* Tagline with golden underline on hover */}
                <div className="relative inline-block">
                  <p className="text-[#8B9099] text-xs">{getTagline(dest)}</p>
                  <motion.div
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#E8B84B] origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
