import { MutableRefObject, useEffect } from "react";

export function useOutsideClick(
  elementRef: MutableRefObject<undefined>,
  handler: () => void,
  listenCapturing = true
) {
  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (elementRef.current && !elementRef.current.contains(e.target))
          handler();
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [elementRef, handler, listenCapturing]
  );
}
