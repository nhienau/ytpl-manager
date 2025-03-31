import styled, { css } from "styled-components";
import { createPortal } from "react-dom";
import {
  cloneElement,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
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

interface TopLevelContextValue {
  openName: string;
  close: () => void;
  open: Dispatch<SetStateAction<string>>;
}

const TopLevelContext = createContext<TopLevelContextValue | null>(null);

function TopLevel({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <TopLevelContext.Provider value={{ openName, close, open }}>
      {children}
    </TopLevelContext.Provider>
  );
}

function useTopLevel() {
  const context = useContext(TopLevelContext);
  if (context === null || context === undefined)
    throw new Error("TopLevelContext was used outside of TopLevelProvider");
  return context;
}

interface OpenProps {
  children: ReactNode;
  opens: string;
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useTopLevel();

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

interface WindowProps {
  children: ReactNode;
  name: string;
  $viewport?: "small" | "large" | "all";
}

// viewport: small, large, all
function Window({ children, name, $viewport = "all" }: WindowProps) {
  const { openName, close } = useTopLevel();
  const ref = useRef();
  useOutsideClick(ref, close);

  if (name !== openName) return null;

  return createPortal(
    <StyledOverlay $viewport={$viewport}>
      <div ref={ref}>{children}</div>
    </StyledOverlay>,
    document.body
  );
}

function Close({ children }: { children: ReactNode }) {
  const { close } = useTopLevel();

  return cloneElement(children, { onClick: close });
}

TopLevel.Open = Open;
TopLevel.Window = Window;
TopLevel.Close = Close;

export { TopLevel, useTopLevel };
