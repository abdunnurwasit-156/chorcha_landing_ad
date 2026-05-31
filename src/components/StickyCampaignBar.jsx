import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Copy, Check, Tag, Clock } from 'lucide-react'

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

export default function StickyCampaignBar({ data }) {
  const c = data?.campaign
  const [visible, setVisible] = useState(false)
  const [remaining, setRemaining] = useState(() => c?.endsAt ? getRemaining(c.endsAt) : null)
  const [copied, setCopied] = useState(false)

  // Countdown ticker
  useEffect(() => {
    if (!c?.enabled || !c?.endsAt) return
    const tick = () => setRemaining(getRemaining(c.endsAt))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [c?.enabled, c?.endsAt])

  // Show/hide on scroll — hide when above hero, when the campaign banner itself
  // is in view (avoid duplicate), or near the footer.
  useEffect(() => {
    const onScroll = () => {
      const heroPassed = window.scrollY > window.innerHeight * 0.85
      // Find the inline campaign banner — if its content area is on screen, hide
      const inlineBanner = document.querySelector('[data-campaign-banner]')
      let inlineInView = false
      if (inlineBanner) {
        const r = inlineBanner.getBoundingClientRect()
        inlineInView = r.top < window.innerHeight * 0.9 && r.bottom > 60
      }
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 120
      setVisible(heroPassed && !inlineInView && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  if (!c?.enabled || !remaining) return null

  const copyCode = async () => {
    try {
      await navigator.clipboard?.writeText(c.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  const scrollToCampaign = () => {
    const inline = document.querySelector('[data-campaign-banner]')
    if (inline) inline.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
          className="fixed bottom-3 inset-x-3 z-50 max-w-3xl mx-auto"
        >
          <div className="dark-surface rounded-2xl border border-white/10 bg-[#0B0F0D]/95 backdrop-blur-xl shadow-2xl shadow-black/60 p-2.5 sm:p-3">

            {/* ───────── DESKTOP / TABLET (sm+) ───────── */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Discount badge */}
              <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-violet-500/15 border border-violet-400/30">
                <span className="text-xl font-black text-gradient-cool leading-none">{c.discount}</span>
                <span className="text-[11px] font-bold text-white/85">ছাড়</span>
              </div>

              {/* Headline */}
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Clock size={10} className="text-violet-300" /> অফার শেষ হবে
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 font-black text-white tabular-nums">
                  <CountUnit val={remaining.days} unit="দি" />
                  <span className="text-white/30">:</span>
                  <CountUnit val={remaining.hours} unit="ঘ" />
                  <span className="text-white/30">:</span>
                  <CountUnit val={remaining.mins} unit="মি" />
                  <span className="text-white/30">:</span>
                  <CountUnit val={remaining.secs} unit="সে" />
                </div>
              </div>

              {/* Code */}
              {c.code && (
                <button onClick={copyCode}
                  className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-white/25 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                  <Tag size={11} className="text-white/45" />
                  <span className="font-mono font-bold text-xs text-white tracking-wider">{c.code}</span>
                  <span className="text-white/45">
                    {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={12} />}
                  </span>
                </button>
              )}

              {/* CTA */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={scrollToCampaign}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all bg-[#017A47] hover:bg-[#018E55] text-white whitespace-nowrap"
                style={{ boxShadow: 'inset 0 -3px 0 0 #004F2E' }}
              >
                {c.ctaLabel}
                <ArrowRight size={14} />
              </motion.button>
            </div>

            {/* ───────── MOBILE (< sm) ───────── */}
            <div className="sm:hidden">
              {/* Row 1: discount + countdown */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 pl-1.5 pr-2 py-1 rounded-lg bg-violet-500/15 border border-violet-400/30">
                  <span className="text-base font-black text-gradient-cool leading-none">{c.discount}</span>
                  <span className="text-[10px] font-bold text-white/85">ছাড়</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-black text-white tabular-nums">
                  <CountUnit val={remaining.days} unit="দি" small />
                  <span className="text-white/30">:</span>
                  <CountUnit val={remaining.hours} unit="ঘ" small />
                  <span className="text-white/30">:</span>
                  <CountUnit val={remaining.mins} unit="মি" small />
                  <span className="text-white/30">:</span>
                  <CountUnit val={remaining.secs} unit="সে" small />
                </div>
              </div>

              {/* Row 2: code + CTA */}
              <div className="flex items-center gap-2">
                {c.code && (
                  <button onClick={copyCode}
                    className="flex-1 flex items-center justify-between gap-1.5 px-2.5 py-2 rounded-lg border border-dashed border-white/25 bg-white/[0.03] min-w-0">
                    <span className="text-[9px] text-white/45 uppercase font-bold tracking-wider flex-shrink-0">কোড</span>
                    <span className="font-mono font-bold text-xs text-white tracking-wider truncate">{c.code}</span>
                    <span className="text-white/45 flex-shrink-0">
                      {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={11} />}
                    </span>
                  </button>
                )}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={scrollToCampaign}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-bold bg-[#017A47] active:bg-[#018E55] text-white whitespace-nowrap"
                  style={{ boxShadow: 'inset 0 -3px 0 0 #004F2E' }}
                >
                  {c.ctaLabel} <ArrowRight size={12} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CountUnit({ val, unit, small = false }) {
  return (
    <span className="inline-flex items-baseline gap-0.5">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={val}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.18 }}
          className="inline-block"
        >
          {toBn(String(val).padStart(2, '0'))}
        </motion.span>
      </AnimatePresence>
      <span className={`${small ? 'text-[8px]' : 'text-[9px]'} text-white/40 font-semibold`}>{unit}</span>
    </span>
  )
}
