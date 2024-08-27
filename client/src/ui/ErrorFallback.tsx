import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";

const StyledErrorFallback = styled.div``;

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <h1>Something went wrong...</h1>
        <p>{error.message}</p>
        <button onClick={resetErrorBoundary}>Back to home page</button>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
