import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaStar,
  FaUsers,
  FaCheck,
  FaRocket,
  FaHeart,
  FaBullhorn
} from "react-icons/fa";
import { getLocalizedField } from "../utils/getLocalizedField";
import { useLanguage } from "../context/LanguageContext";
import { MdOutlineExpandMore } from "react-icons/md";

/* Safe icon map */
const iconsMap = {
  FaStar,
  FaUsers,
  FaCheck,
  FaRocket,
  FaHeart,
  FaBullhorn,
};

export default function Benefits({ data }) {
  const { language } = useLanguage();
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);

  /* Detect mobile */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Parse icons */
  const iconsList = data?.benifit_icons_list
    ? data.benifit_icons_list.split(",").map((i) => i.trim())
    : [];

  /* Build benefits */
  const benefits = [];
  let i = 1;

  while (data?.[`benifit_heading_${i}`]) {
    const title = getLocalizedField(data, `benifit_heading_${i}`, language);
    const description = getLocalizedField(
      data,
      `benifit_subheading_${i}`,
      language
    );

    const iconName = iconsList[i - 1];
    const IconComponent = iconsMap[iconName] || FaStar;
    const image = data?.[`benifit_image_${i}`] || "";

    if (title) {
      benefits.push({
        title,
        description,
        icon: IconComponent,
        image,
      });
    }

    i++;
  }

  const DURATION = 6000;

  /* Auto slide (desktop only) */
  useEffect(() => {
    if (isMobile || benefits.length === 0) return;

    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % benefits.length);
    }, DURATION);

    return () => clearInterval(intervalRef.current);
  }, [benefits.length, isMobile]);

  const handleClick = (index) => {
    if (isMobile) {
      setActive(active === index ? -1 : index);
    } else {
      setActive(index);
    }
  };

  if (!benefits.length) return null;

  return (
    <section className="relative py-24 bg-[#EFE4D2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#486179]">
            {getLocalizedField(data, "benifit_heading", language)}
          </h2>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            {getLocalizedField(data, "benifit_subheading", language)}
          </p>
        </div>

        {!isMobile ? (
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left list */}
            <div className="space-y-4">
              {benefits.map((item, index) => {
                const Icon = item.icon;
                const isActive = active === index;

                return (
                  <button
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`w-full text-left p-5 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "bg-white shadow-2xl border-2 border-[#EA6677]"
                        : "bg-white/70 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl text-xl ${
                          isActive
                            ? "bg-[#EA6677]/20 text-[#EA6677]"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <Icon />
                      </div>

                      <div className="text-lg font-semibold text-gray-800">
                        {item.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right card */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                  <div className="relative h-80 overflow-hidden">
                    <motion.img
                      key={benefits[active]?.image}
                      src={benefits[active]?.image}
                      alt={benefits[active]?.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl text-gray-800 font-semibold mb-4">
                      {benefits[active]?.title}
                    </h3>

                    <p className="text-gray-600 text-lg">
                      {benefits[active]?.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (

          /* MOBILE ACCORDION */

          <motion.div layout className="space-y-4">
            {benefits.map((item, index) => {
              const Icon = item.icon;
              const isActive = active === index;

              return (
                <motion.div
                  key={index}
                  layout
                  transition={{ type: "spring", stiffness: 160, damping: 26 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => handleClick(index)}
                    className="w-full px-5 py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-xl text-xl ${
                          isActive
                            ? "bg-[#EA6677]/20 text-[#EA6677]"
                            : "text-gray-400 bg-gray-100"
                        }`}
                      >
                        <Icon />
                      </div>

                      <div className="font-semibold text-gray-800">
                        {item.title}
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <MdOutlineExpandMore className="text-black" />
                    </motion.div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? "auto" : 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{ overflow: "hidden" }}
                  >
                    <motion.div
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-5 pb-5"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-56 object-cover rounded-xl mb-4"
                      />

                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}