import { Link } from "react-router";
import { motion } from "motion/react";
import { Zap, Bus, Car, Compass, ArrowRight, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import busImg from "figma:asset/874c33dca063befa1b97765e4e31ba1aac0e2cdc.png";

const TRAIN_IMG = "https://images.unsplash.com/photo-1729606883845-95ded8f9e3c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJvc2l5b2IlMjBleHByZXNzJTIwdHJhaW4lMjBVemJla2lzdGFuJTIwcmFpbHdheXxlbnwxfHx8fDE3NzU1NTYzNjN8MA&ixlib=rb-4.1.0&q=80&w=600";
const BUS_IMG = busImg;
const CAR_IMG = "https://images.unsplash.com/photo-1772468237159-674f05233185?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwY2FyJTIwdHJhbnNmZXIlMjBjaGF1ZmZldXIlMjBzZXJ2aWNlfGVufDF8fHx8MTc3NTU1NjM2M3ww&ixlib=rb-4.1.0&q=80&w=600";
const TOUR_IMG = "https://images.unsplash.com/photo-1761731099628-9c4bd008140e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW1hcmthbmQlMjBSZWdpc3RhbiUyMGFuY2llbnQlMjBzaWxrJTIwcm9hZCUyMHRvdXJ8ZW58MXx8fHwxNzc1NTU2MzY0fDA&ixlib=rb-4.1.0&q=80&w=600";

export function TransportOptions() {
  const { t } = useLanguage();

  const options = [
    {
      icon: Zap,
      name: t("transport_1_name"),
      desc: t("transport_1_desc"),
      price: 250,
      image: TRAIN_IMG,
      features: ["Toshkent ↔ Samarqand", "2s 10d yo'l", "Ajratilgan o'rinlar", "Bortda Wi-Fi"],
      color: "#1A3A5C",
      bg: "#EDF2F8",
      featured: false,
    },
    {
      icon: Bus,
      name: t("transport_2_name"),
      desc: t("transport_2_desc"),
      price: 150,
      image: BUS_IMG,
      features: ["Barcha asosiy yo'nalishlar", "3-4s yo'l", "Konditsioner + reclayn o'rindiqlar", "USB zaryadlash"],
      color: "#10B981",
      bg: "#ECFDF5",
      featured: false,
    },
    {
      icon: Car,
      name: t("transport_3_name"),
      desc: t("transport_3_desc"),
      price: 400,
      image: CAR_IMG,
      features: ["Eshikdan eshikka", "Moslashuvchan vaqt", "6 ta yo'lovchiga qadar", "So'rov bo'yicha to'xtash"],
      color: "#E8B84B",
      bg: "#FEF9EC",
      featured: true,
    },
    {
      icon: Compass,
      name: t("transport_4_name"),
      desc: t("transport_4_desc"),
      price: 150,
      image: TOUR_IMG,
      features: ["Ko'p shaharli yo'nalishlar", "Professional gid", "Mehmonxona kiradi", "Barcha transferlar"],
      color: "#8B5CF6",
      bg: "#F5F3FF",
      featured: false,
    },
  ];

  return (
    <section id="transport" className="py-24 bg-[#F5F3EF]">
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
              Qanday sayohat qilasiz
            </span>
            <h2 className="text-[#1C1C1E] mb-4" style={{ fontSize: "2.2rem" }}>
              {t("transport_title")}
            </h2>
            <p className="text-[#5A6478] text-lg max-w-xl mx-auto">
              {t("transport_subtitle")}
            </p>
          </motion.div>
        </div>

        {/* Options grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((option, i) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
                className={`relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
                  option.featured ? "ring-2 ring-[#E8B84B]" : ""
                }`}
              >
                {option.featured && (
                  <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-[#E8B84B] text-[#1A3A5C] text-xs font-semibold">
                    Tavsiya etiladi
                  </div>
                )}
                {/* Image */}
                <div className="h-40 overflow-hidden">
                  <img
                    src={option.image}
                    alt={option.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: option.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: option.color }} />
                  </div>
                  <h3 className="text-[#1C1C1E] mb-1.5" style={{ fontSize: "1rem", fontFamily: "'Playfair Display', serif" }}>
                    {option.name}
                  </h3>
                  <p className="text-[#8B9099] text-sm mb-4 leading-relaxed">
                    {option.desc}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1.5 mb-5">
                    {option.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-[#5A6478]">
                        <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: option.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Price + CTA */}
                  <div className="pt-4 border-t border-[#F5F3EF]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-xs text-[#8B9099]">{t("transport_from")}</span>
                        <div>
                          <span className="text-xl text-[#1C1C1E]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>${option.price}</span>
                          <span className="text-xs text-[#8B9099]">{t("transport_per_person")}</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      to="/booking"
                      className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:gap-2"
                      style={{
                        backgroundColor: `${option.color}15`,
                        color: option.color,
                      }}
                    >
                      {t("transport_book")}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}