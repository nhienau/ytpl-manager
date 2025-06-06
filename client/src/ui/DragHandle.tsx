import { RxDragHandleDots2 } from "react-icons/rx";
import styled, { css } from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { ForwardedRef, forwardRef } from "react";

interface DragHandleProps {
  $isDragging?: boolean;
  disabled?: boolean;
}
const StyledDragHandle = styled(ButtonIcon)<DragHandleProps>`
  cursor: grab;

  &:not(:disabled):hover {
    background-color: var(--color-neutral-400);
  }

  ${(props) =>
    props.$isDragging &&
    css`
      background-color: var(--color-neutral-400);
    `}
`;

const DragHandle = forwardRef(function DragHandle(
  { $isDragging = false, ...props }: DragHandleProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <StyledDragHandle $isDragging={$isDragging} {...props} ref={ref}>
      <RxDragHandleDots2 />
    </StyledDragHandle>
  );
});

export default DragHandle;
