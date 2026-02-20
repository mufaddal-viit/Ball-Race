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
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Target className="h-5 w-5 text-cyan-200" />
              Live Target Arena
            </CardTitle>
            <CardDescription>
              Hit each moving target once before the next spawn.
            </CardDescription>
          </div>
          <Badge variant={hardMode ? "warm" : "default"}>
            <GaugeCircle className="mr-1.5 h-3.5 w-3.5" />
            {hardMode ? "Hard Mode" : "Normal Mode"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div
          ref={stageRef}
          className="arena-grid relative h-[330px] w-full overflow-hidden rounded-2xl border border-white/15 bg-black/20 shadow-inner"
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
