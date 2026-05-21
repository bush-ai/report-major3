import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

export default function MvpSpotlight({ data }: { data: any }) {
  if (!data) return null;

  const stats = [
    { label: "BushAI Rating", value: data.bushAiRating, highlight: true },
    { label: "Rank Score", value: data.bushAiRankScore, highlight: true },
    { label: "K/D Ratio", value: data.kdRatio },
    { label: "Total Damage", value: data.damage?.toLocaleString() },
    { label: "Avg Dmg / Map", value: data.averageDamagePerMap?.toFixed(0) },
    { label: "Map Record", value: data.record },
  ];

  return (
    <section id="mvp">
      <SectionHeader label="Spotlight" title="MVP Showcase" subtitle="Cammy dominated Championship Sunday from first map to last." />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, #1a0d2e 0%, #141421 50%, #0f0f1e 100%)",
          border: "1px solid rgba(168,85,247,0.5)",
          boxShadow: "0 0 60px rgba(168,85,247,0.15), 0 0 120px rgba(168,85,247,0.06)",
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 60% at 30% 50%, rgba(168,85,247,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Left: identity */}
            <div className="flex-shrink-0">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black mb-4"
                style={{
                  background: "linear-gradient(135deg, #a855f7, #ec4899)",
                  boxShadow: "0 0 30px rgba(168,85,247,0.4)",
                }}
              >
                C
              </div>
              <p className="text-4xl md:text-5xl font-black tracking-tight mb-2" style={{ color: "#f8fafc" }}>
                {data.playerName}
              </p>
              <p className="text-base font-semibold mb-1" style={{ color: "#a855f7" }}>{data.teamName}</p>
              <p className="text-sm" style={{ color: "#a1a1aa" }}>Map Record: {data.record}</p>
              <p className="mt-5 text-base leading-relaxed max-w-xs" style={{ color: "#a1a1aa" }}>
                Best overall player and Sunday Champion MVP. Cammy led the field across every metric that matters — rating, damage, and winning.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {data.storyTags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: "rgba(168,85,247,0.2)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.4)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: stats grid */}
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-4 text-center"
                  style={{
                    background: stat.highlight ? "rgba(168,85,247,0.12)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${stat.highlight ? "rgba(168,85,247,0.35)" : "rgba(255,255,255,0.07)"}`,
                  }}
                  data-testid={`mvp-stat-${stat.label}`}
                >
                  <p className="text-2xl md:text-3xl font-black mb-1"
                    style={{ color: stat.highlight ? "#a855f7" : "#f8fafc" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs font-semibold tracking-wide" style={{ color: "#a1a1aa" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
