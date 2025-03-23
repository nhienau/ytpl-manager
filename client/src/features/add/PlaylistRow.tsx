import {
  HiOutlineEyeSlash,
  HiOutlineGlobeAlt,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import styled from "styled-components";
import { useCheckboxes } from "../../context/CheckboxesContext";

const StyledPlaylistRow = styled.div`
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.5rem;

  & svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }
`;

const Title = styled.span`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  flex-grow: 1;
`;

function PlaylistRow({ playlist }) {
  const { add, remove } = useCheckboxes();
  const {
    title,
    status: { privacyStatus },
  } = playlist;

  function handleChange(e) {
    const checked = e.target.checked;
    checked ? add(playlist) : remove(playlist);
  }

  return (
    <StyledPlaylistRow>
      <input type="checkbox" onChange={handleChange} />
      <Title title={title}>{title}</Title>
      {privacyStatus === "public" && <HiOutlineGlobeAlt title="Public" />}
      {privacyStatus === "unlisted" && <HiOutlineEyeSlash title="Unlisted" />}
      {privacyStatus === "private" && <HiOutlineLockClosed title="Private" />}
    </StyledPlaylistRow>
  );
}

export default PlaylistRow;
