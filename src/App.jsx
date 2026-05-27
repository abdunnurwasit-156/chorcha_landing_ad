import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AdmissionPage from './pages/AdmissionPage'
import HSCPage from './pages/HSCPage'
import { PAGES } from './data/content'

export default function App() {
  const [activePage, setActivePage] = useState(PAGES.ADMISSION)

  const handleSwitch = (page) => {
    if (page === activePage) return
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
