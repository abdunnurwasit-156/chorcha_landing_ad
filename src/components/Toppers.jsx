import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { PAGES } from '../data/content'

const palette = [
  { quote: 'text-violet-300/40', rank: 'text-violet-300', dot: 'bg-violet-500' },
  { quote: 'text-pink-300/40',   rank: 'text-pink-300',   dot: 'bg-pink-500' },
  { quote: 'text-cyan-300/40',   rank: 'text-cyan-300',   dot: 'bg-cyan-500' },
  { quote: 'text-amber-300/40',  rank: 'text-amber-300',  dot: 'bg-amber-500' },
]

function Card({ topper, i }) {
  const c = palette[i % palette.length]
  return (
    <div className="card-glass border border-white/8 rounded-2xl p-4 sm:p-5 relative w-[280px] sm:w-[320px] flex-shrink-0">
      <Quote size={20} className={`absolute top-5 right-5 ${c.quote}`} />
      <div className="flex items-center gap-3 mb-3">
        <img
          src={topper.avatar}
          alt={topper.name}
          loading="lazy"
          className="w-12 h-12 rounded-full object-cover border-2 border-white/10 flex-shrink-0"
        />
        <div className="min-w-0">
          <div className="text-sm font-bold text-white truncate">{topper.name}</div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className={`w-1 h-1 rounded-full ${c.dot}`} />
            <span className={c.rank}>{topper.rank}</span>
            <span className="text-white/30">·</span>
            <span className="text-white/40 truncate">{topper.college}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-white/65 leading-relaxed line-clamp-2">"{topper.quote}"</p>
    </div>
  )
}

function MarqueeRow({ items, direction = 'left', startIndex = 0 }) {
  const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
  return (
    <div className="marquee-row overflow-hidden marquee-mask">
      <div className={`flex gap-3 sm:gap-5 w-max ${animClass}`}>
        {[...items, ...items].map((t, idx) => (
          <Card key={`${t.name}-${idx}`} topper={t} i={startIndex + (idx % items.length)} />
        ))}
      </div>
    </div>
  )
}

export default function Toppers({ data }) {
  const isHSC = data.id === PAGES.HSC
  const all = data.toppers || []

  // Distribute toppers across 3 rows. If fewer than 9 entries, gracefully repeat.
  const padded = all.length >= 9 ? all : [...all, ...all, ...all].slice(0, 9)
  const rows = [
    padded.slice(0, 3),
    padded.slice(3, 6),
    padded.slice(6, 9),
  ]

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background: pattern + soft blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 lines-pattern" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.10] bg-violet-500" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.10] bg-pink-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[160px] opacity-[0.06] bg-cyan-400" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block text-gradient-cool">
            সাফল্যের গল্প
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            {isHSC
              ? <>Chorcha-তে পড়ে <span className="text-gradient-premium">তারা সফল</span></>
              : <>Chorcha-তে পড়ে তারা <span className="text-gradient-premium">চান্স পেয়েছে</span></>
            }
          </h2>
          <p className="text-white/50">তাদের কথাই বলুক Chorcha-র গল্প</p>
        </motion.div>
      </div>

      {/* Marquee wall — full bleed with bottom fade */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        transition={{ duration: 0.8 }}
        className="relative marquee-fade-bottom"
      >
        <div className="flex flex-col gap-3 sm:gap-5">
          <MarqueeRow items={rows[0]} direction="left"  startIndex={0} />
          <MarqueeRow items={rows[1]} direction="right" startIndex={1} />
          <MarqueeRow items={rows[2]} direction="left"  startIndex={2} />
        </div>
      </motion.div>
    </section>
  )
}
