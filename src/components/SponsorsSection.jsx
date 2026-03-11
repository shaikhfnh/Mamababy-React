import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedField } from "../utils/getLocalizedField";

const smoothEase = [0.22, 1, 0.36, 1];

export default function SponsorsSection({ data }) {
  const { language } = useLanguage();

  // Helper: get all image URLs with a numeric suffix for a prefix
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
      label: getLocalizedField(data, "main_sponsors", language),
      description: getLocalizedField(data, "main_sponsors_subheading", language),
      logos: getLogos("main_sponsor"),
    },
    {
      label: getLocalizedField(data, "strategic_sponsors", language),
      description: getLocalizedField(data, "strategic_sponsors_subheading", language),
      logos: getLogos("strategic_sponsor"),
    },
    {
      label: getLocalizedField(data, "sponsors", language),
      description: getLocalizedField(data, "sponsors_subheading", language),
      logos: getLogos("sponsors"),
    },
    {
      label: getLocalizedField(data, "partners", language),
      description: getLocalizedField(data, "partners_subheading", language),
      logos: getLogos("partners"),
    },
  ];

  const handleSponsorRedirect = () => {
  if (data?.sponsor_btn_link) {
    window.location.href = data.sponsor_btn_link;
  }
};
  return (
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Background Blur */}
      <motion.div
        animate={{ x: ["0%", "10%", "-5%", "0%"], y: ["0%", "5%", "-3%", "0%"] }}
        transition={{ repeat: Infinity, duration: 60, ease: "easeInOut" }}
        className="absolute w-96 h-96 bg-[#091C41]/5 blur-[120px] rounded-full top-0 left-1/2 -translate-x-1/2 pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: smoothEase }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
            {getLocalizedField(data, "expo_name", language)}
          </div>
          <div className="text-4xl md:text-5xl font-semibold text-[#091C41] mb-4">
            {getLocalizedField(data, "sponsor_heading", language)}
          </div>
          <div className="text-gray-600 capitalize max-w-xl mx-auto text-base leading-relaxed">
            {getLocalizedField(data, "sponsor_subheading", language)}
          </div>
        </motion.div>

        {/* Sponsor Groups */}
        <div className="space-y-14">
          {sponsorTiers.map((tier, tierIndex) => (
            <motion.div
              key={tierIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: smoothEase,
                delay: tierIndex * 0.1,
              }}
              viewport={{ once: true }}
              className="text-center"
            >
              {/* Tier Title */}
              <div className="text-xl uppercase md:text-2xl font-semibold text-[#091C41] mb-1">
                {tier.label}
              </div>
              <div className="text-gray-500 capitalize mb-6 text-sm md:text-base">
                {tier.description}
              </div>

              {/* Logos */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                {tier.logos.map((logo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: smoothEase,
                      delay: index * 0.08,
                    }}
                    whileHover={{ y: -4, scale: 1.04 }}
                    className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <img
                      src={logo}
                      alt={`${tier.label} Logo`}
                      className="h-20 md:h-40 object-contain"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
              {/* View More Sponsors Button */}
{data?.sponsors_viewmore_btn && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: smoothEase }}
    viewport={{ once: true }}
    className="flex justify-center mt-14"
  >
    <button
      onClick={() => handleSponsorRedirect()}
      className="group transition-transform duration-300 hover:scale-105 focus:outline-none"
    >
      <img
        src={getLocalizedField(data, "sponsors_viewmore_btn", language)}
        alt="View More Sponsors"
        className="h-12 md:h-14 lg:h-16 object-contain"
      />
    </button>
  </motion.div>
)}
      </div>

    </section>
  );
}