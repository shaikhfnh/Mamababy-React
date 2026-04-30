import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import AboutEvent from "./components/AboutEvent";
import CategoriesSection from "./components/CategoriesSection";
import SponsorsSection from "./components/SponsorsSection";
import RoleSelectionSection from "./components/RoleSelectionSection";
import ImageGallery from "./components/ImageGallery";
import ImpactStats from "./components/ImpactStats";
import EventOverview from "./components/EventOverview";
import Benefits from "./components/Benefits";
import BookBoothSection from "./components/BookBoothSection";
import { useLanguage } from "./context/LanguageContext";
import { useData } from "./context/DataContext";
import { motion } from "framer-motion";
import { LuLoaderCircle } from "react-icons/lu";

const Home = () => {
  const { language } = useLanguage();
  const { data } = useData();

  const [hasHash, setHasHash] = useState(false);

  // ✅ Detect hash on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasHash(!!window.location.hash);
    }
  }, []);

  // ✅ Wait until element exists
  const waitForElement = (id) =>
    new Promise((resolve) => {
      let tries = 0;

      const check = () => {
        const el = document.getElementById(id);
        if (el) resolve(el);
        else if (tries < 60) {
          tries++;
          requestAnimationFrame(check);
        }
      };

      check();
    });

  // ✅ Stable scroll with retry
  const scrollToSection = async (hash, attempt = 0) => {
    if (!hash) return;

    const el = await waitForElement(hash);

    // wait for layout/images/animations
    await new Promise((r) => setTimeout(r, 400));

    const navbarHeight =
      document.querySelector("nav")?.offsetHeight || 100;

    const top =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      navbarHeight -
      40;

    // ❗ no smooth (prevents jitter with retries)
    window.scrollTo({ top });

    // retry for perfect alignment
    if (attempt < 3) {
      setTimeout(() => scrollToSection(hash, attempt + 1), 600);
    }
  };

  // ✅ Main scroll trigger (ONLY ONE)
  useEffect(() => {
    if (!data) return;

    // initial load with hash
    if (window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      scrollToSection(hash);
    }

    // listen for hash change
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      scrollToSection(hash);
      setHasHash(true);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () =>
      window.removeEventListener("hashchange", handleHashChange);
  }, [data]);

  if (!data)
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        Loading...{" "}
        <span className="animate-spin">
          <LuLoaderCircle />
        </span>
      </div>
    );

  const sectionAnimation = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  // ✅ helper to reduce repetition
  const getMotionProps = () =>
    hasHash
      ? { animate: "visible" }
      : { whileInView: "visible", viewport: { once: true } };

  return (
    <div className="bg-white h-full w-full scroll-smooth">
      <Navbar />

      <div className="md:mt-20 mt-16">
        <HeroSlider heroImages={data.hero_images} />
      </div>

      <motion.section
        id="about"
        className="scroll-mt-32"
        initial="hidden"
        {...getMotionProps()}
        variants={sectionAnimation}
      >
        <AboutEvent data={data} />
      </motion.section>

      <ImpactStats data={data} language={language} />

      <motion.section
        id="overview"
        className="scroll-mt-32"
        initial="hidden"
        {...getMotionProps()}
        variants={sectionAnimation}
      >
        <EventOverview data={data} />
      </motion.section>

      <motion.section
        id="gallery"
        className="scroll-mt-32"
        initial="hidden"
        {...getMotionProps()}
        variants={sectionAnimation}
      >
        <ImageGallery data={data} />
      </motion.section>

      <motion.section
        id="roles"
        className="scroll-mt-32"
        initial="hidden"
        {...getMotionProps()}
        variants={sectionAnimation}
      >
        <RoleSelectionSection data={data} />
      </motion.section>

      <motion.section
        id="benefits"
        className="scroll-mt-32"
        initial="hidden"
        {...getMotionProps()}
        variants={sectionAnimation}
      >
        <Benefits data={data} images={{}} />
      </motion.section>

      <motion.section
        id="categories"
        className="scroll-mt-32"
        initial="hidden"
        {...getMotionProps()}
        variants={sectionAnimation}
      >
        <CategoriesSection data={data} />
      </motion.section>

      <motion.section
        id="booking"
        className="scroll-mt-32"
        initial="hidden"
        {...getMotionProps()}
        variants={sectionAnimation}
      >
        <BookBoothSection data={data} />
      </motion.section>

      <motion.section
        id="sponsors"
        className="scroll-mt-32"
        initial="hidden"
        {...getMotionProps()}
        variants={sectionAnimation}
      >
        <SponsorsSection data={data} />
      </motion.section>
    </div>
  );
};

export default Home;