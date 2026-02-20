import { Gauge, RefreshCcw, Sparkles } from "lucide-react";

import { Badge } from "../../Components/ui/badge";
import { Button } from "../../Components/ui/button";
import { Card, CardContent } from "../../Components/ui/card";
import { Separator } from "../../Components/ui/separator";
import { useAuth } from "../../contexts/auth-context";
import { useBallRace } from "./hooks/use-ball-race";
import { useGameConfigQuery } from "./queries/use-game-config-query";
import { GameStage } from "./components/game-stage";
import { LeaderboardCard } from "./components/leaderboard-card";
import { ScoreHistory } from "./components/score-history";
import { cn } from "../../lib/utils";

function GameScreen() {
  const { user } = useAuth();
  const gameConfigQuery = useGameConfigQuery();
  const {
    stageRef,
    position,
    pulseKey,
    hardMode,
    hits,
    attempts,
    accuracy,
    history,
    restartRound,
    toggleMode,
    onTargetHit,
  } = useBallRace();

  const activeEvent = gameConfigQuery.data?.activeEvent ?? "Loading event...";

  return (
    <section className="relative mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      {/* Optional subtle background overlay for depth – can be global too */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-violet-950/10 via-cyan-950/5 to-transparent" />

      {/* Main content */}
      <div className="space-y-6">
        {/* Player Card – more premium with gradient accents */}
        <Card className="overflow-hidden border border-cyan-500/15 bg-gradient-to-b from-slate-950/80 to-black/90 backdrop-blur-xl shadow-2xl">
          <CardContent className="relative p-6">
            {/* Subtle glow orb */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-cyan-300/70">
                  Active Player
                </p>
                <h5 className="mt-1 bg-gradient-to-r from-cyan-300 via-blue-200 to-violet-300 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
                  {user.username}
                </h5>
                <p className="mt-0.5 text-sm font-medium text-violet-200/90">
                  {user.rankTitle || "Rising Star"}
                </p>
              </div>

              <Badge className="border border-violet-400/30 bg-violet-950/50 px-4 py-1.5 text-violet-200 backdrop-blur-sm hover:bg-violet-950/70">
                <Sparkles className="mr-1.5 h-4 w-4 text-violet-300" />
                {activeEvent}
              </Badge>
            </div>

            <Separator className="my-5 bg-white/5" />

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="border-cyan-500/30 bg-cyan-950/30 text-cyan-200 hover:bg-cyan-900/40 hover:text-cyan-100"
                onClick={restartRound}
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Restart Round
              </Button>

              <Button
                variant="outline"
                className={cn(
                  "border-purple-500/40 text-purple-200 transition-all",
                  hardMode
                    ? "bg-gradient-to-r from-red-950/50 to-purple-950/50 hover:from-red-900/60 hover:to-purple-900/60 hover:text-red-200"
                    : "bg-purple-950/30 hover:bg-purple-900/50 hover:text-purple-100"
                )}
                onClick={toggleMode}
              >
                <Gauge className="mr-2 h-4 w-4" />
                {hardMode ? "Switch to Normal" : "Switch to Hard"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Game Stage – assume it handles its own styling, but wrap for consistency */}
        <div className="overflow-hidden rounded-3xl border border-cyan-500/10 bg-black/60 backdrop-blur-md shadow-inner">
          <GameStage
            stageRef={stageRef}
            position={position}
            pulseKey={pulseKey}
            hardMode={hardMode}
            onTargetHit={onTargetHit}
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <ScoreHistory
          hits={hits}
          attempts={attempts}
          accuracy={accuracy}
          history={history}
        />

        <LeaderboardCard />
      </div>
    </section>
  );
}

export { GameScreen };
