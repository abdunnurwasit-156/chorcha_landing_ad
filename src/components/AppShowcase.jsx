import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { PAGES } from "../data/content";

const videos = [
  {
    src: "/assets/video-mocktest.mp4",
    label: "মক পরীক্ষা",
    desc: "যেকোনো টপিক থেকে পরীক্ষা দাও",
    bg: "bg-violet-500",
    chipBg: "bg-violet-500/15",
    chipBorder: "border-violet-400/30",
    chipText: "text-violet-200",
  },
  {
    src: "/assets/video-ai.mp4",
    label: "Chorcha AI",
    desc: "সাথে সাথে ব্যাখ্যা পাও",
    bg: "bg-cyan-400",
    chipBg: "bg-cyan-500/15",
    chipBorder: "border-cyan-400/30",
    chipText: "text-cyan-200",
  },
  {
    src: "/assets/video-archive.mp4",
    label: "প্রশ্নব্যাংক",
    desc: "বিগত বছরের সব প্রশ্ন",
    bg: "bg-pink-500",
    chipBg: "bg-pink-500/15",
    chipBorder: "border-pink-400/30",
    chipText: "text-pink-200",
  },
  {
    src: "/assets/video-mocktest.mp4",
    label: "দ্রুত প্র্যাকটিস",
    desc: "ফ্ল্যাশকার্ড স্টাইলে দ্রুত রিভাইজ করো",
    bg: "bg-sky-500",
    chipBg: "bg-sky-500/15",
    chipBorder: "border-sky-400/30",
    chipText: "text-sky-200",
  },
  {
    src: "/assets/video-ai.mp4",
    label: "লিডারবোর্ড",
    desc: "সেরাদের সাথে নিজেকে মাপো",
    bg: "bg-emerald-500",
    chipBg: "bg-emerald-500/15",
    chipBorder: "border-emerald-400/30",
    chipText: "text-emerald-200",
  },
  {
    src: "/assets/video-archive.mp4",
    label: "ব্যাটেল",
    desc: "বন্ধুকে চ্যালেঞ্জ করো, লাইভে লড়ো",
    bg: "bg-rose-500",
    chipBg: "bg-rose-500/15",
    chipBorder: "border-rose-400/30",
    chipText: "text-rose-200",
  },
];

// Lazy video — only plays when actually on screen (saves GPU/battery on mobile)
function LazyVideo({ src, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.25, rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      loop
      muted
      playsInline
      preload="metadata"
      className={className}
    />
  );
}

// One video card — used in both mobile pinned-scroll and desktop grid.
function MobileCard({ v }) {
  return (
    <div className="flex flex-col items-center flex-shrink-0" style={{ width: 180 }}>
      <div className={`mb-3 px-3 py-1 rounded-full text-[11px] font-semibold border ${v.chipBg} ${v.chipBorder} ${v.chipText} whitespace-nowrap`}>
        {v.label}
      </div>
      <div className="relative">
        <div className={`absolute inset-2 rounded-[28px] blur-xl opacity-25 ${v.bg}`} />
        <div className="relative w-[180px] rounded-[28px] overflow-hidden shadow-2xl" style={{ aspectRatio: '9/19.5' }}>
          <LazyVideo src={v.src} className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
      <p className="text-center text-xs text-white/60 mt-3 leading-snug px-1">
        {v.desc}
      </p>
    </div>
  );
}

// MOBILE: pinned vertical→horizontal scroll
function MobilePinnedShowcase() {
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [translateAmount, setTranslateAmount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -translateAmount]);

  // Measure track width vs viewport to know how far to translate
  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const calc = () => {
      if (!trackRef.current) return;
      const trackW = trackRef.current.scrollWidth;
      const viewW = window.innerWidth;
      // Need to slide the track left by (trackWidth - viewportWidth) so the last
      // card lands at the right edge with a small breathing buffer.
      setTranslateAmount(Math.max(trackW - viewW + 24, 0));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [prefersReducedMotion]);

  // Reduced-motion fallback: ordinary native horizontal scroll
  if (prefersReducedMotion) {
    return (
      <div className="lg:hidden relative">
        <div className="text-center mb-8 px-4">
          <Eyebrow />
        </div>
        <div
          className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pl-[clamp(20px,6vw,40px)] pr-4 pb-2 snap-x"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            touchAction: "pan-x",
            overscrollBehaviorX: "contain",
          }}
        >
          {videos.map((v, i) => (
            <div key={i} className="snap-start">
              <MobileCard v={v} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="lg:hidden relative" style={{ height: "350vh" }}>
      {/* Pinned viewport — sticks while user scrolls, releases at the end of wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Background glows local to the pinned frame */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-[10%] w-[400px] h-[400px] rounded-full blur-[140px] opacity-[0.10] bg-violet-500" />
          <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full blur-[140px] opacity-[0.10] bg-pink-500" />
        </div>

        {/* Header */}
        <div className="text-center mb-8 px-4 relative">
          <Eyebrow />
        </div>

        {/* Horizontal track — translates X based on vertical scroll progress */}
        <motion.div
          ref={trackRef}
          style={{ x, willChange: "transform" }}
          className="flex gap-4 pl-[clamp(20px,6vw,40px)] pr-6"
        >
          {videos.map((v, i) => (
            <MobileCard key={i} v={v} />
          ))}
        </motion.div>

        {/* Progress bar — subtle hint that horizontal scroll is happening */}
        <div className="relative mt-8 px-6">
          <div className="max-w-[1140px] mx-auto h-[3px] rounded-full bg-white/8 overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress, originX: 0 }}
              className="h-full bg-gradient-to-r from-violet-500 via-pink-500 to-amber-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Shared section header
function Eyebrow() {
  return (
    <>
      <span className="text-xs font-semibold tracking-widest uppercase mb-4 block text-gradient-cool">
        অ্যাপ প্রিভিউ
      </span>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
        দেখো কীভাবে{" "}
        <span className="text-gradient-premium">কাজ করে</span>
      </h2>
      <p className="text-sm sm:text-base text-white/50">
        সহজ ইন্টারফেস, শক্তিশালী ফিচার — নিজেই দেখো
      </p>
    </>
  );
}

export default function AppShowcase({ data }) {
  const isHSC = data.id === PAGES.HSC;

  return (
    <section id="app-preview" className="relative">
      {/* ─────────── MOBILE + TABLET: pinned scroll-locked horizontal pan ─────────── */}
      <MobilePinnedShowcase />

      {/* ─────────── DESKTOP (lg+): static 3-col grid ─────────── */}
      <div className="hidden lg:block py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-[10%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.10] bg-violet-500" />
          <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.10] bg-pink-500" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[180px] opacity-[0.08] bg-cyan-400" />
        </div>

        <div className="max-w-[1140px] mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            className="text-center mb-12 md:mb-16 px-4 sm:px-6"
          >
            <Eyebrow />
          </motion.div>

          <div className="grid grid-cols-3 gap-x-6 gap-y-12 justify-items-center px-6">
            {videos.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className={`mb-4 px-3 py-1 rounded-full text-xs font-semibold border ${v.chipBg} ${v.chipBorder} ${v.chipText}`}>
                  {v.label}
                </div>
                <div className="relative">
                  <div className={`absolute inset-0 rounded-[36px] blur-2xl opacity-35 scale-90 ${v.bg}`} />
                  <div className="relative w-56 rounded-[36px] overflow-hidden shadow-2xl" style={{ aspectRatio: "9/19.5" }}>
                    <LazyVideo src={v.src} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>
                <p className="text-center text-sm sm:text-base text-white/60 mt-4 max-w-[220px]">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
