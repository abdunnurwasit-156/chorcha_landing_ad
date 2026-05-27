import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ChevronDown, Play, PlayCircle, Clock, Lock, ChevronsDown } from 'lucide-react'

const COLLAPSED_COUNT = 6

function ChapterRow({ chapter }) {
  return (
    <div className="flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
          chapter.available ? 'bg-violet-500/15 border border-violet-400/25' : 'bg-white/5 border border-white/10'
        }`}>
          {chapter.available
            ? <PlayCircle size={15} className="text-violet-300" />
            : <Lock size={13} className="text-white/30" />
          }
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs sm:text-sm font-semibold text-white/90 truncate">{chapter.name}</div>
          <div className="flex items-center gap-2 sm:gap-3 mt-0.5 text-[10px] sm:text-[11px] text-white/40">
            <span className="flex items-center gap-1">
              <Play size={9} fill="currentColor" />
              {chapter.videos} ভিডিও
            </span>
            <span className="text-white/15">·</span>
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {chapter.duration}
            </span>
          </div>
        </div>
      </div>

      {chapter.available ? (
        <button className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 rounded-full text-[11px] font-bold bg-violet-500 hover:bg-violet-400 text-white transition-colors flex-shrink-0 min-h-[32px]">
          <Play size={10} fill="currentColor" />
          দেখো
        </button>
      ) : (
        <span className="px-2.5 sm:px-3 py-2 rounded-full text-[11px] font-semibold bg-white/5 border border-white/10 text-white/40 flex-shrink-0 min-h-[32px] inline-flex items-center">
          শীঘ্রই
        </span>
      )}
    </div>
  )
}

function SubjectAccordion({ subj, isOpen, onToggle }) {
  const list = subj.chapterList || []
  const availableCount = list.filter(c => c.available).length
  const [showAll, setShowAll] = useState(false)
  const hasMore = list.length > COLLAPSED_COUNT
  const visibleList = showAll || !hasMore ? list : list.slice(0, COLLAPSED_COUNT)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.4 }}
      className="card-glass border border-white/8 rounded-2xl overflow-hidden"
    >
      {/* Header (clickable) */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 hover:bg-white/[0.02] transition-colors text-left"
      >
        <div className="w-12 h-12 flex-shrink-0">
          {subj.svg
            ? <img src={subj.svg} alt="" className="w-12 h-12 object-contain rounded-xl"
                   onError={(e) => { e.currentTarget.style.display = 'none' }} />
            : <div className="w-12 h-12 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center">
                <BookOpen size={20} className="text-white/70" />
              </div>
          }
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-sm sm:text-base font-bold text-white truncate">{subj.name}</div>
          <div className="text-[11px] sm:text-xs text-white/45 mt-0.5">
            {list.length > 0
              ? <>{list.length}টি অধ্যায় · {availableCount > 0 ? `${availableCount}টি এখন দেখো` : 'শীঘ্রই আসছে'}</>
              : subj.chapters}
          </div>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0"
        >
          <ChevronDown size={15} className="text-white/60" />
        </motion.div>
      </button>

      {/* Expanded body */}
      <AnimatePresence initial={false}>
        {isOpen && list.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-3 sm:px-5 pb-4 sm:pb-5 pt-1 space-y-2 border-t border-white/5">
              <div className="pt-3" />
              {visibleList.map((chapter, i) => (
                <ChapterRow key={`${subj.name}-${i}`} chapter={chapter} />
              ))}
              {hasMore && (
                <button
                  onClick={() => setShowAll(s => !s)}
                  className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-white/10 bg-white/[0.03] text-white/70 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all"
                >
                  {showAll ? (
                    <>আরো কম দেখাও</>
                  ) : (
                    <>আরো {list.length - COLLAPSED_COUNT}টি অধ্যায় দেখো <ChevronsDown size={14} /></>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Syllabus({ data }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-[10%] w-[400px] h-[400px] rounded-full blur-[160px] opacity-[0.07] bg-violet-500" />
        <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] rounded-full blur-[160px] opacity-[0.07] bg-cyan-400" />
      </div>

      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block text-gradient-cool">
            সিলেবাস
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            কোর্সে <span className="text-gradient-premium">কী কী আছে</span>
          </h2>
          <p className="text-sm sm:text-base text-white/50">HSC 28 সিলেবাসের সম্পূর্ণ কভারেজ — বিষয় বেছে নাও, অধ্যায় ঘুরে দেখো</p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {data.subjects.map((subj, i) => (
            <SubjectAccordion
              key={subj.name}
              subj={subj}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
