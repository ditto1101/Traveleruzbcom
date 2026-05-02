import { TransportOptions } from "../components/TransportOptions";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { Bus } from "lucide-react";

export function Transport() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#F5F3EF]">
      {/* Page Header */}
      <section className="relative bg-gradient-to-br from-[#1A3A5C] to-[#243f6a] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "tween" }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#E8B84B]/20 backdrop-blur-sm mb-6"
            >
              <Bus className="w-8 h-8 text-[#E8B84B]" />
            </motion.div>
            <h1 className="text-white mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}>
              {t("transport_title")}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Afrosiyob tezkor poyezdi, zamonaviy avtobuslar, shaxsiy transferlar yoki to'liq ekskursion paketlar - sizga qulay variantni tanlang.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Transport Options Section */}
      <TransportOptions />
    </main>
  );
}