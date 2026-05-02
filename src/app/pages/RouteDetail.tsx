import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Users, Star, Check, X, MapPin, Calendar, ArrowRight, Shield, Zap } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const SAMARKAND_IMG = "https://images.unsplash.com/photo-1715540335594-2ad77795ba09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW1hcmthbmQlMjBSZWdpc3RhbiUyMGFyY2hpdGVjdHVyZSUyMFV6YmVraXN0YW58ZW58MXx8fHwxNzc1NDY5Nzc2fDA&ixlib=rb-4.1.0&q=80&w=1200";
const BUKHARA_IMG = "https://images.unsplash.com/photo-1774810306527-bd6e74d36e34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCdWtoYXJhJTIwbW9zcXVlJTIwaGlzdG9yaWMlMjBVemJla2lzdGFufGVufDF8fHx8MTc3NTQ2OTc3N3ww&ixlib=rb-4.1.0&q=80&w=1200";
const KHIVA_IMG = "https://images.unsplash.com/photo-1549111998-f924f13e46ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLaGl2YSUyMGFuY2llbnQlMjBjaXR5JTIwZGVzZXJ0JTIwVXpiZWtpc3RhbnxlbnwxfHx8fDE3NTQ2OTc3N3ww&ixlib=rb-4.1.0&q=80&w=1200";
const TASHKENT_IMG = "https://images.unsplash.com/photo-1681195579718-e738abcaa178?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUYXNoa2VudCUyMGNpdHklMjBtb2Rlcm4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzc1NDY5Nzc4fDA&ixlib=rb-4.1.0&q=80&w=1200";

