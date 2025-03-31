import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useChannelInfo } from "../features/authentication/useChannelInfo";
import FullPage from "./FullPage";
import Spinner from "./Spinner";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const { isPending, isAuthenticated } = useChannelInfo();

  useEffect(
    function () {
      if (!isAuthenticated && !isPending) {
        navigate("/login");
      }
    },
    [isAuthenticated, isPending, navigate]
  );

  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
