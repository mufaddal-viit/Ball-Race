import { useQuery } from "@tanstack/react-query";

import { fetchGameConfig } from "../../../services/game-api";

export function useGameConfigQuery() {
  return useQuery({
    queryKey: ["game-config"],
    queryFn: fetchGameConfig,
    staleTime: 1000 * 60 * 5,
  });
}
