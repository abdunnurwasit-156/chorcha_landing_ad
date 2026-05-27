import { motion } from 'framer-motion'
import { Calendar, Clock, Users } from 'lucide-react'

const palette = [
  { bg: 'bg-violet-500/12', border: 'border-violet-400/25', borderHover: 'hover:border-violet-400/45', text: 'text-violet-300' },
  { bg: 'bg-cyan-500/12',   border: 'border-cyan-400/25',   borderHover: 'hover:border-cyan-400/45',   text: 'text-cyan-300' },
  { bg: 'bg-pink-500/12',   border: 'border-pink-400/25',   borderHover: 'hover:border-pink-400/45',   text: 'text-pink-300' },
  { bg: 'bg-amber-500/12',  border: 'border-amber-400/25',  borderHover: 'hover:border-amber-400/45',  text: 'text-amber-300' },
]

export default function ModelTestSchedule({ data }) {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block text-gradient-cool">
            মডেল টেস্ট
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            লাইভ মডেল টেস্ট <span className="text-gradient-premium">শিডিউল</span>
          </h2>
          <p className="text-sm sm:text-base text-white/50">আসল পরীক্ষার আগে নিজেকে যাচাই করো</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.modelTests.map((test, i) => {
            const c = palette[i % palette.length]
            return (
              <motion.div
                key={test.subject}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className={`card-glass border rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 group transition-all duration-300 ${c.border} ${c.borderHover}`}
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${c.bg} ${c.border}`}>
                    <Calendar size={18} className={c.text} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-white truncate">{test.subject}</div>
                    <div className="flex items-center gap-2 sm:gap-3 mt-1 text-[11px] sm:text-xs text-white/50">
                      <span className="flex items-center gap-1"><Calendar size={10} />{test.date}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{test.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="hidden sm:flex items-center gap-1 text-xs text-white/50 justify-end mb-2">
                    <Users size={10} />{test.seats} রেজিস্টার্ড
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="px-3 sm:px-4 py-2 sm:py-1.5 bg-[#016A3E] hover:bg-[#017A47] text-white text-xs font-semibold rounded-full transition-all whitespace-nowrap"
                  >
                    রেজিস্টার
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
