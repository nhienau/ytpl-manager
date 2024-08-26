import styled, { css } from "styled-components";
import { createPortal } from "react-dom";
import {
  cloneElement,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import Overlay from "./Overlay";

const StyledOverlay = styled(Overlay)`
  @media (min-width: 50rem) {
    ${(props) =>
      props.$viewport === "small" &&
      css`
        display: none;
      `}
  }

  @media (max-width: calc(50rem - 1px)) {
    ${(props) =>
      props.$viewport === "large" &&
      css`
        display: none;
      `}
  }
`;

const TopLevelContext = createContext(null);

function TopLevel({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <TopLevelContext.Provider value={{ openName, close, open }}>
      {children}
    </TopLevelContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(TopLevelContext);

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

// viewport: small, large, all
function Window({ children, name, $viewport = "all" }) {
  const { openName, close } = useContext(TopLevelContext);
  const ref = useRef();
  useOutsideClick(ref, close);

  if (name !== openName) return null;

  return createPortal(
    <StyledOverlay $viewport={$viewport}>
      <div ref={ref}>{cloneElement(children, { onClose: close })}</div>
    </StyledOverlay>,
    document.body
  );
}

TopLevel.Open = Open;
TopLevel.Window = Window;

export default TopLevel;
