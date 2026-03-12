import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSlider from "./components/HeroSlider";
import AboutEvent from "./components/AboutEvent";
import CategoriesSection from "./components/CategoriesSection";
import SponsorsSection from "./components/SponsorsSection";
import RoleSelectionSection from "./components/RoleSelectionSection";
import ImageGallery from "./components/ImageGallery";
import LatestNewsSlider from "./components/LatestNewsSlider";
import ImpactStats from "./components/ImpactStats";
import EventOverview from "./components/EventOverview";
import Benefits from "./components/Benefits";
import BookBoothSection from "./components/BookBoothSection";
import InstagramSection from "./components/InstagramSection";
import { useLanguage } from "./context/LanguageContext";
import { useData } from "./context/DataContext";
import { motion } from "framer-motion";
import { LuLoaderCircle } from "react-icons/lu";

const Home = () => {
  const { language } = useLanguage();
  const { data } = useData();
  const [pageReady, setPageReady] = useState(false);
  const scrollRef = useRef({});

  // ✅ Wait until an element exists in the DOM
  const waitForElement = (id) =>
    new Promise((resolve) => {
      const check = () => {
        const el = document.getElementById(id);
        if (el) resolve(el);
        else requestAnimationFrame(check);
      };
      check();
    });

  const scrollToSection = async (hash) => {
    if (!hash) return;
    const el = await waitForElement(hash);
    if (!el) return;

    const navbarHeight = document.querySelector("nav")?.offsetHeight || 100;
    const top = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 40;

    window.scrollTo({ top, behavior: "smooth" });

    // Remove #hash after scroll
    history.replaceState(null, "", window.location.pathname + window.location.search);
  };

  useEffect(() => {
    if (!data) return;

    setPageReady(true);

    // Initial scroll if URL has hash
    if (window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      scrollToSection(hash);
    }

    // Listen to hash changes dynamically
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      scrollToSection(hash);
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [data]);

  if (!data)
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        Loading... <span className="animate-spin"><LuLoaderCircle /></span>
      </div>
    );

  const sectionAnimation = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-white h-full w-full scroll-smooth">
      <Navbar />

      <div className="md:mt-20 mt-16">
        <HeroSlider heroImages={data.hero_images} />
      </div>

      <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnimation}>
        <AboutEvent data={data} />
      </motion.section>

      <ImpactStats data={data} language={language} />

      <motion.section id="overview" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnimation}>
        <EventOverview data={data} />
      </motion.section>

      <motion.section id="gallery" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnimation}>
        <ImageGallery data={data} />
      </motion.section>

      <motion.section id="roles" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnimation}>
        <RoleSelectionSection data={data} />
      </motion.section>

      <motion.section id="benefits" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnimation}>
        <Benefits data={data} images={{}} />
      </motion.section>

      <motion.section id="categories" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnimation}>
        <CategoriesSection data={data} />
      </motion.section>

      <motion.section id="booking" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnimation}>
        <BookBoothSection data={data} />
      </motion.section>

      <motion.section id="sponsors" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnimation}>
        <SponsorsSection data={data} />
      </motion.section>

      <motion.section id="news" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnimation}>
        <LatestNewsSlider data={data} />
      </motion.section>

      <motion.section id="instagram" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnimation}>
        <InstagramSection />
      </motion.section>

      {/* Footer loaded last, scroll waits for it if hash=footer */}
      <Footer />
    </div>
  );
};

export default Home;