import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { revokeAppAccess } from "../../services/apiAuth";

export function useRevoke() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: revoke, isPending } = useMutation({
    mutationFn: revokeAppAccess,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { revoke, isPending };
}
