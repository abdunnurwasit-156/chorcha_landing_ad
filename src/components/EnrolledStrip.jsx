import { motion } from 'framer-motion'
import { Star, ShieldCheck, TrendingUp } from 'lucide-react'

// Sample student avatars for the proof stack
const AVATARS = [61, 44, 67, 47, 25]

export default function EnrolledStrip({ data }) {
  // Pull stats from page data
  const enrolledStat = data?.stats?.find(s => s.label?.includes('ডাউনলোড') || s.label?.includes('শিক্ষার্থী'))
  const ratingStat   = data?.stats?.find(s => s.label?.toLowerCase?.().includes('রিভিউ'))

  const enrolledValue = enrolledStat?.value ?? '১০ লাখ+'
  const ratingValue   = (ratingStat?.value ?? '৪.৬ ★').replace(' ★', '')
  const ratingLabel   = ratingStat?.label ?? '৮ হাজার+ রিভিউ'

  return (
    <section className="px-4 sm:px-6 mt-2 sm:-mt-4 mb-8 sm:mb-12 relative z-[5]">
      <div className="max-w-[1140px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Gradient ring border */}
          <div className="rounded-2xl sm:rounded-[22px] p-[1.5px] bg-gradient-to-r from-violet-500/50 via-amber-400/40 to-pink-500/50">
            <div className="dark-surface relative rounded-[15px] sm:rounded-[20px] overflow-hidden bg-[#0B0F0D]/95 backdrop-blur-xl">

              {/* Soft glows */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-[90px] opacity-40 bg-violet-500" />
                <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full blur-[90px] opacity-30 bg-amber-400" />
                <div className="absolute inset-0 grid-overlay opacity-[0.05]" />
              </div>

              {/* Content row */}
              <div className="relative grid grid-cols-[1fr_auto] sm:grid-cols-3 items-center gap-3 sm:gap-0 px-4 sm:px-6 py-3.5 sm:py-4">

                {/* COLUMN 1 — Enrolled count + avatars */}
                <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                  <div className="flex -space-x-2 flex-shrink-0">
                    {AVATARS.slice(0, 4).map((id, i) => (
                      <img
                        key={id}
                        src={`https://i.pravatar.cc/96?img=${id}`}
                        alt=""
                        loading="lazy"
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#0B0F0D] object-cover"
                        style={{ zIndex: 10 - i }}
                      />
                    ))}
                    <span className="hidden sm:flex w-10 h-10 rounded-full border-2 border-[#0B0F0D] bg-gradient-to-br from-violet-500/30 to-pink-500/30 backdrop-blur items-center justify-center" style={{ zIndex: 1 }}>
                      <TrendingUp size={13} className="text-emerald-300" strokeWidth={2.5} />
                    </span>
                  </div>
                  <div className="min-w-0 leading-tight">
                    <div className="text-lg sm:text-xl md:text-2xl font-black tabular-nums text-gradient-cool">
                      {enrolledValue}
                    </div>
                    <p className="text-[11px] sm:text-xs text-white/55 mt-0.5 leading-snug">
                      শিক্ষার্থী ইতিমধ্যে এই প্যাকেজ নিয়েছে
                    </p>
                  </div>
                </div>

                {/* DIVIDER 1 — desktop only */}
                <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-white/15 to-transparent justify-self-center" />

                {/* COLUMN 2 — Rating */}
                <div className="hidden sm:flex items-center gap-3 min-w-0">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-amber-400/15 border border-amber-300/30">
                    <Star size={18} className="text-amber-300 fill-current" />
                  </div>
                  <div className="min-w-0 leading-tight">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg md:text-xl font-black text-white tabular-nums">{ratingValue}</span>
                      <span className="text-[10px] text-amber-300/80 font-semibold">★ ★ ★ ★ ★</span>
                    </div>
                    <p className="text-[11px] text-white/55 mt-0.5">{ratingLabel}</p>
                  </div>
                </div>

                {/* Mobile compact: Rating chip on the right */}
                <div className="sm:hidden flex flex-col items-end gap-0.5 flex-shrink-0">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-400/15 border border-amber-300/30">
                    <Star size={11} className="text-amber-300 fill-current" />
                    <span className="text-xs font-black text-white tabular-nums">{ratingValue}</span>
                  </div>
                  <span className="text-[9px] text-white/45 font-semibold">{ratingLabel}</span>
                </div>

              </div>

              {/* Bottom thin verified strip */}
              <div className="relative border-t border-white/8 px-4 sm:px-6 py-1.5 sm:py-2 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500/[0.06] via-transparent to-emerald-500/[0.06]">
                <ShieldCheck size={11} className="text-emerald-300" strokeWidth={2.5} />
                <span className="text-[10px] sm:text-[11px] font-semibold text-white/65 tracking-wide">
                  ভেরিফাইড পেমেন্ট · ৭ দিনে রিফান্ড গ্যারান্টি
                </span>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
