import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { PAGES } from '../data/content'

export default function FAQ({ data }) {
  const [open, setOpen] = useState(null)
  const isHSC = data.id === PAGES.HSC

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block text-gradient-cool">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            সাধারণ প্রশ্নের <span className="text-gradient-premium">উত্তর</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {data.faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                open === i
                  ? isHSC ? 'border-amber-400/40 bg-amber-500/5' : 'border-violet-400/40 bg-violet-500/5'
                  : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left gap-3 sm:gap-4"
              >
                <span className="text-sm sm:text-base font-semibold text-white leading-snug">{faq.q}</span>
                <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border ${
                  open === i
                    ? isHSC ? 'bg-amber-500 border-amber-500 text-black' : 'bg-violet-500 border-violet-500 text-white'
                    : 'border-white/15 text-white/40'
                }`}>
                  {open === i ? <Minus size={13} /> : <Plus size={13} />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-white/50 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
