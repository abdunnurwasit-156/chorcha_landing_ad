import { motion } from 'framer-motion'
import { PAGES } from '../data/content'

const stepPalette = [
  { bg: 'bg-violet-500/12', border: 'border-violet-400/30', text: 'text-violet-200', dot: 'bg-violet-500' },
  { bg: 'bg-cyan-500/12',   border: 'border-cyan-400/30',   text: 'text-cyan-200',   dot: 'bg-cyan-400' },
  { bg: 'bg-pink-500/12',   border: 'border-pink-400/30',   text: 'text-pink-200',   dot: 'bg-pink-500' },
]

export default function HowItWorks({ data }) {
  const isHSC = data.id === PAGES.HSC
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block text-gradient-cool">
            কীভাবে শুরু করবে
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            ৩টা স্টেপে <span className="text-gradient-premium">প্রস্তুতি নাও</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {data.steps.map((step, i) => {
              const c = stepPalette[i % stepPalette.length]
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border ${c.bg} ${c.border}`}>
                    <span className={`text-2xl font-black ${c.text}`}>
                      {step.step}
                    </span>
                    <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold text-white ${c.dot}`}>
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm sm:text-base text-white/50 leading-relaxed">{step.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
