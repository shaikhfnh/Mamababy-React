import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedField } from "../utils/getLocalizedField";

export default function LatestNewsSlider({ data }) {
  const { language } = useLanguage();
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // ✅ SAFE BUILD USING useMemo
  const newsItems = useMemo(() => {
    if (!data) return [];

    const items = [];
    let i = 1;

    while (data?.[`news_${i}`]) {
      items.push({
        id: i,
        title: getLocalizedField(data, `news_${i}`, language),
        description: getLocalizedField(data, `news_description_${i}`, language),
        image: data?.[`news_image_${i}`] || "",
      });
      i++;
    }

    return items;
  }, [data, language]);

  // ✅ Prevent index overflow when data changes
  useEffect(() => {
    if (index >= newsItems.length) {
      setIndex(0);
    }
  }, [newsItems.length]);

  const nextSlide = () => {
    if (!newsItems.length) return;
    setIndex((prev) => (prev + 1) % newsItems.length);
  };

  const prevSlide = () => {
    if (!newsItems.length) return;
    setIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  // ✅ Auto-slide safe
  useEffect(() => {
    if (isHovered || newsItems.length === 0) return;

    intervalRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalRef.current);
  }, [isHovered, newsItems.length]);

  // ✅ If no data yet — render nothing
  if (!data || newsItems.length === 0) return null;

  const currentItem = newsItems[index];

  return (
    <section className="w-full bg-[#e8dfd6] py-12 md:py-16 px-4 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-4xl md:text-5xl font-semibold text-[#486179] mb-14"
        >
          {getLocalizedField(data, "news_section_heading", language)}
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative h-[420px] md:h-[520px] rounded-3xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="w-full h-full relative group cursor-pointer">
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="w-full h-full object-cover transition-transform duration-[7000ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />
                  <div className="absolute bottom-10 left-8 right-8 md:left-16 md:right-16">
                    <div className="text-white text-2xl md:text-4xl font-semibold leading-snug max-w-3xl">
                      {currentItem.title}
                    </div>
                    <div className="text-white/80 mt-4 text-sm md:text-base max-w-2xl">
                      {currentItem.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-0 md:left-6 bg-white/70 backdrop-blur-md hover:bg-white text-black md:w-11 md:h-11 w-8 h-8 rounded-full flex items-center justify-center shadow-xl transition"
          >
            <GrPrevious />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-0 md:right-6 bg-white/70 backdrop-blur-md hover:bg-white text-black md:w-11 md:h-11 w-8 h-8 rounded-full flex items-center justify-center shadow-xl transition"
          >
            <GrNext />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 gap-3">
            {newsItems.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  i === index ? "w-10 bg-black" : "w-3 bg-gray-500/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}