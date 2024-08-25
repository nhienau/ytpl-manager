import { createContext, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div``;

const StyledList = styled.ul`
  position: fixed;

  left: ${(props) => props.$position.x}px;
  bottom: ${(props) => props.$position.y}px;

  z-index: 1001;
  /* border: 1px solid black; */
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  transition: all 0.2s;
`;

const MenusContext = createContext(null);

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id, className, children }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: rect.x,
      y: rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}

function List({ id, children, domNodeId, className }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useRef();
  useOutsideClick(ref, close, false);

  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={ref} $position={position} className={className}>
      {children}
    </StyledList>,
    domNodeId ? document.querySelector(`#${domNodeId}`) : document.body
  );
}

function Button({ children, className, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} className={className}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
