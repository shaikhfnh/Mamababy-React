import { motion } from "framer-motion";
import {
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";



import logo from "@assets/LOGO.png";
import fouz from "@assets/footer/fouz.png";
import ixir from "@assets/footer/ixir.png";
import mirzam from "@assets/footer/mirzam.png";
import mirzaamiyat from "@assets/footer/mizaamiyat.png";
import { useLanguage } from "../context/LanguageContext";
import { getLocalizedField } from "../utils/getLocalizedField";

export default function Footer({ data }) {

  const { language } = useLanguage();
  const acf = data || {};

  const footerDescription = getLocalizedField(acf, "footer_description", language);

  const quickLinks = acf.quick_links || [];

  const instagram = acf.instagram_url;
  const whatsapp = acf.whatsapp_url;
  const email = acf.email_url;

  const handleScroll = (hash) => {
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full overflow-hidden bg-[#E5E5E5]">

      {/* ================= TOP SECTION ================= */}
      <div className="bg-[#E8DFD6]">
        <div className="md:max-w-7xl mx-auto px-5 md:px-0 py-8 grid md:grid-cols-[2fr_2fr_3fr] gap-4">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            <img src={logo} alt="Mama Baby Expo" className="h-16 mb-4" />

            <p className="text-gray-700 leading-relaxed text-sm md:text-base max-w-sm">
              {footerDescription}
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6 cursor-pointer">

              {instagram && (
                <motion.a
                  href={instagram}
                  target="_blank"
                  whileHover={{ scale: 1.15, rotate: 3 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1F3B73] text-white hover:shadow-lg"
                >
                  <FaInstagram size={15} />
                </motion.a>
              )}

              {whatsapp && (
                <motion.a
                  href={whatsapp}
                  target="_blank"
                  whileHover={{ scale: 1.15, rotate: 3 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1F3B73] text-white hover:shadow-lg"
                >
                  <FaWhatsapp size={15} />
                </motion.a>
              )}

              {email && (
                <motion.a
                  href={`mailto:${email}`}
                  whileHover={{ scale: 1.15, rotate: 3 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1F3B73] text-white hover:shadow-lg"
                >
                  <FaEnvelope size={15} />
                </motion.a>
              )}

            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
          >

            <h3 className="text-lg font-semibold mb-4 text-[#0F1E4A]">
              {language === "ar" ? "روابط سريعة" : "Quick Links"}
            </h3>

            <ul className="space-y-3 text-gray-700 text-sm md:text-base">

              {quickLinks.map((link, i) => {

                const label = getLocalizedField(link, "label", language);

                if (link.is_contact) {
                  return (
                    <li key={i} className="font-semibold text-[#0F1E4A]">
                      {label}
                    </li>
                  );
                }

                const url = getLocalizedField(link, "path", language);

                if (link.is_page) {
                  return (
                    <li key={i}>
                      <motion.a
                        whileHover={{ x: 4 }}
                        href={url}
                        className="inline-block transition hover:text-[#0F1E4A]"
                      >
                        {label}
                      </motion.a>
                    </li>
                  );
                }

                return (
                  <li key={i}>
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => handleScroll(url)}
                      className="inline-block transition hover:text-[#0F1E4A]"
                    >
                      {label}
                    </motion.button>
                  </li>
                );

              })}

              {/* Contact details */}
              {whatsapp && (
                <li>
                  TEL: <a href={whatsapp}>+96593333685</a>
                </li>
              )}

              {email && (
                <li>
                  E: <a href={`mailto:${email}`}>{email}</a>
                </li>
              )}

            </ul>

          </motion.div>

          {/* VENUE MAP */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl border border-slate-100 hover:border-[#EA6677]/40 p-3 flex flex-col gap-4 group transition-all duration-300 h-full"
            >

              {/* HEADER */}
              <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">

                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#081a58] group-hover:text-[#EA6677] transition-colors duration-300" />
                  <h4 className="text-lg font-semibold text-[#081a58]">
                    {language === "ar" ? "الموقع" : "Venue"}
                  </h4>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const venueUrl =
                      "https://www.google.com/maps/dir/?api=1&destination=29.266854,47.993997&travelmode=driving";
                    window.open(venueUrl, "_blank", "noopener,noreferrer");
                  }}
                  className="text-xs md:text-sm text-[#081a58] hover:text-[#EA6677] flex items-center gap-1 px-3 rounded-lg border border-[#081a58]/30 hover:border-[#EA6677]/50 hover:bg-[#EA6677]/5 transition-all duration-200 cursor-pointer"
                >
                  {language === "ar" ? "افتح الخريطة" : "Open Maps"} ↗
                </motion.button>

              </div>

              {/* GOOGLE MAP */}
              <div className="w-full h-full rounded-xl border-2 border-slate-200/60 group-hover:border-[#EA6677]/50 shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 bg-slate-50/50">

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3480.526936729778!2d47.993997075575955!3d29.266854075324453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9921b6b1413b%3A0xad15775c0d4b5a5!2zVGhlIEFyZW5hIEt1d2FpdCB8INin2YTYo9ix2YrZhtinINmD2YjZitiq!5e0!3m2!1sen!2skw!4v1772995579971!5m2!1sen!2skw"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="Arena Kuwait Location"
                />

              </div>

            </motion.div>

          </motion.div>

        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="bg-[#274C86] text-white text-center py-3 text-sm font-medium">
        © 2026 MAMA+BABY EXPO Powered by FEC. All Rights Reserved
      </div>

      {/* BRAND SECTION */}
      <div className="bg-[#0F1E4A] text-white text-center py-12 px-6">

        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="tracking-widest text-sm md:text-base mb-5"
        >
          CREATING EXPERIENCES BUILDING TRUST
        </motion.h3>

        <motion.img
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          src={fouz}
          alt="Fouz Expo Company"
          className="mx-auto h-20 mb-5"
        />

        <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
          Fouz Expo Company (FEC) stands as a beacon of excellence in the realm
          of event organization.
        </p>

        <div className="mt-8 text-white/80 tracking-widest text-sm">
          EXPERIENCE OUR RANGE OF EXPOS BELOW
        </div>
      </div>

      {/* Expo Logos */}
      <div className="py-6 flex flex-wrap justify-center items-center gap-6 opacity-80">

        {[mirzam, mirzaamiyat, ixir, logo].map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="w-[110px] h-[45px] flex items-center justify-center"
          >
            <img
              src={img}
              className="max-h-full max-w-full object-contain"
            />
          </motion.div>
        ))}

      </div>

    </footer>
  );
}