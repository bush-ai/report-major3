import { motion } from "framer-motion";
import bushAiLogo from "@assets/bushAiLogo_1779324838107.png";

interface QuickFact {
  label: string;
  value: string;
}

interface HeroData {
  title: string;
  mainHeadline: string;
  subHeadline: string;
  quickFacts: QuickFact[];
}

interface HeroProps {
  data: HeroData;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Hero({ data }: HeroProps) {
  return (
    <section id="overview" className="pt-8 pb-4">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(168,85,247,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        {/* Logo + title */}
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={bushAiLogo}
            alt="BushAI"
            className="w-20 h-20 rounded-2xl mb-5 shadow-xl"
            style={{ boxShadow: "0 0 40px rgba(168,85,247,0.4)" }}
          />
          <p
            className="text-xs font-bold tracking-[0.3em] uppercase mb-4"
            style={{ color: "#a855f7" }}
          >
            {data.title}
          </p>
          <h1
            className="text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-3xl"
            style={{ color: "#f8fafc" }}
          >
            {data.mainHeadline}
          </h1>
          <p
            className="mt-5 text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: "#a1a1aa" }}
          >
            {data.subHeadline}
          </p>
        </motion.div>

        {/* Quick facts */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        >
          {data.quickFacts.map((fact, i) => (
            <motion.div
              key={fact.label}
              custom={i}
              variants={fadeUp}
              className="rounded-xl p-4 text-center"
              style={{
                background: "#141421",
                border: "1px solid rgba(168,85,247,0.3)",
                boxShadow: "0 0 16px rgba(168,85,247,0.06)",
              }}
              data-testid={`quick-fact-${i}`}
            >
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#a1a1aa" }}>
                {fact.label}
              </p>
              <p className="font-black text-base md:text-lg tracking-tight" style={{ color: "#f8fafc" }}>
                {fact.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature cards row */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {[
            {
              mark: "01",
              label: "Sunday Champion",
              value: "TELLURIDE BUSH GAMING",
              sub: "10-2 Map Record",
              accent: "#a855f7",
            },
            {
              mark: "02",
              label: "Best Overall Player",
              value: "Cammy",
              sub: "BushAI Rating 84.7",
              accent: "#ec4899",
            },
            {
              mark: "03",
              label: "Champion MVP",
              value: "Cammy",
              sub: "Rank Score 100.0",
              accent: "#a855f7",
            },
            {
              mark: "04",
              label: "Moment of the Day",
              value: "Capsidal",
              sub: "45 Kills on SAKE",
              accent: "#ec4899",
            },
          ].map((card, i) => (
            <motion.div
              key={card.label}
              custom={i}
              variants={fadeUp}
              className="rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #141421 0%, #1a1a2e 100%)",
                border: `1px solid ${card.accent}55`,
                boxShadow: `0 0 24px ${card.accent}18`,
              }}
              data-testid={`hero-card-${i}`}
            >
              <div className="text-xs font-black tracking-[0.2em]" style={{ color: card.accent }}>{card.mark}</div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: card.accent }}>
                {card.label}
              </p>
              <p className="text-xl font-black" style={{ color: "#f8fafc" }}>
                {card.value}
              </p>
              <p className="text-sm" style={{ color: "#a1a1aa" }}>
                {card.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
