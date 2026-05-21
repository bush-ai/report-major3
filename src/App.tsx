import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Awards from "@/components/Awards";
import TeamRankings from "@/components/TeamRankings";
import PlayerRankings from "@/components/PlayerRankings";
import MvpSpotlight from "@/components/MvpSpotlight";
import SignatureMoment from "@/components/SignatureMoment";
import ChampionRoster from "@/components/ChampionRoster";
import KeyGames from "@/components/KeyGames";
import Storylines from "@/components/Storylines";
import Charts from "@/components/Charts";
import LoadingState from "@/components/LoadingState";

const queryClient = new QueryClient();

function ReportApp() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/data/raw-data-final-report-view.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load report data");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingState />;
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="bushai-card p-8 max-w-md w-full bushai-glow-purple">
          <h2 className="text-2xl font-bold text-bushai-pink mb-4">Error Loading Report</h2>
          <p className="text-bushai-muted">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bushai-bg text-bushai-white pb-20">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 space-y-32 pt-24">
        <Hero data={data.heroSummary} />
        <Awards data={data.awards} />
        <TeamRankings data={data.teamRankings} chartData={data.chartData.teamBushAiRatings} />
        <PlayerRankings data={data.playerRankings} />
        <MvpSpotlight data={data.awards.bestOverallPlayer} />
        <SignatureMoment data={data.awards.bestSingleMapPerformance} />
        <ChampionRoster data={data.awards.mostCompleteRoster.players} />
        <KeyGames data={data.keyGames} />
        <Storylines data={data.storylines} />
        <Charts data={data.chartData} />
      </main>
      <footer className="mt-32 pt-8 pb-12 border-t border-bushai-card-border text-center text-bushai-muted">
        <p className="font-semibold mb-2">BushAI Championship Sunday Report</p>
        <p className="text-sm">Powered by BushAI Analytics &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ReportApp />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
