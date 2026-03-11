import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VideoSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

  return (
    <section ref={sectionRef} className="w-full bg-[#EFE4D2]/90 py-12 md:py-16 bg-[url('/images/backgroundGold.png')] h-full w-full bg-contain bg-top">
      <div className="max-w-7xl mx-auto px-6">

  
         <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-4xl md:text-5xl font-semibold text-[#486179] mb-14"
        >
            Exhibition Walkthrough
        </motion.div>

        <motion.div
          style={{ scale, opacity }}
          className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-gray-200 bg-white"
        >
          <div className="relative aspect-video">
            {/* <video
              src="/images/mamaadvertise.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            /> */}
          </div>

          <div className="md:px-5 px-2 py-3 border-t border-gray-200 flex items-center justify-between">
            <span className="md:text-xs text-[8px] text-gray-500">Official exhibition walkthrough</span>
            <span className="md:text-xs text-[8px] text-gray-400">Autoplay preview</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
