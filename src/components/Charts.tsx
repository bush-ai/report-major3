import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";
import SectionHeader from "./SectionHeader";

interface ChartData {
  teamBushAiRatings: { teamName: string; bushAiRating: number; record: string }[];
  topPlayerBushAiRatings: { playerName: string; teamName: string; bushAiRating: number; rankScore: number }[];
  championRoster: { playerName: string; bushAiRating: number; rank: number }[];
}

const chartBg = "#0d0d1a";
const axisColor = "#a1a1aa";
const gridColor = "rgba(168,85,247,0.08)";
const barPurple = "#a855f7";
const barDim = "#3f3f5a";

const TeamTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl p-3 text-sm" style={{ background: "#1a1a2e", border: "1px solid rgba(168,85,247,0.4)" }}>
      <p className="font-bold mb-1" style={{ color: "#f8fafc" }}>{d.teamName}</p>
      <p style={{ color: "#a855f7" }}>Rating: {d.bushAiRating}</p>
      {d.record && <p style={{ color: "#a1a1aa" }}>Record: {d.record}</p>}
    </div>
  );
};

const PlayerTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl p-3 text-sm" style={{ background: "#1a1a2e", border: "1px solid rgba(168,85,247,0.4)" }}>
      <p className="font-bold mb-1" style={{ color: "#f8fafc" }}>{d.playerName}</p>
      <p className="text-xs mb-1" style={{ color: "#a1a1aa" }}>{d.teamName}</p>
      <p style={{ color: "#a855f7" }}>Rating: {d.bushAiRating}</p>
      <p style={{ color: "#a1a1aa" }}>Rank Score: {d.rankScore}</p>
    </div>
  );
};

export default function Charts({ data }: { data: ChartData }) {
  const topPlayers = data.topPlayerBushAiRatings?.slice(0, 8) ?? [];

  return (
    <section id="charts">
      <SectionHeader label="Analytics" title="Chart Dashboard" subtitle="Visual breakdown of Championship Sunday performance metrics." />

      <div className="space-y-6">
        {/* Team BushAI Ratings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-6"
          style={{ background: "#141421", border: "1px solid rgba(168,85,247,0.2)" }}
          data-testid="chart-team-ratings"
        >
          <p className="text-xs font-black tracking-[0.2em] uppercase mb-1" style={{ color: "#a855f7" }}>Team Performance</p>
          <p className="text-xl font-black mb-6" style={{ color: "#f8fafc" }}>Team BushAI Ratings</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={data.teamBushAiRatings}
              layout="vertical"
              margin={{ left: 0, right: 32, top: 4, bottom: 4 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="teamName"
                tick={{ fill: axisColor, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={150}
              />
              <Tooltip content={<TeamTooltip />} cursor={{ fill: "rgba(168,85,247,0.05)" }} />
              <Bar dataKey="bushAiRating" radius={[0, 5, 5, 0]}>
                {data.teamBushAiRatings?.map((entry) => (
                  <Cell key={entry.teamName} fill={entry.teamName === "TELLURIDE BUSH GAMING" ? barPurple : barDim} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Player Ratings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-6"
          style={{ background: "#141421", border: "1px solid rgba(168,85,247,0.2)" }}
          data-testid="chart-player-ratings"
        >
          <p className="text-xs font-black tracking-[0.2em] uppercase mb-1" style={{ color: "#a855f7" }}>Individual Performance</p>
          <p className="text-xl font-black mb-6" style={{ color: "#f8fafc" }}>Top Player BushAI Ratings</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={topPlayers}
              layout="vertical"
              margin={{ left: 0, right: 32, top: 4, bottom: 4 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="playerName"
                tick={{ fill: axisColor, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={80}
              />
              <Tooltip content={<PlayerTooltip />} cursor={{ fill: "rgba(168,85,247,0.05)" }} />
              <Bar dataKey="bushAiRating" radius={[0, 5, 5, 0]}>
                {topPlayers.map((entry) => (
                  <Cell key={entry.playerName} fill={entry.playerName === "Cammy" ? barPurple : barDim} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Champion Roster Ratings */}
        {data.championRoster?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6"
            style={{ background: "#141421", border: "1px solid rgba(168,85,247,0.2)" }}
            data-testid="chart-champion-roster"
          >
            <p className="text-xs font-black tracking-[0.2em] uppercase mb-1" style={{ color: "#a855f7" }}>Champion Analysis</p>
            <p className="text-xl font-black mb-6" style={{ color: "#f8fafc" }}>Champion Roster BushAI Ratings</p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart
                data={data.championRoster}
                layout="vertical"
                margin={{ left: 0, right: 32, top: 4, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: axisColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="playerName"
                  tick={{ fill: axisColor, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip
                  cursor={{ fill: "rgba(168,85,247,0.05)" }}
                  contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(168,85,247,0.4)", borderRadius: 8 }}
                  labelStyle={{ color: "#f8fafc", fontWeight: "bold" }}
                  itemStyle={{ color: "#a855f7" }}
                />
                <Bar dataKey="bushAiRating" radius={[0, 5, 5, 0]} fill={barPurple} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </div>
    </section>
  );
}
