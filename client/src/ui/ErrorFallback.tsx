import GlobalStyles from "../styles/GlobalStyles";
import Error from "./Error";
import { FallbackProps } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <>
      <GlobalStyles />
      <Error message={error.message} onClick={resetErrorBoundary} />
    </>
  );
}

export default ErrorFallback;
