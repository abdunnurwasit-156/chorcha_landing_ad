import { motion } from 'framer-motion'
import { ArrowRight, GraduationCap, BookOpen, Calendar, Sparkles, ClipboardList, CalendarClock, ShieldCheck } from 'lucide-react'
import { PAGES } from '../data/content'

// Faint education glyphs scattered behind the content — contextual texture
const GLYPHS = [
  { Icon: GraduationCap, className: 'top-6 left-6 sm:left-10',        size: 46, rotate: -14 },
  { Icon: BookOpen,      className: 'bottom-7 left-10 sm:left-20',    size: 38, rotate: 10 },
  { Icon: ClipboardList, className: 'top-8 right-10 sm:right-24',     size: 34, rotate: 12 },
  { Icon: Calendar,      className: 'bottom-6 right-6 sm:right-14',   size: 44, rotate: -10 },
  { Icon: Sparkles,      className: 'top-1/2 left-1/3 hidden sm:block', size: 26, rotate: 0 },
]

export default function CTABanner({ data }) {
  const isHSC = data.id === PAGES.HSC
  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="relative rounded-[28px] overflow-hidden px-6 py-12 sm:p-14 text-center border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(167,139,250,0.18) 0%, rgba(244,114,182,0.13) 50%, rgba(251,146,60,0.13) 100%)',
          }}
        >
          {/* Texture: dotted grid + soft color glows */}
          <div className="absolute inset-0 grid-overlay opacity-[0.05] pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-[110px] bg-violet-500/35 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-[110px] bg-pink-500/30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full blur-[90px] bg-amber-400/20 pointer-events-none" />

          {/* Contextual education glyphs */}
          <div className="absolute inset-0 pointer-events-none text-white/[0.07]">
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
            {/* Context / urgency pill */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5 bg-white/10 border border-white/15 text-white/85 backdrop-blur">
              <CalendarClock size={13} className={isHSC ? 'text-amber-300' : 'text-violet-300'} />
              {isHSC ? 'সিট সীমিত — ব্যাচ শুরু হচ্ছে' : 'ভর্তি সিজন চলছে — সময় সীমিত'}
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] font-black text-white mb-3 leading-tight">
              {isHSC ? 'আর দেরি কেন?' : 'অ্যাডমিশন সিজন শুরু হয়ে গেছে।'}
            </h2>
            <p className="text-sm sm:text-base text-white/70 mb-7 max-w-md mx-auto">
              {isHSC
                ? 'একটা প্যাকেজেই সব — আজই শুরু করো, এগিয়ে থাকো।'
                : 'প্রতিটি দিন কাউন্ট করে। আজই শুরু করো।'}
            </p>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-sm font-bold transition-all ${
                isHSC
                  ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-2xl shadow-amber-500/30'
                  : 'bg-[#017A47] hover:bg-[#018E55] text-white shadow-2xl shadow-[#017A47]/40'
              }`}
            >
              {isHSC ? 'প্যাকেজ কিনো' : 'এখনই সাইন আপ করো'}
              <ArrowRight size={16} />
            </motion.button>

            {/* Trust micro-line */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mt-6 text-xs text-white/55">
              <span className="flex items-center gap-1.5">
                <GraduationCap size={13} className="text-white/45" />
                {data.trustLine || '১০ লাখ+ শিক্ষার্থী'}
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-white/45" />
                ৭ দিনে রিফান্ড গ্যারান্টি
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
