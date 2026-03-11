import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import AboutEvent from "./components/AboutEvent";
import CategoriesSection from "./components/CategoriesSection";
import SponsorsSection from "./components/SponsorsSection";
import RoleSelectionSection from "./components/RoleSelectionSection";
import ImageGallery from "./components/ImageGallery";
import LatestNewsSlider from "./components/LatestNewsSlider";
import ImpactStats from "./components/ImpactStats";
import EventOverview from "./components/EventOverview";
import { getMediaById, getPageById } from "./api/wordpress";
import { LuLoaderCircle } from "react-icons/lu";
import { useLanguage } from "./context/LanguageContext";
import Benefits from "./components/Benefits";
import BookBoothSection from "./components/BookBoothSection";
import InstagramSection from "./components/InstagramSection";

const Home = () => {
  const [acf, setAcf] = useState(null);
  const [images, setImages] = useState({});
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const scrollAttemptedRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const { language } = useLanguage();

  // 🔥 FIXED: Check if we're on ANY home page variant
  const isHomePage = useCallback(() => {
    const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    // Works for /, /ar, /en, /home, /ar/home etc.
    return !pathname.includes('visiting') && 
           !pathname.includes('participants') && 
           !pathname.includes('2025') &&
           (pathname === '/' || pathname === '/ar' || pathname === '');
  }, []);

  // 🔥 ULTRA-RELIABLE scrollToHash - Works from ANY page
  const scrollToHash = useCallback(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash || !isHomePage() || scrollAttemptedRef.current) return;

    console.log('🔥 scrollToHash triggered for:', hash);

    const tryScroll = (attempt = 0) => {
      const element = document.getElementById(hash);
      
      if (element) {
        console.log('✅ Element found:', hash);
        scrollAttemptedRef.current = true;
        
        // PERFECT offset calculation
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 100;
        const elementRect = element.getBoundingClientRect();
        const elementTop = window.pageYOffset + elementRect.top - navbarHeight - 40;
        
        window.scrollTo({
          top: Math.max(0, elementTop),
          behavior: 'smooth'
        });
        
        // EXTRA safety - force scroll after animation
        setTimeout(() => {
          window.scrollTo({
            top: Math.max(0, elementTop),
            behavior: 'auto'
          });
        }, 800);
        return;
      }

      // Aggressive retry strategy for bottom sections
      if (attempt < 15) { // Increased retries
        const delay = Math.min(200 + (attempt * 80), 1200); // Progressive delay
        setTimeout(() => tryScroll(attempt + 1), delay);
      } else {
        console.log('❌ Max retries reached for:', hash);
      }
    };

    tryScroll(0);
  }, [isHomePage]);

  // 🔥 1. PAGE LOAD - Multiple timed attempts
  useEffect(() => {
    scrollAttemptedRef.current = false;
    
    if (window.location.hash && isHomePage()) {
      // Comprehensive timing strategy
      const timings = [50, 200, 400, 700, 1100, 1600, 2200];
      timings.forEach(delay => {
        scrollTimeoutRef.current = setTimeout(() => {
          if (!scrollAttemptedRef.current) scrollToHash();
        }, delay);
      });
    }

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // 🔥 2. ACF LOADED - Components rendered
  useEffect(() => {
    if (acf && window.location.hash && isHomePage() && !scrollAttemptedRef.current) {
      // Wait for sections to fully render
      const timeout = setTimeout(scrollToHash, 800);
      return () => clearTimeout(timeout);
    }
  }, [acf, scrollToHash, isHomePage]);

  // 🔥 3. HASH CHANGES (Navbar clicks from other pages)
  useEffect(() => {
    const handleHashChange = () => {
      // Reset for new navigation
      scrollAttemptedRef.current = false;
      
      // Small delay for page transition
      setTimeout(() => {
        if (window.location.hash && isHomePage()) {
          scrollToHash();
        }
      }, 250);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [scrollToHash, isHomePage]);

  // 🔥 4. POPSTATE (Browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      scrollAttemptedRef.current = false;
      if (window.location.hash && isHomePage()) {
        setTimeout(scrollToHash, 100);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [scrollToHash, isHomePage]);

  // 🔥 5. PAGE FULLY LOADED
  useEffect(() => {
    const handleLoad = () => {
      setIsPageLoaded(true);
      if (acf && window.location.hash && isHomePage() && !scrollAttemptedRef.current) {
        setTimeout(scrollToHash, 300);
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [acf, scrollToHash, isHomePage]);

  // 🔥 6. DOM CONTENT LOADED (Extra safety)
  useEffect(() => {
    const handleDOMContentLoaded = () => {
      if (window.location.hash && isHomePage() && !scrollAttemptedRef.current) {
        setTimeout(scrollToHash, 100);
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
      return () => document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    }
  }, [scrollToHash, isHomePage]);

  // ---------------- FETCH WORDPRESS DATA ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const page = await getPageById();
        setAcf(page.acf);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (!acf) return (
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
      <div className="mt-20">
      <HeroSlider heroImages={acf.hero_images} />
      </div>
        

      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnimation}
      >
        <AboutEvent data={acf} />
      </motion.section>

      <ImpactStats acf={acf} language={language} />

      <motion.section 
        id="overview" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={sectionAnimation}
      >
        <EventOverview data={acf} />
      </motion.section>

      <motion.section
        id="gallery"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnimation}
      >
        <ImageGallery data={acf} />
      </motion.section>

      <motion.section 
        id="roles" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={sectionAnimation}
      >
        <RoleSelectionSection data={acf} />
      </motion.section>

      <motion.section 
        id="benefits" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={sectionAnimation}
      >
        <Benefits data={acf} images={images} />
      </motion.section>

      <motion.section 
        id="categories" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={sectionAnimation}
      >
        <CategoriesSection data={acf} />
      </motion.section>

      <motion.section 
        id="booking" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={sectionAnimation}
      >
        <BookBoothSection data={acf} />
      </motion.section>

      <motion.section 
        id="sponsors" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={sectionAnimation}
      >
        <SponsorsSection data={acf} />
      </motion.section>

      <motion.section 
        id="news" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={sectionAnimation}
      >
        <LatestNewsSlider data={acf} />
      </motion.section>

      <motion.section 
        id="instagram" 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }} 
        variants={sectionAnimation}
      >
        <InstagramSection />
      </motion.section>
    </div>
  );
};

export default Home;
