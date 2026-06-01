import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, Users, ChevronLeft, ChevronRight, ArrowRight, GraduationCap, BadgeCheck, Award } from "lucide-react";
import { PAGES } from "../data/content";

const subjectPalette = [
  { text: "text-violet-300", dot: "bg-violet-500", glow: "rgba(139,92,246,0.3)" },
  { text: "text-cyan-300",   dot: "bg-cyan-500",   glow: "rgba(34,211,238,0.3)" },
  { text: "text-pink-300",   dot: "bg-pink-500",   glow: "rgba(244,114,182,0.3)" },
  { text: "text-amber-300",  dot: "bg-amber-500",  glow: "rgba(251,191,36,0.3)" },
];

// Responsive widths — mobile keeps ~2.5 cards visible, desktop gets roomier.
// Scroll step uses an average so arrow nav feels right on both.
const CARD_WIDTH = 200; // px — averaged for scroll step calc
const GAP = 12;

export default function Instructors({ data }) {
  const isHSC = data.id === PAGES.HSC;
  const trackRef = useRef(null);
  const autoRef = useRef(null);
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  const scroll = useCallback((dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (CARD_WIDTH + GAP) * 2, behavior: "smooth" });
  }, []);

  // Auto-scroll — desktop only, pause on hover
  const isMobile = () => window.matchMedia("(max-width: 639px)").matches;

  const startAuto = useCallback(() => {
    if (isMobile()) return; // disable on mobile — conflicts with touch scroll
    autoRef.current = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
      el.scrollBy({ left: atEnd ? -(el.scrollWidth) : CARD_WIDTH + GAP, behavior: "smooth" });
    }, 2800);
  }, []);

  const stopAuto = useCallback(() => clearInterval(autoRef.current), []);

  useEffect(() => {
    updateArrows();
    startAuto();
    const el = trackRef.current;
    el?.addEventListener("scroll", updateArrows, { passive: true });
    return () => {
      stopAuto();
      el?.removeEventListener("scroll", updateArrows);
    };
  }, [updateArrows, startAuto, stopAuto]);

  return (
    <section id="teachers" className="pt-10 sm:pt-14 pb-16 sm:pb-20 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-[5%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.07] bg-violet-500" />
        <div className="absolute bottom-1/4 right-[5%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.07] bg-cyan-400" />
      </div>

      <div className="max-w-[1140px] mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="text-center mb-8 sm:mb-12 px-4 sm:px-6"
        >
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block text-gradient-cool">
            টিচার
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            যাদের কাছ থেকে{" "}
            <span className="text-gradient-premium">শিখবে</span>
          </h2>
          <p className="text-sm sm:text-base text-white/50">
            দেশের সেরা শিক্ষকরা তোমার সাফল্যের জন্য প্রস্তুত
          </p>
        </motion.div>

        {/* Carousel wrapper */}
        <div
          className="relative"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          {/* Left arrow */}
          <button
            onClick={() => scroll(-1)}
            disabled={!canLeft}
            className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full hidden sm:flex items-center justify-center border border-white/10 backdrop-blur-sm transition-all duration-200 ${
              canLeft
                ? "bg-white/10 text-white hover:bg-white/20 hover:border-white/30 shadow-lg"
                : "bg-white/[0.02] text-white/15 cursor-not-allowed"
            }`}
          >
            <ChevronLeft size={18} />
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scroll(1)}
            disabled={!canRight}
            className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full hidden sm:flex items-center justify-center border border-white/10 backdrop-blur-sm transition-all duration-200 ${
              canRight
                ? "bg-white/10 text-white hover:bg-white/20 hover:border-white/30 shadow-lg"
                : "bg-white/[0.02] text-white/15 cursor-not-allowed"
            }`}
          >
            <ChevronRight size={18} />
          </button>

          {/* Scrollable track */}
          <div
            ref={trackRef}
            className="flex gap-3 overflow-x-auto scroll-smooth px-4 sm:px-14 pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {data.instructors.map((inst, i) => {
              const c = subjectPalette[i % subjectPalette.length];
              return (
                <motion.div
                  key={inst.name}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="group card-glass border border-white/8 rounded-2xl overflow-hidden flex-shrink-0 transition-shadow duration-300 cursor-default w-[150px] sm:w-[185px] md:w-[210px] lg:w-[230px]"
                  style={{ boxShadow: `0 0 0 0 ${c.glow}`, willChange: "transform" }}
                >
                  {/* Portrait — square */}
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1" }}>
                    <img
                      src={inst.avatar}
                      alt={inst.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060C09] via-[#060C09]/35 to-transparent" />

                    {/* Verified badge — top-right */}
                    <div className="absolute top-2 right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-black/55 backdrop-blur-md border border-white/15">
                      <BadgeCheck size={10} className="text-cyan-300" strokeWidth={2.5} />
                      <span className="text-[9px] font-semibold text-white/90">ভেরিফাইড</span>
                    </div>

                    {/* Subject chip — bottom-left */}
                    <div className={`absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-md border ${c.text === 'text-violet-300' ? 'border-violet-400/40' : c.text === 'text-cyan-300' ? 'border-cyan-400/40' : c.text === 'text-pink-300' ? 'border-pink-400/40' : 'border-amber-400/40'}`}>
                      <span className={`text-[10px] font-bold ${c.text}`}>{inst.subject}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-3 sm:px-3.5 py-2.5 sm:py-3">
                    {/* Name */}
                    <h3 className="text-sm sm:text-[15px] md:text-base font-bold text-white mb-1.5 truncate leading-tight">{inst.name}</h3>

                    {/* University row */}
                    {inst.university && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <GraduationCap size={12} className="text-white/40 flex-shrink-0" />
                        <span className="text-[11px] sm:text-xs text-white/75 font-medium truncate">
                          {inst.university}
                        </span>
                      </div>
                    )}

                    {/* Experience row */}
                    {inst.experience && (
                      <div className="flex items-center gap-1.5">
                        <Award size={12} className="text-white/40 flex-shrink-0" />
                        <span className="text-[11px] sm:text-xs text-white/75 font-medium truncate">
                          {inst.experience} অভিজ্ঞতা
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-2 w-0 sm:w-36 bg-gradient-to-r from-[#060C09] via-[#060C09]/80 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-2 w-0 sm:w-36 bg-gradient-to-l from-[#060C09] via-[#060C09]/80 to-transparent pointer-events-none z-10" />
        </div>

        {/* See all button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border border-white/12 text-white/70 hover:text-white hover:border-white/25 hover:bg-white/[0.04] transition-all"
          >
            সব টিচার দেখো
            <ArrowRight size={15} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
