import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import AppShowcase from '../components/AppShowcase'
import SummaryStats from '../components/SummaryStats'
import HowItWorks from '../components/HowItWorks'
import Instructors from '../components/Instructors'
import Toppers from '../components/Toppers'
import ComparisonTable from '../components/ComparisonTable'
import CTABanner from '../components/CTABanner'
import CampaignBanner from '../components/CampaignBanner'
import StickyCampaignBar from '../components/StickyCampaignBar'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import { admissionData, PAGES } from '../data/content'

export default function AdmissionPage({ activePage, onSwitch }) {
  return (
    <div>
      <Navbar page={PAGES.ADMISSION} activePage={activePage} onSwitch={onSwitch} />
      <Hero data={admissionData} />
      <CampaignBanner data={admissionData} />
      <Features data={admissionData} />
      <SummaryStats data={admissionData} />
      {/* <HowItWorks data={admissionData} /> */}
      <Instructors data={admissionData} />
      <Toppers data={admissionData} />
      <AppShowcase data={admissionData} />
      {/* <ComparisonTable data={admissionData} /> */}
      <CTABanner data={admissionData} />
      <FAQ data={admissionData} />
      <Footer page={PAGES.ADMISSION} />
      <StickyCampaignBar data={admissionData} />
    </div>
  )
}
