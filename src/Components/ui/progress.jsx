import { cn } from "../../lib/utils";

function Progress({ value = 0, className }) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-white/15",
        className
      )}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 transition-all duration-500"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export { Progress };
