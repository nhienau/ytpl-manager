import {
  HiOutlineEyeSlash,
  HiOutlineGlobeAlt,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledPlaylistRow = styled(NavLink)`
  text-align: left;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.375rem;

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
`;

function PlaylistRow({ playlist }) {
  const {
    id,
    title,
    status: { privacyStatus },
  } = playlist;

  return (
    <StyledPlaylistRow to={`/app/playlist/${id}`} title={title} end>
      {privacyStatus === "public" && <HiOutlineGlobeAlt />}
      {privacyStatus === "unlisted" && <HiOutlineEyeSlash />}
      {privacyStatus === "private" && <HiOutlineLockClosed />}
      <Title>{title}</Title>
    </StyledPlaylistRow>
  );
}

export default PlaylistRow;
