import { Gamepad2, LogOut, Moon, Sun, Trophy } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { useAuth } from "../../contexts/auth-context";
import { useTheme } from "../../contexts/theme-context";
import { useGameConfigQuery } from "../../features/game/queries/use-game-config-query";
// import { cn } from "@/lib/utils"; // assuming you have clsx/tailwind-merge helper

function GameHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { data: config, isLoading } = useGameConfigQuery();

  const season = config?.season ?? (isLoading ? "Loading..." : "Season TBA");
  const subtitle = config?.subtitle ?? (isLoading ? "Arena initializing..." : "Compete. Climb. Conquer.");

  return (
    <header className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
      <div className="relative z-10 px-5 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-7">
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          {/* Left – Brand & season */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-600/20 blur-md" />
                <img
                  src="/ball.png"
                  alt="Ball Race"
                  className="relative h-9 w-9 rounded-full border border-white/25 object-cover shadow-lg"
                />
              </div>

              <Badge
                variant="outline"
                className="gap-1.5 border-cyan-400/40 bg-cyan-950/40 px-3 py-1.5 text-cyan-300 backdrop-blur-sm hover:bg-cyan-950/60"
              >
                <Trophy className="h-3.5 w-3.5" />
                {season}
              </Badge>
            </div>

            <h1 className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
              BALL RACE
            </h1>

            <p className="text-base font-medium text-slate-300/90 sm:text-lg">
              {subtitle}
            </p>
          </div>

          {/* Right – Controls */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Theme toggle – more pill-like & premium */}
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-lg">
              <Sun className="h-4 w-4 text-amber-300/80" />
              <Switch
                checked={isDark}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-cyan-600 data-[state=unchecked]:bg-slate-700"
              />
              <Moon className="h-4 w-4 text-indigo-300/80" />
            </div>

            {isAuthenticated ? (
              <div className="group flex items-center gap-3 rounded-full border border-white/10 bg-gradient-to-r from-slate-900/60 to-black/60 px-4 py-2 backdrop-blur-lg transition-all hover:border-cyan-500/30 hover:bg-gradient-to-r hover:from-cyan-950/40 hover:to-blue-950/30">
                <Gamepad2 className="h-4.5 w-4.5 text-cyan-400/90 transition-colors group-hover:text-cyan-300" />
                <span className="font-semibold tracking-tight text-slate-100 group-hover:text-white">
                  {user.username}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={logout}
                  className="h-8 w-8 rounded-full text-slate-300 hover:bg-white/10 hover:text-red-300"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Badge
                variant="secondary"
                className="rounded-full border border-slate-700/60 bg-slate-900/50 px-5 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-md"
              >
                Guest Arena
              </Badge>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export { GameHeader };