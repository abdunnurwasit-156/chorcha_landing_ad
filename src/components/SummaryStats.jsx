import { motion } from 'framer-motion'
import { Users, Video, ClipboardList, BookOpen, Calendar, Sparkles } from 'lucide-react'
import { PAGES } from '../data/content'

const STATS_ADMISSION = [
  {
    icon: Users,
    value: "৫০,০০০+",
    label: "শিক্ষার্থী ইতিমধ্যে চর্চা করছে",
    color: { bg: "from-violet-500/20 to-violet-500/5", border: "border-violet-400/30", icon: "text-violet-300", glow: "rgba(167,139,250,0.25)" },
  },
  {
    icon: Video,
    value: "৫০+",
    label: "লাইভ মডেল টেস্ট",
    color: { bg: "from-cyan-500/20 to-cyan-500/5",     border: "border-cyan-400/30",   icon: "text-cyan-300",   glow: "rgba(34,211,238,0.25)" },
  },
  {
    icon: ClipboardList,
    value: "৪৫+",
    label: "এক্সপার্ট ক্লাস",
    color: { bg: "from-pink-500/20 to-pink-500/5",     border: "border-pink-400/30",   icon: "text-pink-300",   glow: "rgba(244,114,182,0.25)" },
  },
  {
    icon: BookOpen,
    value: "১০,০০০+",
    label: "প্রশ্ন ব্যাংক",
    color: { bg: "from-amber-500/20 to-amber-500/5",   border: "border-amber-400/30",  icon: "text-amber-300",  glow: "rgba(251,191,36,0.25)" },
  },
]

const STATS_HSC = [
  {
    icon: Users,
    value: "৫০,০০০+",
    label: "শিক্ষার্থী ইতিমধ্যে চর্চা করছে",
    color: { bg: "from-violet-500/20 to-violet-500/5", border: "border-violet-400/30", icon: "text-violet-300", glow: "rgba(167,139,250,0.25)" },
  },
  {
    icon: Video,
    value: "১৫০+",
    label: "একাডেমিক ভিডিও ক্লাস",
    color: { bg: "from-cyan-500/20 to-cyan-500/5",     border: "border-cyan-400/30",   icon: "text-cyan-300",   glow: "rgba(34,211,238,0.25)" },
  },
  {
    icon: ClipboardList,
    value: "৮০+",
    label: "টপিক টেস্ট ও মডেল টেস্ট",
    color: { bg: "from-pink-500/20 to-pink-500/5",     border: "border-pink-400/30",   icon: "text-pink-300",   glow: "rgba(244,114,182,0.25)" },
  },
  {
    icon: BookOpen,
    value: "২০,০০০+",
    label: "প্রশ্ন ব্যাংক",
    color: { bg: "from-amber-500/20 to-amber-500/5",   border: "border-amber-400/30",  icon: "text-amber-300",  glow: "rgba(251,191,36,0.25)" },
  },
]

export default function SummaryStats({ data }) {
  const isHSC = data?.id === PAGES.HSC
  const STATS = isHSC ? STATS_HSC : STATS_ADMISSION

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.08] bg-violet-500" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.08] bg-cyan-400" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-gradient-cool">
            এক নজরে চর্চা
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
            যা পাচ্ছ <span className="text-gradient-premium">একটাই অ্যাপে</span>
          </h2>
          <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto">
            সংখ্যায় দেখো — কেন হাজার হাজার শিক্ষার্থী চর্চাকে বেছে নিচ্ছে
          </p>
        </motion.div>

        {/* Big number card grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className={`relative rounded-2xl p-5 sm:p-6 border ${stat.color.border} bg-gradient-to-br ${stat.color.bg} backdrop-blur-sm overflow-hidden group transition-[border-color,box-shadow] duration-300 hover:border-white/25`}
                style={{ boxShadow: `0 0 40px -12px ${stat.color.glow}` }}
              >
                {/* Grid line texture — tighter, fades left→right */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                    WebkitMaskImage: 'linear-gradient(to right, black 0%, black 40%, transparent 100%)',
                    maskImage: 'linear-gradient(to right, black 0%, black 40%, transparent 100%)',
                  }}
                />

                {/* Corner shine — grows & brightens on hover */}
                <div
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-30 group-hover:opacity-70 group-hover:scale-125 transition-all duration-500"
                  style={{ background: stat.color.glow }}
                />

                <div className="relative">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-4 bg-white/[0.04] border ${stat.color.border} transition-all duration-300 group-hover:bg-white/[0.09] group-hover:scale-110 group-hover:-rotate-6`}>
                    <Icon size={18} className={stat.color.icon} strokeWidth={2.25} />
                  </div>

                  <div className={`text-3xl sm:text-4xl md:text-5xl font-black ${stat.color.icon} mb-1.5 leading-none origin-left transition-transform duration-300 group-hover:scale-105`}>
                    {stat.value}
                  </div>
                  <p className="text-xs sm:text-sm text-white/65 leading-snug">
                    {stat.label}
                  </p>
                </div>

                {/* Animated accent underline on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${stat.color.glow}, transparent)` }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Trust line below */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 mt-8 sm:mt-10 text-xs sm:text-sm text-white/50"
        >
          <Sparkles size={14} className="text-amber-300" />
          <span>সব কিছু একটাই প্যাকেজে — কোনো লুকানো শর্ত নেই</span>
        </motion.div>
      </div>
    </section>
  )
}
