import styled from "styled-components";
import { HiOutlineArrowPath } from "react-icons/hi2";

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
`;

const Span = styled.span`
  padding-left: 0.5rem;
  font-weight: 500;
`;

const Button = styled.button`
  text-align: left;
  background: none;
  border: none;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem;
  border-radius: 0.5rem;

  & span {
    font-size: 0.875rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  & svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  &:hover {
    background-color: var(--color-neutral-300);
  }
`;

function PlaylistHeading() {
  return (
    <Box>
      <Span>Your playlists</Span>
      <Button>
        <HiOutlineArrowPath />
      </Button>
    </Box>
  );
}

export default PlaylistHeading;
