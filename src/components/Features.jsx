import { motion } from "framer-motion";
import { FileText, Calendar, Video, Zap } from "lucide-react";
import { PAGES } from "../data/content";

const gifMap = {
  infinite: "/assets/mocktest.gif",
  "file-text": null,
  archive: "/assets/box.gif",
  bot: "/assets/ai-comp.gif",
  trophy: "/assets/leaderboard.gif",
  calendar: "/assets/Routine.svg",
  video: "/assets/video_icon.svg",
  zap: null,
};

const fallbackIconMap = {
  "file-text": FileText,
  calendar: Calendar,
  video: Video,
  zap: Zap,
};

const colorMap = {
  purple: {
    bg: "bg-violet-500/12",
    border: "border-violet-400/25",
    text: "text-violet-300",
    glow: "group-hover:shadow-violet-500/25",
    ring: "from-violet-500/30",
  },
  blue: {
    bg: "bg-sky-500/12",
    border: "border-sky-400/25",
    text: "text-sky-300",
    glow: "group-hover:shadow-sky-500/25",
    ring: "from-sky-500/30",
  },
  green: {
    bg: "bg-emerald-500/12",
    border: "border-emerald-400/25",
    text: "text-emerald-300",
    glow: "group-hover:shadow-emerald-500/25",
    ring: "from-emerald-500/30",
  },
  amber: {
    bg: "bg-amber-500/12",
    border: "border-amber-400/25",
    text: "text-amber-300",
    glow: "group-hover:shadow-amber-500/25",
    ring: "from-amber-500/30",
  },
  pink: {
    bg: "bg-pink-500/12",
    border: "border-pink-400/25",
    text: "text-pink-300",
    glow: "group-hover:shadow-pink-500/25",
    ring: "from-pink-500/30",
  },
  cyan: {
    bg: "bg-cyan-500/12",
    border: "border-cyan-400/25",
    text: "text-cyan-300",
    glow: "group-hover:shadow-cyan-500/25",
    ring: "from-cyan-500/30",
  },
};

export default function Features({ data }) {
  const isHSC = data.id === PAGES.HSC;
  return (
    <section id="features" className="py-10 sm:py-14 md:py-18 px-4 sm:px-6">
      <div className="max-w-[1140px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="text-xs font-semibold tracking-widest uppercase mb-3 block text-gradient-cool">
            ফিচারস
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
            একটা প্যাকেজে{" "}
            <span className="text-gradient-premium">
              যা যা পাবে
            </span>
          </h2>
          <p className="text-sm text-white/40 max-w-lg mx-auto">
            আলাদা করে কিছু কিনতে হবে না — সব কিছু এক জায়গায়, একটাই দামে
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
          {data.features.map((feature, i) => {
            const gif = gifMap[feature.icon];
            const FallbackIcon = fallbackIconMap[feature.icon] || Zap;
            const c = colorMap[feature.color] || colorMap.purple;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                whileHover={{ y: -3 }}
                className={`group relative p-3.5 sm:p-4 rounded-xl border transition-all duration-300 cursor-default card-glass ${c.border} hover:shadow-xl ${c.glow}`}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center mb-2.5">
                  {gif ? (
                    <img
                      src={gif}
                      alt={feature.title}
                      className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                    />
                  ) : (
                    <FallbackIcon size={22} className={c.text} />
                  )}
                </div>
                <h3 className="text-[13px] sm:text-sm font-bold text-white mb-1 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-white/50 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
