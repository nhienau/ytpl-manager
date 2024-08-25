import { useEffect } from "react";

export function useOutsideClick(elementRef, handler, listenCapturing = true) {
  useEffect(
    function () {
      function handleClick(e) {
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
