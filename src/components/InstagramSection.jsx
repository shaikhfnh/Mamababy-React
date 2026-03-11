import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";

const posts = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800",
    caption: "اختاري بعناية... كل اللي يلمع مو ذهب ✨",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800",
    caption: "خذي لك وقت قبل ما تختارين عربة طفلك 🤍",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800",
    caption: "رحلة الأمومة مو سهلة... بس تستاهل 💛",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800",
    caption: "بيبي شاور؟ أفكار لطيفة ومميزة 🎈",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800",
    caption: "استمعي لنفسك أكثر 🤱",
  },
];

export default function InstagramSection() {
  return (
    <section className="w-full bg-[#365b8c] py-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <div className="flex items-center gap-3 text-white">
            <FaInstagram className="text-3xl" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              mamababyexpo
            </h2>
          </div>
          <p className="text-white/80 mt-3 text-sm md:text-base">
            تابعينا على إنستغرام لأحدث النصائح والعروض ✨
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {posts?.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="relative group rounded-2xl overflow-hidden shadow-xl cursor-pointer"
            >
              <img
                src={post.image}
                alt="instagram post"
                className="w-full h-72 object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center p-4">
                <p className="text-white text-sm text-center leading-relaxed">
                  {post.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-white hover:text-black transition"
          >
            Load More
          </motion.button>
        </div>
      </div>
    </section>
  );
}
