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
        <p className="text-sm text-[var(--text-muted)]">Loading leaderboard...</p>
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
            className="overflow-hidden rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)]"
          >
            <AccordionTrigger className="px-3 py-3 hover:no-underline sm:px-4">
              <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-200" />
                  <span className="text-sm font-semibold text-[var(--text-main)]">
                    Arena Leaderboard
                  </span>
                </div>
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <Crown className="h-4 w-4 text-amber-300" />
                  <span className="max-w-[12rem] truncate text-xs font-semibold text-[var(--text-muted)] sm:max-w-[16rem]">
                    {topPlayer
                      ? `#1 ${topPlayer.username} ( ${topPlayer.score} )`
                      : "No Leader Yet"}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-1">
              <div className="space-y-2 border-t border-[var(--border-soft)] pt-3">
                {leaderboardQuery.data.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between gap-2 rounded-lg border border-[var(--border-soft)] bg-[var(--surface-inset)] px-3 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] text-xs font-bold text-[var(--text-main)]">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[var(--text-main)]">
                          {player.username}
                        </p>
                        <p className="text-xs text-[var(--text-subtle)]">Streak {player.streak}</p>
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
