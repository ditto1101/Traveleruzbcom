import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Landmark, Utensils, Music, Mountain } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const HIGHLIGHTS = [
  {
    id: "architecture",
    icon: Landmark,
    image: "https://images.unsplash.com/photo-1772388864594-eea7885fa799?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJc2xhbWljJTIwYXJjaGl0ZWN0dXJlJTIwb3JuYXRlJTIwdGlsZXdvcmslMjBibHVlJTIwbW9zYWljfGVufDF8fHx8MTc3NzEzMjY3NHww&ixlib=rb-4.1.0&q=80&w=900",
    tag_uz: "Me'morchilik",
    tag_ru: "Архитектура",
    tag_en: "Architecture",
    title_uz: "Me'morchilik va San'at",
    title_ru: "Архитектура и Искусство",
    title_en: "Architecture & Art",
    desc_uz: "Registon maydoni, Kalon minorasi, Xiva ichon qal'asi — dunyodagi eng ajoyib islom me'morchiligi namunalari. Har bir kafel va muqarnas shunchaki san'at asari.",
    desc_ru: "Площадь Регистан, минарет Калян, Ичан-Кала Хивы — одни из величайших образцов исламской архитектуры в мире. Каждая плитка и мукарна — произведение искусства.",
    desc_en: "The Registan, Kalon Minaret, and Khiva's Ichan Kala rank among the world's greatest Islamic architecture. Every tile and muqarnas is a masterpiece of craftsmanship.",
    imageLeft: true,
    href: "/tours",
  },
  {
    id: "cuisine",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1671048116663-eda1518a169b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVemJla2lzdGFuJTIwdHJhZGl0aW9uYWwlMjBmb29kJTIwcGlsYWYlMjBiYXphYXJ8ZW58MXx8fHwxNzc3MTMyNjc1fDA&ixlib=rb-4.1.0&q=80&w=900",
    tag_uz: "Oshxona",
    tag_ru: "Кухня",
    tag_en: "Cuisine",
    title_uz: "Taom va Madaniyat",
    title_ru: "Кухня и Культура",
    title_en: "Cuisine & Culture",
    desc_uz: "O'zbek oshxonasi dunyo kulinar merosining eng muhim qismlaridan biri. Afshona qozonlarda pishirilgan osh, tandirdan yangi somsa, chorsu bozorlarining o'ziga xos hidi.",
    desc_ru: "Узбекская кухня — одна из важнейших частей мирового кулинарного наследия. Плов из огромных казанов, свежие самсы из тандыра, неповторимый аромат базаров Чорсу.",
    desc_en: "Uzbek cuisine is one of the world's great culinary heritages. Plov from giant kazan cauldrons, fresh samsa from the tandoor, and the unforgettable aroma of Chorsu Bazaar.",
    imageLeft: false,
    href: "/tours",
  },
  {
    id: "festivals",
    icon: Music,
    image: "https://images.unsplash.com/photo-1766133334847-7a9cd4dfca8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLaGl2YSUyMGFuY2llbnQlMjB3YWxsZWQlMjBjaXR5JTIwVXpiZWtpc3RhbnxlbnwxfHx8fDE3NzcxMzI2Njl8MA&ixlib=rb-4.1.0&q=80&w=900",
    tag_uz: "Festivallar",
    tag_ru: "Фестивали",
    tag_en: "Festivals",
    title_uz: "Festivallar va Bayramlar",
    title_ru: "Фестивали и Праздники",
    title_en: "Festivals & Celebrations",
    desc_uz: "Navruz bayrami, Silk Road Festival, Shark Taronalari xalqaro musiqa festivali — O'zbekiston an'analari, milliy kiyimlar va jonli musiqa bilan to'la mamlakat.",
    desc_ru: "Навруз, Фестиваль Шёлкового пути, международный музыкальный фестиваль «Шарк Тароналари» — Узбекистан наполнен традициями, национальными костюмами и живой музыкой.",
    desc_en: "Navruz, the Silk Road Festival, Sharq Taronalari music festival — Uzbekistan is alive with traditions, national costumes, and music that echoes through the centuries.",
    imageLeft: true,
    href: "/tours",
  },
  {
    id: "nature",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1557841621-39663826e90e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLeXp5bGt1bSUyMGRlc2VydCUyMGR1bmVzJTIwY2FtZWwlMjBVemJla2lzdGFufGVufDF8fHx8MTc3NzEzMjY3NXww&ixlib=rb-4.1.0&q=80&w=900",
    tag_uz: "Tabiat",
    tag_ru: "Природа",
    tag_en: "Nature",
    title_uz: "Cho'l va Tabiat",
    title_ru: "Пустыня и Природа",
    title_en: "Desert & Nature",
    desc_uz: "Qizilqum cho'li, Chimyon tog'lari, Amudaryo vodiysi — O'zbekiston nafaqat tarixy shaharlar, balki ajoyib tabiiy landshaftlar ham. Tushda yo'qolgan yo'llar sizni kutmoqda.",
    desc_ru: "Кызылкум, горы Чимган, долина Амударьи — Узбекистан это не только исторические города, но и поразительные природные ландшафты. Дороги, о которых вы мечтали.",
    desc_en: "The Kyzylkum desert, Chimgan mountains, Amudarya valley — Uzbekistan is not just historic cities but breathtaking natural landscapes. The roads you've dreamed of await.",
    imageLeft: false,
    href: "/tours",
  },
];