const routeData: Record<string, {
  title: string;
  from: string;
  to: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  groupSize: string;
  comfort: string;
  description: string;
  highlights: string[];
  itinerary: { time: string; title: string; desc: string }[];
  included: string[];
  excluded: string[];
  transports: { name: string; price: number; duration: string }[];
}> = {
  "tashkent-samarkand": {
    title: "Tashkent → Samarkand",
    from: "Tashkent",
    to: "Samarkand",
    image: SAMARKAND_IMG,
    price: 25,
    duration: "2h 10m",
    rating: 4.9,
    reviews: 2840,
    groupSize: "1–50 pax",
    comfort: "Premium",
    description: "Travel from Uzbekistan's vibrant capital to the legendary city of Samarkand — home of Timur's empire, the Registan, and some of the world's most stunning Islamic architecture. Choose from the Afrosiyob high-speed train, a premium express bus, or a private door-to-door transfer.",
    highlights: [
      "Journey to the ancient Silk Road city of Samarkand",
      "Multiple daily departures (train + bus + private)",
      "Afrosiyob high-speed train option (2h 10m)",
      "Premium bus with AC, Wi-Fi and USB charging",
      "Free cancellation up to 24h before departure",
    ],
    itinerary: [
      { time: "07:00", title: "Tashkent Departure", desc: "Board at Tashkent Central Station or selected bus terminal. Check-in opens 30 minutes prior." },
      { time: "09:10", title: "Arrival in Samarkand", desc: "Arrive at Samarkand Station. Transfer to city center available (optional add-on)." },
      { time: "09:30+", title: "Begin Exploration", desc: "Visit the Registan, Shah-i-Zinda, Gur-e-Amir, and the Bibi-Khanym Mosque." },
    ],
    included: [
      "Seat reservation",
      "Luggage allowance (20kg + 5kg carry-on)",
      "Onboard snack (premium ticket)",
      "24/7 customer support",
      "E-ticket confirmation",
    ],
    excluded: [
      "City hotel transfers",
      "Tour guide services",
      "Entrance fees to monuments",
      "Travel insurance",
    ],
    transports: [
      { name: "Afrosiyob Express Train", price: 25, duration: "2h 10m" },
      { name: "Premium Bus", price: 18, duration: "3h 30m" },
      { name: "Private Transfer", price: 75, duration: "3h 00m" },
    ],
  },
  "samarkand-tashkent": {
    title: "Samarkand → Tashkent",
    from: "Samarkand",
    to: "Tashkent",
    image: TASHKENT_IMG,
    price: 18,
    duration: "3h 30m",
    rating: 4.8,
    reviews: 1950,
    groupSize: "1–50 pax",
    comfort: "Premium",
    description: "Return journey from the historic city of Samarkand back to Tashkent's modern airport or city center. Premium bus and train options available throughout the day. Book a return trip and save 10%.",
    highlights: [
      "Multiple daily bus + train departures",
      "Direct connection to Tashkent International Airport",
      "Flexible return booking with date-change option",
      "Premium air-conditioned coaches",
      "10% discount when booking round-trip",
    ],
    itinerary: [
      { time: "Various", title: "Samarkand Departure", desc: "Buses depart every 2 hours from 06:00 to 18:00 from Samarkand Bus Terminal." },
      { time: "+3h 30m", title: "Tashkent Arrival", desc: "Arrive at Tashkent Bus Terminal. Taxi and metro connections available." },
    ],
    included: [
      "Seat reservation",
      "Luggage allowance",
      "E-ticket confirmation",
      "24/7 customer support",
    ],
    excluded: [
      "Airport transfer",
      "Meals and beverages",
      "Travel insurance",
    ],
    transports: [
      { name: "Premium Bus", price: 18, duration: "3h 30m" },
      { name: "Shared Minivan", price: 12, duration: "3h 00m" },
      { name: "Private Transfer", price: 70, duration: "2h 45m" },
    ],
  },
  "samarkand-bukhara": {
    title: "Samarkand → Bukhara",
    from: "Samarkand",
    to: "Bukhara",
    image: BUKHARA_IMG,
    price: 22,
    duration: "4h 00m",
    rating: 4.9,
    reviews: 1340,
    groupSize: "1–30 pax",
    comfort: "Premium",
    description: "Continue your Silk Road journey from Samarkand to the magical city of Bukhara — one of Central Asia's best-preserved ancient cities. Walk through 2,500 years of history, from the Ark Fortress to the Kalon Minaret.",
    highlights: [
      "Journey between two UNESCO World Heritage cities",
      "Comfortable premium coaches",
      "Scenic route through the Zeravshan Valley",
      "Optional guided tour add-on available",
      "Combine with Khiva for the full Silk Road experience",
    ],
    itinerary: [
      { time: "08:00", title: "Samarkand Departure", desc: "Board at Samarkand Bus Terminal. The scenic route passes through green valleys and open steppe." },
      { time: "12:00", title: "Bukhara Arrival", desc: "Arrive in Bukhara city center, close to the historic old town." },
      { time: "Afternoon", title: "Explore Bukhara", desc: "Visit the Kalon Mosque, Ark Fortress, and the stunning Poi Kalon ensemble." },
    ],
    included: [
      "Seat reservation",
      "Luggage allowance",
      "Complimentary water",
      "E-ticket",
      "24/7 support",
    ],
    excluded: [
      "Hotel accommodation",
      "Guided tours",
      "Entrance fees",
      "Travel insurance",
    ],
    transports: [
      { name: "Premium Bus", price: 22, duration: "4h 00m" },
      { name: "Private Transfer", price: 90, duration: "3h 30m" },
      { name: "Shared Minivan", price: 15, duration: "4h 30m" },
    ],
  },
  "silk-road-grand": {
    title: "Silk Road Grand Tour",
    from: "Tashkent",
    to: "Samarkand → Bukhara → Khiva",
    image: KHIVA_IMG,
    price: 380,
    duration: "7 Days",
    rating: 5.0,
    reviews: 620,
    groupSize: "2–16 pax",
    comfort: "Luxury",
    description: "The ultimate Uzbekistan experience. Travel across the entire Silk Road — from Tashkent to Samarkand, Bukhara, and Khiva. A fully guided, all-inclusive 7-day journey with handpicked boutique hotels, expert local guide, and all private transfers.",
    highlights: [
      "Full 7-day immersive Silk Road tour",
      "Expert English/Russian speaking guide",
      "All transfers in private AC vehicles",
      "4-star boutique hotel accommodation",
      "All breakfasts + 3 signature dinners included",
      "Private entrance at Registan after hours",
      "Small group (max 16 people)",
    ],
    itinerary: [
      { time: "Day 1", title: "Tashkent", desc: "Arrive in Tashkent. Tour of Chorsu Bazaar, Khast Imam, and Old City. Welcome dinner." },
      { time: "Day 2", title: "Tashkent → Samarkand", desc: "Afrosiyob train to Samarkand. Registan, Bibi-Khanym, Shah-i-Zinda. Sunset at the Registan." },
      { time: "Day 3", title: "Samarkand", desc: "Ulugbek Observatory, Afrosiyab Museum, Siab Bazaar. Optional silk-making workshop." },
      { time: "Day 4", title: "Samarkand → Bukhara", desc: "Scenic drive to Bukhara. Kalon Minaret, Ark Fortress, Chor Minor. Lyab-i Hauz evening." },
      { time: "Day 5", title: "Bukhara", desc: "Full day in Bukhara old town. Trading domes, Bolo-Hauz Mosque. Traditional dinner." },
      { time: "Day 6", title: "Bukhara → Khiva", desc: "Drive across the Kyzylkum Desert to ancient Khiva. Ichan Kala city-museum tour." },
      { time: "Day 7", title: "Khiva → Tashkent", desc: "Morning in Khiva. Flight or drive back to Tashkent. Farewell lunch." },
    ],
    included: [
      "7 nights in 4-star boutique hotels",
      "All breakfasts + 3 gala dinners",
      "Private AC transport throughout",
      "Professional licensed guide",
      "All entrance fees",
      "Afrosiyob train tickets",
      "24/7 on-trip support",
    ],
    excluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
      "Optional activities",
      "Lunches (except Day 7)",
    ],
    transports: [
      { name: "7-Day All-Inclusive Package", price: 380, duration: "7 Days" },
      { name: "5-Day Express Package", price: 290, duration: "5 Days" },
    ],
  },
};

