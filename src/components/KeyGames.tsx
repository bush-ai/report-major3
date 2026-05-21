import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./SectionHeader";

interface BestPlayerPerf {
  playerName: string;
  teamName: string;
  kills: number;
  deaths: number;
  damage: number;
  bushAiMapScoreWeighted: number;
}

interface BestTeamPerf {
  teamName: string;
  bushAiMapScoreWeighted: number;
  teamWonMap: boolean;
  scoreMargin: number;
}

interface GameCard {
  matchNumber?: number;
  mode: string;
  map: string;
  score: string;
  winner: string;
  loser: string;
  bestTeamPerformance?: BestTeamPerf;
  bestPlayerPerformance?: BestPlayerPerf;
}

type LargestWin = GameCard;

interface KeyGamesData {
  largestTeamWin: LargestWin;
  grandFinalsGames: GameCard[];
  eliminationRoundGames: GameCard[];
}

const tabs = [
  { id: "largest", label: "Largest Team Win" },
  { id: "finals", label: "Grand Finals" },
  { id: "elimination", label: "Elimination Round" },
];

function MatchCard({ game, index }: { game: GameCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="rounded-2xl p-5 transition-all duration-200 hover:border-[rgba(168,85,247,0.45)]"
      style={{
        background: "#141421",
        border: "1px solid rgba(168,85,247,0.2)",
      }}
      data-testid={`game-card-${index}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div>
          {game.matchNumber && (
            <p className="text-xs font-black tracking-[0.2em] uppercase mb-1" style={{ color: "#a855f7" }}>
              Match {game.matchNumber}
            </p>
          )}
          <p className="text-lg font-black" style={{ color: "#f8fafc" }}>{game.mode}</p>
          <p className="text-sm" style={{ color: "#a1a1aa" }}>{game.map}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-2xl font-black font-mono" style={{ color: "#f8fafc" }}>{game.score}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div
          className="flex-1 rounded-lg px-3 py-2"
          style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)" }}
        >
          <p className="text-xs mb-0.5" style={{ color: "#a1a1aa" }}>Winner</p>
          <p className="text-sm font-bold" style={{ color: "#a855f7" }}>{game.winner}</p>
        </div>
        <div
          className="flex-1 rounded-lg px-3 py-2"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p className="text-xs mb-0.5" style={{ color: "#a1a1aa" }}>Loser</p>
          <p className="text-sm font-bold" style={{ color: "#e4e4e7" }}>{game.loser}</p>
        </div>
      </div>

      {(game.bestPlayerPerformance || game.bestTeamPerformance) && (
        <div className="space-y-2">
          {game.bestPlayerPerformance && (
            <div className="rounded-lg px-3 py-2" style={{ background: "rgba(236,72,153,0.06)", border: "1px solid rgba(236,72,153,0.15)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "#ec4899" }}>Best Player</p>
              <p className="text-sm font-bold" style={{ color: "#f8fafc" }}>{game.bestPlayerPerformance.playerName}</p>
              <p className="text-xs mt-0.5" style={{ color: "#a1a1aa" }}>
                {game.bestPlayerPerformance.kills}K / {game.bestPlayerPerformance.deaths}D &middot; {game.bestPlayerPerformance.damage?.toLocaleString()} dmg &middot; Score {game.bestPlayerPerformance.bushAiMapScoreWeighted?.toFixed(1)}
              </p>
            </div>
          )}
          {game.bestTeamPerformance && (
            <div className="rounded-lg px-3 py-2" style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "#a855f7" }}>Best Team</p>
              <p className="text-sm font-bold" style={{ color: "#f8fafc" }}>{game.bestTeamPerformance.teamName}</p>
              <p className="text-xs mt-0.5" style={{ color: "#a1a1aa" }}>
                Score {game.bestTeamPerformance.bushAiMapScoreWeighted?.toFixed(1)} &middot; +{game.bestTeamPerformance.scoreMargin} margin
              </p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default function KeyGames({ data }: { data: KeyGamesData }) {
  const [activeTab, setActiveTab] = useState("largest");

  return (
    <section id="games">
      <SectionHeader label="Match History" title="Key Games" subtitle="Defining matches that shaped Championship Sunday." />

      {/* Tabs */}
      <div className="flex gap-0 mb-8 border-b" style={{ borderColor: "rgba(168,85,247,0.15)" }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-5 py-3 text-sm font-semibold transition-colors duration-200"
            style={{ color: activeTab === tab.id ? "#a855f7" : "#a1a1aa" }}
            data-testid={`tab-${tab.id}`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: "#a855f7" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === "largest" && (
          <motion.div key="largest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <MatchCard game={data.largestTeamWin} index={0} />
          </motion.div>
        )}

        {activeTab === "finals" && (
          <motion.div key="finals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.grandFinalsGames?.map((game, i) => (
                <MatchCard key={i} game={game} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "elimination" && (
          <motion.div key="elimination" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.eliminationRoundGames?.map((game, i) => (
                <MatchCard key={i} game={game} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
