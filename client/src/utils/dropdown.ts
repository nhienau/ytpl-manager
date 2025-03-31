import {
  DropdownAlignment,
  DropdownPosition,
  DropdownVariation,
} from "./types";

export function getDropdownListPosition(
  rect: DOMRect,
  variation: DropdownVariation,
  alignment: DropdownAlignment
): DropdownPosition {
  const { x, right, top, bottom } = rect;
  let posX = 0,
    posY = 0;
  switch (variation) {
    case "dropup":
      posY = window.innerHeight - top;
      break;
    case "dropdown":
      posY = bottom;
      break;
  }
  switch (alignment) {
    case "left":
      posX = x;
      break;
    case "right":
      posX = window.innerWidth - right;
      break;
  }
  return {
    x: posX,
    y: posY,
    variation,
    alignment,
  };
}
