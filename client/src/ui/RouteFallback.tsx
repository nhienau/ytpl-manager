import { useRouteError } from "react-router-dom";
import Error from "./Error";

function RouteFallback() {
  const error = useRouteError();

  // This causes full page reload
  function handleBack(e) {
    e.preventDefault();
    window.location.replace("/");
  }

  return <Error message={error.message} onClick={handleBack} />;
}

export default RouteFallback;
