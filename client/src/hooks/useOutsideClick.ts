import { MutableRefObject, useEffect } from "react";

export function useOutsideClick(
  elementRef: MutableRefObject<HTMLElement | null>,
  handler: () => void,
  listenCapturing = true
) {
  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (elementRef.current && !elementRef.current.contains(e.target as Node))
          handler();
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [elementRef, handler, listenCapturing]
  );
}
