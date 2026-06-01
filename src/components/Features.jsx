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
    <section id="features" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs font-semibold tracking-widest uppercase mb-4 block text-gradient-cool">
            ফিচারস
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            একটা প্যাকেজে{" "}
            <span className="text-gradient-premium">
              যা যা পাবে
            </span>
          </h2>
          <p className="text-sm sm:text-base text-white/40 max-w-lg mx-auto">
            আলাদা করে কিছু কিনতে হবে না — সব কিছু এক জায়গায়, একটাই দামে
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.features.map((feature, i) => {
            const gif = gifMap[feature.icon];
            const FallbackIcon = fallbackIconMap[feature.icon] || Zap;
            const c = colorMap[feature.color] || colorMap.purple;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-default card-glass ${c.border} hover:shadow-2xl ${c.glow}`}
              >
                <div className="w-14 h-14 flex items-center justify-center mb-4">
                  {gif ? (
                    <img
                      src={gif}
                      alt={feature.title}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <FallbackIcon size={26} className={c.text} />
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-white/50 leading-relaxed">
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
