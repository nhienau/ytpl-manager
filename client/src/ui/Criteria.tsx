import { HiOutlineCheck } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { usePlaylistOperations } from "../context/PlaylistOperationsContext";
import Menus from "./Menus";
import { SortCriteria } from "../utils/types";

interface ButtonProps {
  $isSelected: boolean;
}

const Button = styled(Menus.Button)<ButtonProps>`
  flex-direction: row-reverse;
  justify-content: flex-end;
  gap: 0.25rem;

  & span {
    ${(props) =>
      props.$isSelected &&
      css`
        font-weight: 600;
      `}
  }
`;

function Criteria({ criteria }: { criteria: SortCriteria }) {
  const { sortCriteria, handleChangeSortCriteria } = usePlaylistOperations();

  const isSelected = criteria.value === sortCriteria.value;

  return (
    <Button
      onClick={() => handleChangeSortCriteria(criteria)}
      icon={isSelected ? <HiOutlineCheck /> : null}
      $isSelected={isSelected}
    >
      <span>{criteria.label}</span>
    </Button>
  );
}

export default Criteria;
