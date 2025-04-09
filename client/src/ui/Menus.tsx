import {
  cloneElement,
  createContext,
  Dispatch,
  MouseEvent,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { getDropdownListPosition } from "../utils/dropdown";
import Button from "./Button";
import {
  DropdownAlignment,
  DropdownPosition,
  DropdownVariation,
} from "../utils/types";

interface StyledListProps {
  $position?: DropdownPosition | null;
}

const variations = {
  dropup: css<StyledListProps>`
    bottom: ${(props) => props.$position?.y ?? 0}px;
    margin-bottom: 0.25rem;
  `,
  dropdown: css<StyledListProps>`
    top: ${(props) => props.$position?.y ?? 0}px;
    margin-top: 0.25rem;
  `,
};

const alignments = {
  left: css<StyledListProps>`
    left: ${(props) => props.$position?.x ?? 0}px;
  `,
  right: css<StyledListProps>`
    right: ${(props) => props.$position?.x ?? 0}px;
  `,
};

const Menu = styled.div``;

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  ${(props) => props.$position && variations[props.$position.variation]}
  ${(props) => props.$position && alignments[props.$position.alignment]}

  z-index: 1001;
`;

const StyledButton = styled(Button)`
  width: 100%;
  gap: 0.5rem;
  padding: 0.5rem;
`;

interface MenusContextValue {
  openId: string;
  close: () => void;
  open: Dispatch<SetStateAction<string>>;
  position: DropdownPosition | null;
  setPosition: Dispatch<SetStateAction<DropdownPosition | null>>;
  eventTarget: HTMLElement | null;
  setEventTarget: Dispatch<SetStateAction<HTMLElement | null>>;
}

const MenusContext = createContext<MenusContextValue | null>(null);

function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState<DropdownPosition | null>(null);
  const [eventTarget, setEventTarget] = useState<HTMLElement | null>(null);

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

function useMenus() {
  const context = useContext(MenusContext);
  if (context === null || context === undefined)
    throw new Error("MenusContext was used outside of MenusProvider (Menus)");
  return context;
}

interface ToggleProps {
  id: string;
  className?: string | undefined;
  children: ReactNode | ReactElement;
  variation?: DropdownVariation;
  alignment?: DropdownAlignment;
  asChild?: boolean;
}

function Toggle({
  id,
  className,
  children,
  variation = "dropdown",
  alignment = "left",
  asChild = false,
}: ToggleProps) {
  const { openId, close, open, setPosition, setEventTarget } = useMenus();

  function handleClick(e: MouseEvent) {
    e.stopPropagation();
    const button = (e.target as Element).closest("button");
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const dropdownPos = getDropdownListPosition(rect, variation, alignment);
    setPosition(dropdownPos);
    setEventTarget(button);

    openId === "" || openId !== id ? open(id) : close();
  }

  return asChild ? (
    cloneElement(children as ReactElement, {
      className,
      onClick: handleClick,
    })
  ) : (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}

interface ListProps {
  id: string;
  children: ReactNode;
  domNodeId: string;
  className?: string | undefined;
}

function List({ id, children, domNodeId, className }: ListProps) {
  const { openId, position, close, eventTarget } = useMenus();
  const ref = useRef<HTMLUListElement>(null);
  useOutsideClick(ref, close, false);

  const dropdownNode = eventTarget?.closest(`[data-dropdown-id=${domNodeId}]`);

  const domNode = domNodeId && dropdownNode ? dropdownNode : document.body;

  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={ref} $position={position} className={className}>
      {children}
    </StyledList>,
    domNode
  );
}

interface MenuButtonProps {
  children: ReactNode;
  className?: string | undefined;
  icon: JSX.Element | null;
  onClick?: () => void;
  as?: string;
  [key: string]: unknown;
}

function MenuButton({
  children,
  className,
  icon,
  onClick,
  as,
  ...props
}: MenuButtonProps) {
  const { close } = useMenus();

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton
        onClick={handleClick}
        className={className}
        as={as || "button"}
        {...props}
      >
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

export { Toggle };

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = MenuButton;

export default Menus;
