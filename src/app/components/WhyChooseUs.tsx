import { motion } from "motion/react";
import { CheckCircle2, Shield, Headphones, Armchair, Map, RefreshCw } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const icons = [CheckCircle2, Shield, Headphones, Armchair, Map, RefreshCw];
const colors = ["#1A3A5C", "#E8B84B", "#10B981", "#1A3A5C", "#E8B84B", "#10B981"];

export function WhyChooseUs() {
  const { t } = useLanguage();

  const features = [
    { title: t("why_1_title"), desc: t("why_1_desc") },
    { title: t("why_2_title"), desc: t("why_2_desc") },
    { title: t("why_3_title"), desc: t("why_3_desc") },
    { title: t("why_4_title"), desc: t("why_4_desc") },
    { title: t("why_5_title"), desc: t("why_5_desc") },
    { title: t("why_6_title"), desc: t("why_6_desc") },
  ];

  return (
    <section id="why" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8B84B]/15 text-[#E8B84B] text-sm font-medium mb-4">
              {t("why_promise")}
            </span>
            <h2 className="text-[#1C1C1E] mb-5" style={{ fontSize: "2.2rem", lineHeight: 1.2 }}>
              {t("why_title")}
            </h2>
            <p className="text-[#5A6478] text-lg leading-relaxed mb-8">
              {t("why_subtitle")}
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4">
              {[
                { label: t("why_stat_travelers"), icon: "👥" },
                { label: t("why_stat_years"), icon: "🏆" },
                { label: t("why_stat_licensed"), icon: "✅" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] hover:border-[#E8B84B]/40 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <motion.span
                    className="text-base"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                  >
                    {item.icon}
                  </motion.span>
                  <span className="text-sm font-medium text-[#1C1C1E]">{item.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Big stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="mt-10 p-6 rounded-2xl text-white relative overflow-hidden shadow-xl"
              style={{
                background: "linear-gradient(135deg, #1A3A5C, #243f6a, #1A3A5C)",
                boxShadow: "0 20px 60px rgba(26,58,92,0.35)"
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#E8B84B]/0 via-[#E8B84B]/10 to-[#E8B84B]/0"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
              />
              <div className="flex items-start gap-4 relative z-10">
                <motion.div
                  className="text-5xl text-[#E8B84B]"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                >
                  4.9
                </motion.div>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="text-[#E8B84B] text-lg inline-block"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.4 + i * 0.1 }}
                        whileHover={{ scale: 1.3, rotate: 360 }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </div>
                  <p className="text-white/70 text-sm">{t("why_rating_desc")}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, i) => {
              const Icon = icons[i];
              const color = colors[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, type: "spring", stiffness: 150 }}
                  whileHover={{
                    scale: 1.04,
                    y: -6,
                    transition: { duration: 0.3 }
                  }}
                  className="p-5 rounded-2xl bg-white border border-[#E8E2D9] hover:border-[#E8B84B]/30 hover:shadow-xl transition-all duration-300 group"
                >
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${color}15` }}
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    transition={{ duration: 0.4, type: "spring" }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </motion.div>
                  <h3 className="text-[#1C1C1E] mb-1.5" style={{ fontSize: "0.95rem", fontFamily: "'Playfair Display', serif" }}>
                    {feature.title}
                  </h3>
                  <p className="text-[#8B9099] text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}