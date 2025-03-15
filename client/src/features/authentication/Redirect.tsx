import { Navigate } from "react-router-dom";
import { useChannelInfo } from "./useChannelInfo";
import FullPage from "../../ui/FullPage";
import Spinner from "../../ui/Spinner";

function RedirectVerification() {
  const { isPending, data: channel } = useChannelInfo();

  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (channel) return <Navigate to="/app" replace={true} />;
  if (!isPending && !channel) return <Navigate to="/login" replace={true} />;
}

export default RedirectVerification;
