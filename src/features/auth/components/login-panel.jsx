import { useState } from "react";
import { Sparkles, Zap } from "lucide-react";

import arenaHero from "../../../assets/arena-hero.svg";
import { Badge } from "../../../Components/ui/badge";
import { Button } from "../../../Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../Components/ui/card";
import { Input } from "../../../Components/ui/input";
import { useDailyTipQuery } from "../../game/queries/use-daily-tip-query";
import { useLoginMutation } from "../mutations/use-login-mutation";

export function LoginPanel() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const loginMutation = useLoginMutation();
  const tipQuery = useDailyTipQuery();

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanUsername = username.trim();

    if (cleanUsername.length < 3) {
      setError("Use at least 3 characters to enter the arena.");
      return;
    }

    setError("");
    loginMutation.mutate({ username: cleanUsername });
  };

  return (
    <section className="mt-4 grid gap-4 sm:mt-6 sm:gap-5 xl:grid-cols-[1fr_1.05fr]">
      <Card className="relative overflow-hidden border-cyan-400/25">
        <CardHeader className="pb-2">
          <Badge variant="warm" className="w-fit">
            Live Portfolio Build
          </Badge>
          <CardTitle className="mt-2 text-xl text-hero-gradient sm:text-2xl">
            Launch Into Ball Race
          </CardTitle>
          <CardDescription>
            Sign in with your player tag and start your precision training.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <label className="text-sm font-medium text-[var(--text-main)]" htmlFor="username">
              Username
            </label>
            <Input
              id="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError("");
              }}
              placeholder="Type your player tag"
              autoComplete="nickname"
            />

            {(error || loginMutation.error) && (
              <p className="rounded-lg border border-red-400/40 bg-red-500/15 px-3 py-2 text-sm text-red-300">
                {error || loginMutation.error?.message}
              </p>
            )}

            <Button className="w-full" size="lg" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Entering Arena..." : "Enter Game Lobby"}
              <Zap className="h-4 w-4" />
            </Button>
          </form>

          <div className="rounded-xl border border-[var(--border-soft)] bg-[var(--surface-soft)] p-3 text-sm text-[var(--text-main)]">
            <div className="mb-1 flex items-center gap-2 font-semibold">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Daily Pro Tip
            </div>
            <p>{tipQuery.data?.tip ?? "Loading tactical tip..."}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden border-indigo-200/20">
        <CardContent className="p-0">
          <img
            src={arenaHero}
            alt="Arcade arena illustration"
            className="h-52 w-full object-cover sm:h-64 md:h-72 xl:h-full xl:min-h-[360px]"
          />
        </CardContent>
      </Card>
    </section>
  );
}
