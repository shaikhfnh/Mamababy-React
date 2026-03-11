import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export default function BoothMapSection() {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 18 });
  const springY = useSpring(y, { stiffness: 60, damping: 18 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    x.set(dx * 0.04);
    y.set(dy * 0.04);
  };

  const resetParallax = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-[#0E2A4A] via-[#1D4C84] to-[#122F57] md:py-16 py-12 ">
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(14,165,233,0.14),transparent_55%)]" /> */}

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Exhibition Floor Plan
          </div>
          <div className="mt-3 text-gray-400 max-w-xl mx-auto">
            A clean, landscape-focused overview designed for clarity and scale
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          viewport={{ once: true }}
          className="mb-8 flex flex-wrap justify-center gap-3 my-2"
        >
          {[
            "360 , The Areena",
            "Apr 30 – May 02, 2026",
            "35,000+ Visitors",
          ].map((item, i) => (
            <div
              key={i}
              className="px-4 py-1.5 rounded-full text-xs text-gray-300 bg-white/5 border border-white/10 backdrop-blur"
            >
              {item}
            </div>
          ))}
        </motion.div>

        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetParallax}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative cursor-pointer mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(99,102,241,0.15)]"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              Plan
            </div>
            <span className="text-xs text-gray-400">Landscape View</span>
          </div>

          <div className="relative w-full max-h-[820px] lg:px-36 py-4  overflow-hidden">
            <motion.img
              src="/images/MAMA-BABY.svg"
              alt="Exhibition Floor Map"
              style={{ x: springX, y: springY }}
              className="w-full h-full  object-contain select-none"
              draggable={false}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          viewport={{ once: true }}
          className=" flex justify-center"
        >
          {/* <button className="px-6 py-3 rounded-full text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-500 shadow-md shadow-indigo-500/30 hover:scale-105 transition">
            View Interactive Map
          </button> */}
        </motion.div>
      </div>
    </section>
  );
}
