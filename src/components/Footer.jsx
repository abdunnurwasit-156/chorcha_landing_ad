import { PAGES } from '../data/content'

export default function Footer({ page }) {
  const isHSC = page === PAGES.HSC
  return (
    <footer className="border-t border-white/5 py-10 sm:py-12 px-4 sm:px-6 mt-8 sm:mt-12">
      <div className="max-w-[1140px] mx-auto flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
        <div className="flex items-center gap-2">
          <img src="/assets/logo-dark.png" alt="Chorcha" className="h-7 w-auto" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-white/30">
          {['Privacy', 'Terms', 'Refund', 'Contact'].map(l => (
            <a key={l} href="#" className="hover:text-white/60 transition-colors">{l}</a>
          ))}
        </div>

        <p className="text-[11px] sm:text-xs text-white/20 text-center">© 2026 Chorcha. সব অধিকার সংরক্ষিত।</p>
      </div>
    </footer>
  )
}
