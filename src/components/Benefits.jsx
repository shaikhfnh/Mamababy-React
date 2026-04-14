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

const iconsMap = { FaStar, FaUsers, FaCheck, FaRocket, FaHeart, FaBullhorn };

export default function Benefits({ data }) {
  const { language } = useLanguage();
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const iconsList = data?.benifit_icons_list
    ? data.benifit_icons_list.split(",").map((i) => i.trim())
    : [];

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
      benefits.push({ title, description, icon: IconComponent, image });
    }
    i++;
  }

  const DURATION = 7000;

  useEffect(() => {
    if (isMobile || benefits.length === 0) return;
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % benefits.length);
    }, DURATION);
    return () => clearInterval(intervalRef.current);
  }, [benefits.length, isMobile]);

  const handleClick = (index) => {
    setActive(active === index ? -1 : index);
  };

  if (!benefits.length) return null;

  return (
    <section
     style={{
        backgroundImage: `url(${data?.background_image_benifit})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} className="relative py-12 md:py-16 bg-[#EFE4D2] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center md:mb-20 mb-12">
          <div className="text-4xl md:text-5xl font-bold text-[#486179]">
            {getLocalizedField(data, "benifit_heading", language)}
          </div>
          <div className="mt-5 mx-auto text-gray-700 font-medium text-[16px] leading-relaxed">
            {getLocalizedField(data, "benifit_subheading", language)}
          </div>
        </div>

        {!isMobile ? (
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left List */}
            <div className="space-y-4">
              {benefits.map((item, index) => {
                const Icon = item.icon;
                const isActive = active === index;

                return (
                  <motion.div
                    key={index}
                    onClick={() => handleClick(index)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className={`w-full text-left p-5 rounded-2xl cursor-pointer transition-all duration-200 ${
                      isActive
                        ? "bg-white shadow-xl border-2 border-[#EA6677]"
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
                  </motion.div>
                );
              })}
            </div>

            {/* Right Card */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden"
                >
                  <div className="relative h-100 overflow-hidden">
                    <motion.img
                      key={benefits[active]?.image}
                      src={benefits[active]?.image}
                      alt={benefits[active]?.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl text-gray-800 font-semibold mb-3">
                      {benefits[active]?.title}
                    </h3>
                    <div className="text-gray-700 font-normal text-lg leading-relaxed">
                      {benefits[active]?.description}
                    </div>
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
                  transition={{ type: "spring", stiffness: 180, damping: 20 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <div
                    onClick={() => handleClick(index)}
                    className="w-full px-5 py-4 flex items-center justify-between cursor-pointer"
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
                      transition={{ duration: 0.2 }}
                    >
                      <MdOutlineExpandMore className="text-black" />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? "auto" : 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
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
                        className="w-full h-64 object-cover rounded-xl mb-4"
                      />
                      <div className="text-gray-600 font-normal leading-relaxed">
                        {item.description}
                      </div>
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