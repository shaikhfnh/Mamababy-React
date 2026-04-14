import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState, useRef, useEffect, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedField } from "../utils/getLocalizedField";

function CategoriesSection({ data }) {
  
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  /* -------------------- Safe Localized Categories -------------------- */
  const localizedCategories = useMemo(() => {
    const rawList = data?.categories_list;

    if (!rawList || !Array.isArray(rawList) || rawList.length === 0) {
      return [];
    }

    return rawList.map((item, index) => ({
      id: item.id || `cat-${index}`,
      image: item.image || "https://via.placeholder.com/300x300?text=No+Image",
      title: getLocalizedField(item, "title", language) || item.title || "Untitled",
      desc: getLocalizedField(item, "description", language) || item.description || "",
    }));
  }, [data?.categories_list, language]);

  const active = localizedCategories[activeIndex] || localizedCategories[0];

  /* Reset active index when language changes */
  useEffect(() => {
    setActiveIndex(0);
  }, [language]);

  /* Scroll Animations */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  // Fallback UI if no data
  if (localizedCategories.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-[#0E2A4A] via-[#1D4C84] to-[#122F57] text-white text-center">
        <p className="text-xl text-white/70">No categories available</p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      dir={language === "ar" ? "rtl" : "ltr"}
      className="relative py-12 md:py-16 bg-gradient-to-br from-[#0E2A4A] via-[#1D4C84] to-[#122F57] text-white overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-[#9ca8b3] mb-14 text-center"
        >
          {getLocalizedField(data, "categories_heading", language) || "Our Categories"}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-[1.2fr_1fr] gap-16 items-center"
        >
          
          {/* LEFT SIDE - Image + Text */}
          <div className="relative text-center grid place-items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: language === "ar" ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: language === "ar" ? -30 : 30 }}
                transition={{ duration: 0.45 }}
                style={{ y: imageY, scale: imageScale }}
              >
                <motion.img
                  src={active?.image}
                  alt={active?.title || ""}
                  className="rounded-full shadow-2xl max-h-[300px] w-[300px] object-cover mx-auto"
                  whileHover={{ rotate: language === "ar" ? 4 : -4 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex + "-text"}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="mt-6 max-w-md"
              >
                <div className="text-2xl uppercase font-bold mb-3">
                  {active?.title}
                </div>
                <div className="text-white/80 leading-relaxed">
                  {active?.desc}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE - Buttons */}
          <div className="grid grid-cols-3 gap-5">
            {localizedCategories.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  className={`relative flex flex-col items-center p-3 justify-center h-[6rem] rounded-2xl transition-all duration-300 cursor-pointer
                    ${isActive 
                      ? "bg-white text-[#1f4f84] shadow-xl scale-105" 
                      : "bg-white/10 hover:bg-white/20"}`}
                >
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 mb-3 object-contain"
                    animate={{ y: isActive ? -6 : 0, scale: isActive ? 1.2 : 1 }}
                    whileHover={{ rotate: language === "ar" ? 6 : -6 }}
                  />

                  <span className="md:text-[13px] text-[11px] md:font-semibold text-center leading-tight">
                    {item.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Background Glow */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none"
        style={{ y: imageY }}
      />
    </section>
  );
}

// Important: Export at the bottom like this
export default CategoriesSection;