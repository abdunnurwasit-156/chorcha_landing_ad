import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Clock, Sparkles } from 'lucide-react'

const premiumGradient = 'linear-gradient(to right, #00a6ac, #6639c3)'

// Bengali digit map for the countdown
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

// price + "regular" price (≈ ২৪৯/মাস baseline) to show the discount
const PLANS = [
  { m: '১ মাস',  price: '২৪৯',  original: null,     save: null },
  { m: '৩ মাস',  price: '৪৪৯',  original: '৭৪৭',    save: '৪০%' },
  { m: '৬ মাস',  price: '৫৯৯',  original: '১,৪৯৪',  save: '৬০%' },
  { m: '১২ মাস', price: '১২৯৯', original: '২,৯৮৮',  save: '৫৬%' },
]

export default function StickyBuyBar({ data }) {
  const c = data?.campaign
  const campaignOn = !!c?.enabled
  const [selected, setSelected] = useState(3) // default = popular (১২ মাস)
  const [visible, setVisible] = useState(false)
  const [remaining, setRemaining] = useState(() => c?.endsAt ? getRemaining(c.endsAt) : null)

  // Countdown ticker
  useEffect(() => {
    if (!campaignOn || !c?.endsAt) return
    const tick = () => setRemaining(getRemaining(c.endsAt))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [campaignOn, c?.endsAt])

  // Hide if campaign expired
  const campaignActive = campaignOn && !!remaining

  useEffect(() => {
    const onScroll = () => {
      const heroPassed = window.scrollY > window.innerHeight * 0.85
      // Hide once the real pricing section is on screen (avoid duplication)
      const pricing = document.getElementById('pricing')
      let pricingInView = false
      if (pricing) {
        const r = pricing.getBoundingClientRect()
        pricingInView = r.top < window.innerHeight * 0.9 && r.bottom > 0
      }
      // Hide near the very bottom (footer)
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 120
      setVisible(heroPassed && !pricingInView && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const plan = PLANS[selected]

  const goToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
          className="fixed bottom-3 inset-x-3 z-50 max-w-2xl mx-auto"
        >
          <div className="dark-surface rounded-2xl border border-white/10 bg-[#0B0F0D]/95 backdrop-blur-xl shadow-2xl shadow-black/60 p-2 sm:p-3">

            {/* ───── Campaign row ─────
                Mobile: ultra-compact single line (discount · timer).
                Desktop: roomier two-line block on the left, big timer on the right. */}
            {campaignActive && (
              <>
                {/* Mobile compact strip */}
                <div className="sm:hidden flex items-center justify-between gap-2 px-1 pb-1.5 mb-1.5 border-b border-white/8">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Sparkles size={11} className="text-amber-300 flex-shrink-0" />
                    <span className="text-[13px] font-black text-gradient-amber leading-none">{c.discount}</span>
                    <span className="text-[10px] font-bold text-white/70">ছাড়</span>
                  </div>
                  <div className="flex items-center gap-0.5 flex-shrink-0 text-[11px] font-black text-white tabular-nums">
                    <Clock size={10} className="text-white/40 mr-1" />
                    <TimeUnit val={remaining.days}  label="দি" />
                    <span className="text-white/30 px-0.5">:</span>
                    <TimeUnit val={remaining.hours} label="ঘ" />
                    <span className="text-white/30 px-0.5">:</span>
                    <TimeUnit val={remaining.mins}  label="মি" />
                    <span className="text-white/30 px-0.5">:</span>
                    <TimeUnit val={remaining.secs}  label="সে" />
                  </div>
                </div>

                {/* Desktop roomier row */}
                <div className="hidden sm:flex items-center justify-between gap-3 px-1 pb-2.5 mb-2.5 border-b border-white/8">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center bg-amber-400/20 border border-amber-300/40">
                      <Sparkles size={11} className="text-amber-300" />
                    </span>
                    <div className="min-w-0 leading-tight">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-black text-gradient-amber leading-none">{c.discount}</span>
                        <span className="text-[11px] font-bold text-white/80">ছাড়</span>
                      </div>
                      <div className="text-[10px] text-white/45 font-semibold truncate mt-0.5">
                        {c.eyebrow}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Clock size={11} className="text-white/40 mr-1" />
                    <TimeUnit val={remaining.days}  label="দি" />
                    <span className="text-white/30 text-xs pb-0.5">:</span>
                    <TimeUnit val={remaining.hours} label="ঘ" />
                    <span className="text-white/30 text-xs pb-0.5">:</span>
                    <TimeUnit val={remaining.mins}  label="মি" />
                    <span className="text-white/30 text-xs pb-0.5">:</span>
                    <TimeUnit val={remaining.secs}  label="সে" />
                  </div>
                </div>
              </>
            )}

            {/* Month selector — tighter padding on mobile */}
            <div className="flex gap-1 sm:gap-1.5 mb-2 sm:mb-2.5 p-0.5 sm:p-1 rounded-xl bg-white/[0.04] border border-white/8">
              {PLANS.map((p, i) => (
                <button
                  key={p.m}
                  onClick={() => setSelected(i)}
                  className={`flex-1 py-2.5 sm:py-3 rounded-lg text-[10px] sm:text-xs font-bold transition-all relative ${
                    selected === i ? 'text-white' : 'text-white/40'
                  }`}
                >
                  {selected === i && (
                    <motion.div
                      layoutId="sticky-pill"
                      className="absolute inset-0 rounded-lg bg-white/[0.14] border border-white/15"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{p.m}</span>
                </button>
              ))}
            </div>

            {/* Price + CTA */}
            <div className="flex items-center justify-between gap-2 sm:gap-3 px-1">
              <div className="flex items-baseline gap-1.5 sm:gap-2 min-w-0">
                <span className="text-xl sm:text-3xl font-black text-white leading-none">৳{plan.price}</span>
                {plan.original && (
                  <span className="text-xs sm:text-sm text-white/35 line-through">৳{plan.original}</span>
                )}
                {plan.save && (
                  <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md text-white whitespace-nowrap bg-[#017A47]">
                    {plan.save} সাশ্রয়
                  </span>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={goToPricing}
                className="flex items-center gap-1 sm:gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold text-white whitespace-nowrap flex-shrink-0"
                style={{ background: premiumGradient, boxShadow: 'inset 0 -3px 0 0 rgba(30,20,75,0.55)' }}
              >
                কিনুন <ArrowRight size={14} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Single time unit with smooth digit swap
function TimeUnit({ val, label }) {
  return (
    <span className="inline-flex items-baseline gap-0.5">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={val}
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 3 }}
          transition={{ duration: 0.18 }}
          className="inline-block text-xs font-black text-white tabular-nums"
        >
          {toBn(String(val).padStart(2, '0'))}
        </motion.span>
      </AnimatePresence>
      <span className="text-[8px] text-white/40 font-semibold">{label}</span>
    </span>
  )
}
