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
    <div className="rounded-xl border border-white/15 bg-black/20 p-3">
      <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wide text-slate-300">
        <Icon className="h-3.5 w-3.5 text-cyan-200" />
        {label}
      </div>
      <div className="text-xl font-bold text-slate-100">{value}</div>
    </div>
  );
}

function ScoreHistory({ hits, attempts, accuracy, history }) {
  return (
    <Card className="border-blue-200/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-cyan-200" />
          Match Stats
        </CardTitle>
        <CardDescription>
          Track your active round performance and recent results.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatTile icon={Target} label="Hits" value={hits} />
          <StatTile icon={Sparkles} label="Spawns" value={attempts} />
          <StatTile icon={Activity} label="Accuracy" value={`${accuracy}%`} />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
            <span>Accuracy Progress</span>
            <span>{accuracy}%</span>
          </div>
          <Progress value={accuracy} />
        </div>

        <Separator />

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-100">
            <History className="h-4 w-4 text-cyan-200" />
            Recent Rounds
          </div>
          <ul className="space-y-2">
            {history.length === 0 && (
              <li className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-slate-300">
                No rounds yet. Start hitting targets to build your history.
              </li>
            )}

            {history.map((round) => (
              <li
                key={round.id}
                className="rounded-xl border border-white/10 bg-black/25 px-3 py-2"
              >
                <div className="flex items-center justify-between text-sm text-slate-200">
                  <span>
                    {round.hits}/{round.attempts} hits
                  </span>
                  <Badge variant={round.mode === "Hard" ? "warm" : "neutral"}>
                    {round.mode}
                  </Badge>
                </div>
                <div className="mt-1 text-xs text-slate-400">
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

