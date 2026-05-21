import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const RANK_COLORS: Record<number, string> = {
  1: "#eab308",
  2: "#9ca3af",
  3: "#b45309",
  4: "#6b7280",
};

export default function ChampionRoster({ data }: { data: any[] }) {
  if (!data) return null;

  return (
    <section id="roster">
      <SectionHeader
        label="Championship Lineup"
        title="Champion Roster"
        subtitle="The four players who carried Telluride Bush Gaming to the championship."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.map((player, i) => (
          <motion.div
            key={player.playerName}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02] group"
            style={{
              background: "#141421",
              border: "1px solid rgba(168,85,247,0.25)",
              boxShadow: "0 0 0 0 rgba(168,85,247,0)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(168,85,247,0.18)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.5)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(168,85,247,0)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(168,85,247,0.25)";
            }}
            data-testid={`roster-card-${i}`}
          >
            {/* Rank badge */}
            <div className="flex items-center gap-3">
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm"
                style={{ background: `${RANK_COLORS[player.rank]}20`, color: RANK_COLORS[player.rank] }}
              >
                #{player.rank}
              </span>
              <div>
                <p className="font-black text-base" style={{ color: "#f8fafc" }}>{player.playerName}</p>
                <p className="text-xs" style={{ color: "#a1a1aa" }}>{player.teamName}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2">
              {[
                { label: "BushAI Rating", value: player.bushAiRating, accent: true },
                { label: "Rank Score", value: player.bushAiRankScore },
                { label: "K/D Ratio", value: player.kdRatio },
                { label: "Avg Dmg/Map", value: player.averageDamagePerMap?.toFixed(0) },
                { label: "Record", value: player.record },
              ].map(stat => (
                <div key={stat.label} className="flex justify-between items-center">
                  <span className="text-xs" style={{ color: "#a1a1aa" }}>{stat.label}</span>
                  <span className="text-sm font-bold" style={{ color: stat.accent ? "#a855f7" : "#f8fafc" }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Tags */}
            {player.storyTags?.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {player.storyTags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
