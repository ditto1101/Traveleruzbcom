import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const ARTICLES = [
  {
    id: "architecture-guide",
    category_uz: "Me'morchilik",
    category_ru: "Архитектура",
    category_en: "Architecture",
    categoryColor: "#1A3A5C",
    title_uz: "Samarqand Registonining yashirin sirlarini kashf eting",
    title_ru: "Откройте скрытые секреты Самаркандского Регистана",
    title_en: "Discover the Hidden Secrets of Samarkand's Registan",
    image: "https://images.unsplash.com/photo-1730368580427-9b8919e97cc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW1hcmthbmQlMjBSZWdpc3RhbiUyMGdvbGRlbiUyMGhvdXIlMjBzdW5zZXR8ZW58MXx8fHwxNzc3MTMyNjY5fDA&ixlib=rb-4.1.0&q=80&w=600",
    readTime: "6 min",
    date: "Apr 18, 2026",
  },
  {
    id: "food-culture",
    category_uz: "Taom & Madaniyat",
    category_ru: "Кухня",
    category_en: "Food & Culture",
    categoryColor: "#E8B84B",
    title_uz: "O'zbek oshining tarixi: qozon oldidagi ming yillik an'ana",
    title_ru: "История узбекского плова: тысячелетняя традиция у казана",
    title_en: "The History of Uzbek Plov: A Thousand-Year Tradition",
    image: "https://images.unsplash.com/photo-1671048116663-eda1518a169b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVemJla2lzdGFuJTIwdHJhZGl0aW9uYWwlMjBmb29kJTIwcGlsYWYlMjBiYXphYXJ8ZW58MXx8fHwxNzc3MTMyNjc1fDA&ixlib=rb-4.1.0&q=80&w=600",
    readTime: "4 min",
    date: "Apr 10, 2026",
  },
  {
    id: "travel-guide",
    category_uz: "Sayohat qo'llanmasi",
    category_ru: "Путеводитель",
    category_en: "Travel Guide",
    categoryColor: "#10B981",
    title_uz: "Ipak yo'li bo'ylab 10 kunlik sayohat rejasi: Toshkentdan Xivagacha",
    title_ru: "Маршрут на 10 дней по Шёлковому пути: от Ташкента до Хивы",
    title_en: "10-Day Silk Road Itinerary: Tashkent to Khiva",
    image: "https://images.unsplash.com/photo-1708005522625-4b40dd0c0eea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBibG9nJTIwYXJjaGl0ZWN0dXJlJTIwYXJ0aWNsZSUyMHBob3RvJTIwYm9va3xlbnwxfHx8fDE3NzcxMzI2ODN8MA&ixlib=rb-4.1.0&q=80&w=600",
    readTime: "8 min",
    date: "Apr 2, 2026",
  },
];

export function BlogPreview() {
  const { lang } = useLanguage();

  const getCategory = (a: typeof ARTICLES[0]) => lang === "ru" ? a.category_ru : lang === "uz" ? a.category_uz : a.category_en;
  const getTitle = (a: typeof ARTICLES[0]) => lang === "ru" ? a.title_ru : lang === "uz" ? a.title_uz : a.title_en;

  const sectionTitle = lang === "ru" ? "Из нашего блога" : lang === "uz" ? "Blogimizdan" : "From Our Blog";
  const sectionSubtitle = lang === "ru"
    ? "Вдохновляющие истории и полезные советы для путешественников"
    : lang === "uz"
    ? "Sayohatchilar uchun ilhomlantiruvchi hikoyalar va foydali maslahatlar"
    : "Inspiring stories and practical tips for travellers";
  const readLabel = lang === "ru" ? "Читать" : lang === "uz" ? "O'qish" : "Read";
  const allLabel = lang === "ru" ? "Все статьи" : lang === "uz" ? "Barcha maqolalar" : "Read All Articles";

  return (
    <section className="py-24 bg-[#F5F3EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A3A5C]/8 text-[#1A3A5C] text-xs font-semibold tracking-wider uppercase mb-3">
              <BookOpen className="w-3 h-3" />
              Blog
            </span>
            <h2 className="text-[#1C1C1E]" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
              {sectionTitle}
            </h2>
            <p className="text-[#5A6478] mt-2 text-base max-w-lg">{sectionSubtitle}</p>
          </div>
          <Link
            to="/tours"
            className="group inline-flex items-center gap-2 text-[#1A3A5C] font-semibold text-sm whitespace-nowrap hover:text-[#E8B84B] transition-colors"
          >
            {allLabel}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {ARTICLES.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={getTitle(article)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Category tag */}
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-bold"
                  style={{ backgroundColor: article.categoryColor }}
                >
                  {getCategory(article)}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-[#8B9099] mb-3">
                  <span>{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-[#E8E2D9]" />
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime} {lang === "ru" ? "чтения" : lang === "uz" ? "o'qish" : "read"}
                  </span>
                </div>

                <h3 className="text-[#1A3A5C] mb-4 group-hover:text-[#E8B84B] transition-colors" style={{ fontSize: "1rem", fontFamily: "'Playfair Display', serif", lineHeight: 1.4 }}>
                  {getTitle(article)}
                </h3>

                <Link
                  to="/tours"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A3A5C] hover:text-[#E8B84B] group/read transition-colors"
                >
                  {readLabel}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/read:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
