import { formatDistanceToNowStrict } from "date-fns";

export function formatDate(str: string) {
  return formatDistanceToNowStrict(new Date(str), {
    addSuffix: true,
  });
}

export function arrayAdd<T>(array: T[], element: T, index: number): T[] {
  return array.toSpliced(index, 0, element);
}
