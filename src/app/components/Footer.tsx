import { Link } from "react-router";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, Download } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import logoImg from "figma:asset/27b56e3b245628b6d5f41a5ac350e63ee52fde8b.png";

// Import PDFs
import pdfUz from "../../imports/ОММАВИЙ_ОФЕРТА.pdf";
import pdfRu from "../../imports/Публичная_офферта_Travel.uzb_1.pdf";
import pdfEn from "../../imports/PUBLIC_OFFER_Travel_uzb.pdf";

export function Footer() {
  const { t, lang } = useLanguage();

  const getOfferPdfUrl = () => {
    if (lang === "ru") return pdfRu;
    if (lang === "uz") return pdfUz;
    return pdfEn;
  };

  const getOfferLabel = () => {
    if (lang === "ru") return "Публичная оферта";
    if (lang === "uz") return "Ommaviy oferta";
    return "Public Offer";
  };

  return (
    <footer className="bg-[#1C1C1E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logoImg}
                alt="traveluzb logo"
                className="w-[250px] h-[250px] object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {t("footer_desc")}
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href={i === 0 ? "https://www.instagram.com/travel___uzb" : "#"}
                  target={i === 0 ? "_blank" : undefined}
                  rel={i === 0 ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#E8B84B] hover:text-[#1C1C1E] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-[#E8B84B] mb-5">
              {t("footer_links")}
            </h4>
            <ul className="space-y-3">
              {[
                { label: lang === "ru" ? "Туры" : lang === "uz" ? "Turlar" : "Tours", href: "/tours" },
                { label: lang === "ru" ? "Направления" : lang === "uz" ? "Yo'nalishlar" : "Destinations", href: "/routes" },
                { label: lang === "ru" ? "Транспорт" : lang === "uz" ? "Transport" : "Transport", href: "/transport" },
                { label: lang === "ru" ? "Отели" : lang === "uz" ? "Mehmonxonalar" : "Hotels", href: "/hotels" },
                { label: lang === "ru" ? "О нас" : lang === "uz" ? "Biz haqimizda" : "About", href: "/about" },
                { label: lang === "ru" ? "Контакты" : lang === "uz" ? "Aloqa" : "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-white/50 hover:text-[#E8B84B] text-sm transition-colors hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-[#E8B84B] mb-5">
              {t("footer_routes")}
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Samarkand", href: "/routes/tashkent-samarkand" },
                { label: "Bukhara", href: "/routes/samarkand-bukhara" },
                { label: "Khiva", href: "/routes" },
                { label: "Tashkent", href: "/routes" },
                { label: "Fergana Valley", href: "/tours" },
                { label: "Nurata", href: "/tours" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-white/50 hover:text-[#E8B84B] text-sm transition-colors hover:translate-x-1 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-[#E8B84B] mb-5">
              {t("footer_contact")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E8B84B] mt-0.5 flex-shrink-0" />
                <span className="text-white/50 text-sm">Amir Temur ko'chasi 25, Toshkent</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E8B84B] flex-shrink-0" />
                <a href="tel:+998909753977" className="text-white/50 hover:text-white text-sm transition-colors">+998 90 975 39 77</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#E8B84B] flex-shrink-0" />
                <a href="mailto:traveleruzb777@gmail.com" className="text-white/50 hover:text-white text-sm transition-colors">traveleruzb777@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#E8B84B] flex-shrink-0" />
                <span className="text-white/50 text-sm">Dushanba–Juma: 10:00–18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm text-center md:text-left">
            © {new Date().getFullYear()} TravelerUZB. {t("footer_rights")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href={getOfferPdfUrl()}
              download
              className="flex items-center gap-1.5 text-white/30 hover:text-[#E8B84B] text-sm transition-colors font-medium border border-white/10 hover:border-[#E8B84B]/50 px-3 py-1.5 rounded-lg bg-white/5"
            >
              <Download className="w-3.5 h-3.5" />
              {getOfferLabel()}
            </a>
            <a href="#" className="text-white/30 hover:text-white/70 text-sm transition-colors">
              {lang === "ru" ? "Конфиденциальность" : lang === "uz" ? "Maxfiylik siyosati" : "Privacy Policy"}
            </a>
            <a href="#" className="text-white/30 hover:text-white/70 text-sm transition-colors">
              {lang === "ru" ? "Условия" : lang === "uz" ? "Foydalanish shartlari" : "Terms of Use"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}