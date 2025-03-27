import { PLAYLIST_SORT_CRITERIAS } from "./constants";
import { Playlist } from "./types";

export function filterAndSortPlaylists(
  playlists: Playlist[],
  query,
  sortCriteria
): Playlist[] {
  if (playlists.length === 0) return playlists;

  const filteredResults = playlists.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  const sortByRaw = sortCriteria.value || PLAYLIST_SORT_CRITERIAS[0].value;
  const [field, direction] = sortByRaw.split("-");

  const multiplier = direction === "asc" ? 1 : -1;
  let sortedResults;
  if (field === "name") {
    sortedResults = filteredResults.sort(
      (a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase()) * multiplier
    );
  } else {
    sortedResults = filteredResults.toSorted(
      (a, b) =>
        (new Date(a.publishedAt).getTime() -
          new Date(b.publishedAt).getTime()) *
        multiplier
    );
  }
  return sortedResults;
}
