import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const premiumGradient = 'linear-gradient(to right, #00a6ac, #6639c3)'

// price + "regular" price (≈ ২৪৯/মাস baseline) to show the discount
const PLANS = [
  { m: '১ মাস',  price: '২৪৯',  original: null,     save: null },
  { m: '৩ মাস',  price: '৪৪৯',  original: '৭৪৭',    save: '৪০%' },
  { m: '৬ মাস',  price: '৫৯৯',  original: '১,৪৯৪',  save: '৬০%' },
  { m: '১২ মাস', price: '১২৯৯', original: '২,৯৮৮',  save: '৫৬%' },
]

export default function StickyBuyBar() {
  const [selected, setSelected] = useState(3) // default = popular (১২ মাস)
  const [visible, setVisible] = useState(false)

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
          <div className="rounded-2xl border border-white/10 bg-[#0B0F0D]/95 backdrop-blur-xl shadow-2xl shadow-black/60 p-2.5 sm:p-3">
            {/* Month selector */}
            <div className="flex gap-1.5 mb-2.5 p-1 rounded-xl bg-white/[0.04] border border-white/8">
              {PLANS.map((p, i) => (
                <button
                  key={p.m}
                  onClick={() => setSelected(i)}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all relative ${
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
            <div className="flex items-center justify-between gap-3 px-1">
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-2xl sm:text-3xl font-black text-white leading-none">৳{plan.price}</span>
                {plan.original && (
                  <span className="text-sm text-white/35 line-through">৳{plan.original}</span>
                )}
                {plan.save && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md text-white whitespace-nowrap bg-[#017A47]">
                    {plan.save} সাশ্রয়
                  </span>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={goToPricing}
                className="flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-xl text-sm font-bold text-white whitespace-nowrap flex-shrink-0"
                style={{ background: premiumGradient, boxShadow: 'inset 0 -3px 0 0 rgba(0,50,55,0.9)' }}
              >
                কিনুন <ArrowRight size={15} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
