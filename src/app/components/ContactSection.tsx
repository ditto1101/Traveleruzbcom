import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function ContactSection() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN ?? "";
  const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID ?? "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const text = `📩 *Yangi xabar — Aloqa formasi*\n\n👤 *Ism:* ${form.name}\n📧 *Email:* ${form.email}\n📞 *Telefon:* ${form.phone || "Ko'rsatilmagan"}\n\n💬 *Xabar:*\n${form.message}`;

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "Markdown",
        }),
      });
    } catch (err) {
      console.error("Telegram xabar yuborishda xato:", err);
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const contactItems = [
    {
      icon: Phone,
      label: t("contact_phone_label"),
      value: "+998 90 975 39 77",
      href: "tel:+998909753977",
      color: "#1A3A5C",
    },
    {
      icon: Mail,
      label: t("contact_email_label"),
      value: "akmal20041119@gmail.com",
      href: "mailto:akmal20041119@gmail.com",
      color: "#E8B84B",
    },
    {
      icon: MapPin,
      label: t("contact_address_label"),
      value: "Amir Temur ko'chasi 25, Toshkent",
      href: "https://yandex.uz/maps/10335/tashkent/house/YkAYdA9gTkYDQFprfX9weX9qZQ==/?ll=69.280781%2C41.318268&z=19.67",
      color: "#10B981",
    },
    {
      icon: Clock,
      label: "Ish vaqti",
      value: t("contact_hours"),
      href: "#",
      color: "#8B5CF6",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E8B84B]/15 text-[#E8B84B] text-sm font-medium mb-4">
              Bog'lanish
            </span>
            <h2 className="text-[#1C1C1E] mb-4" style={{ fontSize: "2.2rem" }}>
              {t("contact_title")}
            </h2>
            <p className="text-[#5A6478] text-lg max-w-xl mx-auto">
              {t("contact_subtitle")}
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#F5F3EF] border border-[#E8E2D9] hover:border-[#E8B84B]/30 hover:shadow-md transition-all duration-200 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-[#8B9099] uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-[#1C1C1E] text-sm font-medium">{item.value}</p>
                  </div>
                </a>
              );
            })}

            {/* Quick booking callout */}
            <div className="mt-6 p-5 rounded-2xl text-white" style={{ background: "linear-gradient(135deg, #1A3A5C, #243f6a)" }}>
               <p className="font-semibold mb-1">Bron qilishga tayyormisiz?</p>
               <p className="text-white/70 text-sm mb-4">Formani o'tkazib yuboring — 3 daqiqada to'g'ridan-to'g'ri onlayn bron qiling.</p>
               <a
                 href="/booking"
                 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E8B84B] text-[#1A3A5C] text-sm font-semibold hover:bg-[#d4a73d] transition-colors"
               >
                 Hozir bron qiling
               </a>
             </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl border border-[#E8E2D9] shadow-sm p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="w-14 h-14 text-[#10B981] mb-4" />
                  <h3 className="text-[#1C1C1E] mb-2" style={{ fontWeight: 600 }}>Xabar yuborildi!</h3>
                  <p className="text-[#5A6478] text-sm">30 daqiqa ichida javob beramiz.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">
                        {t("contact_name")} *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B] transition-colors"
                        placeholder="Dilnoza Yusupova"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">
                        {t("contact_email")} *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B] transition-colors"
                        placeholder="siz@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">
                      {t("contact_phone")}
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B] transition-colors"
                      placeholder="+998 90 123 45 67"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">
                      {t("contact_message")} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B] transition-colors resize-none"
                      placeholder="Sayohat rejalaringiz haqida bizga ayting..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#1A3A5C] to-[#243f6a] text-white font-medium hover:from-[#E8B84B] hover:to-[#d4a73d] hover:text-[#1A3A5C] hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
                  >
                    <Send className="w-4 h-4" />
                    {t("contact_send")}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}