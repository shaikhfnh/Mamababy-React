import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function HeroSlider({ heroImages = [] }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoSlideRef = useRef(null);

  // 🔥 Language detection
  const getLanguage = () => {
    if (window.location.pathname.includes('/ar')) return 'ar';
    const { language } = useLanguage();
    return language || 'en';
  };

  const language = getLanguage();

  // 🔥 Slides processing with is_page support
  const slides = heroImages.map((slide) => {
    const image = language === 'ar' && slide.image_ar ? slide.image_ar : slide.image;
    const path = language === 'ar' && slide.path_ar ? slide.path_ar : slide.path;
    const isPage = slide.is_page === "true";

    let linkAction = null;
    if (path && path.trim()) {
      if (path.startsWith('#')) {
        // Hash scroll
        linkAction = () => {
          const el = document.getElementById(path.replace('#', ''));
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        };
      } else {
        // External page - new tab if is_page=true
        if (isPage) {
          linkAction = () => {
            window.open(path, '_blank', 'noopener,noreferrer');
          };
        } else {
          linkAction = () => {
            window.location.href = path;
          };
        }
      }
    }

    return {
      image,
      path,
      isPage,
      linkAction,
      hasLink: !!linkAction
    };
  }).filter(slide => slide.image);

  const currentSlide = slides[index] || slides[0];
  const hasMultipleSlides = slides.length > 1;

  // 🔥 PERFECT 6s AUTOSLIDE
  useEffect(() => {
    if (!hasMultipleSlides) return;

    autoSlideRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [hasMultipleSlides, slides.length]);

  // 🔥 Hover pause
  useEffect(() => {
    if (isHovered && autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
    } else if (!isHovered && hasMultipleSlides && !autoSlideRef.current) {
      autoSlideRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % slides.length);
      }, 8000);
    }
  }, [isHovered, hasMultipleSlides, slides.length]);

  const goToSlide = (targetIndex) => setIndex(targetIndex);
  const handleClick = () => currentSlide?.linkAction?.();

  if (!slides.length) return null;

  return (
    <section 
      className="w-full overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 🔥 16:9 PERFECT RESPONSIVE - FULL WIDTH */}
      <div className="w-full aspect-[16/9] sm:aspect-[16/9]">
        <AnimatePresence mode="wait">
          <motion.img
            key={`slide-${index}`}
            src={currentSlide.image}
            alt={`Hero ${index + 1}`}
            className="w-full h-full object-cover object-center brightness-95"
            onClick={currentSlide.hasLink ? handleClick : undefined}
            style={{ 
              cursor: currentSlide.hasLink ? 'pointer' : 'default' 
            }}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            priority
            sizes="100vw"
          />
        </AnimatePresence>

        {/* 🔥 Minimal gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-10" />
      </div>

      {/* 🔥 Hover controls only */}
      {hasMultipleSlides && isHovered && (
        <>
          {/* Arrows */}
          <button
            onClick={() => goToSlide((index - 1 + slides.length) % slides.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/70 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20 shadow-2xl border border-white/20"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => goToSlide((index + 1) % slides.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/70 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 z-20 shadow-2xl border border-white/20"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 backdrop-blur-sm shadow-lg border border-white/30 ${
                  index === i
                    ? 'w-4 h-4 bg-white shadow-white scale-110'
                    : 'bg-white/50 hover:bg-white hover:w-3 hover:h-3 hover:scale-110'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
