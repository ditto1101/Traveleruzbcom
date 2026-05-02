import { Link } from "react-router";
import { motion } from "motion/react";
import { Star, Clock, Users, Check, ArrowRight, Compass } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const TOURS = [
  {
    id: "silk-road-grand",
    slug: "/routes/silk-road-grand",
    image: "https://images.unsplash.com/photo-1730368580427-9b8919e97cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW1hcmthbmQlMjBSZWdpc3RhbiUyMGdvbGRlbiUyMGhvdXIlMjBzdW5zZXR8ZW58MXx8fHwxNzc3MTMyNjY5fDA&ixlib=rb-4.1.0&q=80&w=800",
    badge: "Bestseller",
    badgeColor: "#E8B84B",
    name_uz: "Ipak Yo'li Grand Tur",
    name_ru: "Гранд-тур по Шёлковому пути",
    name_en: "Silk Road Grand Tour",
    duration: "7 Days",
    group: "2–16",
    price: 380,
    rating: 5.0,
    reviews: 620,
    highlights_uz: ["Samarqand, Buxoro, Xiva", "4 yulduzli mehmonxonalar", "Professional gid"],
    highlights_ru: ["Самарканд, Бухара, Хива", "4-звёздочные отели", "Профессиональный гид"],
    highlights_en: ["Samarkand, Bukhara, Khiva", "4-Star boutique hotels", "Expert licensed guide"],
  },
  {
    id: "samarkand-discovery",
    slug: "/routes/tashkent-samarkand",
    image: "https://images.unsplash.com/photo-1772388864594-eea7885fa799?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJc2xhbWljJTIwYXJjaGl0ZWN0dXJlJTIwb3JuYXRlJTIwdGlsZXdvcmslMjBibHVlJTIwbW9zYWljfGVufDF8fHx8MTc3NzEzMjY3NHww&ixlib=rb-4.1.0&q=80&w=800",
    badge: "Popular",
    badgeColor: "#1A3A5C",
    name_uz: "Samarqand Kashfiyoti",
    name_ru: "Открытие Самарканда",
    name_en: "Samarkand Discovery",
    duration: "3 Days",
    group: "1–20",
    price: 420,
    rating: 5.0,
    reviews: 189,
    highlights_uz: ["Registon majmuasi", "Gur-Amir maqbarasi", "Ulug'bek rasadxonasi"],
    highlights_ru: ["Ансамбль Регистана", "Мавзолей Гур-Эмир", "Обсерватория Улугбека"],
    highlights_en: ["Registan ensemble", "Gur-e-Amir mausoleum", "Ulugbek Observatory"],
  },
  {
    id: "bukhara-khiva",
    slug: "/routes/samarkand-bukhara",
    image: "https://images.unsplash.com/photo-1774812309306-6cbb0679afa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWtoYXJhJTIwYW5jaWVudCUyMG1vc3F1ZSUyMGhpc3RvcmljJTIwYmx1ZXxlbnwxfHx8fDE3NzcxMzI2Njl8MA&ixlib=rb-4.1.0&q=80&w=800",
    badge: "New",
    badgeColor: "#10B981",
    name_uz: "Buxoro & Xiva Sayohati",
    name_ru: "Путешествие Бухара & Хива",
    name_en: "Bukhara & Khiva Journey",
    duration: "5 Days",
    group: "2–12",
    price: 290,
    rating: 4.9,
    reviews: 143,
    highlights_uz: ["Kalon minorasi", "Ichon Qal'a", "Ark qal'asi"],
    highlights_ru: ["Минарет Калян", "Ичан-Кала", "Крепость Арк"],
    highlights_en: ["Kalon Minaret", "Ichan Kala fortress", "Ark citadel"],
  },
];

