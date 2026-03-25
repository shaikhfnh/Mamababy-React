import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedField } from "../utils/getLocalizedField";
import { useMemo, useState } from "react";

const ImageShimmer = () => <div className="w-full h-full bg-gray-200 animate-pulse rounded-2xl" />;

export default function RoleSelectionSection({ data }) {
  const { language } = useLanguage();

  const roles = useMemo(() => {
    if (!data || !data.involved_section_names) return [];

    const sectionNames = Array.isArray(data.involved_section_names)
      ? data.involved_section_names
      : data.involved_section_names.split(",").map((s) => s.trim()).filter(Boolean);

    return sectionNames.map((_, index) => {
      const i = index + 1;
      return {
        title: getLocalizedField(data, `involved_heading_${i}`, language) || "",
        subtitle: getLocalizedField(data, `involved_subheading_${i}`, language) || "",
        description: getLocalizedField(data, `involved_description_${i}`, language) || "",
        image: data[`involved_image_${i}`] || "",
        cta: getLocalizedField(data, `involved_button_${i}`, language) || "",
        link: getLocalizedField(data, `involved_link_${i}`, language) || "",
      };
    });
  }, [data, language]);

  const handleRedirect = (link) => link && (window.location.href = link);

  return (
    <section className="relative w-full bg-white py-12 md:py-16 select-none">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center md:mb-16 mb-12"
        >
          <div className="text-4xl md:text-5xl font-bold text-[#486179]">
            {getLocalizedField(data, "involved_heading", language)}
          </div>
          <div className="mt-5 mx-auto text-gray-700 font-medium text-[16px] leading-relaxed">
            {getLocalizedField(data, "involved_description", language)}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {roles.map((role, index) => {
            const [imgLoaded, setImgLoaded] = useState(false);

            return (
              <motion.div
                key={`${role.title}-${index}`}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                whileHover={{ y: -6, scale: 1.04, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
                viewport={{ once: true }}
                className="group relative bg-[#006767] backdrop-blur-md rounded-3xl overflow-hidden shadow-lg  transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-44 md:h-64 overflow-hidden rounded-t-3xl">
                  {!imgLoaded && <ImageShimmer />}
                  <motion.img
                    src={role.image}
                    alt={role.title}
                    onLoad={() => setImgLoaded(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
                      imgLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="text-xs uppercase tracking-[0.25em] text-white/80 mb-1">
                      {role.subtitle}
                    </div>
                    <div className="text-2xl md:text-3xl font-semibold">{role.title}</div>
                  </div>
                </div>

                {/* Text */}
                <div className="p-5 md:p-7">
                  <div className="text-white text-sm md:text-base leading-relaxed">{role.description}</div>
                  <motion.button
                    onClick={() => handleRedirect(role.link)}
                    whileHover={{ x: 6, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="mt-4 md:mt-5 text-[12px] md:text-lg cursor-pointer justify-center md:justify-start w-full inline-flex items-center gap-3 text-white font-semibold hover:text-zinc-100 transition"
                  >
                    {role.cta}
                    <span className="relative flex items-center justify-center w-6 h-6 pb-0.5 rounded-full bg-white/10 group-hover:bg-white/20 transition">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="15" y2="12"></line>
                        <polyline points="10 7 15 12 10 17"></polyline>
                      </svg>
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}