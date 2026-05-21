import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ChevronUp, ChevronDown } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface Player {
  rank: number;
  playerName: string;
  teamName: string;
  record: string;
  bushAiRating: number;
  bushAiRankScore: number;
  kdRatio: number;
  damage: number;
  averageDamagePerMap: number;
  storyTags: string[];
}

type SortKey = "bushAiRating" | "bushAiRankScore" | "kdRatio" | "damage" | "averageDamagePerMap";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "bushAiRating", label: "BushAI Rating" },
  { key: "bushAiRankScore", label: "Rank Score" },
  { key: "kdRatio", label: "K/D" },
  { key: "damage", label: "Total Damage" },
  { key: "averageDamagePerMap", label: "Avg Dmg/Map" },
];

const RANK_STYLES: Record<number, { bg: string; color: string; label: string }> = {
  1: { bg: "rgba(234,179,8,0.18)", color: "#eab308", label: "GOLD" },
  2: { bg: "rgba(156,163,175,0.18)", color: "#9ca3af", label: "SILVER" },
  3: { bg: "rgba(180,83,9,0.18)", color: "#b45309", label: "BRONZE" },
};

export default function PlayerRankings({ data }: { data: Player[] }) {
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("bushAiRating");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");

  const teams = useMemo(() => ["All", ...Array.from(new Set(data.map(p => p.teamName)))], [data]);

  const filtered = useMemo(() => {
    let result = [...data];
    if (search) result = result.filter(p => p.playerName.toLowerCase().includes(search.toLowerCase()));
    if (teamFilter !== "All") result = result.filter(p => p.teamName === teamFilter);
    result.sort((a, b) => {
      const diff = (a[sortKey] as number) - (b[sortKey] as number);
      return sortDir === "desc" ? -diff : diff;
    });
    return result;
  }, [data, search, teamFilter, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  return (
    <section id="players">
      <SectionHeader label="Leaderboard" title="Player Rankings" subtitle="Individual performance across all Championship Sunday maps." />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#a1a1aa" }} />
          <input
            type="search"
            placeholder="Search player..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none transition-all"
            style={{
              background: "#141421",
              border: "1px solid rgba(168,85,247,0.25)",
              color: "#f8fafc",
            }}
            data-testid="input-search-player"
          />
        </div>
        <select
          value={teamFilter}
          onChange={e => setTeamFilter(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm outline-none"
          style={{ background: "#141421", border: "1px solid rgba(168,85,247,0.25)", color: "#f8fafc" }}
          data-testid="select-team-filter"
        >
          {teams.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Sort */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sortOptions.map(opt => (
          <button
            key={opt.key}
            onClick={() => toggleSort(opt.key)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: sortKey === opt.key ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${sortKey === opt.key ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.1)"}`,
              color: sortKey === opt.key ? "#a855f7" : "#a1a1aa",
            }}
            data-testid={`sort-player-${opt.key}`}
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
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid rgba(168,85,247,0.2)", background: "#141421" }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(168,85,247,0.06)", borderBottom: "1px solid rgba(168,85,247,0.15)" }}>
                {["#", "Player", "Team", "Record", "Rating", "Rank Score", "K/D", "Damage", "Avg Dmg", "Tags"].map(col => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase whitespace-nowrap" style={{ color: "#a1a1aa" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((player, i) => {
                const rankStyle = RANK_STYLES[player.rank];
                const isCammy = player.playerName === "Cammy";
                const isTop3 = player.rank <= 3;
                return (
                  <tr
                    key={player.playerName}
                    className="transition-colors hover:bg-[rgba(168,85,247,0.04)]"
                    style={{
                      borderBottom: "1px solid rgba(168,85,247,0.07)",
                      background: isCammy ? "rgba(168,85,247,0.05)" : "transparent",
                    }}
                    data-testid={`player-row-${i}`}
                  >
                    <td className="px-4 py-3.5">
                      {isTop3 ? (
                        <span
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black"
                          style={{ background: rankStyle?.bg, color: rankStyle?.color }}
                        >
                          {player.rank}
                        </span>
                      ) : (
                        <span className="font-bold text-sm" style={{ color: "#a1a1aa" }}>{player.rank}</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className="font-bold"
                        style={{ color: isCammy ? "#a855f7" : isTop3 ? "#f8fafc" : "#e4e4e7", fontSize: isTop3 ? "0.95rem" : undefined }}
                      >
                        {player.playerName}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs" style={{ color: "#a1a1aa" }}>{player.teamName}</td>
                    <td className="px-4 py-3.5 font-mono text-xs" style={{ color: "#f8fafc" }}>{player.record}</td>
                    <td className="px-4 py-3.5">
                      <span className="font-black" style={{ color: isCammy ? "#a855f7" : "#f8fafc" }}>{player.bushAiRating}</span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs" style={{ color: "#f8fafc" }}>{player.bushAiRankScore}</td>
                    <td className="px-4 py-3.5 font-mono text-xs" style={{ color: "#f8fafc" }}>{player.kdRatio}</td>
                    <td className="px-4 py-3.5 font-mono text-xs" style={{ color: "#f8fafc" }}>{player.damage?.toLocaleString()}</td>
                    <td className="px-4 py-3.5 font-mono text-xs" style={{ color: "#f8fafc" }}>{player.averageDamagePerMap?.toFixed(0)}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1 max-w-[160px]">
                        {player.storyTags?.map(tag => (
                          <span key={tag} className="text-xs px-1.5 py-0.5 rounded whitespace-nowrap" style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7" }}>
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
        {filtered.length === 0 && (
          <div className="py-12 text-center" style={{ color: "#a1a1aa" }}>No players match your filter.</div>
        )}
      </motion.div>
    </section>
  );
}
