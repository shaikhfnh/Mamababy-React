import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import logo from "@assets/LOGO.png";
import fouz from "@assets/footer/fouz.png";
import ixir from "@assets/footer/ixir.png";
import mirzam from "@assets/footer/mirzam.png";
import mirzaamiyat from "@assets/footer/mizaamiyat.png";
import map from "@assets/footer/map.png";


export default function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-[#E5E5E5]">

      {/* ================= PINK SECTION ================= */}
      <div className="bg-[#C9787E] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <img src={logo} alt="Mama Baby Expo" className="h-16 mb-6" />

            <p className="text-white/90 leading-relaxed max-w-sm">
              As the ultimate destination for exploring the latest
              innovations in parenting and childcare, this event
              serves as a hub for interaction between brands,
              experts, and an engaged audience.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              {[FaInstagram, FaWhatsapp, FaEnvelope].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1F3B73] hover:bg-white hover:text-[#C9787E] transition-all duration-300"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-white/90">
              {["About the event", "What's On", "Contact"].map(
                (item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:translate-x-2 inline-block transition-all duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>

            <div className="mt-8 space-y-2 text-white/90">
              <div>TEL: +96593333685</div>
              <div>E: INFO@FOUZEXPOS.COM</div>
            </div>
          </motion.div>

          {/* VENUE MAP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">
              Venue
            </h3>

            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={map}
                alt="Venue Map"
                className="w-full h-56 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= BLUE COPYRIGHT STRIP ================= */}
      <div className="bg-[#274C86] text-white text-center py-4 text-sm font-medium">
        © 2026 MAMA+BABY EXPO Powered by FEC. All Rights Reserved
      </div>

      {/* ================= DARK BRAND SECTION ================= */}
      <div className="bg-[#0F1E4A] text-white text-center py-14 px-6">

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="tracking-widest text-sm md:text-base mb-6"
        >
          CREATING EXPERIENCES BUILDING TRUST
        </motion.h3>

        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          src={fouz}
          alt="Fouz Expo Company"
          className="mx-auto h-20 mb-6"
        />

        <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base">
          Fouz Expo Company (FEC) stands as a beacon of excellence
          in the realm of event organization.
        </p>

        <div className="mt-10 text-white/80 tracking-widest text-sm">
          EXPERIENCE OUR RANGE OF EXPOS BELOW
        </div>

        {/* Expo Logos Row */}
      </div>
        <div className="my-8 flex flex-wrap justify-center  items-center gap-10 opacity-80">
          {/* <img src={mirzam} className="h-12" />
          <img src={mirzaamiyat} className="h-12" />
          <img src={ixir} className="h-12" />
          <img src={logo} className="h-12" /> */}
        </div>
    </footer>
  );
}