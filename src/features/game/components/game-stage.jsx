import { GaugeCircle, Target } from "lucide-react";

import { Badge } from "../../../Components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../Components/ui/card";
import { BallTarget } from "./ball-target";

function GameStage({ stageRef, position, pulseKey, hardMode, onTargetHit }) {
  return (
    <Card className="border-cyan-200/20">
      <CardHeader className="p-4 pb-2 sm:p-6 sm:pb-3">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <CardTitle className="flex items-center gap-2 text-base sm:text-xl">
              <Target className="h-5 w-5 text-cyan-200" />
              Live Target Arena
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Hit each moving target once before the next spawn.
            </CardDescription>
          </div>
          <Badge variant={hardMode ? "warm" : "default"} className="self-start sm:self-auto">
            <GaugeCircle className="mr-1.5 h-3.5 w-3.5" />
            {hardMode ? "Hard Mode" : "Normal Mode"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 sm:p-6 sm:pt-3">
        <div
          ref={stageRef}
          className="arena-grid relative h-[250px] w-full overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-inset)] shadow-inner sm:h-[300px] md:h-[330px]"
        >
          <div className="pointer-events-none absolute inset-0" />
          <BallTarget
            x={position.x}
            y={position.y}
            pulseKey={pulseKey}
            onHit={onTargetHit}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export { GameStage };
