import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChevronUp, ChevronDown } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface Team {
  rank: number;
  teamName: string;
  record: string;
  winRate: number;
  bushAiRating: number;
  bushAiRankScore: number;
  kdRatio: number;
  averageScoreMargin: number;
  storyTags: string[];
}

type SortKey = "bushAiRating" | "winRate" | "kdRatio" | "averageScoreMargin" | "bushAiRankScore";

interface Props {
  data: Team[];
  chartData: { teamName: string; bushAiRating: number; record: string }[];
}

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "bushAiRating", label: "BushAI Rating" },
  { key: "bushAiRankScore", label: "Rank Score" },
  { key: "winRate", label: "Win Rate" },
  { key: "kdRatio", label: "K/D" },
  { key: "averageScoreMargin", label: "Score Margin" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const d = payload[0].payload;
    return (
      <div className="rounded-xl p-3 text-sm" style={{ background: "#1a1a2e", border: "1px solid rgba(168,85,247,0.4)" }}>
        <p className="font-bold mb-1" style={{ color: "#f8fafc" }}>{d.teamName}</p>
        <p style={{ color: "#a855f7" }}>Rating: {d.bushAiRating}</p>
        <p style={{ color: "#a1a1aa" }}>Record: {d.record}</p>
      </div>
    );
  }
  return null;
};

export default function TeamRankings({ data, chartData }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("bushAiRating");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");

  const sorted = [...data].sort((a, b) => {
    const diff = (a[sortKey] as number) - (b[sortKey] as number);
    return sortDir === "desc" ? -diff : diff;
  });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  return (
    <section id="teams">
      <SectionHeader label="Standings" title="Team Rankings" subtitle="Championship Sunday team performance ranked by BushAI Rating." />

      {/* Sort controls */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sortOptions.map(opt => (
          <button
            key={opt.key}
            onClick={() => toggleSort(opt.key)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
            style={{
              background: sortKey === opt.key ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${sortKey === opt.key ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.1)"}`,
              color: sortKey === opt.key ? "#a855f7" : "#a1a1aa",
            }}
            data-testid={`sort-${opt.key}`}
          >
            {opt.label}
            {sortKey === opt.key && (sortDir === "desc" ? <ChevronDown size={12} /> : <ChevronUp size={12} />)}
          </button>
        ))}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl overflow-hidden mb-10"
        style={{ border: "1px solid rgba(168,85,247,0.2)", background: "#141421" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(168,85,247,0.06)", borderBottom: "1px solid rgba(168,85,247,0.15)" }}>
                {["#", "Team", "Record", "Win %", "BushAI Rating", "Rank Score", "K/D", "Avg Margin", "Tags"].map(col => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase" style={{ color: "#a1a1aa" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((team, i) => {
                const isChamp = team.teamName === "TELLURIDE BUSH GAMING";
                return (
                  <tr
                    key={team.teamName}
                    className="transition-colors duration-200 hover:bg-[rgba(168,85,247,0.06)]"
                    style={{
                      borderBottom: "1px solid rgba(168,85,247,0.08)",
                      background: isChamp ? "rgba(168,85,247,0.05)" : "transparent",
                    }}
                    data-testid={`team-row-${i}`}
                  >
                    <td className="px-4 py-3.5">
                      <span className="font-black text-base" style={{ color: isChamp ? "#a855f7" : "#a1a1aa" }}>
                        {team.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        {isChamp && (
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#a855f7" }} />
                        )}
                        <span className="font-bold" style={{ color: isChamp ? "#f8fafc" : "#e4e4e7" }}>
                          {team.teamName}
                        </span>
                        {isChamp && (
                          <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ background: "rgba(168,85,247,0.2)", color: "#a855f7" }}>
                            CHAMP
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-sm" style={{ color: "#f8fafc" }}>{team.record}</td>
                    <td className="px-4 py-3.5 font-mono" style={{ color: "#f8fafc" }}>{(team.winRate * 100).toFixed(1)}%</td>
                    <td className="px-4 py-3.5">
                      <span className="font-black text-base" style={{ color: isChamp ? "#a855f7" : "#f8fafc" }}>
                        {team.bushAiRating}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono" style={{ color: "#f8fafc" }}>{team.bushAiRankScore}</td>
                    <td className="px-4 py-3.5 font-mono" style={{ color: "#f8fafc" }}>{team.kdRatio}</td>
                    <td className="px-4 py-3.5 font-mono" style={{ color: team.averageScoreMargin >= 0 ? "#4ade80" : "#f87171" }}>
                      {team.averageScoreMargin >= 0 ? "+" : ""}{team.averageScoreMargin}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {team.storyTags?.map(tag => (
                          <span key={tag} className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(168,85,247,0.12)", color: "#a855f7" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Bar chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="rounded-2xl p-6"
        style={{ background: "#141421", border: "1px solid rgba(168,85,247,0.2)" }}
      >
        <p className="text-xs font-bold tracking-widest uppercase mb-6" style={{ color: "#a1a1aa" }}>BushAI Rating Comparison</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 24 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(168,85,247,0.08)" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: "#a1a1aa", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="teamName"
              tick={{ fill: "#a1a1aa", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={140}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(168,85,247,0.05)" }} />
            <Bar dataKey="bushAiRating" radius={[0, 4, 4, 0]}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.teamName}
                  fill={entry.teamName === "TELLURIDE BUSH GAMING" ? "#a855f7" : "#3f3f5a"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </section>
  );
}
