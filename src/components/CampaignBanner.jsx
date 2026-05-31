import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Copy, Check, ArrowRight, Tag, Clock } from 'lucide-react'
import { PAGES } from '../data/content'

// Map 0-9 → ০-৯ for natural Bengali numerals
const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
const toBn = (n) => String(n).split('').map(d => BN_DIGITS[+d] ?? d).join('')

function getRemaining(endsAt) {
  const diff = new Date(endsAt).getTime() - Date.now()
  if (diff <= 0) return null
  const days  = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins  = Math.floor((diff % 3600000) / 60000)
  const secs  = Math.floor((diff % 60000) / 1000)
  return { days, hours, mins, secs }
}

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      <div className="w-full bg-black/40 border border-white/10 rounded-lg sm:rounded-xl px-1.5 sm:px-3 py-1.5 sm:py-2.5 text-center backdrop-blur-sm">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22 }}
            className="block text-lg sm:text-2xl font-black text-white tabular-nums leading-none"
          >
            {toBn(String(value).padStart(2, '0'))}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[8px] sm:text-[10px] text-white/45 uppercase tracking-widest mt-1 sm:mt-1.5 font-semibold">
        {label}
      </span>
    </div>
  )
}

export default function CampaignBanner({ data }) {
  const c = data?.campaign
  const isHSC = data?.id === PAGES.HSC
  const [remaining, setRemaining] = useState(() => c?.endsAt ? getRemaining(c.endsAt) : null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!c?.enabled || !c?.endsAt) return
    const tick = () => setRemaining(getRemaining(c.endsAt))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [c?.enabled, c?.endsAt])

  if (!c?.enabled || !remaining) return null

  const copyCode = async () => {
    try {
      await navigator.clipboard?.writeText(c.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  const accentRing = isHSC ? 'from-amber-400/60 via-pink-500/40 to-amber-400/60'
                            : 'from-violet-500/60 via-pink-500/40 to-cyan-400/60'

  return (
    <section data-campaign-banner className="px-4 sm:px-6 mt-2 sm:-mt-8 mb-8 sm:mb-10 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className={`rounded-2xl sm:rounded-[24px] p-[1.5px] bg-gradient-to-r ${accentRing}`}>
            <div className="dark-surface relative rounded-[15px] sm:rounded-[22px] overflow-hidden bg-[#0B0F0D]/95 backdrop-blur-xl">
              {/* Background glows */}
              <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute -top-16 -left-10 w-60 h-60 rounded-full blur-[90px] opacity-30 ${isHSC ? 'bg-amber-500' : 'bg-violet-500'}`} />
                <div className={`absolute -bottom-16 -right-10 w-60 h-60 rounded-full blur-[90px] opacity-25 ${isHSC ? 'bg-pink-500' : 'bg-cyan-400'}`} />
                <div className="absolute inset-0 grid-overlay opacity-[0.04]" />
              </div>

              {/* ───── DESKTOP LAYOUT (md+) ───── */}
              <div className="relative hidden md:grid p-6 grid-cols-[1fr_auto_auto] gap-6 items-center">
                {/* LEFT */}
                <div className="min-w-0">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-2 border ${
                    isHSC ? 'bg-amber-500/15 border-amber-400/30 text-amber-200' : 'bg-violet-500/15 border-violet-400/30 text-violet-200'
                  }`}>
                    <Sparkles size={10} />
                    {c.eyebrow}
                  </span>
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className={`text-4xl md:text-5xl font-black leading-none ${isHSC ? 'text-gradient-amber' : 'text-gradient-cool'}`}>
                      {c.discount}
                    </span>
                    <span className="text-base font-bold text-white/80">ছাড়</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-2 leading-snug">{c.headline}</h3>
                  {c.sub && <p className="text-sm text-white/55 mt-1 leading-relaxed">{c.sub}</p>}
                </div>

                {/* MIDDLE: countdown */}
                <div className="flex flex-col items-start border-l border-r border-white/8 px-6">
                  <span className="text-[11px] text-white/45 uppercase tracking-widest font-bold mb-2">
                    অফার শেষ হবে
                  </span>
                  <div className="flex items-end gap-2">
                    <TimeBox value={remaining.days}  label="দিন" />
                    <span className="text-white/30 font-bold text-lg pb-5">:</span>
                    <TimeBox value={remaining.hours} label="ঘণ্টা" />
                    <span className="text-white/30 font-bold text-lg pb-5">:</span>
                    <TimeBox value={remaining.mins}  label="মিনিট" />
                    <span className="text-white/30 font-bold text-lg pb-5">:</span>
                    <TimeBox value={remaining.secs}  label="সেকেন্ড" />
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col gap-2.5">
                  {c.code && (
                    <button onClick={copyCode}
                      className="group flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-dashed border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <span className="flex items-center gap-1.5 text-[10px] text-white/45 uppercase tracking-widest font-bold">
                        <Tag size={10} /> কোড
                      </span>
                      <span className="font-mono font-bold text-sm text-white tracking-wider">{c.code}</span>
                      <span className="text-white/40 group-hover:text-white transition-colors">
                        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={13} />}
                      </span>
                    </button>
                  )}
                  <motion.button whileTap={{ scale: 0.97 }}
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all bg-[#017A47] hover:bg-[#018E55] text-white"
                    style={{ boxShadow: 'inset 0 -3px 0 0 #004F2E' }}>
                    {c.ctaLabel} <ArrowRight size={15} />
                  </motion.button>
                </div>
              </div>

              {/* ───── MOBILE LAYOUT (< md) ───── */}
              <div className="relative md:hidden p-4">
                {/* Header row: eyebrow + small clock indicator */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
                    isHSC ? 'bg-amber-500/15 border-amber-400/30 text-amber-200' : 'bg-violet-500/15 border-violet-400/30 text-violet-200'
                  }`}>
                    <Sparkles size={10} />
                    {c.eyebrow}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-white/45 font-semibold uppercase tracking-wider">
                    <Clock size={10} className="text-white/50" /> শেষ হবে
                  </span>
                </div>

                {/* Discount + headline */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`text-[2.6rem] font-black leading-none ${isHSC ? 'text-gradient-amber' : 'text-gradient-cool'}`}>
                    {c.discount}
                  </span>
                  <span className="text-sm font-bold text-white/80">ছাড়</span>
                </div>
                <h3 className="text-[15px] font-bold text-white leading-snug">{c.headline}</h3>
                {c.sub && <p className="text-xs text-white/50 mt-1 leading-relaxed">{c.sub}</p>}

                {/* Countdown — full-width grid */}
                <div className="mt-4 grid grid-cols-4 gap-1.5">
                  <TimeBox value={remaining.days}  label="দিন" />
                  <TimeBox value={remaining.hours} label="ঘণ্টা" />
                  <TimeBox value={remaining.mins}  label="মিনিট" />
                  <TimeBox value={remaining.secs}  label="সেকেন্ড" />
                </div>

                {/* Code + CTA side by side */}
                <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
                  {c.code && (
                    <button onClick={copyCode}
                      className="group flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl border border-dashed border-white/20 bg-white/[0.03] active:bg-white/[0.06] transition-colors min-w-0">
                      <span className="text-[9px] text-white/45 uppercase tracking-widest font-bold flex-shrink-0">কোড</span>
                      <span className="font-mono font-bold text-xs text-white tracking-wider truncate">{c.code}</span>
                      <span className="text-white/40 flex-shrink-0">
                        {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={12} />}
                      </span>
                    </button>
                  )}
                  <motion.button whileTap={{ scale: 0.97 }}
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all bg-[#017A47] active:bg-[#018E55] text-white whitespace-nowrap"
                    style={{ boxShadow: 'inset 0 -3px 0 0 #004F2E' }}>
                    {c.ctaLabel} <ArrowRight size={13} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
