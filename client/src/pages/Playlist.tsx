import { useParams } from "react-router-dom";

function Playlist() {
  const { playlistId } = useParams();

  return (
    <div>
      <p>Playlist</p>
      <p>{playlistId}</p>
    </div>
  );
}

export default Playlist;
