import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import SummaryStats from '../components/SummaryStats'
import CampaignBanner from '../components/CampaignBanner'
import { admissionData, PAGES } from '../data/content'

// ── Code-split below-fold sections (matches HSCPage). Each lazy() call
// produces its own chunk so the initial JS payload stays small for slow phones.
const Instructors      = lazy(() => import('../components/Instructors'))
const Toppers          = lazy(() => import('../components/Toppers'))
const AppShowcase      = lazy(() => import('../components/AppShowcase'))
const CTABanner        = lazy(() => import('../components/CTABanner'))
const FAQ              = lazy(() => import('../components/FAQ'))
const Footer           = lazy(() => import('../components/Footer'))
const StickyCampaignBar = lazy(() => import('../components/StickyCampaignBar'))

const SectionFallback = () => <div className="min-h-[200px]" />

export default function AdmissionPage({ activePage, onSwitch }) {
  return (
    <div>
      <Navbar page={PAGES.ADMISSION} activePage={activePage} onSwitch={onSwitch} />
      <Hero data={admissionData} />
      <CampaignBanner data={admissionData} />
      <Features data={admissionData} />
      <SummaryStats data={admissionData} />

      <Suspense fallback={<SectionFallback />}>
        <Instructors data={admissionData} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Toppers data={admissionData} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <AppShowcase data={admissionData} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <CTABanner data={admissionData} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <FAQ data={admissionData} />
      </Suspense>

      <Suspense fallback={null}>
        <Footer page={PAGES.ADMISSION} />
      </Suspense>

      <Suspense fallback={null}>
        <StickyCampaignBar data={admissionData} />
      </Suspense>
    </div>
  )
}
