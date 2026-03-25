import { motion, useAnimation } from "framer-motion";
import { getLocalizedField } from "../utils/getLocalizedField";
import { useLanguage } from "../context/LanguageContext";
import { useEffect } from "react";

export default function ImpactStats({ data }) {
  const { language } = useLanguage();
  if (!data) return null;

  const impactImages = Object.keys(data)
    .filter((key) => {
      if (language === "en")
        return key.startsWith("impact_image_") && !key.endsWith("_ar");
      if (language === "ar")
        return key.startsWith("impact_image_") && key.endsWith("_ar");
      return false;
    })
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || 0);
      const numB = parseInt(b.match(/\d+/)?.[0] || 0);
      return numA - numB;
    })
    .map((key) => data[key])
    .filter(Boolean);

  if (!impactImages.length) return null;

  // Card float animation keyframes
  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -8, 0, 5, 0],
      transition: {
        repeat: Infinity,
        duration: 6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      style={{
        backgroundImage: `url(${data?.background_image_benifit})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="py-12 md:py-16 bg-[#EFE4D2] select-none"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="text-4xl md:text-5xl font-bold mb-3 text-[#486179]">
            {getLocalizedField(data, `impact_heading`, language)}
          </div>
          <div className="text-gray-700 font-medium text-[16px] max-w-xl mx-auto">
            {getLocalizedField(data, `impact_subheading`, language)}
          </div>
        </motion.div>

        {/* Animated Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {impactImages.map((img, index) => (
            <motion.div
              key={index}
              variants={floatVariants}
              initial="initial"
              animate="animate"
              whileHover={{ scale: 1.08, y: -6 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative rounded-2xl overflow-hidden h-full w-full md:h-44 md:w-44 lg:h-64 lg:w-64 border-2 border-white shadow-md hover:shadow-xl cursor-pointer"
            >
              {/* Image */}
              <img
                src={img}
                alt={`Impact ${index + 1}`}
                className=" bg-white/30   object-contain object-center transition-all duration-300"
              />

              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}