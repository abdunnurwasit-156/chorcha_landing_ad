import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, GraduationCap, Check } from 'lucide-react'

// UI-only dropdown — switching has no real effect yet (single-stream landing page)
const STREAMS = [
  { id: 'science',  label: 'সায়েন্স', sub: 'Science' },
  { id: 'commerce', label: 'কমার্স',   sub: 'Commerce' },
  { id: 'arts',     label: 'আর্টস',    sub: 'Arts' },
]

export default function StreamSwitcher() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('science')
  const wrapperRef = useRef(null)

  const current = STREAMS.find(s => s.id === selected) || STREAMS[0]

  // Click-outside to close
  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-1.5 sm:gap-2 pl-2.5 pr-2 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold border border-white/12 bg-white/[0.04] text-white/90 hover:bg-white/[0.08] hover:border-white/20 transition-all whitespace-nowrap"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <GraduationCap size={13} className="text-white/70 flex-shrink-0" />
        <span>{current.label}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-white/60 flex-shrink-0">
          <ChevronDown size={13} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+10px)] z-50 min-w-[200px] rounded-2xl border border-white/10 bg-[#0B0F0D]/97 backdrop-blur-xl shadow-2xl shadow-black/60 p-1.5"
            role="listbox"
          >
            <div className="text-[10px] tracking-[0.18em] uppercase text-white/40 font-bold px-3 pt-2 pb-1.5">
              স্ট্রিম
            </div>
            {STREAMS.map(s => {
              const isActive = s.id === selected
              return (
                <button
                  key={s.id}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => { setSelected(s.id); setOpen(false) }}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                    isActive ? 'bg-white/[0.08]' : 'hover:bg-white/[0.04]'
                  }`}
                >
                  <div>
                    <div className={`text-sm font-bold ${isActive ? 'text-white' : 'text-white/85'}`}>{s.label}</div>
                    <div className="text-[10px] text-white/40 font-medium">{s.sub}</div>
                  </div>
                  {isActive && (
                    <span className="w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center flex-shrink-0">
                      <Check size={11} strokeWidth={3} />
                    </span>
                  )}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
