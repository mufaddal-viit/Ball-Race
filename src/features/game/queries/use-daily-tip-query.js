import { useQuery } from "@tanstack/react-query";

import { fetchDailyTip } from "../../../services/game-api";

export function useDailyTipQuery() {
  return useQuery({
    queryKey: ["daily-tip"],
    queryFn: fetchDailyTip,
    staleTime: 1000 * 60 * 10,
  });
}
