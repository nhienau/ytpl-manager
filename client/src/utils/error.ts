export function handleApiException(e: Error) {
  // NetworkError
  if (e.name === "TypeError") {
    throw new Error(
      "Something went wrong with fetching data. Please try again."
    );
  } else {
    throw e;
  }
}
