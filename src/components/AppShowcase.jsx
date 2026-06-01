import { motion } from "framer-motion";
import { PAGES } from "../data/content";

const videos = [
  {
    src: "/assets/video-mocktest.mp4",
    label: "মক পরীক্ষা",
    desc: "যেকোনো টপিক থেকে পরীক্ষা দাও",
    bg: "bg-violet-500",
    chipBg: "bg-violet-500/15",
    chipBorder: "border-violet-400/30",
    chipText: "text-violet-200",
  },
  {
    src: "/assets/video-ai.mp4",
    label: "Chorcha AI",
    desc: "সাথে সাথে ব্যাখ্যা পাও",
    bg: "bg-cyan-400",
    chipBg: "bg-cyan-500/15",
    chipBorder: "border-cyan-400/30",
    chipText: "text-cyan-200",
  },
  {
    src: "/assets/video-archive.mp4",
    label: "প্রশ্নব্যাংক",
    desc: "বিগত বছরের সব প্রশ্ন",
    bg: "bg-pink-500",
    chipBg: "bg-pink-500/15",
    chipBorder: "border-pink-400/30",
    chipText: "text-pink-200",
  },
  {
    src: "/assets/video-mocktest.mp4",
    label: "দ্রুত প্র্যাকটিস",
    desc: "ফ্ল্যাশকার্ড স্টাইলে দ্রুত রিভাইজ করো",
    bg: "bg-sky-500",
    chipBg: "bg-sky-500/15",
    chipBorder: "border-sky-400/30",
    chipText: "text-sky-200",
  },
  {
    src: "/assets/video-ai.mp4",
    label: "লিডারবোর্ড",
    desc: "সেরাদের সাথে নিজেকে মাপো",
    bg: "bg-emerald-500",
    chipBg: "bg-emerald-500/15",
    chipBorder: "border-emerald-400/30",
    chipText: "text-emerald-200",
  },
  {
    src: "/assets/video-archive.mp4",
    label: "ব্যাটেল",
    desc: "বন্ধুকে চ্যালেঞ্জ করো, লাইভে লড়ো",
    bg: "bg-rose-500",
    chipBg: "bg-rose-500/15",
    chipBorder: "border-rose-400/30",
    chipText: "text-rose-200",
  },
];

export default function AppShowcase({ data }) {
  const isHSC = data.id === PAGES.HSC;

  return (
    <section id="app-preview" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-[10%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.10] bg-violet-500" />
        <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] rounded-full blur-[160px] opacity-[0.10] bg-pink-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[180px] opacity-[0.08] bg-cyan-400" />
      </div>

      <div className="max-w-[1140px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="text-center mb-12 sm:mb-16 px-4 sm:px-6"
        >
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block text-gradient-cool">
            অ্যাপ প্রিভিউ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            দেখো কীভাবে{" "}
            <span className="text-gradient-premium">
              কাজ করে
            </span>
          </h2>
          <p className="text-sm sm:text-base text-white/50">
            সহজ ইন্টারফেস, শক্তিশালী ফিচার — নিজেই দেখো
          </p>
        </motion.div>

        {/* ─────────── MOBILE: horizontal scroll carousel ─────────── */}
        <div className="md:hidden relative">
          <div
            className="flex gap-3 overflow-x-auto scroll-smooth pl-6 pr-4 pb-2 snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {videos.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="flex flex-col items-center flex-shrink-0 snap-start"
                style={{ width: 140 }}
              >
                <div
                  className={`mb-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${v.chipBg} ${v.chipBorder} ${v.chipText} whitespace-nowrap`}
                >
                  {v.label}
                </div>

                <div className="relative">
                  <div className={`absolute inset-0 rounded-[24px] blur-2xl opacity-35 scale-90 ${v.bg}`} />
                  <div className="relative w-[140px] rounded-[24px] overflow-hidden shadow-2xl" style={{ aspectRatio: '9/19.5' }}>
                    <video src={v.src} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>

                <p className="text-center text-[11px] text-white/60 mt-3 leading-snug">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─────────── DESKTOP (md+): 3-col grid, 6 mockups across 2 rows ─────────── */}
        <div className="hidden md:grid grid-cols-3 gap-x-6 gap-y-12 justify-items-center px-4 sm:px-6">
          {videos.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div
                className={`mb-4 px-3 py-1 rounded-full text-xs font-semibold border ${v.chipBg} ${v.chipBorder} ${v.chipText}`}
              >
                {v.label}
              </div>

              <div className="relative">
                <div className={`absolute inset-0 rounded-[36px] blur-2xl opacity-35 scale-90 ${v.bg}`} />
                <div className="relative w-56 rounded-[36px] overflow-hidden shadow-2xl" style={{ aspectRatio: '9/19.5' }}>
                  <video src={v.src} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>

              <p className="text-center text-sm sm:text-base text-white/60 mt-4 max-w-[220px]">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
