import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledPlaylistRow = styled(NavLink)`
  text-align: left;
  display: inline-block;
  width: 100%;
`;

function PlaylistRow({ id, title }) {
  return (
    <StyledPlaylistRow to={`/app/playlist/${id}`} end>
      {title}
    </StyledPlaylistRow>
  );
}

export default PlaylistRow;
