import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PAGES } from '../data/content'

export default function CTABanner({ data }) {
  const isHSC = data.id === PAGES.HSC
  return (
    <section className="py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-6 sm:p-10 md:p-12 text-center border border-white/10"
          style={{
            background: 'linear-gradient(135deg, rgba(167,139,250,0.18) 0%, rgba(244,114,182,0.14) 50%, rgba(251,146,60,0.14) 100%)',
          }}
        >
          {/* Multi-color blob glows */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-[100px] bg-violet-500/40 pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full blur-[100px] bg-pink-500/40 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full blur-[90px] bg-amber-400/25 pointer-events-none" />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 relative leading-tight">
            {isHSC ? 'আর দেরি কেন?' : 'অ্যাডমিশন সিজন শুরু হয়ে গেছে।'}
          </h2>
          <p className="text-sm sm:text-base text-white/70 mb-6 sm:mb-8 max-w-md mx-auto relative">
            {isHSC
              ? 'একটা প্যাকেজেই সব — আজই শুরু করো, এগিয়ে থাকো।'
              : 'প্রতিটি দিন কাউন্ট করে। আজই শুরু করো।'}
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className={`relative inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm font-bold transition-all ${
              isHSC
                ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-2xl shadow-amber-500/30'
                : 'bg-[#016A3E] hover:bg-[#017A47] text-white shadow-2xl shadow-[#016A3E]/40'
            }`}
          >
            {isHSC ? 'প্যাকেজ কিনো' : 'এখনই সাইন আপ করো'}
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
