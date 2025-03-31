import { MouseEvent } from "react";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import styled from "styled-components";

const StyledButtonSidebar = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.375rem;
  border-radius: 0.5rem;
  flex-shrink: 0;

  &:hover {
    background-color: var(--color-neutral-400);
  }

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

interface ButtonSidebarProps {
  onClick?: (e: MouseEvent) => void;
  className?: string | undefined;
}

function ButtonSidebar({ onClick, className }: ButtonSidebarProps) {
  return (
    <StyledButtonSidebar className={className} onClick={onClick}>
      <HiOutlineBars3BottomLeft />
    </StyledButtonSidebar>
  );
}

export default ButtonSidebar;
