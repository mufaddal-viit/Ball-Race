import { Gauge, RefreshCcw, Sparkles } from "lucide-react";

import { Badge } from "../../Components/ui/badge";
import { Button } from "../../Components/ui/button";
import { Card, CardContent } from "../../Components/ui/card";
import { Separator } from "../../Components/ui/separator";
import { useAuth } from "../../contexts/auth-context";
import { cn } from "../../lib/utils";
import { GameStage } from "./components/game-stage";
import { LeaderboardCard } from "./components/leaderboard-card";
import { ScoreHistory } from "./components/score-history";
import { useBallRace } from "./hooks/use-ball-race";
import { useGameConfigQuery } from "./queries/use-game-config-query";

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
    <section className="relative mt-4 grid gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-violet-950/10 via-cyan-950/5 to-transparent" />

      <div className="min-w-0 space-y-4 sm:space-y-6">
        <Card className="overflow-hidden border border-[var(--border-accent)] bg-[var(--surface-strong)] shadow-2xl backdrop-blur-xl">
          <CardContent className="relative p-4 sm:p-6">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-cyan-300/70">
                  Active Player
                </p>
                <h5 className="mt-1 truncate bg-gradient-to-r from-cyan-300 via-blue-200 to-violet-300 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl">
                  {user.username}
                </h5>
                <p className="mt-0.5 text-sm font-medium text-[var(--text-muted)]">
                  {user.rankTitle || "Rising Star"}
                </p>
              </div>

              <Badge className="max-w-full px-3 py-1 text-xs backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-sm">
                <Sparkles className="mr-1.5 h-4 w-4 text-violet-300" />
                {activeEvent}
              </Badge>
            </div>

            <Separator className="my-4 bg-white/5 sm:my-5" />

            <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:gap-3">
              <Button
                variant="secondary"
                className="w-full border-cyan-500/30 sm:w-auto"
                onClick={restartRound}
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Restart Round
              </Button>

              <Button
                variant={hardMode ? "danger" : "ghost"}
                className={cn(
                  "w-full border-purple-500/40 transition-all sm:w-auto",
                  hardMode
                    ? "bg-gradient-to-r from-red-950/50 to-purple-950/50 text-red-200 hover:from-red-900/60 hover:to-purple-900/60"
                    : "bg-[var(--surface-soft)] text-[var(--text-main)] hover:bg-[var(--surface-inset)]"
                )}
                onClick={toggleMode}
              >
                <Gauge className="mr-2 h-4 w-4" />
                {hardMode ? "Switch to Normal" : "Switch to Hard"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-[var(--surface-soft)] shadow-inner backdrop-blur-md">
          <GameStage
            stageRef={stageRef}
            position={position}
            pulseKey={pulseKey}
            hardMode={hardMode}
            onTargetHit={onTargetHit}
          />
        </div>
      </div>

      <div className="min-w-0 space-y-4 sm:space-y-6">
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
