import { Crown, Flame, Trophy } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../Components/ui/accordion";
import { Badge } from "../../../Components/ui/badge";
import { useLeaderboardQuery } from "../queries/use-leaderboard-query";

function LeaderboardCard() {
  const leaderboardQuery = useLeaderboardQuery();
  const topPlayer = leaderboardQuery.data?.[0];

  return (
    <div className="space-y-2">
      {leaderboardQuery.isLoading && (
        <p className="text-sm text-slate-300">Loading leaderboard...</p>
      )}

      {leaderboardQuery.data && (
        <Accordion
          type="single"
          collapsible
          defaultValue="leaderboard"
          className="w-full"
        >
          <AccordionItem
            value="leaderboard"
            className="overflow-hidden rounded-xl border border-white/10 bg-black/20"
          >
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-200" />
                  <span className="text-sm font-semibold text-slate-100">
                    Arena Leaderboard
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Crown className="h-4 w-4 text-amber-300" />
                  <span className="text-xs font-semibold text-slate-200">
                    {topPlayer
                      ? `#1 ${topPlayer.username} ( ${topPlayer.score} )`
                      : "No Leader Yet"}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-1">
              <div className="space-y-2 border-t border-white/10 pt-3">
                {leaderboardQuery.data.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xs font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-100">
                          {player.username}
                        </p>
                        <p className="text-xs text-slate-400">Streak {player.streak}</p>
                      </div>
                    </div>
                    <Badge variant={index <= 1 ? "warm" : "neutral"}>
                      <Flame className="mr-1 h-3 w-3" />
                      {player.score}
                    </Badge>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}

export { LeaderboardCard };
