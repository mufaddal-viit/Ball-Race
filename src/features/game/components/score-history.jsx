import { Activity, History, Sparkles, Target } from "lucide-react";

import { Badge } from "../../../Components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../Components/ui/card";
import { Progress } from "../../../Components/ui/progress";
import { Separator } from "../../../Components/ui/separator";

function StatTile({ icon, label, value }) {
  const Icon = icon;

  return (
    <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-3">
      <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--text-muted)]">
        <Icon className="h-3.5 w-3.5 text-cyan-200" />
        {label}
      </div>
      <div className="text-xl font-bold text-[var(--text-main)]">{value}</div>
    </div>
  );
}

function ScoreHistory({ hits, attempts, accuracy, history }) {
  return (
    <Card className="border-blue-200/20">
      <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-3">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyan-200" />
          Match Stats
        </CardTitle>
        <CardDescription>
          Track your active round performance and recent results.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4 pt-2 sm:p-6 sm:pt-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatTile icon={Target} label="Hits" value={hits} />
          <StatTile icon={Sparkles} label="Spawns" value={attempts} />
          <StatTile icon={Activity} label="Accuracy" value={`${accuracy}%`} />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm text-[var(--text-muted)]">
            <span>Accuracy Progress</span>
            <span>{accuracy}%</span>
          </div>
          <Progress value={accuracy} />
        </div>

        <Separator />

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--text-main)]">
            <History className="h-4 w-4 text-cyan-200" />
            Recent Rounds
          </div>
          <ul className="space-y-2">
            {history.length === 0 && (
              <li className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-3 text-sm text-[var(--text-muted)]">
                No rounds yet. Start hitting targets to build your history.
              </li>
            )}

            {history.map((round) => (
              <li
                key={round.id}
                className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] px-3 py-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[var(--text-main)]">
                  <span className="min-w-0">
                    {round.hits}/{round.attempts} hits
                  </span>
                  <Badge variant={round.mode === "Hard" ? "warm" : "neutral"}>
                    {round.mode}
                  </Badge>
                </div>
                <div className="mt-1 text-xs text-[var(--text-subtle)]">
                  {round.accuracy}% accuracy - {round.timestamp}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export { ScoreHistory };

