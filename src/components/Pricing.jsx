import { motion } from 'framer-motion'
import { Check, Shield, Zap, Star } from 'lucide-react'

const PLANS = [
  {
    duration: "১ মাস",
    price: "২৪৯",
    perMonth: null,
    savings: null,
    features: [
      "সব ফিচার আনলক",
      "আনলিমিটেড মক টেস্ট",
      "Chorcha AI অ্যাক্সেস",
    ],
    popular: false,
  },
  {
    duration: "৩ মাস",
    price: "৪৪৯",
    perMonth: null,
    savings: null,
    features: [
      "সব ফিচার আনলক",
      "আনলিমিটেড মক টেস্ট",
      "Chorcha AI অ্যাক্সেস",
    ],
    popular: false,
  },
  {
    duration: "৬ মাস",
    price: "৫৯৯",
    perMonth: null,
    savings: null,
    features: [
      "সব ফিচার আনলক",
      "আনলিমিটেড মক টেস্ট",
      "Chorcha AI অ্যাক্সেস",
    ],
    popular: false,
  },
  {
    duration: "১২ মাস",
    price: "১২৯৯",
    perMonth: "≈১০৮",
    savings: "৫৬%",
    features: [
      "সব ফিচার আনলক",
      "পরীক্ষা পর্যন্ত পুরো জানি",
      "প্রায়োরিটি সাপোর্ট",
    ],
    popular: true,
  },
]

// Premium gradient from Chorcha Design System
const premiumGradient = 'linear-gradient(to right, #00a6ac, #6639c3)'
const premiumBorder = 'linear-gradient(to right, #00a6ac, #6639c3)'

export default function Pricing({ data }) {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden" id="pricing">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.08]" style={{ background: '#00a6ac' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.08]" style={{ background: '#6639c3' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="text-center mb-14"
        >
          {/* Premium label chip */}
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full border border-white/10"
            style={{ background: 'linear-gradient(to right, rgba(0,166,172,0.15), rgba(102,57,195,0.15))' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: premiumGradient }}
            />
            <span style={{ backgroundImage: premiumGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              চর্চা প্রিমিয়াম
            </span>
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            এক প্যাকেজে সবকিছু
          </h2>
          <p className="text-sm sm:text-base text-white/40">
            যেকোনো প্লানে সব ফিচার আনলক — কোনো লুকানো শর্ত নেই।
          </p>
        </motion.div>

        {/* 4-card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.duration}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative"
            >
              {plan.popular ? (
                // Featured card — gradient border via wrapper
                <div
                  className="rounded-[22px] p-[1.5px]"
                  style={{ background: premiumGradient }}
                >
                  <div
                    className="rounded-[21px] p-6 h-full flex flex-col relative overflow-hidden"
                    style={{ background: 'linear-gradient(145deg, rgba(0,166,172,0.12) 0%, rgba(6,12,9,0.95) 50%, rgba(102,57,195,0.10) 100%)' }}
                  >
                    {/* Popular badge */}
                    <div
                      className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold text-white"
                      style={{ background: premiumGradient }}
                    >
                      <Star size={9} fill="white" />
                      সবচেয়ে জনপ্রিয়
                    </div>

                    <div className="mb-5 mt-1">
                      <div className="text-sm font-semibold text-white/50 mb-3">{plan.duration}</div>
                      <div className="flex items-end gap-1.5">
                        <span className="text-4xl font-black text-white">৳{plan.price}</span>
                      </div>
                      {plan.perMonth && (
                        <div
                          className="text-xs font-semibold mt-1.5"
                          style={{ backgroundImage: premiumGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                        >
                          মাত্র {plan.perMonth}৳/মাস &bull; {plan.savings} সাশ্রয়
                        </div>
                      )}
                    </div>

                    <ul className="space-y-2.5 mb-6 flex-1">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-white/75">
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, rgba(0,166,172,0.25), rgba(102,57,195,0.25))', border: '1px solid rgba(0,166,172,0.3)' }}
                          >
                            <Check size={9} className="text-white" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.02, opacity: 0.92 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all shadow-lg"
                      style={{ background: premiumGradient, boxShadow: '0 8px 32px rgba(0,166,172,0.25)' }}
                    >
                      কিনুন
                    </motion.button>
                  </div>
                </div>
              ) : (
                // Regular card
                <div className="card-glass border border-white/8 rounded-[22px] p-6 h-full flex flex-col">
                  <div className="mb-5">
                    <div className="text-sm font-semibold text-white/50 mb-3">{plan.duration}</div>
                    <div className="flex items-end gap-1.5">
                      <span className="text-4xl font-black text-white">৳{plan.price}</span>
                    </div>
                    <div className="text-xs text-white/30 mt-1.5">এক প্যাকেজে সবকিছু</div>
                  </div>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-white/60">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-white/8 border border-white/10">
                          <Check size={9} className="text-white/60" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl text-sm font-semibold border border-white/10 text-white/70 hover:text-white hover:border-white/20 hover:bg-white/[0.04] transition-all"
                  >
                    কিনুন
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-10 text-sm text-white/55"
        >
          <span className="flex items-center gap-1.5">
            <Shield size={13} className="text-cyan-400" />
            পেমেন্ট ১০০% সিকিউর
          </span>
          <span className="text-white/20">·</span>
          <span>৭ দিনে রিফান্ড গ্যারান্টি</span>
          <span className="text-white/20">·</span>
          <div className="flex items-center gap-2">
            {['bKash', 'Nagad', 'Card'].map(m => (
              <span key={m} className="px-2.5 py-1 bg-white/8 border border-white/10 rounded-md text-white/70 font-semibold text-xs">{m}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
