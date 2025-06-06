import { MouseEvent } from "react";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import styled from "styled-components";
import Button from "./Button";

const StyledButtonSidebar = styled(Button)`
  justify-content: center;
  padding: 0.375rem;

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
