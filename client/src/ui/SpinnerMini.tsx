import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

interface SpinnerMiniProps {
  $size?: number;
}

const SpinnerMini = styled(BiLoaderAlt)<SpinnerMiniProps>`
  width: ${(props) => props.$size || 2.4}rem;
  height: ${(props) => props.$size || 2.4}rem;
  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