export function FeaturedTours() {
  const { lang } = useLanguage();

  const getName = (t: typeof TOURS[0]) => {
    if (lang === "ru") return t.name_ru;
    if (lang === "uz") return t.name_uz;
    return t.name_en;
  };

  const getHighlights = (t: typeof TOURS[0]) => {
    if (lang === "ru") return t.highlights_ru;
    if (lang === "uz") return t.highlights_uz;
    return t.highlights_en;
  };

  const title = lang === "ru" ? "Наши фирменные туры" : lang === "uz" ? "Bizning Signature Turlarimiz" : "Our Signature Tours";
  const subtitle = lang === "ru"
    ? "Тщательно разработанные маршруты для незабываемых впечатлений"
    : lang === "uz"
    ? "Unutilmas tajriba uchun puxta ishlab chiqilgan marshrutlar"
    : "Carefully crafted itineraries for unforgettable experiences";
  const viewTour = lang === "ru" ? "Смотреть тур" : lang === "uz" ? "Turni ko'rish" : "View Tour";
  const fromLabel = lang === "ru" ? "от" : lang === "uz" ? "dan" : "from";

  return (
    <section id="packages" className="py-24 bg-[#F5F3EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A3A5C]/8 text-[#1A3A5C] text-xs font-semibold tracking-wider uppercase mb-3">
            <Compass className="w-3 h-3" />
            {lang === "ru" ? "Туры" : lang === "uz" ? "Turlar" : "Tours"}
          </span>
          <h2 className="text-[#1C1C1E] mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
            {title}
          </h2>
          <p className="text-[#5A6478] text-base max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {TOURS.map((tour, i) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, type: "tween" }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400"
            >
              {/* Hero image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={tour.image}
                  alt={getName(tour)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Duration badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-sm">
                  <Clock className="w-3 h-3 text-[#1A3A5C]" />
                  <span className="text-xs font-bold text-[#1A3A5C]">{tour.duration}</span>
                </div>

                {/* Badge */}
                <div
                  className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-white text-xs font-bold"
                  style={{ backgroundColor: tour.badgeColor }}
                >
                  {tour.badge}
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-[#E8B84B] text-[#E8B84B]" />
                    <span className="text-xs font-bold text-[#1A3A5C]">{tour.rating}</span>
                    <span className="text-xs text-[#8B9099]">({tour.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-[#1A3A5C] mb-3" style={{ fontSize: "1.2rem", fontFamily: "'Playfair Display', serif" }}>
                  {getName(tour)}
                </h3>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-5">
                  {getHighlights(tour).map((h, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-[#5A6478]">
                      <div className="w-4 h-4 rounded-full bg-[#E8B84B]/15 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#E8B84B]" />
                      </div>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Group size */}
                <div className="flex items-center gap-1.5 text-xs text-[#8B9099] mb-5">
                  <Users className="w-3.5 h-3.5" />
                  <span>{tour.group} {lang === "ru" ? "чел." : lang === "uz" ? "kishi" : "pax"}</span>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-5 border-t border-[#F5F3EF]">
                  <div>
                    <span className="text-xs text-[#8B9099]">{fromLabel}</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-2xl text-[#1A3A5C]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                        ${tour.price}
                      </span>
                      <span className="text-xs text-[#8B9099] ml-1">/{lang === "ru" ? "чел." : lang === "uz" ? "kishi" : "person"}</span>
                    </div>
                  </div>
                  <Link
                    to={tour.slug}
                    className="group/btn flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1A3A5C] to-[#243f6a] text-white text-sm font-medium hover:from-[#E8B84B] hover:to-[#d4a73d] hover:text-[#1A3A5C] hover:gap-3 hover:shadow-lg hover:shadow-[#1A3A5C]/20 transition-all duration-300"
                  >
                    {viewTour}
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10"
        >
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-[#1A3A5C] text-[#1A3A5C] font-medium hover:bg-[#1A3A5C] hover:text-white hover:gap-3 transition-all duration-300"
          >
            {lang === "ru" ? "Все туры" : lang === "uz" ? "Barcha turlar" : "Browse All Tours"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