export function RouteDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const route = routeData[id || "tashkent-samarkand"] || routeData["tashkent-samarkand"];

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* Hero */}
      <div className="relative h-[45vh] md:h-[60vh] overflow-hidden">
        <img
          src={route.image}
          alt={route.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A5C]/80 via-[#1A3A5C]/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-7xl mx-auto">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-all duration-200 hover:gap-3"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Home
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#E8B84B] text-white text-xs font-semibold">
                {route.duration}
              </span>
              <span className="flex items-center gap-1 text-white text-sm">
                <Star className="w-4 h-4 fill-[#E8B84B] text-[#E8B84B]" />
                {route.rating} ({route.reviews} reviews)
              </span>
            </div>
            <h1 className="text-white mb-2" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 700 }}>
              {route.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Clock, label: t("detail_duration"), value: route.duration },
                { icon: Users, label: t("detail_group"), value: route.groupSize },
                { icon: Shield, label: t("detail_difficulty"), value: route.comfort },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-[#E8E2D9] text-center">
                    <Icon className="w-5 h-5 text-[#1A3A5C] mx-auto mb-2" />
                    <p className="text-xs text-[#8B9099] mb-1">{stat.label}</p>
                    <p className="text-[#1A3A5C] text-sm font-semibold">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* YouTube Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-6 border border-[#E8E2D9] hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-[#1A3A5C] mb-4" style={{ fontWeight: 700, fontSize: "1.25rem" }}>
                Samarqand Video
              </h2>
              <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/dOB1QvGqOAM"
                  title="Samarqand Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </motion.div>

            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9]">
              <h2 className="text-[#1A3A5C] mb-4" style={{ fontWeight: 700, fontSize: "1.25rem" }}>
                {t("detail_overview")}
              </h2>
              <p className="text-[#5A6478] leading-relaxed text-sm mb-5">{route.description}</p>
              <ul className="space-y-2">
                {route.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#5A6478]">
                    <Check className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9]">
              <h2 className="text-[#1A3A5C] mb-6" style={{ fontWeight: 700, fontSize: "1.25rem" }}>
                {t("detail_itinerary")}
              </h2>
              <div className="relative">
                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-[#E8E2D9]" />
                <div className="space-y-6">
                  {route.itinerary.map((step, i) => (
                    <div key={i} className="flex gap-4 relative">
                      <div className="w-10 h-10 rounded-xl bg-[#1A3A5C]/10 border-2 border-[#1A3A5C]/20 flex items-center justify-center flex-shrink-0 relative z-10">
                        <MapPin className="w-4 h-4 text-[#1A3A5C]" />
                      </div>
                      <div className="pt-1.5">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[#E8B84B] bg-[#E8B84B]/10 px-2 py-0.5 rounded-lg">
                            {step.time}
                          </span>
                          <span className="text-[#1A3A5C] text-sm font-semibold">{step.title}</span>
                        </div>
                        <p className="text-[#8B9099] text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Included / Excluded */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9]">
                <h2 className="text-[#1A3A5C] mb-4 flex items-center gap-2" style={{ fontWeight: 700, fontSize: "1rem" }}>
                  <span className="w-6 h-6 rounded-full bg-[#10B981]/15 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  </span>
                  {t("detail_includes")}
                </h2>
                <ul className="space-y-2">
                  {route.included.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-[#5A6478]">
                      <Check className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-[#E8E2D9]">
                <h2 className="text-[#1A3A5C] mb-4 flex items-center gap-2" style={{ fontWeight: 700, fontSize: "1rem" }}>
                  <span className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                    <X className="w-3.5 h-3.5 text-red-400" />
                  </span>
                  {t("detail_excludes")}
                </h2>
                <ul className="space-y-2">
                  {route.excluded.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-[#5A6478]">
                      <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price card */}
              <div className="bg-white rounded-2xl border border-[#E8E2D9] shadow-lg overflow-hidden">
                <div className="bg-gradient-to-br from-[#1A3A5C] to-[#243f6a] p-5 text-white">
                  <p className="text-white/60 text-sm mb-1">Starting from</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold">${route.price}</span>
                    <span className="text-white/60 text-sm mb-1">/person</span>
                  </div>
                </div>
                <div className="p-5">
                  {/* Transport options */}
                  <p className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider mb-3">
                    Available Options
                  </p>
                  <div className="space-y-2 mb-5">
                    {route.transports.map((tr, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-3 rounded-xl border ${
                          i === 0 ? "border-[#E8B84B] bg-[#E8B84B]/5" : "border-[#E8E2D9]"
                        }`}
                      >
                        <div>
                          <p className="text-[#1A3A5C] text-sm font-medium">{tr.name}</p>
                          <p className="text-[#8B9099] text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {tr.duration}
                          </p>
                        </div>
                        <span className="text-[#1A3A5C] font-bold text-sm">${tr.price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Date picker */}
                  <div className="mb-4">
                    <label className="text-xs font-semibold text-[#5A6478] uppercase tracking-wider block mb-2">
                      Travel Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B9099]" />
                      <input
                        type="date"
                        defaultValue={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F3EF] border border-[#E8E2D9] text-[#1A3A5C] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8B84B]/30"
                      />
                    </div>
                  </div>

                  <Link
                    to="/booking"
                    className="group w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#1A3A5C] to-[#243f6a] text-white font-medium hover:shadow-xl hover:shadow-[#1A3A5C]/30 hover:scale-[1.02] hover:gap-3 transition-all duration-300 active:scale-95"
                  >
                    {t("detail_book")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

              {/* Guarantees */}
              <div className="bg-[#F5F3EF] rounded-2xl p-5 border border-[#E8E2D9]">
                {[
                  { icon: Shield, text: "Free cancellation 24h before" },
                  { icon: Zap, text: "Instant e-ticket confirmation" },
                  { icon: Users, text: "Dedicated support team" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className={`flex items-center gap-3 text-sm text-[#5A6478] ${i > 0 ? "mt-3 pt-3 border-t border-[#E8E2D9]" : ""}`}>
                      <Icon className="w-4 h-4 text-[#E8B84B] flex-shrink-0" />
                      {item.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}