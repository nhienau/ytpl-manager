export function handleQueryError(error, query) {
  // console.log(error.message);
  // console.log(query.queryKey);
}

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
