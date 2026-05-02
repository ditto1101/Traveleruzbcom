import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    country: "🇬🇧 United Kingdom",
    avatar: "SM",
    avatarColor: "#1A3A5C",
    rating: 5,
    route: "Tashkent → Samarkand",
    text: "Absolutely breathtaking experience. The train was comfortable, on time, and the views were unreal. The team was helpful from start to finish — I'll be back next year.",
  },
  {
    id: 2,
    name: "Алексей Иванов",
    country: "🇷🇺 Russia",
    avatar: "АИ",
    avatarColor: "#E8B84B",
    rating: 5,
    route: "Silk Road Grand Tour",
    text: "Тур превзошёл все ожидания. Самарканд, Бухара, Хива — каждый город потрясающий. Гид был профессиональным и очень знающим. Организация на высшем уровне.",
  },
  {
    id: 3,
    name: "Dilnoza Yusupova",
    country: "🇩🇪 Germany",
    avatar: "DY",
    avatarColor: "#10B981",
    rating: 5,
    route: "Samarkand → Bukhara",
    text: "As someone with Uzbek roots, this trip meant everything. The private transfer was luxurious and our driver knew every hidden gem. Booked again for family in October!",
  },
  {
    id: 4,
    name: "Marco Ferretti",
    country: "🇮🇹 Italy",
    avatar: "MF",
    avatarColor: "#1A3A5C",
    rating: 5,
    route: "Samarkand Express",
    text: "I've traveled across 40 countries. Uzbekistan surprised me the most. The Registan at sunset is unlike anything I've ever seen. Book the premium bus — worth every dollar.",
  },
  {
    id: 5,
    name: "Камила Хасанова",
    country: "🇺🇿 Uzbekistan",
    avatar: "КХ",
    avatarColor: "#E8B84B",
    rating: 5,
    route: "Tashkent → Samarkand",
    text: "Afrosiyob poezdida Samarqandga sayohat — hayotimdagi eng qulay sayohatlardan biri. Narx adolatli, xizmat a'lo darajada. Har doim shu kompaniya orqali bron qilaman.",
  },
];

export function Testimonials() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const visible = [
    testimonials[(current) % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section className="py-24 bg-[#1A3A5C] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-[#E8B84B] text-sm font-medium mb-4">
              Sayohatchilar hikoyalari
            </span>
            <h2 className="text-white mb-4" style={{ fontSize: "2.2rem" }}>
              {t("testimonials_title")}
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              {t("testimonials_subtitle")}
            </p>
          </motion.div>
        </div>

        {/* Cards - Desktop: 3, Mobile: 1 */}
        <div className="hidden md:grid grid-cols-3 gap-6 mb-8">
          {visible.map((review, i) => (
            <motion.div
              key={`${review.id}-${current}`}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.15, type: "spring", stiffness: 150 }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl p-6 hover:bg-white/15 hover:border-[#E8B84B]/30 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white/8 border border-white/10 rounded-2xl p-6"
            >
              <ReviewCard review={testimonials[current]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrent(i)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-[#E8B84B] w-6" : "bg-white/30 w-2"
                }`}
              />
            ))}
          </div>
          <motion.button
            onClick={next}
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: typeof testimonials[0] }) {
  return (
    <>
      <Quote className="w-6 h-6 text-[#E8B84B] mb-4 opacity-70" />
      <p className="text-white/80 text-sm leading-relaxed mb-5">"{review.text}"</p>
      <div className="flex gap-0.5 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <span key={i} className="text-[#E8B84B] text-sm">★</span>
        ))}
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-white/10">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ backgroundColor: review.avatarColor }}
        >
          {review.avatar}
        </div>
        <div>
          <p className="text-white font-medium text-sm">{review.name}</p>
          <p className="text-white/50 text-xs">{review.country} · {review.route}</p>
        </div>
      </div>
    </>
  );
}