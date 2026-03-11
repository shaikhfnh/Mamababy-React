import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaBullhorn,
  FaEnvelope,
  FaUsers,
  FaStar,
  FaQuestionCircle, // fallback icon
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedField } from "../utils/getLocalizedField";

// Map of allowed icons
const iconsMap = {
  FaInstagram,
  FaBullhorn,
  FaEnvelope,
  FaUsers,
  FaStar,
};

export default function FloatingMarketingEcosystem({ data }) {
  const { language } = useLanguage();

  if (!data) return null;

  // Split ACF icons list and preserve order
  const iconsList = data.marketing_icons
    ? data.marketing_icons.split(",").map((i) => i.trim())
    : [];

  // Build marketing items respecting the exact order of iconsList
  const marketingItems = iconsList.map((iconName, index) => {
    const titleKey = `marketing_heading_${index + 1}`;
    const subtitleKey = `marketing_subheading_${index + 1}`;

    // Map iconName to pre-imported React icon, fallback if missing
    const Icon = iconsMap[iconName] || FaQuestionCircle;

    return {
      icon: Icon,
      title: getLocalizedField(data, titleKey, language),
      subtitle: getLocalizedField(data, subtitleKey, language),
    };
  });

  // Random floating offsets for animation
  const randomOffsets = useMemo(() => {
    return marketingItems.map(() => ({
      x: [0, Math.random() * 15 - 7, Math.random() * 15 - 7, 0, 0],
      y: [0, Math.random() * 15 - 7, 0, Math.random() * 15 - 7, 0],
      rotate: [0, Math.random() * 6 - 3, 0, Math.random() * 6 - 5, 0],
    }));
  }, [marketingItems.length]);

  const floating = (index) => ({
    animate: {
      x: randomOffsets[index].x,
      y: randomOffsets[index].y,
      rotate: randomOffsets[index].rotate,
      transition: { repeat: Infinity, duration: 5 + index, ease: "easeInOut" },
    },
  });

  return (
    <section className="relative py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold mb-20 select-none text-[#1D4C84]"
        >
          {getLocalizedField(data, "marketing_heading", language)}
        </motion.div>

        {/* Floating Cards Grid */}
        <div className="relative w-full flex flex-wrap justify-center gap-8 md:gap-12">
          {marketingItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                animate={floating(index).animate}
                whileHover={{ scale: 1.1, zIndex: 20 }}
                transition={{
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 120,
                }}
                className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-lg border border-gray-100 px-6 py-5 md:px-8 md:py-6 min-w-[140px] md:min-w-[160px] cursor-pointer"
              >
                <div className="text-[#EB6577] text-3xl md:text-4xl mb-2">
                  <Icon />
                </div>
                <div className="text-[#1D4C84] font-semibold text-sm md:text-base text-center">
                  {item.title}
                </div>
                <div className="text-gray-500 text-xs md:text-sm text-center mt-1">
                  {item.subtitle}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Background floating blobs */}
      <motion.div
        animate={{ x: ["0%", "25%", "-15%", "0%"], y: ["0%", "15%", "-10%", "0%"] }}
        transition={{ repeat: Infinity, duration: 50, ease: "easeInOut" }}
        className="absolute w-72 h-72 bg-[#EB6577]/10 rounded-full top-10 left-10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ x: ["0%", "-15%", "10%", "0%"], y: ["0%", "-15%", "10%", "0%"] }}
        transition={{ repeat: Infinity, duration: 60, ease: "easeInOut" }}
        className="absolute w-60 h-60 bg-[#1D4C84]/10 rounded-full bottom-20 right-20 blur-2xl pointer-events-none"
      />
    </section>
  );
}