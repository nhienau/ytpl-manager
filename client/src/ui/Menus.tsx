import { createContext, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { getDropdownListPosition } from "../utils/dropdown";

const variations = {
  dropup: css`
    bottom: ${(props) => props.$position.y}px;
    margin-bottom: 0.25rem;
  `,
  dropdown: css`
    top: ${(props) => props.$position.y}px;
    margin-top: 0.25rem;
  `,
};

const alignments = {
  left: css`
    left: ${(props) => props.$position.x}px;
  `,
  right: css`
    right: ${(props) => props.$position.x}px;
  `,
};

const Menu = styled.div``;

const StyledList = styled.ul`
  position: fixed;

  ${(props) => variations[props.$position.variation]}
  ${(props) => alignments[props.$position.alignment]}

  z-index: 1001;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;

  & span {
    font-size: 0.875rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  & svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  &:hover {
    background-color: var(--color-neutral-300);
  }
`;

const MenusContext = createContext(null);

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const [eventTarget, setEventTarget] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{
        openId,
        close,
        open,
        position,
        setPosition,
        eventTarget,
        setEventTarget,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({
  id,
  className,
  children,
  variation = "dropdown",
  alignment = "left",
}) {
  const { openId, close, open, setPosition, setEventTarget } =
    useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    const dropdownPos = getDropdownListPosition(rect, variation, alignment);
    setPosition(dropdownPos);
    setEventTarget(e.target.closest("button"));

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}

function List({ id, children, domNodeId, className }) {
  const { openId, position, close, eventTarget } = useContext(MenusContext);
  const ref = useRef();
  useOutsideClick(ref, close, false);

  const domNode = domNodeId
    ? eventTarget?.closest(`[data-dropdown-id=${domNodeId}]`)
    : document.body;

  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={ref} $position={position} className={className}>
      {children}
    </StyledList>,
    domNode
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
