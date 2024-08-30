import { HiOutlineCheck } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { usePlaylist } from "../context/PlaylistContext";
import Menus from "./Menus";

const Button = styled(Menus.Button)`
  flex-direction: row-reverse;
  justify-content: flex-end;
  gap: 0.25rem;

  & span {
    ${(props) =>
      props.$isSelected &&
      css`
        font-weight: 500;
      `}
  }
`;

function Criteria({ criteria }) {
  const { sortCriteria, setSortCriteria } = usePlaylist();

  const isSelected = criteria.value === sortCriteria.value;

  return (
    <Button
      onClick={() => setSortCriteria(criteria)}
      icon={isSelected ? <HiOutlineCheck /> : null}
      $isSelected={isSelected}
    >
      <span>{criteria.label}</span>
    </Button>
  );
}

export default Criteria;
