import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const StyledRouteFallback = styled.div``;

function RouteFallback() {
  const error = useRouteError();

  // This causes full page reload
  function handleBack() {
    window.location.replace("/");
  }

  return (
    <StyledRouteFallback>
      <h1>Something went wrong...</h1>
      <p>{error.message}</p>
      <button onClick={handleBack}>Back to home page</button>
    </StyledRouteFallback>
  );
}

export default RouteFallback;
