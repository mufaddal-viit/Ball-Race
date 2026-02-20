import { useMutation } from "@tanstack/react-query";

import { useAuth } from "../../../contexts/auth-context";
import { loginWithUsername } from "../../../services/auth-api";

export function useLoginMutation() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginWithUsername,
    onSuccess: ({ user }) => {
      login(user);
    },
  });
}
