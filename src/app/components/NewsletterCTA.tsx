import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function NewsletterCTA() {
  const { lang } = useLanguage();

  const headline = lang === "ru"
    ? "Готовы к путешествию своей жизни?"
    : lang === "uz"
    ? "Umringizning sayohatiga tayyormisiz?"
    : "Ready for the Journey of a Lifetime?";

  const subtext = lang === "ru"
    ? "Позвольте нам создать для вас незабываемый опыт. Тысячи путешественников уже доверяют нам."
    : lang === "uz"
    ? "Sizga unutilmas tajriba yaratishga ijozat bering. Minglab sayohatchilar allaqachon bizga ishonadi."
    : "Let us craft an unforgettable experience for you. Thousands of travellers already trust us.";

  const browseLabel = lang === "ru" ? "Все туры" : lang === "uz" ? "Barcha turlar" : "Browse All Tours";
  const contactLabel = lang === "ru" ? "Связаться с нами" : lang === "uz" ? "Biz bilan bog'lanish" : "Contact Us";

  return (
    <section className="py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #E8B84B 0%, #d4a73d 40%, #c89930 100%)",
          }}
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute top-8 right-48 w-20 h-20 rounded-full bg-white/15" />

          <div className="relative z-10 px-8 md:px-16 py-16 md:py-20 text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/25 backdrop-blur-sm mb-6 mx-auto"
            >
              <Mail className="w-7 h-7 text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-white mb-4"
              style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", fontFamily: "'Playfair Display', serif" }}
            >
              {headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/80 text-lg max-w-xl mx-auto mb-10"
            >
              {subtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {/* Outlined button */}
              <Link
                to="/tours"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white text-white font-semibold hover:bg-white hover:text-[#1A3A5C] hover:gap-3 transition-all duration-300"
              >
                {browseLabel}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Filled dark button */}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#1A3A5C] text-white font-semibold hover:bg-[#243f6a] hover:shadow-xl hover:shadow-[#1A3A5C]/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                {contactLabel}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
