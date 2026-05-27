import { motion } from 'framer-motion'
import { Check, Video, FlaskConical, Brain, Trophy, Clock } from 'lucide-react'

const INCLUSIONS = [
  { icon: Video,        label: "লাইভ + রেকর্ডেড ক্লাস",          desc: "ক্লাস মিস হলেও রেকর্ড থেকে দেখতে পারবে" },
  { icon: FlaskConical, label: "সাপ্তাহিক পরীক্ষা",               desc: "প্রতি সপ্তাহে মক টেস্ট দিয়ে নিজেকে যাচাই করো" },
  { icon: Trophy,       label: "ফুল সিলেবাস প্রশ্নব্যাংক",        desc: "বিগত বছরের সব প্রশ্ন একটাই জায়গায়" },
  { icon: Brain,        label: "আনলিমিটেড Chorcha AI অ্যাক্সেস",  desc: "যেকোনো প্রশ্নের সাথে সাথে ব্যাখ্যা পাও" },
  { icon: Clock,        label: "২৪/৭ ডাউট সাপোর্ট",               desc: "যেকোনো সময় সাহায্য পাওয়া যাবে" },
]

export default function BatchInfo() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-[5%] w-[400px] h-[400px] rounded-full blur-[150px] opacity-[0.07] bg-violet-500" />
        <div className="absolute top-1/3 right-[5%] w-[400px] h-[400px] rounded-full blur-[150px] opacity-[0.07] bg-cyan-400" />
      </div>

      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-white/60">
            HSC ২৮ সায়েন্স ব্যাচ
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
            এই ব্যাচে{" "}
            <span className="text-gradient-premium">যা যা পাচ্ছ</span>
          </h2>
          <p className="text-sm sm:text-base text-white/45">
            একটা প্ল্যাটফর্মেই টিউশন + কোচিং + টেস্ট প্রিপার সবকিছু।
          </p>
        </motion.div>

        {/* Single full-width inclusions card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.55 }}
          className="card-glass border border-white/8 rounded-2xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INCLUSIONS.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <span
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #00a6ac22, #6639c322)', border: '1px solid #6639c340' }}
                  >
                    <Icon size={16} style={{ color: '#7dd4e0' }} strokeWidth={2} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white/90 mb-0.5">{item.label}</p>
                    <p className="text-xs sm:text-sm text-white/45 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              )
            })}

            {/* CTA card spans full width on sm grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ delay: INCLUSIONS.length * 0.07 }}
              className="sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #00a6ac18, #6639c318)', border: '1px solid #6639c335' }}
            >
              <div className="text-center sm:text-left">
                <p className="text-sm font-bold text-white">সব কিছু একটাই প্যাকেজে</p>
                <p className="text-xs text-white/50 mt-0.5">আলাদা করে কিছু কিনতে হবে না</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #00a6ac, #6639c3)' }}
              >
                প্যাকেজ দেখো →
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
