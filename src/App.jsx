import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AdmissionPage from './pages/AdmissionPage'
import HSCPage from './pages/HSCPage'
import { PAGES } from './data/content'

// Path ↔ page mapping
const HSC_PATH = '/hsc-28'

function pageFromPath(pathname) {
  return pathname === HSC_PATH ? PAGES.HSC : PAGES.ADMISSION
}

function pathFromPage(page) {
  return page === PAGES.HSC ? HSC_PATH : '/'
}

export default function App() {
  const [activePage, setActivePage] = useState(() =>
    typeof window === 'undefined' ? PAGES.ADMISSION : pageFromPath(window.location.pathname)
  )

  // Sync state when the user hits back/forward in the browser
  useEffect(() => {
    const onPop = () => setActivePage(pageFromPath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const handleSwitch = (page) => {
    if (page === activePage) return
    const nextPath = pathFromPage(page) + window.location.hash
    window.history.pushState({}, '', nextPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setActivePage(page), 150)
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activePage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {activePage === PAGES.ADMISSION
          ? <AdmissionPage activePage={activePage} onSwitch={handleSwitch} />
          : <HSCPage activePage={activePage} onSwitch={handleSwitch} />}
      </motion.div>
    </AnimatePresence>
  )
}
