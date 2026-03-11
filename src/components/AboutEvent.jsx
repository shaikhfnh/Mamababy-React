import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedField } from "../utils/getLocalizedField";

export default function AboutEvent({ data }) {
  const { language } = useLanguage();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 120, damping: 30 };

  const imageScale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 1.02]), springConfig);
  const imageX = useSpring(useTransform(scrollYProgress, [0, 0.5], [-40, 0]), springConfig);
  const imageOpacity = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, 1]), springConfig);

  const textY = useSpring(useTransform(scrollYProgress, [0.2, 0.6], [40, 0]), springConfig);
  const textOpacity = useSpring(useTransform(scrollYProgress, [0, 0.1], [0, 1]), springConfig);

  // 🔥 Dynamically build buttons
  const buttons = useMemo(() => {
    if (!data) return [];

    const btns = [];
    let i = 1;

    while (data[`about_button_${i}`]) { 
      btns.push({
        text: getLocalizedField(data, `about_button_${i}`, language),
        link: data[`about_button_link_${i}`] || "#",
      });
      i++;
    }

    return btns;
  }, [data, language]);

  // 🎨 Button Color Variants
  const colorVariants = [
    "bg-[#1D4B84] text-white",
    "bg-[#EB6577] text-white",
    "bg-[#CDF0B5] text-[#1D4B84]",
    "bg-[#486179] text-white",
  ];
  
  return (
    <section
      ref={sectionRef}
      className="relative  rounded-[3rem] overflow-hidden"
    >
      <div className="mx-auto bg-[#CDF0B5]/40 backdrop-blur-md md:rounded-[5rem] py-10 px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* TEXT SIDE */}
        <motion.div style={{ y: textY, opacity: textOpacity }}>

          <h2 className="text-3xl md:text-5xl font-semibold text-[#1D4B84] mb-6">
            {getLocalizedField(data, "about_heading", language)}
          </h2>

          <div
            className="text-[1rem] md:text-[1.05rem] text-[#1D4B84] leading-relaxed mb-8"
            dangerouslySetInnerHTML={{
              __html: getLocalizedField(data, "about_description", language),
            }}
          />

       {/* 🔥 Dynamic Buttons */}
<div
  className={`
    grid gap-4
    ${buttons.length === 1 ? "grid-cols-1" : ""}
    ${buttons.length === 2 ? "grid-cols-1 md:grid-cols-2" : ""}
    ${buttons.length >= 3 ? "grid-cols-1 md:grid-cols-3" : ""}
  `}
>
{buttons.slice(0, 3).map((btn, index) => {
  const isHashLink = btn.link?.startsWith("#");

  return (
    <motion.a
      key={index}
      href={btn.link || "#"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      onClick={(e) => {
        if (isHashLink) {
          e.preventDefault();
          const targetId = btn.link.replace("#", "");
          document
            .getElementById(targetId)
            ?.scrollIntoView({ behavior: "smooth" });
        }
      }}
      style={{textDecoration:'none'}}
  className={`
    react-button
    w-full text-center
    px-6 py-4
    rounded-full
    font-semibold
    text-sm md:text-base
    shadow-lg
    transition-all duration-300
    no-underline
    text-white hover:text-white visited:text-white
    ${colorVariants[index % colorVariants.length]}
  `}
>
  <span className="no-underline text-white">{btn.text}</span>
</motion.a>
  );
})}
</div>
        </motion.div>

        {/* IMAGE SIDE */}
        <motion.div
          style={{ x: imageX, scale: imageScale, opacity: imageOpacity }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={data?.about_image}
            alt="About Event"
            className="w-full h-auto md:h-[480px] object-cover rounded-3xl"
          />
        </motion.div>

      </div>
    </section>
  );
}