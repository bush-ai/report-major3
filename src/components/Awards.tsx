import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

interface AwardsProps {
  data: any;
}

function StoryTag({ tag }: { tag: string }) {
  return (
    <span
      className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mr-1.5 mb-1.5"
      style={{ background: "rgba(168,85,247,0.15)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.3)" }}
    >
      {tag}
    </span>
  );
}

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-[rgba(168,85,247,0.1)]">
      <span className="text-xs font-medium" style={{ color: "#a1a1aa" }}>{label}</span>
      <span className="text-sm font-bold" style={{ color: "#f8fafc" }}>{value}</span>
    </div>
  );
}

export default function Awards({ data }: AwardsProps) {
  const { sundayChampion, bestOverallPlayer, sundayChampionMvp, bestSingleMapPerformance, bestNonChampionPlayer, mostCompleteRoster } = data;

  return (
    <section id="awards">
      <SectionHeader label="Honors" title="Championship Awards" subtitle="Recognition for outstanding performance across Championship Sunday." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* Sunday Champion — featured */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2 lg:col-span-1 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]"
          style={{
            background: "linear-gradient(135deg, #1a0d2e 0%, #141421 60%)",
            border: "1px solid rgba(168,85,247,0.5)",
            boxShadow: "0 0 40px rgba(168,85,247,0.15), inset 0 1px 0 rgba(168,85,247,0.1)",
          }}
          data-testid="award-sunday-champion"
        >
          <p className="text-xs font-black tracking-[0.25em] uppercase mb-1" style={{ color: "#a855f7" }}>Sunday Champion</p>
          <p className="text-2xl font-black mb-4" style={{ color: "#f8fafc" }}>{sundayChampion.teamName}</p>
          <div className="space-y-0.5 mb-4">
            <StatRow label="Map Record" value={sundayChampion.record} />
            <StatRow label="Win Rate" value={`${(sundayChampion.winRate * 100).toFixed(1)}%`} />
            <StatRow label="BushAI Rating" value={sundayChampion.bushAiRating} />
            <StatRow label="BushAI Rank Score" value={sundayChampion.bushAiRankScore} />
            <StatRow label="K/D Ratio" value={sundayChampion.kdRatio} />
            <StatRow label="Avg Score Margin" value={`+${sundayChampion.averageScoreMargin}`} />
          </div>
          <div>{sundayChampion.storyTags?.map((t: string) => <StoryTag key={t} tag={t} />)}</div>
        </motion.div>

        {/* Best Overall Player */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]"
          style={{
            background: "linear-gradient(135deg, #1a0d20 0%, #141421 60%)",
            border: "1px solid rgba(236,72,153,0.45)",
            boxShadow: "0 0 30px rgba(236,72,153,0.12)",
          }}
          data-testid="award-best-player"
        >
          <p className="text-xs font-black tracking-[0.25em] uppercase mb-1" style={{ color: "#ec4899" }}>Best Overall Player</p>
          <p className="text-2xl font-black mb-1" style={{ color: "#f8fafc" }}>{bestOverallPlayer.playerName}</p>
          <p className="text-sm mb-4" style={{ color: "#a1a1aa" }}>{bestOverallPlayer.teamName}</p>
          <div className="space-y-0.5 mb-4">
            <StatRow label="BushAI Rating" value={bestOverallPlayer.bushAiRating} />
            <StatRow label="Rank Score" value={bestOverallPlayer.bushAiRankScore} />
            <StatRow label="K/D" value={bestOverallPlayer.kdRatio} />
            <StatRow label="Total Damage" value={bestOverallPlayer.damage?.toLocaleString()} />
            <StatRow label="Avg Dmg/Map" value={bestOverallPlayer.averageDamagePerMap?.toFixed(0)} />
            <StatRow label="Record" value={bestOverallPlayer.record} />
          </div>
          <div>{bestOverallPlayer.storyTags?.map((t: string) => <StoryTag key={t} tag={t} />)}</div>
        </motion.div>

        {/* Sunday Champion MVP */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]"
          style={{
            background: "linear-gradient(135deg, #160d2a 0%, #141421 60%)",
            border: "1px solid rgba(168,85,247,0.4)",
            boxShadow: "0 0 30px rgba(168,85,247,0.1)",
          }}
          data-testid="award-champion-mvp"
        >
          <p className="text-xs font-black tracking-[0.25em] uppercase mb-1" style={{ color: "#a855f7" }}>Champion MVP</p>
          <p className="text-2xl font-black mb-1" style={{ color: "#f8fafc" }}>{sundayChampionMvp.playerName}</p>
          <p className="text-sm mb-4" style={{ color: "#a1a1aa" }}>{sundayChampionMvp.teamName}</p>
          <div className="space-y-0.5 mb-4">
            <StatRow label="BushAI Rating" value={sundayChampionMvp.bushAiRating} />
            <StatRow label="Rank Score" value={sundayChampionMvp.bushAiRankScore} />
            <StatRow label="K/D" value={sundayChampionMvp.kdRatio} />
            <StatRow label="Total Damage" value={sundayChampionMvp.damage?.toLocaleString()} />
            <StatRow label="Record" value={sundayChampionMvp.record} />
          </div>
          <div>{sundayChampionMvp.storyTags?.map((t: string) => <StoryTag key={t} tag={t} />)}</div>
        </motion.div>

        {/* Best Single-Map Performance */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]"
          style={{
            background: "linear-gradient(135deg, #1a1410 0%, #141421 60%)",
            border: "1px solid rgba(236,72,153,0.35)",
            boxShadow: "0 0 25px rgba(236,72,153,0.08)",
          }}
          data-testid="award-best-map"
        >
          <p className="text-xs font-black tracking-[0.25em] uppercase mb-1" style={{ color: "#ec4899" }}>Best Single-Map Performance</p>
          <p className="text-2xl font-black mb-1" style={{ color: "#f8fafc" }}>{bestSingleMapPerformance.playerName}</p>
          <p className="text-sm mb-4" style={{ color: "#a1a1aa" }}>{bestSingleMapPerformance.mode} · {bestSingleMapPerformance.map}</p>
          <div className="space-y-0.5 mb-4">
            <StatRow label="Kills" value={bestSingleMapPerformance.kills} />
            <StatRow label="Deaths" value={bestSingleMapPerformance.deaths} />
            <StatRow label="Damage" value={bestSingleMapPerformance.damage?.toLocaleString()} />
            <StatRow label="BushAI Map Score" value={bestSingleMapPerformance.bushAiMapScoreWeighted?.toFixed(2)} />
            <StatRow label="Round Multiplier" value={`${bestSingleMapPerformance.roundMultiplier}x`} />
            <StatRow label="Team Won" value={bestSingleMapPerformance.teamWonMap ? "YES" : "NO"} />
          </div>
        </motion.div>

        {/* Best Non-Champion Player */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]"
          style={{
            background: "#141421",
            border: "1px solid rgba(168,85,247,0.25)",
          }}
          data-testid="award-non-champion"
        >
          <p className="text-xs font-black tracking-[0.25em] uppercase mb-1" style={{ color: "#a855f7" }}>Best Non-Champion Player</p>
          <p className="text-2xl font-black mb-1" style={{ color: "#f8fafc" }}>{bestNonChampionPlayer.playerName}</p>
          <p className="text-sm mb-4" style={{ color: "#a1a1aa" }}>{bestNonChampionPlayer.teamName}</p>
          <div className="space-y-0.5">
            <StatRow label="BushAI Rating" value={bestNonChampionPlayer.bushAiRating} />
            <StatRow label="Rank Score" value={bestNonChampionPlayer.bushAiRankScore} />
            <StatRow label="K/D" value={bestNonChampionPlayer.kdRatio} />
            <StatRow label="Total Damage" value={bestNonChampionPlayer.damage?.toLocaleString()} />
            <StatRow label="Avg Dmg/Map" value={bestNonChampionPlayer.averageDamagePerMap?.toFixed(0)} />
            <StatRow label="Record" value={bestNonChampionPlayer.record} />
          </div>
        </motion.div>

        {/* Most Complete Roster */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-2 lg:col-span-1 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01]"
          style={{
            background: "#141421",
            border: "1px solid rgba(168,85,247,0.25)",
          }}
          data-testid="award-most-complete-roster"
        >
          <p className="text-xs font-black tracking-[0.25em] uppercase mb-1" style={{ color: "#a855f7" }}>Most Complete Roster</p>
          <p className="text-xl font-black mb-1" style={{ color: "#f8fafc" }}>{mostCompleteRoster.teamName}</p>
          <p className="text-sm mb-4" style={{ color: "#a1a1aa" }}>{mostCompleteRoster.reason}</p>
          <div className="grid grid-cols-2 gap-2">
            {mostCompleteRoster.players?.map((p: any) => (
              <div
                key={p.playerName}
                className="rounded-lg p-3"
                style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.15)" }}
              >
                <p className="text-xs font-bold" style={{ color: "#f8fafc" }}>#{p.rank} {p.playerName}</p>
                <p className="text-xs mt-1" style={{ color: "#a1a1aa" }}>Rating: {p.bushAiRating}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
