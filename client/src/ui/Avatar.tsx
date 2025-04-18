import styled from "styled-components";

interface AvatarProps {
  $avatarSize?: number;
}

const Avatar = styled.img<AvatarProps>`
  display: block;
  width: ${(props) => props.$avatarSize || 2.25}rem;
  height: ${(props) => props.$avatarSize || 2.25}rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

export default Avatar;
