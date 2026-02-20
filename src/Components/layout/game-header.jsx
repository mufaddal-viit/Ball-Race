import { Gamepad2, LogOut, Moon, Sun, Trophy } from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { useAuth } from "../../contexts/auth-context";
import { useTheme } from "../../contexts/theme-context";
import { useGameConfigQuery } from "../../features/game/queries/use-game-config-query";

function GameHeader() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { data: config, isLoading } = useGameConfigQuery();

  const season = config?.season ?? (isLoading ? "Loading..." : "Season TBA");
  const subtitle =
    config?.subtitle ?? (isLoading ? "Arena initializing..." : "Compete. Climb. Conquer.");

  return (
    <header className="relative isolate overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-soft)] shadow-2xl backdrop-blur-xl sm:rounded-3xl">
      <div className="relative z-10 px-4 py-4 sm:px-6 sm:py-5 lg:px-10 lg:py-7">
        <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex min-w-0 flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-600/20 blur-md" />
                <img
                  src="/ball.png"
                  alt="Ball Race"
                  className="relative h-8 w-8 rounded-full border border-[var(--border-soft)] object-cover shadow-lg sm:h-9 sm:w-9"
                />
              </div>

              <Badge
                variant="neutral"
                className="gap-1.5 border-cyan-400/40 px-2.5 py-1 text-xs backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-sm"
              >
                <Trophy className="h-3.5 w-3.5" />
                {season}
              </Badge>
            </div>

            <h1 className="bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl lg:text-5xl">
              BALL RACE
            </h1>

            <p className="text-sm font-medium text-[var(--text-muted)] sm:text-base lg:text-lg">
              {subtitle}
            </p>
          </div>

          <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto">
            <div className="flex w-full items-center justify-center gap-3 rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] px-4 py-2 backdrop-blur-lg sm:w-auto sm:justify-start">
              <Sun className="h-4 w-4 text-amber-300/80" />
              <Switch
                checked={isDark}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-cyan-600"
              />
              <Moon className="h-4 w-4 text-indigo-300/80" />
            </div>

            {isAuthenticated ? (
              <div className="group flex w-full items-center justify-between gap-3 rounded-full border border-[var(--border-soft)] bg-[var(--surface-soft)] px-4 py-2 backdrop-blur-lg transition-all hover:border-cyan-500/40 sm:w-auto sm:justify-start">
                <Gamepad2 className="h-4.5 w-4.5 text-cyan-400/90 transition-colors group-hover:text-cyan-300" />
                <span className="max-w-[10rem] truncate font-semibold tracking-tight text-[var(--text-main)] sm:max-w-[12rem]">
                  {user.username}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={logout}
                  className="h-8 w-8 rounded-full text-[var(--text-muted)] hover:bg-[var(--surface-soft)] hover:text-red-300"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Badge
                variant="neutral"
                className="w-full justify-center rounded-full px-5 py-2.5 text-sm font-medium backdrop-blur-md sm:w-auto"
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
