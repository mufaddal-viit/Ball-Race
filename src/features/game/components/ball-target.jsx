import { Crosshair } from "lucide-react";

import { cn } from "../../../lib/utils";

function BallTarget({ x, y, onHit, pulseKey }) {
  return (
    <button
      type="button"
      aria-label="Hit moving target"
      onClick={onHit}
      key={pulseKey}
      className={cn(
        "target-bloom absolute z-20 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-100/80 bg-gradient-to-br from-cyan-300 via-sky-300 to-blue-500 text-slate-900 shadow-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
      )}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      <span className="absolute inset-0 animate-ping rounded-full border border-cyan-200/60 opacity-45" />
      <Crosshair className="relative z-10 h-6 w-6" />
    </button>
  );
}

export { BallTarget };
