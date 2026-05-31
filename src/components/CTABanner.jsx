import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, BookOpen, Calendar, Sparkles, ClipboardList, CalendarClock, ShieldCheck } from 'lucide-react'
import { PAGES } from '../data/content'

// Faint education glyphs scattered behind the content — contextual texture
const GLYPHS = [
  { Icon: GraduationCap, className: 'top-6 left-6 sm:left-10',          size: 46, rotate: -14 },
  { Icon: BookOpen,      className: 'bottom-7 left-10 sm:left-20',      size: 38, rotate: 10 },
  { Icon: ClipboardList, className: 'top-8 right-10 sm:right-24',       size: 34, rotate: 12 },
  { Icon: Calendar,      className: 'bottom-6 right-6 sm:right-14',     size: 44, rotate: -10 },
  { Icon: Sparkles,      className: 'top-1/2 left-1/3 hidden sm:block', size: 26, rotate: 0 },
]

export default function CTABanner({ data }) {
  const isHSC = data.id === PAGES.HSC

  // Per-page palettes — saturated, jewel-tone backgrounds with high contrast
  const palette = isHSC
    ? {
        // Warm: deep amber → coral
        bg: 'linear-gradient(135deg, #2B1407 0%, #4A1E0A 40%, #6B1F22 100%)',
        glow1: 'bg-amber-500/55',
        glow2: 'bg-rose-500/40',
        ring: 'shadow-[inset_0_0_0_1px_rgba(251,191,36,0.18)]',
        pillBg: 'bg-amber-400',
        pillText: 'text-black',
        pillDot: 'bg-rose-600',
      }
    : {
        // Cool: deep indigo → magenta
        bg: 'linear-gradient(135deg, #1A0B3D 0%, #3B0F5A 45%, #5E1B59 100%)',
        glow1: 'bg-violet-500/55',
        glow2: 'bg-fuchsia-500/40',
        ring: 'shadow-[inset_0_0_0_1px_rgba(167,139,250,0.18)]',
        pillBg: 'bg-amber-300',
        pillText: 'text-amber-950',
        pillDot: 'bg-rose-500',
      }

  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className={`relative rounded-[28px] overflow-hidden px-6 py-12 sm:p-14 text-center border border-white/15 ${palette.ring}`}
          style={{ background: palette.bg }}
        >
          {/* Texture: dotted grid + saturated color glows */}
          <div className="absolute inset-0 grid-overlay opacity-[0.06] pointer-events-none" />
          <div className={`absolute -top-24 -left-24 w-80 h-80 rounded-full blur-[110px] pointer-events-none ${palette.glow1}`} />
          <div className={`absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-[110px] pointer-events-none ${palette.glow2}`} />

          {/* Subtle top sheen */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

          {/* Contextual education glyphs */}
          <div className="absolute inset-0 pointer-events-none text-white/[0.12]">
            {GLYPHS.map(({ Icon, className, size, rotate }, i) => (
              <Icon
                key={i}
                size={size}
                strokeWidth={1.5}
                className={`absolute ${className}`}
                style={{ transform: `rotate(${rotate}deg)` }}
              />
            ))}
          </div>

          <div className="relative">
            {/* High-contrast urgency pill — pulsing dot grabs attention */}
            <span className={`inline-flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-5 ${palette.pillBg} ${palette.pillText} shadow-lg shadow-black/30`}>
              <span className="relative flex items-center justify-center w-4 h-4">
                <span className={`absolute inset-0 rounded-full ${palette.pillDot} opacity-70 animate-ping`} />
                <span className={`relative w-2 h-2 rounded-full ${palette.pillDot}`} />
              </span>
              <CalendarClock size={13} strokeWidth={2.5} />
              {isHSC ? 'সিট সীমিত — ব্যাচ শুরু হচ্ছে' : 'ভর্তি সিজন চলছে — সময় সীমিত'}
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-[2.6rem] font-black text-white mb-3 leading-tight tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
              {isHSC ? 'আর দেরি কেন?' : 'অ্যাডমিশন সিজন শুরু হয়ে গেছে।'}
            </h2>
            <p className="text-sm sm:text-base text-white/85 mb-7 max-w-md mx-auto leading-relaxed">
              {isHSC
                ? 'একটা প্যাকেজেই সব — আজই শুরু করো, এগিয়ে থাকো।'
                : 'প্রতিটি দিন কাউন্ট করে। আজই শুরু করো।'}
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-sm font-bold transition-all ring-2 ring-white/10 ${
                isHSC
                  ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-2xl shadow-amber-500/50'
                  : 'bg-[#017A47] hover:bg-[#018E55] text-white shadow-2xl shadow-[#017A47]/50 border-b-[3px] border-b-[#004F2E]'
              }`}
            >
              {isHSC ? 'প্যাকেজ কিনো' : 'এখনই সাইন আপ করো'}
              <ArrowRight size={16} />
            </motion.button>

            {/* Trust micro-line — brighter than before */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mt-6 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <GraduationCap size={13} className="text-white/60" />
                {data.trustLine || '১০ লাখ+ শিক্ষার্থী'}
              </span>
              <span className="text-white/30">·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-white/60" />
                ৭ দিনে রিফান্ড গ্যারান্টি
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
