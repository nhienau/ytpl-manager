import { Navigate, Outlet } from "react-router-dom";
import { useChannelInfo } from "../features/authentication/useChannelInfo";
import FullPage from "./FullPage";
import Spinner from "./Spinner";

function AuthLayout() {
  const { data: channel, isPending } = useChannelInfo();

  if (isPending) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (channel) return <Navigate to="/app" />;

  return <Outlet />;
}

export default AuthLayout;
