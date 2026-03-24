import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedField } from "../utils/getLocalizedField";

// Single gallery image card
const ImageCard = ({ src, index }) => {
  const rotation = Math.random() * 6 - 3; // random -3 to +3 degrees
  const floatVariants = {
    float: {
      y: [0, -5, 0, 3, 0],
      transition: {
        repeat: Infinity,
        duration: 6 + index * 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      variants={floatVariants}
      initial={{ opacity: 0, y: 20, rotate: rotation, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      whileHover={{
        y: -6,
        scale: 1.05,
        boxShadow: "0 12px 25px rgba(0,0,0,0.2)",
      }}
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
      className="overflow-hidden rounded-xl shadow-lg"
    >
      <img
        src={src}
        alt="Gallery Image"
        className="w-full h-auto object-cover rounded-xl"
      />
    </motion.div>
  );
};

// Main ImageGallery
const ImageGallery = ({ data }) => {
  const { language } = useLanguage();

  const galleryKeys = Object.keys(data)
    .filter((key) => key.startsWith("image_gallery_"))
    .sort(
      (a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0])
    );

  const galleryImages = galleryKeys
    .map((key) => data[key])
    .filter(Boolean);

  const bgImage = data.background_image_gallery || "";

  return (
    <section
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : "none",
      }}
      className="bg-[#97CAD0]/90 py-12 md:py-16 h-full w-full bg-contain bg-start bg-repeat px-4"
    >
      <div className="max-w-7xl mx-auto columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {/* Gallery heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="pb-14 w-full"
        >
          <div className="text-4xl md:text-5xl font-semibold text-black">
            {getLocalizedField(data, "gallery_heading", language)}
          </div>
          <div className="mt-3 text-gray-800 max-w-2xl">
            {getLocalizedField(data, "gallery_description", language)}
          </div>
        </motion.div>

        {/* Gallery images */}
        {galleryImages.map((src, i) => (
          <div key={i} className="mb-4 break-inside-avoid">
            <ImageCard src={src} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageGallery;