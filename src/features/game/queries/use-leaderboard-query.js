import { useQuery } from "@tanstack/react-query";

import { fetchLeaderboard } from "../../../services/game-api";

export function useLeaderboardQuery() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
    staleTime: 1000 * 60 * 2,
  });
}
