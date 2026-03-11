import { motion } from "framer-motion";
import { useLanguage } from "./context/LanguageContext";
import { getLocalizedField } from "./utils/getLocalizedField";
import { useEffect, useState } from "react";
import { getPageById } from "./api/wordpress";
import Navbar from "./components/Navbar";

const smoothEase = [0.22, 1, 0.36, 1];

export default function PreviousSponsors() {
  const { language } = useLanguage();
  const [data, setAcf] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const page = await getPageById();
        setAcf(page.acf);
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      } finally {
        setLoaded(true);
      }
    };
    fetchData();
  }, []);

  // Helper: get all image URLs with numeric suffix
  const getLogos = (prefix) => {
    if (!data) return [];
    return Object.keys(data)
      .filter((key) => key.startsWith(prefix + "_") && /\d+$/.test(key))
      .sort((a, b) => {
        const numA = parseInt(a.split("_").pop(), 10);
        const numB = parseInt(b.split("_").pop(), 10);
        return numA - numB;
      })
      .map((key) => data[key])
      .filter((val) => typeof val === "string" && val.length > 0);
  };

  const sponsorTiers = [
    {
      label: getLocalizedField(data, "main_sponsors", language) || "Main Sponsors",
      description: getLocalizedField(data, "main_sponsors_subheading", language) || "",
      logos: getLogos("main_sponsor"),
      gradient: "from-[#667eea] to-[#764ba2]",
    },
    {
      label: getLocalizedField(data, "strategic_sponsors", language) || "Strategic Sponsors",
      description: getLocalizedField(data, "strategic_sponsors_subheading", language) || "",
      logos: getLogos("strategic_sponsor"),
      gradient: "from-[#f093fb] to-[#f5576c]",
    },
    {
      label: getLocalizedField(data, "sponsors", language) || "Sponsors",
      description: getLocalizedField(data, "sponsors_subheading", language) || "",
      logos: getLogos("sponsors"),
      gradient: "from-[#4facfe] to-[#00f2fe]",
    },
    {
      label: getLocalizedField(data, "partners", language) || "Partners",
      description: getLocalizedField(data, "partners_subheading", language) || "",
      logos: getLogos("partners"),
      gradient: "from-[#43e97b] to-[#38f9d7]",
    },
  ];

  if (!loaded) {
    return (
      <section className="min-h-[500px] flex items-center justify-center bg-gray-50">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full shadow-lg"
        />
      </section>
    );
  }

    return (
      
        <section className="relative bg-white py-16 md:py-24 lg:py-32">
            <Navbar />
      {/* Clean subtle background - NO BLUR, NO OPACITY */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        className="absolute w-64 h-64 md:w-80 md:h-80 bg-gradient-to-r from-[#091C41]/10 to-blue-500/10 rounded-3xl top-20 left-10 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ repeat: Infinity, duration: 25, ease: "easeInOut", delay: 10 }}
        className="absolute w-48 h-48 md:w-60 md:h-60 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-2xl bottom-20 right-10 pointer-events-none"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean centered heading - NO OPACITY */}
        <motion.div
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.8, ease: smoothEase }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white shadow-sm border border-gray-100 rounded-xl text-xs uppercase tracking-[0.3em] font-semibold text-gray-700 mb-6">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#091C41] to-blue-600 rounded-full shadow-md" />
            {getLocalizedField(data, "expo_name", language) || "Previous Events"}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#091C41] mb-6">
            {getLocalizedField(data, "previous_sponsors_title", language) || "Previous Sponsors"}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed font-medium">
            {getLocalizedField(data, "previous_sponsors_subtitle", language) || "Trusted partners from past events"}
          </p>
        </motion.div>

        {/* Perfectly centered sponsor tiers */}
        <div className="space-y-20 md:space-y-24">
          {sponsorTiers.map((tier, tierIndex) => (
            tier.logos.length > 0 && (
              <motion.div
                key={tierIndex}
                initial={{ y: 40 }}
                whileInView={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: smoothEase,
                  delay: tierIndex * 0.12,
                }}
                viewport={{ once: true }}
                className="text-center"
              >
                {/* Tier title - perfectly centered */}
                <motion.div
                  initial={{ scale: 0.95 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-12"
                >
                  <div className="inline-flex items-center justify-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-[#091C41] rounded-full shadow-lg" />
                    <h3 className="text-2xl md:text-3xl font-bold text-[#091C41] tracking-tight">
                      {tier.label}
                    </h3>
                    <div className="w-3 h-3 bg-[#091C41] rounded-full shadow-lg" />
                  </div>
                  <p className="text-gray-600 text-base md:text-lg font-medium max-w-md mx-auto leading-relaxed">
                    {tier.description}
                  </p>
                </motion.div>

                {/* Perfectly centered logo grid - minimal padding, NO BLUR/OPACITY */}
                <div className="justify-items-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 md:gap-8 max-w-5xl mx-auto">
                  {tier.logos.map((logo, index) => (
                    <motion.div
                      key={`${tierIndex}-${index}`}
                      initial={{ y: 30, scale: 0.8 }}
                      whileInView={{ y: 0, scale: 1 }}
                      transition={{
                        duration: 0.7,
                        ease: smoothEase,
                        delay: tierIndex * 0.08 + index * 0.06,
                      }}
                      whileHover={{ 
                        y: -15, 
                        scale: 1.15,
                        boxShadow: "0 25px 50px rgba(9, 28, 65, 0.15)"
                      }}
                      className="group relative bg-white border-2 border-gray-100 hover:border-[#091C41] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden aspect-square flex items-center justify-center p-2 md:p-3"
                    >
                      {/* Clean tier accent - NO BLUR, sharp */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                      />
                      
                      {/* Crisp centered logo - minimal padding */}
                      <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <img
                          src={logo}
                          alt={`${tier.label} Logo`}
                          className="max-h-20 max-w-24 md:max-h-24 md:max-w-32 lg:max-h-32 lg:max-w-40 w-auto h-auto object-contain grayscale-0 hover:brightness-110 transition-all duration-500"
                          loading="lazy"
                        />
                      </div>

                      {/* Clean shine - NO OPACITY issues */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/20 to-transparent rounded-2xl"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