export function UzbekistanHighlights() {
  const { lang } = useLanguage();

  const getTag = (h: typeof HIGHLIGHTS[0]) => lang === "ru" ? h.tag_ru : lang === "uz" ? h.tag_uz : h.tag_en;
  const getTitle = (h: typeof HIGHLIGHTS[0]) => lang === "ru" ? h.title_ru : lang === "uz" ? h.title_uz : h.title_en;
  const getDesc = (h: typeof HIGHLIGHTS[0]) => lang === "ru" ? h.desc_ru : lang === "uz" ? h.desc_uz : h.desc_en;
  const exploreLabel = lang === "ru" ? "Исследовать" : lang === "uz" ? "Ko'proq" : "Explore";

  const sectionTitle = lang === "ru" ? "Узбекистан в деталях" : lang === "uz" ? "O'zbekiston batafsil" : "Uzbekistan Up Close";
  const sectionSubtitle = lang === "ru"
    ? "Четыре грани страны, которую вы не забудете"
    : lang === "uz"
    ? "Unutmaydigan mamlakatning to'rt qirrasi"
    : "Four facets of a country you won't forget";

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-[#E8B84B]/10 text-[#E8B84B] text-xs font-semibold tracking-wider uppercase mb-3">
            {lang === "ru" ? "Откройте для себя" : lang === "uz" ? "Kashf eting" : "Discover"}
          </span>
          <h2 className="text-[#1C1C1E] mb-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
            {sectionTitle}
          </h2>
          <p className="text-[#5A6478] text-base max-w-xl mx-auto">{sectionSubtitle}</p>
        </motion.div>

        {/* Alternating rows */}
        <div className="space-y-20">
          {HIGHLIGHTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, type: "tween" }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${!item.imageLeft ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                {/* Image */}
                <div className="relative rounded-3xl overflow-hidden h-[380px] group">
                  <img
                    src={item.image}
                    alt={getTitle(item)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1A3A5C]/20 to-transparent" />
                  {/* Floating tag */}
                  <div className="absolute bottom-5 left-5 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg">
                    <Icon className="w-4 h-4 text-[#E8B84B]" />
                    <span className="text-sm font-semibold text-[#1A3A5C]">{getTag(item)}</span>
                  </div>
                </div>

                {/* Text */}
                <div className="flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 text-[#E8B84B] text-sm font-semibold tracking-wider uppercase mb-4">
                    <div className="w-8 h-0.5 bg-[#E8B84B]" />
                    {getTag(item)}
                  </span>
                  <h3 className="text-[#1C1C1E] mb-5" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", fontFamily: "'Playfair Display', serif" }}>
                    {getTitle(item)}
                  </h3>
                  <p className="text-[#5A6478] leading-relaxed text-base mb-8">
                    {getDesc(item)}
                  </p>
                  <Link
                    to={item.href}
                    className="group inline-flex items-center gap-2 text-[#1A3A5C] font-semibold hover:text-[#E8B84B] transition-colors"
                  >
                    {exploreLabel}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
