import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { Compass, Calendar, Users, Star, ArrowRight, MapPin, Camera, Utensils, Mountain } from "lucide-react";
import { Link } from "react-router";

const TOUR_PACKAGES = [
  {
    id: "silk-road-classic",
    title: "Ipak Yo'li Klassikasi",
    title_en: "Classic Silk Road",
    title_ru: "Классический Шелковый Путь",
    description: "Toshkent, Samarqand, Buxoro va Xiva - 7 kunlik tarixi sayohat",
    duration: "7 kun / 6 kecha",
    price: "$880",
    image: "https://images.unsplash.com/photo-1715540335594-2ad77795ba09?w=800",
    rating: 4.9,
    reviews: 342,
    highlights: ["Registon maydoni", "Xiva ichon qal'a", "Buxoro madrasa"],
    icon: MapPin,
    color: "#C89B3C",
  },
  {
    id: "samarkand-discovery",
    title: "Samarqand Kashfiyoti",
    title_en: "Samarkand Discovery",
    title_ru: "Открытие Самарканда",
    description: "3 kunlik ekskursiya - Samarqandning yashirin joylari va arxitekturasi",
    duration: "3 kun / 2 kecha",
    price: "$420",
    image: "https://images.unsplash.com/photo-1715540335594-2ad77795ba09?w=800",
    rating: 5.0,
    reviews: 189,
    highlights: ["Registon", "Gur-Amir maqbarasi", "Ulug'bek rasadxonasi"],
    icon: Camera,
    color: "#0EA5E9",
  },
  {
    id: "food-culture",
    title: "Gastro Tur",
    title_en: "Culinary & Culture Tour",
    title_ru: "Гастро-тур",
    description: "O'zbek oshxonasi va madaniyati bilan tanishish - 5 kun",
    duration: "5 kun / 4 kecha",
    price: "$650",
    image: "https://images.unsplash.com/photo-1684374203555-3bdfdf1e8c6e?w=800",
    rating: 4.8,
    reviews: 124,
    highlights: ["Milliy taomlar", "Bozorlar safari", "Hunarmandchilik"],
    icon: Utensils,
    color: "#10B981",
  },
  {
    id: "mountain-adventure",
    title: "Tog'lar Sarguzashti",
    title_en: "Mountain Adventure",
    title_ru: "Горные приключения",
    description: "Chimyon va Chimgan tog'lari, tabiat va alpinizm - 4 kun",
    duration: "4 kun / 3 kecha",
    price: "$580",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    rating: 4.7,
    reviews: 98,
    highlights: ["Chimyon-Chimgan", "Trekking", "Tabiat parklari"],
    icon: Mountain,
    color: "#8B5CF6",
  },
];

export function Tours() {
  const { t, lang } = useLanguage();

  const getTitle = (tour: typeof TOUR_PACKAGES[0]) => {
    if (lang === "ru") return tour.title_ru;
    if (lang === "en") return tour.title_en;
    return tour.title;
  };

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-[#1A3A5C] to-[#243f6a] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "tween" }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#E8B84B]/20 backdrop-blur-sm mb-6"
            >
              <Compass className="w-8 h-8 text-[#E8B84B]" />
            </motion.div>
            <h1 className="text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}>
              Ekskursion Turlar
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              O'zbekiston bo'ylab unutilmas sayohatlar. Professional gidlar, qulay mehmonxonalar va barcha transferlar kiritilgan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tour Packages */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TOUR_PACKAGES.map((tour, i) => {
              const Icon = tour.icon;
              return (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, type: "tween" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={getTitle(tour)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm">
                      <Star className="w-3.5 h-3.5 fill-[#E8B84B] text-[#E8B84B]" />
                      <span className="text-sm font-bold text-[#1A3A5C]">{tour.rating}</span>
                      <span className="text-xs text-[#8B9099]">({tour.reviews})</span>
                    </div>
                    <div
                      className="absolute bottom-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm"
                      style={{ backgroundColor: `${tour.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: tour.color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-[#1A3A5C] mb-2" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                      {getTitle(tour)}
                    </h3>
                    <p className="text-[#5A6478] text-sm mb-4 leading-relaxed">
                      {tour.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-5">
                      <div className="flex flex-wrap gap-2">
                        {tour.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg bg-[#F5F3EF] text-[#5A6478] text-xs font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-5 text-sm text-[#8B9099]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{tour.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        <span>2-12 kishi</span>
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between pt-5 border-t border-[#E8E2D9]">
                      <div>
                        <span className="text-xs text-[#8B9099] block mb-1">Narxi</span>
                        <span className="text-2xl font-bold text-[#1A3A5C]">{tour.price}</span>
                        <span className="text-sm text-[#8B9099]"> /kishi</span>
                      </div>
                      <Link
                        to="/booking"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1A3A5C] to-[#243f6a] text-white font-medium transition-all duration-300 hover:gap-3 hover:shadow-lg hover:shadow-[#1A3A5C]/20"
                      >
                        Bron qilish
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}