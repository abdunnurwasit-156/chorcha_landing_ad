import { lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import EnrolledStrip from "../components/EnrolledStrip";
import { hscData, PAGES } from "../data/content";

// ── Code-split below-fold sections so the initial JS bundle stays small.
// Each lazy() call creates its own chunk — Vite/Rollup serves them on demand
// as the user scrolls. Massive win on slow mobile networks where parsing
// 400KB+ of JS up front can hang the main thread for several seconds.
const Instructors    = lazy(() => import("../components/Instructors"));
const Syllabus       = lazy(() => import("../components/Syllabus"));
const Pricing        = lazy(() => import("../components/Pricing"));
const AppShowcase    = lazy(() => import("../components/AppShowcase"));
const FAQ            = lazy(() => import("../components/FAQ"));
const Toppers        = lazy(() => import("../components/Toppers"));
const Footer         = lazy(() => import("../components/Footer"));
const StickyBuyBar   = lazy(() => import("../components/StickyBuyBar"));

// Minimal placeholder — keeps page layout stable while chunk loads.
const SectionFallback = () => <div className="min-h-[200px]" />;

export default function HSCPage({ activePage, onSwitch }) {
  return (
    <div>
      <Navbar page={PAGES.HSC} activePage={activePage} onSwitch={onSwitch} />
      <Hero data={hscData} />
      <EnrolledStrip data={hscData} />
      <Features data={hscData} />

      <Suspense fallback={<SectionFallback />}>
        <Instructors data={hscData} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Syllabus data={hscData} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Pricing data={hscData} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <AppShowcase data={hscData} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <FAQ data={hscData} />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Toppers data={hscData} />
      </Suspense>

      <Suspense fallback={null}>
        <Footer page={PAGES.HSC} />
      </Suspense>

      <Suspense fallback={null}>
        <StickyBuyBar data={hscData} />
      </Suspense>
    </div>
  );
}
