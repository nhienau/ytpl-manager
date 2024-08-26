import styled from "styled-components";

const Avatar = styled.img`
  display: block;
  width: 2.25rem;
  height: 2.25rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

export default Avatar;
