import styled from "styled-components";
import { useChannelInfo } from "../features/authentication/useChannelInfo";
import Avatar from "./Avatar";

const StyledUserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;

  & span {
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
  }

  & span.channel-name {
    font-size: ${(props) => props.$channelNameSize || 1}rem;
  }

  & span.custom-url {
    font-size: ${(props) => props.$customUrlSize || 1}rem;
  }
`;

function UserInfo({
  avatarSize,
  channelNameSize = 1,
  customUrlSize = 1,
  displayCustomUrl = true,
}) {
  const { channel } = useChannelInfo();
  const { title: name, customUrl, thumbnails } = channel.items[0].snippet;
  const avatarUrl = thumbnails.default.url;
  return (
    <StyledUserInfo
      $channelNameSize={channelNameSize}
      $customUrlSize={customUrlSize}
    >
      <Avatar
        $avatarSize={avatarSize}
        src={avatarUrl}
        alt={`Avatar of ${name}`}
      />
      <div>
        <span className="channel-name">{name}</span>
        {displayCustomUrl && <span className="custom-url">{customUrl}</span>}
      </div>
    </StyledUserInfo>
  );
}

export default UserInfo;
