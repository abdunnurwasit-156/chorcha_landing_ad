import { motion } from 'framer-motion'
import { Users, FileText, PlayCircle, Bot } from 'lucide-react'

const iconMap = { users: Users, 'file-text': FileText, 'play-circle': PlayCircle, bot: Bot }

const palette = [
  { bg: 'bg-violet-500/12', border: 'border-violet-400/25', text: 'text-violet-300', value: 'text-violet-200' },
  { bg: 'bg-cyan-500/12',   border: 'border-cyan-400/25',   text: 'text-cyan-300',   value: 'text-cyan-200' },
  { bg: 'bg-pink-500/12',   border: 'border-pink-400/25',   text: 'text-pink-300',   value: 'text-pink-200' },
  { bg: 'bg-amber-500/12',  border: 'border-amber-400/25',  text: 'text-amber-300',  value: 'text-amber-200' },
]

export default function StatsBar({ data }) {
  return (
    <section className="py-6 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {data.stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Users
            const c = palette[i % palette.length]
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${c.bg} ${c.border}`}>
                  <Icon size={18} className={c.text} />
                </div>
                <div className="min-w-0">
                  <div className={`text-lg sm:text-xl font-black ${c.value}`}>
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-white/45 leading-tight">{stat.label}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
