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
import { TopLevelWindowViewport } from "../utils/types";

interface StyledOverlayProps {
  $viewport?: TopLevelWindowViewport;
}

const StyledOverlay = styled(Overlay)<StyledOverlayProps>`
  @media (min-width: 80rem) {
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
  children: JSX.Element;
  opens: string;
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useTopLevel();

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

interface WindowProps {
  children: JSX.Element;
  name: string;
  $viewport?: TopLevelWindowViewport;
}

function Window({ children, name, $viewport = "all" }: WindowProps) {
  const { openName, close } = useTopLevel();
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, close);

  if (name !== openName) return null;

  return createPortal(
    <StyledOverlay $viewport={$viewport}>
      <div ref={ref}>{children}</div>
    </StyledOverlay>,
    document.body
  );
}

function Close({ children }: { children: JSX.Element }) {
  const { close } = useTopLevel();

  return cloneElement(children, { onClick: close });
}

TopLevel.Open = Open;
TopLevel.Window = Window;
TopLevel.Close = Close;

export { TopLevel, useTopLevel };
