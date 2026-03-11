import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "../hooks/useTranslation";
import logo from "@assets/LOGO.png";
import { getPageById } from "../api/wordpress";

export default function Navbar() {
  const [acf, setAcf] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileExhibitOpen, setMobileExhibitOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = useTranslation();

  // Fetch ACF data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const page = await getPageById();
        setAcf(page.acf);
      } catch (error) {
        console.error("Failed to fetch ACF data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getTranslation = useCallback((key) => {
    const value = t[key];
    if (typeof value === 'object' && value !== null) {
      return value.label || value.text || value.title || Object.values(value)[0] || key;
    }
    return typeof value === 'string' ? value : key;
  }, [t]);

  // 🔥 FIXED navLinks - CONSISTENT Arabic path logic
  const navLinks = useMemo(() => {
    if (!acf?.navbar_items || !Array.isArray(acf.navbar_items)) {
      return [];
    }

    return acf.navbar_items.map((item, index) => {
      const dropdown = item.dropdown === "true";
      const isPage = item.is_page === "true";
      
      // 🔥 CONSISTENT PATH LOGIC - PRIORITY ORDER
      let path, id;
      
      if (isPage === true) {
        // 1. Arabic: ALWAYS prefer path_ar if exists AND language=ar
        if (language === 'ar' && item.path_ar && item.path_ar.trim() !== '') {
          path = item.path_ar;
        } 
        // 2. Fallback to English path
        else {
          path = item.path || '';
        }
        id = path.replace(/^https?:\/\//, '').replace(/\/.*$/, '') || `nav-item-${index}`;
      } else {
        // # SCROLLING - use original path
        path = item.path?.startsWith('#') ? item.path : `#${item.path?.replace(/^\/+/, '') || `nav-item-${index}`}`;
        id = path.replace(/^#/, '');
      }

      return {
        id,
        path,
        path_ar: item.path_ar || null,
        label: language === 'ar' ? (item.label_ar || item.label_en || '') : (item.label_en || ''),
        dropdown,
        isPage: isPage === true,
        items: dropdown && item.dropdown_items && Array.isArray(item.dropdown_items) 
          ? item.dropdown_items.map((sub, subIndex) => {
              // 🔥 SAME CONSISTENT LOGIC for submenus
              let subPath, subId;
              
              const subIsPage = sub.is_page === "true";
              
              if (subIsPage === true) {
                // 1. Arabic: ALWAYS prefer sub_path_ar if exists AND language=ar
                if (language === 'ar' && sub.sub_path_ar && sub.sub_path_ar.trim() !== '') {
                  subPath = sub.sub_path_ar;
                } 
                // 2. Fallback to English sub_path
                else {
                  subPath = sub.sub_path || '';
                }
                subId = subPath.replace(/^https?:\/\//, '').replace(/\/.*$/, '') || `sub-item-${subIndex}`;
              } else {
                // # SCROLLING for submenu
                subPath = sub.sub_path?.startsWith('#') ? sub.sub_path : `#${sub.sub_path?.replace(/^\/+/, '') || `sub-item-${subIndex}`}`;
                subId = subPath.replace(/^#/, '');
              }

              return {
                label: language === 'ar' ? (sub.sub_label_ar || sub.sub_label_en || '') : (sub.sub_label_en || ''),
                path: subPath,
                id: subId,
                isPage: subIsPage === true
              };
            })
          : []
      };
    });
  }, [acf, language]);

  // 🔥 FIXED handleNavClick - URL ERROR SOLVED
  const handleNavClick = useCallback((target) => {
    // Close mobile menu first
    setIsOpen(false);
    setMobileExhibitOpen(false);

    // 🔥 # links always scroll
    if (target.path?.startsWith('#')) {
      handleScrollTo(target.id);
      return;
    }

    // 🔥 isPage=true → Full page redirect
    if (target.isPage === true && target.path) {
      try {
        // Clean path - ensure it starts with http or /
        let finalPath = target.path;
        
        // Special exhibitors handling
        if (finalPath.includes('participants') || finalPath.includes('exhibitors-list')) {
          const exhibitorsUrl = language === "ar" 
            ? "https://www.mamababyexpo.com/2025/participants/?lang=ar"
            : "https://www.mamababyexpo.com/2025/participants/?lang=en";
          window.location.href = exhibitorsUrl;
          return;
        }

        // Visiting pages - use absolute paths
        if (finalPath.includes('visiting')) {
          window.location.href = finalPath;
          return;
        }

        // Regular page redirect
        const origin = window.location.origin;
        const url = finalPath.startsWith('http') ? finalPath : `${origin}${finalPath.startsWith('/') ? '' : '/'}${finalPath}`;
        window.location.href = url;
      } catch (error) {
        console.error("Navigation error:", error);
      }
      return;
    }

    // Default scroll
    handleScrollTo(target.id || 'home');
  }, [language]);

  const handleScrollTo = useCallback((id) => {
    const isArabicHome = window.location.pathname === "/ar";
    const isEnglishHome = window.location.pathname === "/" || window.location.pathname === "";

    if ((language === "ar" && isArabicHome) || (language === "en" && isEnglishHome)) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const base = language === "ar" ? "/ar" : "";
      window.location.href = `${window.location.origin}${base}/#${id}`;
    }

    setIsOpen(false);
    setMobileExhibitOpen(false);
  }, [language]);

  const handleLogoClick = useCallback(() => {
    const baseUrl = window.location.origin;
    window.location.href = language === "ar" ? `${baseUrl}/ar` : baseUrl;
  }, [language]);

  const toggleMobileExhibit = useCallback((e) => {
    e.stopPropagation();
    setMobileExhibitOpen(!mobileExhibitOpen);
  }, [mobileExhibitOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
    setMobileExhibitOpen(false);
  }, []);

  // 🔥 FIXED toggleLanguage - CORRECTLY HANDLES VISITING PAGES
  const toggleLanguage = useCallback(() => {
    const origin = window.location.origin;
    const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    const search = window.location.search;
    const hash = window.location.hash;

    // 🔥 1. Handle participants page
    if (pathname.includes('/2025/participants')) {
      const currentLang = language === 'en' ? 'ar' : 'en';
      const newUrl = pathname.replace(/lang=(en|ar)/, `lang=${currentLang}`);
      window.location.href = `${origin}${newUrl}${search}${hash}`;
      return;
    }

    // 🔥 2. Handle visiting pages - PROPERLY TOGGLE BETWEEN visiting ↔ visiting-ar
    if (pathname === '/visiting' || pathname === '/visiting/') {
      // From visiting (en) → visiting-ar (ar)
      window.location.href = `${origin}/visiting-ar${search}${hash}`;
      return;
    }
    
    if (pathname === '/visiting-ar' || pathname === '/visiting-ar/') {
      // From visiting-ar (ar) → visiting (en)
      window.location.href = `${origin}/visiting${search}${hash}`;
      return;
    }

    // 🔥 3. Default home page toggle
    const newLang = language === "en" ? "ar" : "en";
    const newPath = newLang === "ar" ? "/ar" : "/";
    window.location.href = `${origin}${newPath}${search}${hash}`;
  }, [language]);

  const bookText = getTranslation('book') || "Book Now";

  return (
    <>
      <nav className={`fixed -top-2 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-100" 
          : "bg-white/90 backdrop-blur-lg"
      }`}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
          <motion.div 
            className="flex-shrink-0 cursor-pointer p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogoClick}
          >
            <img src={logo} alt="Mama Baby Expo Logo" className="h-10 sm:h-12 lg:h-14 w-auto" />
          </motion.div>

          <div className="hidden lg:flex items-center gap-2 lg:gap-6 xl:gap-8">
            {navLinks.map((link, i) => (
              <div key={i} className="relative group">
                <motion.button
                  onClick={() => handleNavClick(link)}
                  className="flex items-center gap-1 px-3 py-2 text-gray-800 font-medium text-sm lg:text-base xl:text-lg relative transition-all duration-300 hover:text-[#091C41]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                  {link.dropdown && (
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-[#091C41] transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  {!link.dropdown && (
                    <span className="absolute left-0 -bottom-1 w-0 h-px bg-gradient-to-r from-[#091C41] to-transparent transition-all duration-300 group-hover:w-full" />
                  )}
                </motion.button>

                {link.dropdown && link.items?.length > 0 && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-xl shadow-xl rounded-2xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
                    {link.items.map((item, j) => (
                      <motion.button
                        key={j}
                        onClick={() => handleNavClick(item)}
                        whileHover={{ x: 4 }}
                        className="w-full text-left px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50/80 hover:text-[#091C41] transition-all duration-200 rounded-lg hover:shadow-sm border-r-4 border-transparent hover:border-[#091C41]"
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="px-4 py-2 bg-gradient-to-r from-[#091C41] to-[#1e3a5f] text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ml-2"
            >
              {language === "en" ? "العربية" : "English"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollTo("booking")}
              className="ml-3 px-6 lg:px-8 py-3 lg:py-3.5 rounded-2xl bg-gradient-to-r from-[#091C41] to-[#1e3a5f] text-white font-semibold text-sm lg:text-base shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {bookText}
            </motion.button>
          </div>

          <button 
            className="lg:hidden flex flex-col justify-center gap-1.5 p-2 relative z-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            <motion.span
              className="block w-6 h-0.5 bg-gray-900 rounded"
              animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-gray-900 rounded relative"
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 2 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-gray-900 rounded relative"
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -2 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu JSX */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white/95 backdrop-blur-2xl shadow-2xl z-50 lg:hidden flex flex-col pt-6 px-6"
            >
              <div className="flex absolute right-5 top-0 justify-end mb-6 pt-4">
                <motion.button
                  whileTap={{ scale: 0.95, rotate: 90 }}
                  onClick={closeMobileMenu}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                >
                  <svg className="w-7 h-7 text-gray-700 group-hover:text-[#091C41]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto">
                {navLinks.map((link, i) => (
                  <div key={i}>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={link.dropdown ? toggleMobileExhibit : () => handleNavClick(link)}
                      className="w-full text-left py-3 px-4 text-lg font-semibold text-gray-800 hover:text-[#091C41] hover:bg-gray-50 rounded-xl transition-all duration-200 flex items-center justify-between group border-l-4 border-transparent hover:border-[#091C41]"
                    >
                      <span>{link.label}</span>
                      {link.dropdown && (
                        <motion.svg 
                          className="w-5 h-5 text-gray-600 group-hover:text-[#091C41] transition-all duration-200"
                          animate={{ rotate: mobileExhibitOpen ? 180 : 0 }}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      )}
                    </motion.button>
                    
                    {link.dropdown && link.items?.length > 0 && (
                      <AnimatePresence>
                        {mobileExhibitOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden ml-8 mt-3 space-y-2"
                          >
                            {link.items.map((item, j) => (
                              <motion.button
                                key={j}
                                whileTap={{ scale: 0.98 }}
                                whileHover={{ x: 2 }}
                                onClick={() => handleNavClick(item)}
                                className="w-full text-left py-3 pl-8 pr-6 text-base font-medium text-gray-700 hover:bg-gradient-to-r hover:from-[#091C41]/5 hover:to-blue-50/50 hover:text-[#091C41] rounded-2xl transition-all duration-200 border border-gray-200 hover:border-[#091C41]/50 hover:shadow-sm flex items-center gap-3 bg-white/80 backdrop-blur-sm"
                              >
                                <div className="w-2 h-2 bg-gradient-to-r from-[#091C41] to-[#1e3a5f] rounded-full group-hover:scale-110 transition-transform duration-200" />
                                <span>{item.label}</span>
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-8 pb-10 border-t border-gray-200 space-y-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleLanguage}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#091C41] to-[#1e3a5f] text-white rounded-2xl font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {language === "en" ? "العربية" : "English"}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleScrollTo("booking")}
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#091C41] to-[#1e3a5f] text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
                >
                  {bookText}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
