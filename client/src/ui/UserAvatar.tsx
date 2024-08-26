import styled from "styled-components";
import { useChannelInfo } from "../features/authentication/useChannelInfo";
import Avatar from "./Avatar";

const StyledUserAvatar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;

  & span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

function UserAvatar() {
  const { channel } = useChannelInfo();
  const { title: name, thumbnails } = channel.items[0].snippet;
  const avatarUrl = thumbnails.default.url;
  return (
    <StyledUserAvatar>
      <Avatar src={avatarUrl} alt={`Avatar of ${name}`} />
      <span>{name}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
