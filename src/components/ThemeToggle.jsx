import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

const STORAGE_KEY = 'chorcha-theme'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'light' || saved === 'dark') return saved
  return 'dark'  // default
}

export function applyThemeFromStorage() {
  const t = getInitialTheme()
  document.documentElement.dataset.theme = t
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const t = getInitialTheme()
    setTheme(t)
    document.documentElement.dataset.theme = t
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.dataset.theme = next
    try { localStorage.setItem(STORAGE_KEY, next) } catch {}
  }

  const isLight = theme === 'light'

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? 'ডার্ক মোড' : 'লাইট মোড'}
      title={isLight ? 'Dark mode' : 'Light mode'}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center border border-white/10 text-white/80 hover:text-white hover:bg-white/[0.04] transition-all overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex items-center justify-center"
        >
          {isLight ? <Moon size={16} strokeWidth={2.2} /> : <Sun size={16} strokeWidth={2.2} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
