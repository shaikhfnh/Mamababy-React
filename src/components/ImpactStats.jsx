import { motion } from "framer-motion";
import { getLocalizedField } from "../utils/getLocalizedField";
import { useLanguage } from "../context/LanguageContext";

/**
 * ImpactStats Component
 * @param {Object} data - The full data  object
 * @param {string} language - Current language ('en' or 'ar')
 */
export default function ImpactStats({ data }) {
    const { language} = useLanguage()
  if (!data) return null;

  // Dynamically get all impact images based on language
  const impactImages = Object.keys(data)
    .filter(key => {
      // English: keys start with 'impact_image_' but not ending with '_ar'
      // Arabic: keys start with 'impact_image_' and end with '_ar'
      if (language === 'en') return key.startsWith('impact_image_') && !key.endsWith('_ar');
      if (language === 'ar') return key.startsWith('impact_image_') && key.endsWith('_ar');
      return false;
    })
    .sort((a, b) => {
      // Sort numerically by the number in the key
      const numA = parseInt(a.match(/\d+/)?.[0] || 0);
      const numB = parseInt(b.match(/\d+/)?.[0] || 0);
      return numA - numB;
    })
    .map(key => data[key])
    .filter(Boolean); // Remove null/undefined values

  if (!impactImages.length) return null;

  return (
    <section  style={{
        backgroundImage: `url(${data?.background_image_benifit})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} className="py-12 md:py-16 bg-[#EFE4D2]">
      <div className="max-w-7xl mx-auto px-6">
               <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div           className="text-4xl md:text-5xl font-bold mb-2 select-none text-[#1D4C84]"
>
           {getLocalizedField(data, `impact_heading`, language)}
          </div>
          <div className="mt-3 text-gray-800 max-w-xl mx-auto">
                     {getLocalizedField(data, `impact_subheading`, language)}

          </div>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {impactImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ scale: 1.08 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-2xl will-change-transform"
            >
              <img
                src={img}
                alt={`Impact ${index + 1}`}
                className="w-full h-56 md:h-64 object-cover object-center rounded-2xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}