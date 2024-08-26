import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useChannelInfo } from "../features/authentication/useChannelInfo";
import FullPage from "./FullPage";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const { isLoading, isFetching, isAuthenticated } = useChannelInfo();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && !isFetching) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, isFetching, navigate]
  );

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
