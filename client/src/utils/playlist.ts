import { PLAYLIST_SORT_CRITERIAS } from "./constants";

export function filterAndSortPlaylists(playlists, query, sortCriteria) {
  const filteredResults = playlists.filter((item) =>
    item.snippet.title.toLowerCase().includes(query.toLowerCase())
  );

  const sortByRaw = sortCriteria.value || PLAYLIST_SORT_CRITERIAS[0].value;
  const [field, direction] = sortByRaw.split("-");

  const multiplier = direction === "asc" ? 1 : -1;
  let sortedResults;
  if (field === "name") {
    sortedResults = filteredResults.sort(
      (a, b) =>
        a.snippet.title
          .toLowerCase()
          .localeCompare(b.snippet.title.toLowerCase()) * multiplier
    );
  } else {
    sortedResults = filteredResults.toSorted(
      (a, b) =>
        (new Date(a.snippet.publishedAt).getTime() -
          new Date(b.snippet.publishedAt).getTime()) *
        multiplier
    );
  }
  return sortedResults;
}
