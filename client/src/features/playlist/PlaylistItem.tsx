import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledPlaylistItem = styled(NavLink)`
  text-align: left;
  display: inline-block;
  width: 100%;
`;

function PlaylistItem({ id, title }) {
  return (
    <StyledPlaylistItem to={`/app/playlist/${id}`} end>
      {title}
    </StyledPlaylistItem>
  );
}

export default PlaylistItem;
