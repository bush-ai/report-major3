import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

export default function SignatureMoment({ data }: { data: any }) {
  if (!data) return null;

  return (
    <section id="moments">
      <SectionHeader label="Peak Performance" title="Signature Moment" />

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0d0720 0%, #1a0830 40%, #141421 100%)",
          border: "1px solid rgba(236,72,153,0.4)",
          boxShadow: "0 0 80px rgba(236,72,153,0.12), 0 0 160px rgba(168,85,247,0.08)",
        }}
      >
        {/* Atmospheric glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 70% at 20% 50%, rgba(236,72,153,0.1) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 80% 50%, rgba(168,85,247,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative px-8 md:px-16 py-16 md:py-20 flex flex-col md:flex-row items-center gap-12">
          {/* Kill number */}
          <div className="flex-shrink-0 text-center">
            <motion.div
              animate={{ textShadow: ["0 0 40px rgba(236,72,153,0.6)", "0 0 80px rgba(236,72,153,0.3)", "0 0 40px rgba(236,72,153,0.6)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <p
                className="font-black leading-none"
                style={{
                  fontSize: "clamp(6rem, 20vw, 12rem)",
                  background: "linear-gradient(135deg, #ec4899, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {data.kills}
              </p>
            </motion.div>
            <p className="text-sm font-bold tracking-[0.3em] uppercase -mt-2" style={{ color: "#a1a1aa" }}>
              KILLS
            </p>
          </div>

          {/* Details */}
          <div className="flex-1">
            <p className="text-xs font-black tracking-[0.3em] uppercase mb-3" style={{ color: "#ec4899" }}>
              Moment of the Day
            </p>
            <p className="text-4xl md:text-5xl font-black mb-2" style={{ color: "#f8fafc" }}>
              {data.playerName}
            </p>
            <p className="text-lg font-semibold mb-1" style={{ color: "#a855f7" }}>
              {data.mode} · {data.map}
            </p>
            <p className="text-sm mb-8" style={{ color: "#a1a1aa" }}>{data.teamName}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Kills / Deaths", value: `${data.kills} / ${data.deaths}` },
                { label: "Damage Dealt", value: data.damage?.toLocaleString() },
                { label: "BushAI Map Score", value: data.bushAiMapScoreWeighted?.toFixed(2) },
                { label: "Base Map Score", value: data.bushAiMapScoreBase?.toFixed(3) },
                { label: "Round Multiplier", value: `${data.roundMultiplier}x` },
                { label: "Team Won Map", value: data.teamWonMap ? "YES" : "NO" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-3"
                  style={{
                    background: "rgba(236,72,153,0.07)",
                    border: "1px solid rgba(236,72,153,0.2)",
                  }}
                  data-testid={`moment-stat-${stat.label}`}
                >
                  <p className="text-lg font-black" style={{ color: "#f8fafc" }}>{stat.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#a1a1aa" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
