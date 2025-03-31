import { MouseEvent } from "react";
import { useRouteError } from "react-router-dom";
import Error from "./Error";

function RouteFallback() {
  const error = useRouteError();
  const errorMessage =
    typeof error === "object" && error !== null && "message" in error
      ? String(error.message)
      : "An unexpected error occurred";

  // This causes full page reload
  function handleBack(e: MouseEvent) {
    e.preventDefault();
    window.location.replace("/");
  }

  return <Error message={errorMessage} onClick={handleBack} />;
}

export default RouteFallback;
