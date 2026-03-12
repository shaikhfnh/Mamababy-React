import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";
import { useData } from "../context/DataContext";

export default function VisitSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();
  const t = useTranslation();
  const {data,loading} = useData();
  

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  // ✅ FIXED VARIANTS - NO FUNCTION  
  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Countdown logic (unchanged)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const eventStart = new Date('2026-04-30T10:00:00+03:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventStart - now;
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setCountdown({ days, hours, minutes });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 30000);
    return () => clearInterval(timer);
  }, []);



  return (
    <section
      id="visit"
      ref={ref}
      className="bg-gradient-to-b from-[#fff7f8] pt-5 via-slate-50 to-white mt-16 md:mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Intro + main copy */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={controls}
          className="grid lg:grid-cols-[1.2fr,0.9fr] gap-10 lg:gap-12 items-center mb-8 lg:mb-12"
        >
          {/* Left: text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/80 shadow-sm rounded-full px-4 py-1.5 mb-4 border border-rose-100/70 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-medium text-emerald-700">
                {t.visit?.tagline || "For new & expecting parents in Kuwait"}
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#081a58] leading-tight mb-4">
              {t.visit?.heroTitle || "Discover Mama + Baby Expo Kuwait"}
            </h2>

            <p className="text-base md:text-lg text-slate-700 mb-4">
              {t.visit?.heroSub1 ||
                "Are you a new or expecting parent looking for the latest insights, products, and services to guide you through the journey of parenthood?"}
            </p>
            <p className="text-sm md:text-base text-slate-600 mb-3">
              {t.visit?.heroSub2 ||
                "Mama + Baby Expo Kuwait is your ultimate destination for all things parenting – from expert talks to trusted brands, innovative baby tech, and family-friendly experiences."}
            </p>
            <p className="text-sm md:text-base text-slate-600">
              {t.visit?.heroSub3 ||
                "Experience an inspiring event where top brands and expert professionals come together to help you nurture a happy, healthy baby."}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
             

              <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-slate-600">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-slate-200/70">
                  <span>👶</span>
                  <span>{t.visit?.forParents || "For new & expecting parents"}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-slate-200/70">
                  <span>🎟️</span>
                  <span>{t.visit?.freeEntry || "Free entry"}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: soft feature cards */}
          <div className="grid grid-cols-2 gap-4  mx-auto lg:ml-auto">
            <motion.div
              whileHover={{ y: -4 }}
              className="col-span-2 rounded-2xl bg-white/90 border border-rose-100/70 shadow-sm px-5 py-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#EA6677]/10 border border-[#EA6677]/40">
                <span className="text-lg">🌸</span>
              </div>
              <div>
                <p className="text-xs md:text-lg font-semibold tracking-wide text-rose-500 uppercase">
                  {t.visit?.whyJoinLabel || "Why join?"}
                </p>
                <p className=" text-sm md:text-base text-slate-700">
                  {t.visit?.whyJoinText ||
                    "Learn why attending Mama + Baby Expo could be the most rewarding choice for you and your child."}
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-white/90 border border-slate-100 shadow-sm px-4 py-4 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🧸</span>
                <p className="text-xs md:text-lg font-semibold text-slate-700 uppercase tracking-wide">
                  {t.visit?.latestProducts || "Latest products"}
                </p>
              </div>
              <p className="text-sm md:text-base text-slate-600">
                {t.visit?.latestProductsDesc ||
                  "Explore new baby gear, wellness products, and smart parenting tech in one place."}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-white/90 border border-slate-100 shadow-sm px-4 py-4 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🎓</span>
                <p className="text-xs md:text-lg  font-semibold text-slate-700 uppercase tracking-wide">
                  {t.visit?.expertSessions || "Expert sessions"}
                </p>
              </div>
              <p className="text-sm md:text-base text-slate-600">
                {t.visit?.expertSessionsDesc ||
                  "Join workshops and seminars led by maternity, baby care, and family wellness specialists."}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Existing main content grid (Event details + Accessibility) */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
       <motion.div
        custom={0}
        variants={cardVariants}
        initial="hidden"
        animate={controls}
        whileHover={{ y: -2 }}
        className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100/50 p-6 group hover:shadow-lg transition-all duration-300"
      >
        <div className="flex items-start gap-3 mb-5 pb-4 border-b border-slate-200/50">
          <div className="w-9 h-9 bg-[#081a58]/10 rounded-lg flex items-center justify-center border mt-0.5 border-[#081a58]/20">
            <span className="text-lg text-[#081a58]">📋</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-[#081a58] mb-1">
              {t.visit?.eventDetails || "Event Details"}
            </h3>
            <p className="text-sm md:text-base text-slate-600">
              {t.visit?.eventDetailsIntro || "Plan your visit"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Location */}
          <div className="group/card p-4 rounded-xl border border-slate-100/50 hover:border-[#EA6677]/30 hover:bg-[#EA6677]/5 transition-all">
            <div className="w-8 h-8 bg-[#081a58]/5 rounded-lg flex items-center justify-center mb-2 border border-[#081a58]/20 group-hover/card:bg-[#EA6677]/10">
              <span className="text-base text-[#081a58] group-hover/card:text-[#EA6677]">📍</span>
            </div>
            <h3 className="text-sm md:text-md  font-medium text-[#081a58] mb-1.5">{t.visit?.location}</h3>
            <p className="text-sm md:text-base font-semibold text-slate-700">The Arena Kuwait</p>
            <p className="text-xs md:text-sm  text-slate-600 mt-1">360 Mall, South Surra</p>
          </div>

         
        {/* Date & Auto Countdown - HIDES when event starts */}
{countdown.days + countdown.hours + countdown.minutes > 0 ? (
  <div className="group/card p-4 rounded-xl border border-slate-100/50 hover:border-[#EA6677]/30 hover:bg-[#EA6677]/5 transition-all">
    <div className="w-8 h-8 bg-[#081a58]/5 rounded-lg flex items-center justify-center mb-2 border border-[#081a58]/20 group-hover/card:bg-[#EA6677]/10">
      <span className="text-base text-[#081a58] group-hover/card:text-[#EA6677]">📅</span>
    </div>
    <h3 className="text-sm md:text-md  font-medium text-[#081a58] mb-1.5">{t.visit?.dateTime}</h3>
    <p className="text-sm md:text-base text-slate-700 mb-2">30 Apr – 2 May 2026</p>
    <div className="flex items-center gap-1 text-sm md:text-basefont-semibold text-emerald-600 font-mono bg-emerald-50 px-1 py-1 rounded-full">
      {t.visit?.startsIn || "Starts In: "}
      <span>{countdown.days}d</span>
      <span>{countdown.hours.toString().padStart(2, '0')}h</span>
      <span>{countdown.minutes.toString().padStart(2, '0')}m</span>
    </div>
    <p className="text-sm md:text-md text-slate-500 mt-1">{t.visit?.eventTiming || "10AM–10PM daily" }</p>
  </div>
) : null}


          {/* Free Entry */}
          <div className="md:col-span-2 p-4 rounded-xl border border-emerald-100/60 bg-emerald-50/50 hover:bg-emerald-50/70 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center border border-emerald-200">
                <span className="text-lg text-emerald-600">🎫</span>
              </div>
              <div className="flex-1">
                <h4 className="text-sm md:text-md font-medium text-[#081a58] mb-1">{t.visit?.entry}</h4>
                <p className="text-emerald-700 font-medium text-sm text-sm md:text-base">{t.visit?.freeForAllVisitors || "Free"}</p>
                <p className="text-sm md:text-md text-slate-600">{t.visit?.noTickets}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
          {/* Location Card */}
       <motion.div
  custom={1}
  variants={cardVariants}
  initial="hidden"
  animate={controls}
  whileHover={{ y: -4 }}
  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl border border-slate-100 hover:border-[#EA6677]/40 p-7 flex flex-col gap-3 group transition-all duration-300 h-full"
>
  <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
    <h4 className="text-lg font-semibold text-[#081a58]">
      {t.visit?.accessibility || "Accessibility"}
    </h4>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        // Opens exact Arena Kuwait location in Google Maps
        const venueUrl = "https://www.google.com/maps/dir/?api=1&destination=29.266854,47.993997&travelmode=driving";
        window.open(venueUrl, '_blank', 'noopener,noreferrer');
      }}
      className="text-xs md:text-[.9rem] text-[#081a58] hover:text-[#EA6677] flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#081a58]/30 hover:border-[#EA6677]/50 hover:bg-[#EA6677]/5 transition-all duration-200 cursor-pointer select-none"
    >
      {t.visit?.openMaps || "Open Maps"} <span>↗</span>
    </motion.button>
  </div>

  <p className="text-sm md:text-base text-slate-600 leading-relaxed">
    {t.visit?.accessibilityIntro ||
      "Easily reach the venue with convenient parking, drop‑off points, and fully accessible facilities for families with strollers."}
  </p>

  <div className="space-y-2 flex-1 mt-2">
    <div className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-100/50 hover:border-[#EA6677]/40 hover:bg-[#EA6677]/3 group/item transition-all duration-200">
      <div className="w-10 h-10 bg-[#081a58]/5 rounded-md flex items-center justify-center mt-0.5 border border-[#081a58]/20 group-hover/item:bg-[#EA6677]/10 group-hover/item:border-[#EA6677]/30">
        <span className="text-lg text-[#081a58] group-hover/item:text-[#EA6677]">🚗</span>
      </div>
      <div className="text-xs md:text-[.9rem]">
        <p className="font-medium text-slate-800">
          {t.visit?.parking || "Parking"}
        </p>
        <p className="text-xs md:text-md text-slate-600">
          {t.visit?.parkingDetail || "360 Mall multistory parking"}
        </p>
      </div>
    </div>

    <div className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-100/50 hover:border-[#EA6677]/40 hover:bg-[#EA6677]/3 group/item transition-all duration-200">
      <div className="w-10 h-10 bg-[#081a58]/5 rounded-md flex items-center justify-center mt-0.5 border border-[#081a58]/20 group-hover/item:bg-[#EA6677]/10 group-hover/item:border-[#EA6677]/30">
        <span className="text-lg text-[#081a58] group-hover/item:text-[#EA6677]">🚪</span>
      </div>
      <div className="text-xs md:text-[.9rem]">
        <p className="font-medium text-slate-800">
          {t.visit?.dropOff || "Drop‑off"}
        </p>
        <p className="text-xs md:text-md text-slate-600">
          {t.visit?.dropOffDetail || "Dedicated drop‑off near Grand Hyatt entrance"}
        </p>
      </div>
    </div>
  </div>

  {/* Interactive Google Maps Embed */}
  <div className="w-full rounded-2xl border-2 border-slate-200/60 group-hover:border-[#EA6677]/50 shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 bg-slate-50/50">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3480.526936729778!2d47.993997075575955!3d29.266854075324453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9921b6b1413b%3A0xad15775c0d4b5a5!2zVGhlIEFyZW5hIEt1d2FpdCB8INin2YTYo9ix2YrZhtinINmD2YjZitiq!5e0!3m2!1sen!2skw!4v1772995579971!5m2!1sen!2skw"
      width="100%"
      height="200"
      style={{ border: 0 }}
      allowFullScreen={true}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="w-full h-full rounded-[10px]"
      title="The Arena Kuwait Location"
    />
  </div>
</motion.div>

        </div>

        {/* Facilities (unchanged structure, just tuned copy defaults) */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate={controls}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl lg:text-3xl font-semibold text-[#081a58] mb-2">
              {t.visit?.venueFacilities || "Venue Facilities"}
            </h3>
            <p className="text-base text-slate-700 max-w-2xl mx-auto">
              {t.visit?.facilitiesDescription ||
                "From changing rooms to dining options, everything is designed to make your visit relaxed, comfortable, and baby‑friendly."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: "🚻", titleKey: "restrooms", descKey: "restroomsDesc", fallback: "Baby‑friendly restrooms & changing areas" },
              { icon: "🕌", titleKey: "prayerRooms", descKey: "prayerRoomsDesc", fallback: "Dedicated prayer rooms for men & women" },
              { icon: "🩺", titleKey: "firstAid", descKey: "firstAidDesc", fallback: "On‑site first aid & medical support" },
              { icon: "📶", titleKey: "wifi", descKey: "wifiDesc", fallback: "Free Wi‑Fi throughout the venue" },
              { icon: "🍽️", titleKey: "dining", descKey: "diningDesc", fallback: "Family‑friendly cafés & dining options" },
            ].map((item, i) => (
              <motion.div
                key={item.titleKey}
                custom={i + 3}
                variants={cardVariants}
                initial="hidden"
                animate={controls}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-lg border border-slate-100/50 hover:border-[#EA6677]/40 p-5 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center h-full"
              >
                <div className="w-12 h-12 bg-[#081a58]/5 rounded-lg flex items-center justify-center mb-3 border-2 border-[#081a58]/20 group-hover:bg-[#EA6677]/10 group-hover:border-[#EA6677]/40 transition-all duration-200">
                  <span className="text-lg text-[#081a58] group-hover:text-[#EA6677]">
                    {item.icon}
                  </span>
                </div>
                <h4 className="font-medium text-[#081a58] text-sm mb-1 text-center">
                  {t.visit?.[item.titleKey] || item.titleKey}
                </h4>
                <p className="text-xs text-slate-600 text-center leading-tight">
                  {t.visit?.[item.descKey] || item.fallback}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features & Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 lg:gap-10 mb-16 max-w-4xl mx-auto"
        >
          <div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200/50">
              <div className="w-9 h-9 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-400/30">
                <span className="text-base text-emerald-600">✨</span>
              </div>
              <h4 className="text-lg font-medium text-[#081a58]">
                {t.visit?.specialFeatures || "What You’ll Experience"}
              </h4>
            </div>
            <div className="space-y-2 text-sm  md:text-base text-slate-700">
              <p>
                {t.visit?.familyFriendly ||
                  "A warm, family‑friendly environment designed for parents, babies, and little ones."}
              </p>
              <p>
                {t.visit?.interactiveWorkshops ||
                  "Interactive workshops, talks, and Q&A sessions with baby and parenting specialists."}
              </p>
              <p>
                {t.visit?.productShowcases ||
                  "Hands‑on product showcases from trusted local and international brands."}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200/50">
              <div className="w-9 h-9 bg-[#081a58]/10 rounded-lg flex items-center justify-center border border-[#081a58]/20">
                <span className="text-base text-[#081a58]">ℹ️</span>
              </div>
              <h4 className="text-lg font-medium text-[#081a58]">
                {t.visit?.additionalInfo || "Good to Know"}
              </h4>
            </div>
            <div className="space-y-2 text-sm md:text-base text-slate-700">
              <p>
                {t.visit?.securityScreening ||
                  "Secure, family‑safe environment with standard entry screening."}
              </p>
              <p>
                {t.visit?.atmsAvailable ||
                  "ATMs and essential services available within 360 Mall."}
              </p>
              <p>
                {t.visit?.fullAccessibility ||
                  "Stroller‑friendly paths, elevators, and accessible facilities throughout the venue."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center max-w-2xl mx-auto grid place-items-center w-full"
        >
          <p className="text-base md:text-lg font-medium text-slate-700 mb-3">
            {t.visit?.welcomeMessage ||
              "Read on to discover how Mama + Baby Expo Kuwait can support you at every step of your parenting journey."}
          </p>
          <p className="text-sm text-slate-600 mb-6">
          </p>
        <motion.button
  whileHover={{
    scale: 1.05,
    boxShadow: "0 15px 35px rgba(8, 26, 88, 0.3)",
    backgroundColor: "#EA6677",
  }}
  whileTap={{ scale: 0.98 }}
  onClick={() => {
    window.open(
      'https://calendar.app.google/jpWh4q4dJ7wvT9XV7', 
      '_blank', 
      'noopener,noreferrer'
    );
  }}
  className="bg-[#081a58] hover:bg-[#EA6677] text-white px-8 py-4 rounded-xl font-medium text-base shadow-lg border border-slate-200 transition-all duration-300 flex items-center gap-2 justify-center"
>
  <span>📅</span>
  <span>{t.visit?.addToCalendar || "Add to Calendar"}</span>
</motion.button>

        </motion.div>
      </div>
    </section>
  );
}
