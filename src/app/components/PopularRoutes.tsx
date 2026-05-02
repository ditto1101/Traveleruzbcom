import { Link } from "react-router";
import { Clock, ArrowRight, Star, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

const TASHKENT_IMG = "https://images.unsplash.com/photo-1681195579718-e738abcaa178?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUYXNoa2VudCUyMGNpdHklMjBtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc1NDY5Nzc4fDA&ixlib=rb-4.1.0&q=80&w=600";
const SAMARKAND_IMG = "https://images.unsplash.com/photo-1715540335594-2ad77795ba09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW1hcmthbmQlMjBSZWdpc3RhbiUyMGFyY2hpdGVjdHVyZSUyMFV6YmVraXN0YW58ZW58MXx8fHwxNzc1NDY5Nzc2fDA&ixlib=rb-4.1.0&q=80&w=600";
const BUKHARA_IMG = "https://images.unsplash.com/photo-1774810306527-bd6e74d36e34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWtoYXJhJTIwbW9zcXVlJTIwaGlzdG9yaWMlMjBVemJla2lzdGFufGVufDF8fHx8MTc3NTQ2OTc3N3ww&ixlib=rb-4.1.0&q=80&w=600";
const KHIVA_IMG = "https://images.unsplash.com/photo-1549111998-f924f13e46ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLaGl2YSUyMGFuY2llbnQlMjBjaXR5JTIwZGVzZXJ0JTIwVXpiZWtpc3RhbnxlbnwxfHx8fDE3NTQ2OTc3N3ww&ixlib=rb-4.1.0&q=80&w=600";

const routes = [
  {
    id: "tashkent-samarkand",
    from: "Tashkent",
    to: "Samarkand",
    image: SAMARKAND_IMG,
    duration: "2h 10m",
    price: "150$",
    rating: 4.9,
    reviews: 2840,
    badge: "popular",
    tag: "Poyezd mavjud",
    highlight: "#1A3A5C",
  },
  {
    id: "samarkand-tashkent",
    from: "Samarkand",
    to: "Tashkent",
    image: TASHKENT_IMG,
    duration: "3h 30m",
    price: "150$",
    rating: 4.8,
    reviews: 1950,
    badge: null,
    tag: "Avtobus + Poyezd",
    highlight: "#1A3A5C",
  },
  {
    id: "samarkand-bukhara",
    from: "Samarkand",
    to: "Bukhara",
    image: BUKHARA_IMG,
    duration: "4h 00m",
    price: "350$",
    rating: 4.9,
    reviews: 1340,
    badge: "new",
    tag: "Shaxsiy transfer",
    highlight: "#E8B84B",
  },
  {
    id: "silk-road-grand",
    from: "Tashkent",
    to: "Samarkand → Bukhara → Khiva",
    image: KHIVA_IMG,
    duration: "7 Days",
    price: "600$",
    rating: 5.0,
    reviews: 620,
    badge: "best",
    tag: "Ko'p shaharli tur",
    highlight: "#E8B84B",
  },
];

const BADGE_LABELS: Record<string, Record<string, string>> = {
  popular: { en: "Most Popular", ru: "Популярный", uz: "Eng mashhur" },
  new: { en: "New Route", ru: "Новинка", uz: "Yangi" },
  best: { en: "Best Value", ru: "Выгодно", uz: "Qulay narx" },
};

export function PopularRoutes() {
  const { t, lang } = useLanguage();

  return (
    <section id="routes" className="py-24 bg-[#F5F3EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1A3A5C]/8 text-[#1A3A5C] text-sm font-medium mb-4">
              Yo'nalishlar va paketlar
            </span>
            <h2 className="text-[#1C1C1E] mb-4" style={{ fontSize: "2.2rem" }}>
              {t("routes_title")}
            </h2>
            <p className="text-[#5A6478] text-lg max-w-xl mx-auto">
              {t("routes_subtitle")}
            </p>
          </motion.div>
        </div>

        {/* Route cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route, i) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-[#1A3A5C]/15 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={route.image}
                  alt={`${route.from} to ${route.to}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {route.badge && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
                    style={{ backgroundColor: route.highlight }}
                  >
                    {BADGE_LABELS[route.badge][lang]}
                  </motion.div>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-sm font-medium flex items-center gap-1.5">
                      <Zap className="w-3 h-3" />
                      {route.tag}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-1.5 text-sm text-[#5A6478] mb-1">
                      <span className="font-semibold text-[#1C1C1E]">{route.from}</span>
                      <ArrowRight className="w-3 h-3 text-[#E8B84B]" />
                      <span className="font-medium text-[#1C1C1E] text-xs">{route.to}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#8B9099]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {route.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#E8B84B] text-[#E8B84B]" />
                        {route.rating} ({route.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-[#F5F3EF]">
                  <div>
                    <span className="text-xs text-[#8B9099]">{t("routes_from")}</span>
                    <div className="text-[#1C1C1E]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      <span className="text-xl font-bold">{route.price}</span>
                    </div>
                  </div>
                  <Link
                    to={`/routes/${route.id}`}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium text-[#1A3A5C] bg-[#1A3A5C]/8 hover:bg-[#1A3A5C] hover:text-white hover:gap-2 transition-all duration-300"
                  >
                    {t("routes_details")}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            to="/booking"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-[#1A3A5C] text-[#1A3A5C] font-medium hover:bg-[#1A3A5C] hover:text-white hover:gap-3 transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Barcha yo'nalishlarni ko'rish
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}