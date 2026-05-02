import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t("faq_1_q"), a: t("faq_1_a") },
    { q: t("faq_2_q"), a: t("faq_2_a") },
    { q: t("faq_3_q"), a: t("faq_3_a") },
    { q: t("faq_4_q"), a: t("faq_4_a") },
    { q: t("faq_5_q"), a: t("faq_5_a") },
    { q: t("faq_6_q"), a: t("faq_6_a") },
  ];

  return (
    <section className="py-24 bg-[#F5F3EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left - Header */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="sticky top-28"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#1A3A5C]/8 text-[#1A3A5C] text-sm font-medium mb-4">
                FAQ
              </span>
              <h2 className="text-[#1C1C1E] mb-5" style={{ fontSize: "2.2rem", lineHeight: 1.2 }}>
                {t("faq_title")}
              </h2>
              <p className="text-[#5A6478] text-lg leading-relaxed mb-8">
                {t("faq_subtitle")}
              </p>

              {/* Still have questions card */}
              <div className="p-5 rounded-2xl text-white" style={{ background: "linear-gradient(135deg, #1A3A5C, #243f6a)" }}>
                <p className="font-semibold mb-1">Savollaringiz bormi?</p>
                <p className="text-white/80 text-sm mb-4">Jamoamiz 30 daqiqa ichida javob beradi.</p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-sm font-medium transition-colors"
                >
                  Bog'lanish
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right - Accordion */}
          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className={`bg-white rounded-2xl border transition-all duration-200 ${
                  openIndex === i
                    ? "border-[#E8B84B]/40 shadow-md"
                    : "border-[#E8E2D9] hover:border-[#E8B84B]/20"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-start justify-between gap-4 p-5 text-left"
                >
                  <span
                    className={`text-sm leading-relaxed transition-colors ${
                      openIndex === i ? "text-[#1A3A5C]" : "text-[#1C1C1E]"
                    }`}
                    style={{ fontWeight: 600 }}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                      openIndex === i
                        ? "bg-[#1A3A5C] text-white"
                        : "bg-[#F5F3EF] text-[#5A6478]"
                    }`}
                  >
                    {openIndex === i ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-[#5A6478] text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}