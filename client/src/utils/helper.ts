import { formatDistanceToNowStrict } from "date-fns";

export function formatDate(str: string) {
  return formatDistanceToNowStrict(new Date(str), {
    addSuffix: true,
  });
}
