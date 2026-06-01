import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StatsBar from "../components/StatsBar";
import SummaryStats from "../components/SummaryStats";
import Features from "../components/Features";
import AppShowcase from "../components/AppShowcase";
import Syllabus from "../components/Syllabus";
import BatchInfo from "../components/BatchInfo";
import HowItWorks from "../components/HowItWorks";
import Instructors from "../components/Instructors";
import Toppers from "../components/Toppers";
import ComparisonTable from "../components/ComparisonTable";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import StickyBuyBar from "../components/StickyBuyBar";
import CampaignBanner from "../components/CampaignBanner";
import EnrolledStrip from "../components/EnrolledStrip";
import { hscData, PAGES } from "../data/content";

export default function HSCPage({ activePage, onSwitch }) {
  return (
    <div>
      <Navbar page={PAGES.HSC} activePage={activePage} onSwitch={onSwitch} />
      <Hero data={hscData} />
      <EnrolledStrip data={hscData} />
      {/* <CampaignBanner data={hscData} /> */}
      {/* <SummaryStats data={hscData} /> */}
      <Features data={hscData} />
      <Instructors data={hscData} />
      <Syllabus data={hscData} />
      {/* <HowItWorks data={hscData} /> */}
      <Pricing data={hscData} />
      {/* <ComparisonTable data={hscData} /> */}
      <AppShowcase data={hscData} />
      <FAQ data={hscData} />
      <Toppers data={hscData} />
      <Footer page={PAGES.HSC} />
      <StickyBuyBar data={hscData} />
    </div>
  );
}
