import styled from "styled-components";
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

const SidebarOverlay = styled(Overlay)`
  @media (min-width: 50rem) {
    display: none;
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

function Window({ children, name }) {
  const { openName, close } = useContext(TopLevelContext);
  const ref = useRef();
  useOutsideClick(ref, close);

  if (name !== openName) return null;

  return createPortal(
    <SidebarOverlay>
      <div ref={ref}>{cloneElement(children, { onClose: close })}</div>
    </SidebarOverlay>,
    document.body
  );
}

TopLevel.Open = Open;
TopLevel.Window = Window;

export default TopLevel;
