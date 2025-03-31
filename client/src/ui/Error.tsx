import styled from "styled-components";
import FullPage from "./FullPage";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { PiWarningCircleLight } from "react-icons/pi";
import { MouseEvent } from "react";

const Icon = styled.div`
  & svg {
    width: 4rem;
    height: 4rem;
  }
`;

const Box = styled.div`
  width: 70rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 0.25rem;
`;

const Message = styled.p`
  text-align: center;
  margin-bottom: 0.75rem;
`;

const StyledLink = styled.a`
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: var(--color-neutral-200);

  & span {
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

interface ErrorProps {
  title?: string;
  message?: string;
  onClick?: (e: MouseEvent) => void;
}

function Error({ title, message, onClick }: ErrorProps) {
  return (
    <FullPage>
      <Box>
        <Icon>
          <PiWarningCircleLight />
        </Icon>
        <Title>{title || "Oops! Something went wrong..."}</Title>
        {message && <Message>{message}</Message>}
        <StyledLink href="/" onClick={onClick}>
          <HiOutlineArrowLeft />
          <span>Back to home page</span>
        </StyledLink>
      </Box>
    </FullPage>
  );
}

export default Error;
