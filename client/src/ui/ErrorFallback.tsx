import GlobalStyles from "../styles/GlobalStyles";
import Error from "./Error";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />
      <Error message={error.message} onClick={resetErrorBoundary} />
    </>
  );
}

export default ErrorFallback;
