import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { PAGES } from "../data/content";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero({ data }) {
  const isHSC = data.id === PAGES.HSC;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Multi-color blob composition — toned down on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35 sm:opacity-80">
        <div className="absolute top-[-15%] left-[-10%] w-[360px] h-[360px] sm:w-[640px] sm:h-[640px] rounded-full blur-[100px] sm:blur-[140px] opacity-[0.16] bg-violet-500 animate-blob-a" />
        <div className="absolute top-[10%] right-[-15%] w-[300px] h-[300px] sm:w-[520px] sm:h-[520px] rounded-full blur-[100px] sm:blur-[130px] opacity-[0.15] bg-cyan-400 animate-blob-b" />
        <div className="absolute bottom-[-15%] left-[20%] w-[340px] h-[340px] sm:w-[560px] sm:h-[560px] rounded-full blur-[100px] sm:blur-[140px] opacity-[0.13] bg-pink-500 animate-blob-a" />
        <div className="absolute bottom-[5%] right-[5%] w-[260px] h-[260px] sm:w-[420px] sm:h-[420px] rounded-full blur-[90px] sm:blur-[120px] opacity-[0.12] bg-orange-400 animate-blob-b" />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.03] grid-overlay" />
      </div>

      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-16 w-full relative">
        {/* Left: copy */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div {...fadeUp(0.1)}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border mb-6 bg-white/[0.04] border-white/10 text-white/80 backdrop-blur">
              <span
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${isHSC ? "bg-amber-400" : "bg-violet-400"}`}
              />
              {data.badge}
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight text-white mb-5"
          >
            {data.heroHeadline}{" "}
            <span className="text-gradient-premium">
              {data.heroHeadlineAccent}
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="text-base sm:text-lg text-white/55 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
          >
            {data.heroSub}
          </motion.p>

          <motion.div
            {...fadeUp(0.4)}
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-[16px] text-sm font-bold transition-all bg-[#017A47] hover:bg-[#018E55] text-white shadow-2xl shadow-[#017A47]/40 border-b-[3px] border-b-[#004F2E]"
            >
              {!isHSC && <Download size={16} />}
              {data.ctaPrimary}
            </motion.button>
          </motion.div>
        </div>

        {/* Right: promo video */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex justify-center items-center relative w-full"
        >
          <div className="relative w-full max-w-[560px] mx-auto">
            {/* Glow behind video — multicolor, calmed down */}
            <div className="absolute inset-0 rounded-[28px] blur-3xl opacity-[0.28] scale-95 bg-violet-500" />
            <div className="absolute inset-0 rounded-[28px] blur-3xl opacity-[0.16] scale-95 translate-x-8 translate-y-8 bg-pink-500" />
            <div className="absolute inset-0 rounded-[28px] blur-3xl opacity-[0.14] scale-95 -translate-x-8 -translate-y-4 bg-cyan-400" />

            {/* Promo video — autoplay muted loop */}
            <div
              className="relative w-full rounded-[20px] sm:rounded-[24px] overflow-hidden border border-white/10 shadow-2xl"
              style={{ aspectRatio: '16 / 9' }}
            >
              <iframe
                src="https://www.youtube.com/embed/awKirOXVI8s?controls=1&modestbranding=1&rel=0&playsinline=1"
                title="Chorcha প্রোমো"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
