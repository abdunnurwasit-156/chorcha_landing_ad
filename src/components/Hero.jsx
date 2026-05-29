import { motion } from "framer-motion";
import {
  Download,
  ArrowDown,
  Users,
  Video,
  ClipboardList,
  Bot,
  Sparkles,
} from "lucide-react";
import { PAGES } from "../data/content";

const statIcons = {
  users: Users,
  video: Video,
  clipboard: ClipboardList,
  bot: Bot,
  sparkles: Sparkles,
};

const statPalette = {
  violet: {
    text: "text-violet-200",
    iconBg: "bg-violet-500/20",
    iconBorder: "border-violet-400/30",
    iconText: "text-violet-300",
    glow: "rgba(167,139,250,0.30)",
  },
  cyan: {
    text: "text-cyan-200",
    iconBg: "bg-cyan-500/20",
    iconBorder: "border-cyan-400/30",
    iconText: "text-cyan-300",
    glow: "rgba(34,211,238,0.30)",
  },
  pink: {
    text: "text-pink-200",
    iconBg: "bg-pink-500/20",
    iconBorder: "border-pink-400/30",
    iconText: "text-pink-300",
    glow: "rgba(244,114,182,0.30)",
  },
  amber: {
    text: "text-amber-200",
    iconBg: "bg-amber-500/20",
    iconBorder: "border-amber-400/30",
    iconText: "text-amber-300",
    glow: "rgba(251,191,36,0.30)",
  },
};

// Desktop float positions — pushed into the gutters so they clear the phone
const floatPos = [
  "top-[3%] -left-4",
  "top-[42%] -right-3",
  "bottom-[3%] -left-4",
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

function StatChip({ s, palette, className = "", floating = false }) {
  const Icon = statIcons[s.icon] || Sparkles;
  const p = palette[s.color] || palette.violet;
  // Floating chips are deliberately more compact than the inline mobile ones
  const pad = floating ? "pl-1.5 pr-3 py-1.5" : "pl-2 pr-4 py-2";
  const dot = floating ? "w-6 h-6" : "w-7 h-7";
  const val = floating ? "text-sm" : "text-base";
  const lbl = floating ? "text-[11px]" : "text-xs sm:text-sm";
  return (
    <div
      className={`flex items-center gap-2 ${pad} rounded-full bg-[#0B0F0D]/85 border border-white/10 backdrop-blur-md ${floating ? "shadow-2xl" : ""} ${className}`}
      style={{
        boxShadow: floating
          ? `0 8px 26px -12px ${p.glow}, 0 0 0 1px rgba(255,255,255,0.03)`
          : `0 0 24px -8px ${p.glow}`,
      }}
    >
      <span
        className={`${dot} rounded-full flex items-center justify-center border ${p.iconBg} ${p.iconBorder}`}
      >
        <Icon size={12} className={p.iconText} strokeWidth={2.25} />
      </span>
      <span className="flex items-baseline gap-1.5 leading-none whitespace-nowrap">
        <span className={`${val} font-black ${p.text}`}>{s.value}</span>
        <span className={`${lbl} text-white/55`}>{s.label}</span>
      </span>
    </div>
  );
}

export default function Hero({ data }) {
  const isHSC = data.id === PAGES.HSC;
  const stats = (data.heroStats || []).slice(0, 3);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Multi-color blob composition — toned down on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35 sm:opacity-80">
        <div className="absolute top-[-15%] left-[-10%] w-[360px] h-[360px] sm:w-[640px] sm:h-[640px] rounded-full blur-[100px] sm:blur-[140px] opacity-[0.16] bg-violet-500 animate-blob-a" />
        <div className="absolute top-[10%] right-[-15%] w-[300px] h-[300px] sm:w-[520px] sm:h-[520px] rounded-full blur-[100px] sm:blur-[130px] opacity-[0.15] bg-cyan-400 animate-blob-b" />
        <div className="absolute bottom-[-15%] left-[20%] w-[340px] h-[340px] sm:w-[560px] sm:h-[560px] rounded-full blur-[100px] sm:blur-[140px] opacity-[0.13] bg-pink-500 animate-blob-a" />
        <div className="absolute bottom-[5%] right-[5%] w-[260px] h-[260px] sm:w-[420px] sm:h-[420px] rounded-full blur-[90px] sm:blur-[120px] opacity-[0.12] bg-orange-400 animate-blob-b" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03] grid-overlay" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-16 w-full relative">
        {/* Left: copy */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div {...fadeUp(0.1)}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border mb-6 bg-white/[0.04] border-white/10 text-white/80 backdrop-blur">
              <span
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${isHSC ? "bg-amber-400" : "bg-violet-400"}`}
              />
              {data.badge}
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight text-white mb-5"
          >
            {data.heroHeadline}{" "}
            <span className="text-gradient-premium">
              {data.heroHeadlineAccent}
            </span>
          </motion.h1>

          {/* Sub paragraph (chips now float around the phone) */}
          <motion.p
            {...fadeUp(0.3)}
            className="text-base sm:text-lg text-white/55 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
          >
            {data.heroSub}
          </motion.p>

          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-[16px] text-sm font-bold transition-all bg-[#017A47] hover:bg-[#018E55] text-white shadow-2xl shadow-[#017A47]/40 border-b-[3px] border-b-[#004F2E]"
            >
              {!isHSC && <Download size={16} />}
              {data.ctaPrimary}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-[16px] text-sm font-semibold border border-white/15 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/[0.03] transition-all"
            >
              {data.ctaSecondary} <ArrowDown size={14} />
            </motion.button>
          </motion.div>

          {/* Mobile inline chips (floating version shown on lg+) */}
          {stats.length > 0 && (
            <motion.div
              {...fadeUp(0.5)}
              className="flex lg:hidden flex-wrap justify-center gap-2.5 max-w-xl mx-auto"
            >
              {stats.map((s) => (
                <StatChip key={s.label} s={s} palette={statPalette} />
              ))}
            </motion.div>
          )}
        </div>

        {/* Right: app composite */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex justify-center items-center relative w-full"
        >
          <div className="animate-float relative">
            {/* Glow behind phone — calmer, green-led with subtle cool accents */}
            <div className="absolute inset-0 rounded-[44px] blur-3xl opacity-[0.28] scale-90 bg-violet-500" />
            <div className="absolute inset-0 rounded-[44px] blur-3xl opacity-[0.16] scale-95 translate-x-8 translate-y-8 bg-pink-500" />
            <div className="absolute inset-0 rounded-[44px] blur-3xl opacity-[0.14] scale-95 -translate-x-8 -translate-y-4 bg-cyan-400" />

            <img
              src="/assets/hero-screen.png"
              alt="Chorcha App"
              className="relative w-56 sm:w-64 lg:w-64 drop-shadow-2xl"
            />
          </div>

          {/* Floating chips — desktop only, spread to the column edges (clear of the phone) */}
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.7 + i * 0.14,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`hidden lg:flex absolute ${floatPos[i]} z-10`}
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <StatChip s={s} palette={statPalette} floating />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
