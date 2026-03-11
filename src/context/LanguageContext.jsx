import { createContext, useContext, useEffect, useState, useCallback } from "react";

const LanguageContext = createContext();

function detectLangFromUrl() {
  if (typeof window === "undefined") return "en";

  const url = window.location.href.toLowerCase();
  const pathname = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);

  // 1. Path contains /ar anywhere: /visit/ar, /previous-sponsors/ar
  if (pathname.includes("/ar")) return "ar";
  
  // 🔥 NEW: Path ends with -ar: /visit-ar, /sponsors-ar  
  if (pathname.match(/[-\/]ar$/)) return "ar";
  
  // 🔥 NEW: Contains -ar anywhere: /something-ar/something
  if (pathname.includes("-ar")) return "ar";
  
  // 2. Hash contains ar: #ar
  if (hash.includes("ar")) return "ar";
  
  // 3. Query param: ?ar or ?lang=ar
  if (searchParams.get("ar") || searchParams.get("lang") === "ar") return "ar";
  
  return "en";
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const updateLanguageFromUrl = useCallback(() => {
    const newLang = detectLangFromUrl();
    console.log('🔍 URL Lang detected:', newLang, 'from:', window.location.pathname); // Debug
    setLanguage(newLang);
  }, []);

  // Initial load
  useEffect(() => {
    updateLanguageFromUrl();
  }, [updateLanguageFromUrl]);

  // Watch ALL URL changes
  useEffect(() => {
    const handleAnyUrlChange = () => {
      updateLanguageFromUrl();
    };

    // Browser back/forward
    window.addEventListener("popstate", handleAnyUrlChange);
    
    // Hash changes (#ar)
    window.addEventListener("hashchange", handleAnyUrlChange);
    
    // 🔥 NEW: Custom history change detection (for SPA navigation)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function() {
      originalPushState.apply(history, arguments);
      handleAnyUrlChange();
    };
    
    history.replaceState = function() {
      originalReplaceState.apply(history, arguments);
      handleAnyUrlChange();
    };

    // Polling fallback (reduced frequency)
    const interval = setInterval(updateLanguageFromUrl, 1000);

    return () => {
      window.removeEventListener("popstate", handleAnyUrlChange);
      window.removeEventListener("hashchange", handleAnyUrlChange);
      clearInterval(interval);
      
      // Restore original history methods
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [updateLanguageFromUrl]);

  // Apply direction + lang
  useEffect(() => {
    const isArabic = language === "ar";
    
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.body.setAttribute("data-lang", language);
    
    // Trigger translation update
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language } 
    }));
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};














//localstorage
// import { createContext, useContext, useEffect, useState } from "react";

// const LanguageContext = createContext();

// function detectLangFromUrl() {
//   if (typeof window === "undefined") return null;

//   const url = window.location.href.toLowerCase();

//   // match /ar , -ar , /ar/ , ?lang=ar etc.
//   if (url.includes("/ar") || url.includes("-ar")) {
//     return "ar";
//   }

//   return null;
// }

// export function LanguageProvider({ children }) {
//   const [language, setLanguage] = useState(() => {
//     const urlLang = detectLangFromUrl();
//     const savedLang = localStorage.getItem("lang");

//     return urlLang || savedLang || "en";
//   });

//   useEffect(() => {
//     localStorage.setItem("lang", language);

//     // Apply direction + lang attribute globally
//     const isArabic = language.toLowerCase() === "ar";

//     document.documentElement.dir = isArabic ? "rtl" : "ltr";
//     document.documentElement.lang = language;
//   }, [language]);

//   // Optional: update language if URL changes dynamically
//   useEffect(() => {
//     const handleUrlChange = () => {
//       const urlLang = detectLangFromUrl();
//       if (urlLang && urlLang !== language) {
//         setLanguage(urlLang);
//       }
//     };

//     window.addEventListener("popstate", handleUrlChange);
//     return () => window.removeEventListener("popstate", handleUrlChange);
//   }, [language]);

//   return (
//     <LanguageContext.Provider value={{ language, setLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// }

// export const useLanguage = () => useContext(LanguageContext);