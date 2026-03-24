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

  return (
    <section className="relative w-full bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center md:mb-16 mb-12"
        >
          <div className="text-4xl md:text-5xl font-bold text-[#486179]">
            {getLocalizedField(data, "involved_heading", language)}
          </div>
          <div className="mt-5 text-gray-800 max-w-2xl mx-auto text-lg leading-relaxed">
            {getLocalizedField(data, "involved_description", language)}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {roles.map((role, index) => {
            const [imgLoaded, setImgLoaded] = useState(false);

            return (
              <motion.div
                key={`${role.title}-${index}`}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05, ease: "easeOut" }}
                whileHover={{
                  scale: 1.03,
                  y: -3,
                }}
                viewport={{ once: true }}
                className="group relative bg-[#006767] rounded-3xl overflow-hidden shadow-md cursor-pointer transition-transform duration-150"
              >
                {/* Image */}
                <div className="relative h-44 md:h-64 overflow-hidden rounded-t-3xl">
                  {!imgLoaded && <ImageShimmer />}
                  <motion.img
                    src={role.image}
                    alt={role.title}
                    onLoad={() => setImgLoaded(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                      imgLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs uppercase tracking-[0.25em] text-white/80 mb-1">
                      {role.subtitle}
                    </div>
                    <div className="text-2xl md:text-3xl font-semibold">{role.title}</div>
                  </div>
                </div>

                {/* Text */}
                <div className="p-4 md:p-6">
                  <div className="text-white text-sm md:text-base leading-relaxed">{role.description}</div>
                  {role.cta && (
                    <div className="mt-3 md:mt-4 text-[12px] md:text-lg text-white font-semibold flex items-center gap-2">
                      {role.cta}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}