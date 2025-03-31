import styled from "styled-components";
import { usePlaylistOperations } from "../context/PlaylistOperationsContext";
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";
import { useRef } from "react";

const StyledSearchPlaylist = styled.div`
  width: 100%;
  padding: 0.5rem;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--color-neutral-400);
  border-radius: 0.5rem;
  padding: 0.25rem 0.375rem;
  gap: 0.375rem;

  & svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  &:has(input:focus) {
    outline: 1px solid var(--color-neutral-600);
  }
`;

const Input = styled.input`
  border: none;
  background: none;
  width: 100%;
  flex-grow: 1;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SearchPlaylist() {
  const { query, setQuery } = usePlaylistOperations();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClear() {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <StyledSearchPlaylist>
      <InputBox
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        <HiOutlineMagnifyingGlass />
        <Input
          type="text"
          placeholder="Search"
          value={query}
          ref={inputRef}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query !== "" && (
          <Button onClick={handleClear}>
            <HiOutlineXMark />
          </Button>
        )}
      </InputBox>
    </StyledSearchPlaylist>
  );
}

export default SearchPlaylist;
