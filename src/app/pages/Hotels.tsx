import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Star, MapPin, Phone, Mail, Wifi, Coffee, Utensils, Car, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// Samarkand hotel images
import samarkand1 from "../../imports/photo_2026-04-12_19-26-14.jpg";
import samarkand2 from "../../imports/photo_2026-04-12_19-26-15.jpg";
import samarkand3 from "../../imports/photo_2026-04-12_19-26-16.jpg";
import samarkand4 from "../../imports/photo_2026-04-12_19-26-17.jpg";
import samarkand5 from "../../imports/photo_2026-04-12_19-26-18_(2).jpg";
import samarkand6 from "../../imports/photo_2026-04-12_19-26-18.jpg";
import samarkand7 from "../../imports/photo_2026-04-12_19-26-19.jpg";

function HotelCard({ hotel, index, lang }: { hotel: any; index: number; lang: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
  };

  const amenityIcons: Record<string, any> = {
    WiFi: Wifi,
    Breakfast: Coffee,
    Restaurant: Utensils,
    Parking: Car,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Carousel */}
      <div className="relative h-56 overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={hotel.images[currentImageIndex]}
            alt={`${hotel.name} - ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        {hotel.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 text-[#0F1F3D]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white shadow-lg"
            >
              <ChevronRight className="w-4 h-4 text-[#0F1F3D]" />
            </button>
          </>
        )}

        {/* Dots */}
        {hotel.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {hotel.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex
                    ? "bg-white w-6"
                    : "bg-white/50 w-1.5 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
          <Star className="w-4 h-4 fill-[#E8B84B] text-[#E8B84B]" />
          <span className="font-bold text-sm">{hotel.rating}</span>
          <span className="text-xs text-[#8B9099]">({hotel.reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-[#1A3A5C] font-bold text-lg mb-1">{hotel.name}</h3>
            <div className="flex items-center gap-1.5 text-[#8B9099] text-sm">
              <MapPin className="w-3.5 h-3.5" />
              {hotel.city}
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.map((amenity: string, idx: number) => {
            const Icon = amenityIcons[amenity];
            return (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F5F3EF] text-xs text-[#5A6478]"
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {amenity}
              </div>
            );
          })}
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D9]">
          <div>
            <span className="text-xs text-[#8B9099]">
              {lang === "ru" ? "От" : lang === "uz" ? "Dan" : "From"}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#1A3A5C]">${hotel.price}</span>
              <span className="text-sm text-[#8B9099]">
                {lang === "ru" ? "/ночь" : lang === "uz" ? "/kecha" : "/night"}
              </span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1A3A5C] to-[#243f6a] text-white text-sm font-medium hover:shadow-lg transition-all"
          >
            {lang === "ru" ? "Забронировать" : lang === "uz" ? "Bron qilish" : "Book Now"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export function Hotels() {
  const { t, lang } = useLanguage();

  const hotels = [
    {
      id: 1,
      name: "Elani",
      city: "Samarkand",
      rating: 4.8,
      reviews: 234,
      price: 50,
      images: [
        samarkand1,
        samarkand2,
        samarkand3,
        samarkand4,
        samarkand5,
        samarkand6,
        samarkand7,
      ],
      amenities: ["WiFi", "Breakfast", "Restaurant", "Parking"],
    },
    {
      id: 2,
      name: "Hotel Name",
      city: "Bukhara",
      rating: 4.9,
      reviews: 156,
      price: 65,
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      ],
      amenities: ["WiFi", "Breakfast", "Restaurant", "Parking"],
    },
    {
      id: 3,
      name: "Hotel Name",
      city: "Tashkent",
      rating: 4.7,
      reviews: 412,
      price: 80,
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
        "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
      ],
      amenities: ["WiFi", "Breakfast", "Restaurant", "Parking"],
    },
  ];

  const getTitle = () => {
    if (lang === "ru") return "Отели";
    if (lang === "uz") return "Mehmonxonalar";
    return "Hotels";
  };

  const getSubtitle = () => {
    if (lang === "ru") return "Комфортабельные отели в самых красивых городах Узбекистана";
    if (lang === "uz") return "O'zbekistonning eng go'zal shaharlaridagi qulay mehmonxonalar";
    return "Comfortable hotels in Uzbekistan's most beautiful cities";
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* Hero */}
      <div className="relative h-[40vh] overflow-hidden bg-gradient-to-br from-[#1A3A5C] to-[#243f6a]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12 max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {lang === "ru" ? "На главную" : lang === "uz" ? "Bosh sahifa" : "Back to Home"}
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-white mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}>
              {getTitle()}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              {getSubtitle()}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel, i) => (
            <HotelCard key={hotel.id} hotel={hotel} index={i} lang={lang} />
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-[#E8E2D9] shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#1A3A5C]/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-[#1A3A5C]" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-[#1A3A5C] mb-0.5">
                {lang === "ru" ? "Хотите больше вариантов?" : lang === "uz" ? "Ko'proq variantlar kerakmi?" : "Need more options?"}
              </p>
              <p className="text-xs text-[#8B9099]">
                {lang === "ru" ? "Свяжитесь с нами" : lang === "uz" ? "Biz bilan bog'laning" : "Contact us"}: <a href="tel:+998909753977" className="text-[#E8B84B] hover:underline">+998 90 975 39 77</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}