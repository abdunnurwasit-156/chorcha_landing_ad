import { motion } from 'framer-motion'
import { Check, X, Sparkles } from 'lucide-react'
import { PAGES } from '../data/content'

const ROWS_ADMISSION = [
  { feature: "মাসিক খরচ",        chorcha: "৳২৪৯",    other: "৳৩,০০০+",   chorcha_is_check: false },
  { feature: "২৪/৭ ডাউট সলভিং", chorcha: true,      other: false },
  { feature: "আনলিমিটেড মক টেস্ট",chorcha: true,     other: false },
  { feature: "AI সাপোর্ট",        chorcha: true,      other: false },
  { feature: "প্রগ্রেস ট্র্যাকিং",chorcha: true,     other: false },
  { feature: "যেকোনো সময় অ্যাক্সেস",chorcha: true,  other: false },
]

const ROWS_HSC = [
  { feature: "মাসিক খরচ",           chorcha: "৳২৪৯",   other: "৳৩,০০০+",  chorcha_is_check: false },
  { feature: "২৪/৭ ডাউট সলভিং",    chorcha: true,     other: false },
  { feature: "আনলিমিটেড মক টেস্ট", chorcha: true,     other: false },
  { feature: "AI সাপোর্ট",          chorcha: true,     other: false },
  { feature: "প্রগ্রেস ট্র্যাকিং", chorcha: true,     other: false },
  { feature: "যেকোনো সময় অ্যাক্সেস",chorcha: true,   other: false },
]

export default function ComparisonTable({ data }) {
  const isHSC = data.id === PAGES.HSC
  const rows = isHSC ? ROWS_HSC : ROWS_ADMISSION

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[180px] opacity-[0.06] bg-cyan-400" />
      </div>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            চর্চা{" "}
            <span className={isHSC ? "text-gradient" : "text-gradient-cool"}>vs</span>
            {" "}সাধারণ কোচিং
          </h2>
          <p className="text-sm sm:text-base text-white/45">একবার মিলিয়ে দেখো — কোথায় বেশি ভ্যালু পাচ্ছ।</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.5 }}
          className="card-glass border border-white/8 rounded-2xl overflow-hidden"
        >
          {/* Table header */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr] sm:grid-cols-[1fr_1fr_1fr] md:grid-cols-[1fr_180px_180px]">
            {/* Feature header */}
            <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-white/8">
              <span className="text-[10px] sm:text-xs font-semibold text-white/40 tracking-widest uppercase">ফিচার</span>
            </div>

            {/* Chorcha header — premium pill */}
            <div
              className="px-2 sm:px-6 py-3 sm:py-4 border-b border-white/8 flex items-center justify-center gap-1.5 relative"
              style={{ background: 'linear-gradient(135deg, #00a6ac33, #6639c333)' }}
            >
              <span
                className="dark-surface inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-sm font-black text-white whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #00a6ac, #6639c3)', boxShadow: 'inset 0 -3px 0 0 rgba(30,20,75,0.5)' }}
              >
                <Sparkles size={10} className="text-white" />
                চর্চা
              </span>
            </div>

            {/* Other header */}
            <div className="px-2 sm:px-6 py-3 sm:py-4 border-b border-white/8 flex items-center justify-center text-center">
              <span className="text-[11px] sm:text-sm font-semibold text-white/40 leading-tight">সাধারণ কোচিং</span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ delay: i * 0.06 }}
              className={`grid grid-cols-[1.4fr_1fr_1fr] sm:grid-cols-[1fr_1fr_1fr] md:grid-cols-[1fr_180px_180px] ${
                i < rows.length - 1 ? 'border-b border-white/[0.05]' : ''
              }`}
            >
              {/* Feature name */}
              <div className="px-3 sm:px-6 py-3 sm:py-4 flex items-center">
                <span className="text-sm sm:text-base font-medium text-white/75 leading-snug">{row.feature}</span>
              </div>

              {/* Chorcha value */}
              <div
                className="px-2 sm:px-6 py-3 sm:py-4 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #00a6ac0a, #6639c30a)' }}
              >
                {typeof row.chorcha === 'boolean' ? (
                  row.chorcha ? (
                    <span
                      className="dark-surface w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #00a6ac, #6639c3)' }}
                    >
                      <Check size={11} className="text-white" strokeWidth={2.5} />
                    </span>
                  ) : (
                    <X size={14} className="text-white/20" />
                  )
                ) : (
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-lg sm:text-2xl font-black whitespace-nowrap text-gradient-cool leading-none">
                      {row.chorcha}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 whitespace-nowrap">
                      ৯২% কম
                    </span>
                  </div>
                )}
              </div>

              {/* Other value */}
              <div className="px-2 sm:px-6 py-3 sm:py-4 flex items-center justify-center">
                {typeof row.other === 'boolean' ? (
                  row.other ? (
                    <Check size={14} className="text-white/50" />
                  ) : (
                    <X size={14} className="text-white/20" strokeWidth={2} />
                  )
                ) : (
                  <span className="text-sm sm:text-base text-white/40 line-through decoration-rose-400/50 whitespace-nowrap">{row.other}</span>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
