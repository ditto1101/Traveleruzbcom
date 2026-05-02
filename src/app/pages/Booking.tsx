import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, ArrowRight, Check, MapPin, Calendar, Users, Zap, Bus, Car, Compass,
  User, Mail, Phone, CheckCircle, Send, Loader2
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// 🔧 Telegram Bot sozlamalari
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN ?? "";
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID ?? "";

async function sendTelegramMessage(text: string): Promise<{ ok: boolean; error?: string }> {
  const base = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

  try {
    const sendRes = await fetch(`${base}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: "Markdown",
      }),
    });
    const sendData = await sendRes.json();

    if (sendData.ok) {
      return { ok: true };
    } else {
      return { ok: false, error: `Telegram xatosi: ${sendData.description}` };
    }
  } catch (e: any) {
    return { ok: false, error: `Tarmoq xatosi: ${e.message}` };
  }
}

const CITIES = ["Tashkent", "Samarkand", "Bukhara", "Khiva", "Namangan", "Andijan"];

const TRANSPORT_OPTIONS = [
  {
    id: "train",
    icon: Zap,
    name: "Express Train",
    name_ru: "Скоростной поезд",
    name_uz: "Tezkor poyezd",
    desc: "Afrosiyob high-speed train. Fastest & most comfortable.",
    price: 25,
    duration: "2h 10m",
    color: "#0EA5E9",
    bg: "#EFF9FF",
    badge: "Fastest",
  },
  {
    id: "bus",
    icon: Bus,
    name: "Bus",
    name_ru: "Автобус",
    name_uz: "Avtobus",
    desc: "Modern AC coaches with Wi-Fi and reclining seats.",
    price: 18,
    duration: "3h 30m",
    color: "#10B981",
    bg: "#ECFDF5",
    badge: "Best Value",
  },
  {
    id: "private",
    icon: Car,
    name: "Private Transfer",
    name_ru: "Частный трансфер",
    name_uz: "Shaxsiy transfer",
    desc: "Dedicated driver, flexible timing, door-to-door.",
    price: 75,
    duration: "3h 00m",
    color: "#C89B3C",
    bg: "#FFFBEB",
    badge: "Most Popular",
  },
  {
    id: "tour",
    icon: Compass,
    name: "Guided Tour Package",
    name_ru: "Экскурсионный тур",
    name_uz: "Ekskursion tur",
    desc: "Multi-city package with guide, hotel & all transfers.",
    price: 380,
    duration: "7 Days",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    badge: null,
  },
];

const STEPS = [
  { num: 1, label_en: "Route & Date", label_ru: "Маршрут и дата", label_uz: "Marshrut va sana" },
  { num: 2, label_en: "Transport", label_ru: "Транспорт", label_uz: "Transport" },
  { num: 3, label_en: "Passengers", label_ru: "Пассажиры", label_uz: "Yo'lovchilar" },
  { num: 4, label_en: "Confirm", label_ru: "Подтверждение", label_uz: "Tasdiqlash" },
];

export function Booking() {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  // Form state
  const [from, setFrom] = useState("Tashkent");
  const [to, setTo] = useState("Samarkand");
  const [checkInDate, setCheckInDate] = useState(new Date(Date.now() + 86400000).toISOString().split("T")[0]);
  const [checkOutDate, setCheckOutDate] = useState("");
  const [duration, setDuration] = useState(3); // Davomiylik - kunlar soni
  const [hotelStars, setHotelStars] = useState(0); // 0 = har qanday, 1-5 = yulduzlar
  const [adults, setAdults] = useState(2); // Kattalar soni
  const [children, setChildren] = useState(0); // Bolalar soni
  const [selectedTransport, setSelectedTransport] = useState("train");
  const [passengerDetails, setPassengerDetails] = useState([
    { name: "", email: "", phone: "" }
  ]);
  const [paymentMethod, setPaymentMethod] = useState<string>("paycom");
  const [clickPaid, setClickPaid] = useState(false);
  const [paycomPaid, setPaycomPaid] = useState(false);

  const transport = TRANSPORT_OPTIONS.find(opt => opt.id === selectedTransport) || TRANSPORT_OPTIONS[0];

  // Narx hisoblash
  const totalPassengers = adults + children;
  const hotelPricePerNight = hotelStars === 0 ? 50 : hotelStars * 30; // Mehmonxona narxi (yulduz bo'yicha)
  const hotelTotal = hotelPricePerNight * duration * totalPassengers;
  const transportTotal = transport.price * totalPassengers;
  const total = hotelTotal + transportTotal;

  const getTransportName = (t: typeof TRANSPORT_OPTIONS[0]) => {
    if (lang === "ru") return t.name_ru;
    if (lang === "uz") return t.name_uz;
    return t.name;
  };

  const getStepLabel = (s: typeof STEPS[0]) => {
    if (lang === "ru") return s.label_ru;
    if (lang === "uz") return s.label_uz;
    return s.label_en;
  };

  const handleConfirm = async (isPaid: boolean = false, method: string = paymentMethod) => {
    setSending(true);
    setSendError("");

    const bookingRef = `SRT-${Math.floor(Math.random() * 90000) + 10000}`;
    let paymentStatus = "❌ TO'LOV QILINMADI";
    if (isPaid && method === "click") {
      paymentStatus = "✅ TO'LOV QILINGAN (Click)";
    } else if (isPaid && method === "paycom") {
      paymentStatus = "✅ TO'LOV QILINGAN (Payme)";
    }

    const message = `
🎫 *YANGI ZAYAVKA* — ${bookingRef}

📍 *Marshrut:* ${from} → ${to}
📅 *Check-in:* ${checkInDate}${checkOutDate ? `\n📅 *Check-out:* ${checkOutDate}` : ""}
⏰ *Davomiylik:* ${duration} kun
🏨 *Mehmonxona:* ${hotelStars === 0 ? "Har qanday" : `${hotelStars} yulduz`}
🚌 *Transport:* ${getTransportName(transport)}
👥 *Yo'lovchilar:* ${adults} kattalar${children > 0 ? ` + ${children} bolalar` : ""} (Jami: ${totalPassengers} kishi)
💰 *Umumiy narx:* $${total}
  ├ Mehmonxona: $${hotelTotal} (${duration} kun × ${totalPassengers} kishi)
  └ Transport: $${transportTotal}

👤 *Mijoz:*
• Ism: ${passengerDetails[0].name || "—"}
• Email: ${passengerDetails[0].email || "—"}
• Telefon: ${passengerDetails[0].phone || "—"}

💳 *To'lov turi:* ${method.toUpperCase()}
holat: ${paymentStatus}
    `.trim();

    try {
      const result = await sendTelegramMessage(message);
      if (!result.ok) {
        throw new Error(result.error || "Telegram xatosi");
      }
    } catch (e: any) {
      setSendError(e.message);
    } finally {
      setSending(false);
      setConfirmed(true);
    }
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "tween" }}
          className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-[#10B981]" />
          </div>
          <h1 className="text-[#1C1C1E] mb-3" style={{ fontSize: "1.8rem", fontWeight: 700 }}>
            Zayavka qabul qilindi! 🎉
          </h1>
          <p className="text-[#5A6478] mb-2">
            <strong>{from}</strong> → <strong>{to}</strong> marshrutiga zayavkangiz muvaffaqiyatli yuborildi.
          </p>
          <p className="text-[#8B9099] text-sm mb-6">
            Operatorimiz tez orada siz bilan bog'lanadi. Odatda 15–30 daqiqa ichida.
          </p>

          <div className="bg-[#F5F3EF] rounded-2xl p-5 mb-6 text-left space-y-3">
            {[
              { label: "Zayavka raqami", value: `SRT-${Math.floor(Math.random() * 90000) + 10000}` },
              { label: "Marshrut", value: `${from} → ${to}` },
              { label: "Kirish", value: checkInDate },
              { label: "Davomiylik", value: `${duration} kun` },
              { label: "Mehmonxona", value: hotelStars === 0 ? "Har qanday" : `${hotelStars} yulduz` },
              { label: "Transport", value: getTransportName(transport) },
              { label: "Yo'lovchilar", value: `${adults} kattalar${children > 0 ? ` + ${children} bolalar` : ""}` },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-[#8B9099]">{item.label}</span>
                <span className="text-sm font-semibold text-[#1C1C1E]">{item.value}</span>
              </div>
            ))}
          </div>

          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-medium"
            style={{ background: "linear-gradient(135deg, #1A3A5C, #243f6a)" }}
          >
            Bosh sahifaga qaytish
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E2D9] sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/" className="flex items-center gap-2 text-[#5A6478] hover:text-[#1C1C1E] text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="h-4 w-px bg-[#E8E2D9]" />
            <h1 className="text-[#1C1C1E]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
              {t("booking_title")}
            </h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-0">
            {STEPS.map((s, i) => (
              <div key={s.num} className="flex items-center flex-1">
                <div
                  className={`flex items-center gap-2 cursor-pointer ${step >= s.num ? "" : "opacity-50"}`}
                  onClick={() => step > s.num && setStep(s.num)}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all ${
                      step > s.num
                        ? "bg-[#10B981] text-white"
                        : step === s.num
                        ? "bg-[#1A3A5C] text-white"
                        : "bg-[#E8E2D9] text-[#8B9099]"
                    }`}
                  >
                    {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${step === s.num ? "text-[#1A3A5C]" : "text-[#8B9099]"}`}>
                    {getStepLabel(s)}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-colors ${step > s.num ? "bg-[#10B981]" : "bg-[#E8E2D9]"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Route & Date */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut", type: "tween" }}
                  className="bg-white rounded-2xl border border-[#E8E2D9] p-6 md:p-8 shadow-sm"
                >
                  <h2 className="text-[#1C1C1E] mb-6" style={{ fontWeight: 700, fontSize: "1.2rem" }}>
                    {t("booking_step1")}
                  </h2>
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      {/* From */}
                      <div>
                        <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">
                          <MapPin className="w-3.5 h-3.5 inline mr-1" />
                          {t("booking_from")} *
                        </label>
                        <select
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B] transition-all duration-200 hover:border-[#E8B84B]/40 cursor-pointer"
                        >
                          {CITIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      {/* To */}
                      <div>
                        <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">
                          <MapPin className="w-3.5 h-3.5 inline mr-1" />
                          {t("booking_to")} *
                        </label>
                        <select
                          value={to}
                          onChange={(e) => setTo(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B]"
                        >
                          {CITIES.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      {/* Check-in Date */}
                      <div>
                        <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">
                          <Calendar className="w-3.5 h-3.5 inline mr-1" />
                          Kirish sanasi *
                        </label>
                        <input
                          type="date"
                          value={checkInDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B]"
                        />
                      </div>
                      {/* Check-out date */}
                      <div>
                        <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">
                          <Calendar className="w-3.5 h-3.5 inline mr-1" />
                          Chiqish sanasi
                        </label>
                        <input
                          type="date"
                          value={checkOutDate}
                          min={checkInDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B]"
                        />
                      </div>
                    </div>

                    {/* Duration (Davomiylik) */}
                    <div>
                      <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">
                        <Calendar className="w-3.5 h-3.5 inline mr-1" />
                        Davomiylik (kunlar) *
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setDuration(Math.max(1, duration - 1))}
                          className="w-10 h-10 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] flex items-center justify-center text-[#1C1C1E] hover:bg-[#E8B84B] hover:text-white hover:border-[#E8B84B] transition-all"
                        >
                          −
                        </button>
                        <span className="w-16 text-center text-[#1C1C1E] font-bold text-lg">{duration} kun</span>
                        <button
                          onClick={() => setDuration(Math.min(30, duration + 1))}
                          className="w-10 h-10 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] flex items-center justify-center text-[#1C1C1E] hover:bg-[#E8B84B] hover:text-white hover:border-[#E8B84B] transition-all"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Hotel Stars (Mehmonxona yulduzlari) */}
                    <div>
                      <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">
                        Mehmonxona yulduzlari
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setHotelStars(0)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            hotelStars === 0
                              ? "bg-[#1A3A5C] text-white"
                              : "bg-[#F5F3EF] text-[#1C1C1E] hover:bg-[#E8E2D9]"
                          }`}
                        >
                          Har qanday
                        </button>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setHotelStars(star)}
                            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                              hotelStars === star
                                ? "bg-[#E8B84B] text-white"
                                : "bg-[#F5F3EF] text-[#1C1C1E] hover:bg-[#E8E2D9]"
                            }`}
                          >
                            {star}★
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Passengers (Kattalar va Bolalar) */}
                    <div className="grid md:grid-cols-2 gap-5">
                      {/* Adults */}
                      <div>
                        <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">
                          <Users className="w-3.5 h-3.5 inline mr-1" />
                          Kattalar *
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setAdults(Math.max(1, adults - 1))}
                            className="w-10 h-10 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] flex items-center justify-center text-[#1C1C1E] hover:bg-[#E8E2D9] transition-colors"
                          >
                            −
                          </button>
                          <span className="w-10 text-center text-[#1C1C1E] font-bold text-lg">{adults}</span>
                          <button
                            onClick={() => setAdults(Math.min(20, adults + 1))}
                            className="w-10 h-10 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] flex items-center justify-center text-[#1C1C1E] hover:bg-[#E8E2D9] transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      {/* Children */}
                      <div>
                        <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">
                          <Users className="w-3.5 h-3.5 inline mr-1" />
                          Bolalar
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setChildren(Math.max(0, children - 1))}
                            className="w-10 h-10 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] flex items-center justify-center text-[#1C1C1E] hover:bg-[#E8E2D9] transition-colors"
                          >
                            −
                          </button>
                          <span className="w-10 text-center text-[#1C1C1E] font-bold text-lg">{children}</span>
                          <button
                            onClick={() => setChildren(Math.min(10, children + 1))}
                            className="w-10 h-10 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] flex items-center justify-center text-[#1C1C1E] hover:bg-[#E8E2D9] transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Transport */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, type: "tween" }}
                  className="bg-white rounded-2xl border border-[#E8E2D9] p-6 md:p-8"
                >
                  <h2 className="text-[#0F1F3D] mb-6" style={{ fontWeight: 700, fontSize: "1.2rem" }}>
                    {t("booking_step2")}
                  </h2>
                  <div className="space-y-3">
                    {TRANSPORT_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      const isSelected = selectedTransport === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => setSelectedTransport(option.id)}
                          className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                            isSelected
                              ? "border-[#1A3A5C] bg-[#1A3A5C]/5 shadow-sm"
                              : "border-[#E8E2D9] hover:border-[#1A3A5C]/30"
                          }`}
                        >
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: option.bg }}
                          >
                            <Icon className="w-6 h-6" style={{ color: option.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[#1A3A5C] font-semibold text-sm">{getTransportName(option)}</span>
                              {option.badge && (
                                <span
                                  className="px-2 py-0.5 rounded-md text-white text-xs font-medium"
                                  style={{ backgroundColor: option.color }}
                                >
                                  {option.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[#8B9099] text-xs">{option.desc}</p>
                            <p className="text-xs text-[#5A6478] mt-1">⏱ {option.duration}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-[#1A3A5C] font-bold">${option.price}</div>
                            <div className="text-[#8B9099] text-xs">/person</div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              isSelected ? "border-[#1A3A5C] bg-[#1A3A5C]" : "border-[#D1D5DB]"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Passenger details */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, type: "tween" }}
                  className="bg-white rounded-2xl border border-[#E8E2D9] p-6 md:p-8"
                >
                  <h2 className="text-[#0F1F3D] mb-2" style={{ fontWeight: 700, fontSize: "1.2rem" }}>
                    {t("booking_step3")}
                  </h2>
                  <p className="text-[#8B9099] text-sm mb-6">Asosiy yo'lovchi ma'lumotlarini kiriting. Bron: {adults} kattalar{children > 0 ? ` + ${children} bolalar` : ""}</p>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">
                        <User className="w-3.5 h-3.5 inline mr-1" />
                        To'liq ism *
                      </label>
                      <input
                        type="text"
                        required
                        value={passengerDetails[0].name}
                        onChange={(e) => setPassengerDetails([{ ...passengerDetails[0], name: e.target.value }])}
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B]"
                        placeholder="Ism Familiya"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">
                        <Mail className="w-3.5 h-3.5 inline mr-1" />
                        Email manzil *
                      </label>
                      <input
                        type="email"
                        required
                        value={passengerDetails[0].email}
                        onChange={(e) => setPassengerDetails([{ ...passengerDetails[0], email: e.target.value }])}
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B]"
                        placeholder="siz@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-2">
                        <Phone className="w-3.5 h-3.5 inline mr-1" />
                        Telefon raqam *
                      </label>
                      <input
                        type="tel"
                        required
                        value={passengerDetails[0].phone}
                        onChange={(e) => setPassengerDetails([{ ...passengerDetails[0], phone: e.target.value }])}
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1C1C1E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30 focus:border-[#E8B84B]"
                        placeholder="+998 90 123 45 67"
                      />
                    </div>

                    {totalPassengers > 1 && (
                      <div className="p-4 rounded-xl bg-[#1A3A5C]/5 border border-[#1A3A5C]/20 text-sm text-[#5A6478]">
                        <strong className="text-[#1A3A5C]">Eslatma:</strong> Siz {totalPassengers} kishi uchun bron qilyapsiz ({adults} kattalar{children > 0 ? ` + ${children} bolalar` : ""}). Qo'shimcha yo'lovchilar ma'lumotlari bron tasdiqlangandan keyin berilishi mumkin.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Confirm */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, type: "tween" }}
                  className="space-y-4"
                >
                  {/* Order summary */}
                  <div className="bg-white rounded-2xl border border-[#E8E2D9] p-6 md:p-8">
                    <h2 className="text-[#1A3A5C] mb-5" style={{ fontWeight: 700, fontSize: "1.2rem" }}>
                      {t("booking_step4")}
                    </h2>
                    <div className="space-y-3 mb-5">
                      {[
                        { label: "Marshrut", value: `${from} → ${to}` },
                        { label: "Kirish sanasi", value: checkInDate },
                        ...(checkOutDate ? [{ label: "Chiqish sanasi", value: checkOutDate }] : []),
                        { label: "Davomiylik", value: `${duration} kun` },
                        { label: "Mehmonxona", value: hotelStars === 0 ? "Har qanday" : `${hotelStars} yulduz` },
                        { label: "Transport", value: getTransportName(transport) },
                        { label: "Yo'lovchilar", value: `${adults} kattalar${children > 0 ? ` + ${children} bolalar` : ""}` },
                        { label: "Ism", value: passengerDetails[0].name || "—" },
                        { label: "Telefon", value: passengerDetails[0].phone || "—" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-[#F5F3EF] last:border-0">
                          <span className="text-sm text-[#8B9099]">{item.label}</span>
                          <span className="text-sm font-medium text-[#1A3A5C]">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#1A3A5C] text-white">
                      <span className="font-semibold">{t("booking_total")}</span>
                      <span className="text-2xl font-bold">${total}</span>
                    </div>

                    {/* Demo Payment System */}
                    <div className="mt-8 pt-8 border-t border-[#E8E2D9]">
                      <p className="text-lg font-bold text-[#1A3A5C] mb-5">To'lov usulini tanlang (Demo)</p>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setPaymentMethod("paycom")}
                          className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                            paymentMethod === "paycom"
                              ? "border-[#00B4CC] bg-[#00B4CC]/5"
                              : "border-[#E8E2D9] hover:border-[#E8E2D9]/80"
                          }`}
                        >
                          <div className="w-12 h-7 bg-gradient-to-r from-[#00B4CC] to-[#0095AA] rounded flex items-center justify-center text-white font-bold" style={{ fontSize: "0.55rem" }}>PAYME</div>
                          <span className="text-sm font-semibold text-[#1A3A5C]">Payme</span>
                        </button>
                        <button
                          onClick={() => setPaymentMethod("click")}
                          className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                            paymentMethod === "click"
                              ? "border-[#00A1FB] bg-[#00A1FB]/5"
                              : "border-[#E8E2D9] hover:border-[#E8E2D9]/80"
                          }`}
                        >
                          <div className="w-12 h-7 bg-gradient-to-r from-[#00A1FB] to-[#0082C9] rounded flex items-center justify-center text-white font-bold" style={{ fontSize: "0.55rem" }}>CLICK</div>
                          <span className="text-sm font-semibold text-[#1A3A5C]">Click</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Info block */}
                  <div className="bg-white rounded-2xl border border-[#E8E2D9] p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1A3A5C]/10 flex items-center justify-center flex-shrink-0">
                        <Send className="w-5 h-5 text-[#1A3A5C]" />
                      </div>
                      <div>
                        <p className="text-[#1A3A5C] font-semibold mb-1">Zayavka qanday ishlaydi?</p>
                        <ul className="text-sm text-[#5A6478] space-y-1">
                          <li>✅ Zayavka Telegram orqali operatorga yuboriladi</li>
                          <li>✅ Operator 15–30 daqiqa ichida siz bilan bog'lanadi</li>
                          <li>✅ To'lov operatör bilan kelishilgan holda amalga oshiriladi</li>
                        </ul>
                      </div>
                    </div>
                    {sendError && (
                      <p className="mt-3 text-sm text-red-500">{sendError}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E8E2D9] bg-white text-[#5A6478] text-sm font-medium hover:bg-[#F5F3EF] transition-colors ${step === 1 ? "opacity-50 pointer-events-none" : ""}`}
              >
                <ArrowLeft className="w-4 h-4" />
                {t("booking_back")}
              </button>

              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-medium hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
                  style={{ background: "linear-gradient(135deg, #1A3A5C, #243f6a)" }}
                >
                  {t("booking_next")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  {paymentMethod === "click" && !clickPaid ? (
                    <>
                      <button
                        onClick={() => handleConfirm(false, "click")}
                        disabled={sending}
                        className="px-6 py-2.5 rounded-xl border border-[#E8E2D9] text-[#5A6478] text-sm font-medium hover:bg-[#F5F3EF] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {sending ? "..." : "To'lovsiz yuborish"}
                      </button>
                      <a
                        href="https://indoor.click.uz/pay?id=0101068&t=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00A1FB] to-[#0082C9] text-white text-sm font-medium hover:shadow-lg transition-all cursor-pointer inline-flex"
                      >
                        Click orqali to'lov
                      </a>
                      <button
                        onClick={() => setClickPaid(true)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white text-sm font-medium hover:shadow-lg transition-all"
                      >
                        <Check className="w-4 h-4" />
                        To'lovni tasdiqlayman
                      </button>
                    </>
                  ) : paymentMethod === "paycom" && !paycomPaid ? (
                    <>
                      <button
                        onClick={() => handleConfirm(false, "paycom")}
                        disabled={sending}
                        className="px-6 py-2.5 rounded-xl border border-[#E8E2D9] text-[#5A6478] text-sm font-medium hover:bg-[#F5F3EF] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {sending ? "..." : "To'lovsiz yuborish"}
                      </button>
                      <a
                        href="https://transfer.paycom.uz/69dc9d6fbbf621e93229aaef"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00B4CC] to-[#0095AA] text-white text-sm font-medium hover:shadow-lg transition-all cursor-pointer inline-flex"
                      >
                        Payme orqali to'lov
                      </a>
                      <button
                        onClick={() => setPaycomPaid(true)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white text-sm font-medium hover:shadow-lg transition-all"
                      >
                        <Check className="w-4 h-4" />
                        To'lovni tasdiqlayman
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleConfirm(
                        (paymentMethod === "click" && clickPaid) || (paymentMethod === "paycom" && paycomPaid),
                        paymentMethod
                      )}
                      disabled={sending}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white text-sm font-medium hover:shadow-lg hover:scale-[1.01] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {sending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      {sending ? "Yuborilmoqda..." : "Zayavka yuborish"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-sm">
              <div className="p-5 text-white" style={{ background: "linear-gradient(135deg, #1A3A5C, #243f6a)" }}>
                <p className="text-white/60 text-xs uppercase tracking-wider mb-3">{t("booking_summary")}</p>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-[#E8B84B]" />
                  <span className="font-semibold text-sm">{from} → {to}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70 text-sm">
                  <Calendar className="w-3.5 h-3.5" />
                  {checkInDate}
                </div>
              </div>
              <div className="p-5 space-y-3">
                <SummaryRow label="Davomiylik" value={`${duration} kun`} />
                <SummaryRow label="Mehmonxona" value={hotelStars === 0 ? "Har qanday" : `${hotelStars}★`} />
                <SummaryRow label="Transport" value={getTransportName(transport)} />
                <SummaryRow label="Yo'lovchilar" value={`${adults} + ${children}`} />
                <div className="pt-3 border-t border-[#E8E2D9]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1A3A5C]">{t("booking_total")}</span>
                    <span className="text-xl font-bold text-[#1A3A5C]">${total}</span>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="px-5 pb-5 space-y-2">
                {[
                  "Free cancellation 24h before",
                  "Instant e-ticket",
                  "24/7 support",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#5A6478]">
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-[#8B9099]">{label}</span>
      <span className="text-[#1A3A5C] font-medium">{value}</span>
    </div>
  );
}