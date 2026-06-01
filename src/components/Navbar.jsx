import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Check } from 'lucide-react'
import { PAGES } from '../data/content'
import StreamSwitcher from './StreamSwitcher'

const PAGE_OPTIONS = [
  { id: PAGES.ADMISSION, label: 'কলেজ অ্যাডমিশন ২৬', sub: 'Admission 26' },
  { id: PAGES.HSC,       label: 'এইচএসসি ২৮ সায়েন্স', sub: 'HSC 28 Science' },
]

export default function Navbar({ page, activePage, onSwitch }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isHSC = page === PAGES.HSC

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [activePage])

  const navLinks = isHSC
    ? ['ফিচার', 'সিলেবাস', 'টিচার', 'রিভিউ', 'প্রাইসিং']
    : ['ফিচার', 'মডেল টেস্ট', 'টিচার', 'রিভিউ', 'FAQ']

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || menuOpen ? 'bg-[#060C09]/90 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 relative">
        {/* Left: logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <img src="/assets/logo-dark.png" alt="Chorcha" className="dark-logo h-7 sm:h-8 w-auto" />
          <img src="/assets/logo.png" alt="Chorcha" className="light-logo h-7 sm:h-8 w-auto" />
        </div>

        {/* Center cluster — nav links + stream switcher grouped, always centered.
            Mobile: only the switcher (links hide to hamburger).
            Desktop: full cluster (links + switcher) centered as one unit. */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 flex items-center gap-5 lg:gap-6">
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map(link => (
              <a key={link} href="#" className="text-white/55 hover:text-white text-sm transition-colors duration-200 whitespace-nowrap">
                {link}
              </a>
            ))}
          </div>
          <StreamSwitcher />
        </div>

        {/* Right: hamburger */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="মেনু"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-white/80 hover:text-white hover:bg-white/[0.04] transition-all"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-16 bg-[#060C09]/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
              {/* Page switcher block */}
              <div className="mb-6">
                <div className="text-[10px] tracking-widest uppercase text-white/40 mb-3 font-semibold">
                  ল্যান্ডিং পেজ
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PAGE_OPTIONS.map(opt => {
                    const isActive = activePage === opt.id
                    const isAdmission = opt.id === PAGES.ADMISSION
                    return (
                      <button
                        key={opt.id}
                        onClick={() => onSwitch?.(opt.id)}
                        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border text-left transition-all ${
                          isActive
                            ? isAdmission
                              ? 'border-violet-400/40 bg-violet-500/10'
                              : 'border-amber-400/40 bg-amber-500/10'
                            : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div>
                          <div className={`text-sm font-bold ${
                            isActive
                              ? isAdmission ? 'text-violet-200' : 'text-amber-200'
                              : 'text-white/90'
                          }`}>
                            {opt.label}
                          </div>
                          <div className="text-[11px] text-white/40 font-inter">{opt.sub}</div>
                        </div>
                        {isActive && (
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            isAdmission ? 'bg-violet-500 text-white' : 'bg-amber-500 text-black'
                          }`}>
                            <Check size={13} />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Nav links */}
              <div className="border-t border-white/5 pt-4">
                <div className="text-[10px] tracking-widest uppercase text-white/40 mb-3 font-semibold">
                  মেনু
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-4">
                  {navLinks.map(link => (
                    <a key={link} href="#" className="py-2 text-sm text-white/70 hover:text-white transition-colors">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
