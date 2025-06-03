import styled, { css } from "styled-components";
import Button from "./Button";
import { useTheme } from "../context/ThemeContext";
import { Theme } from "../utils/types";

interface StyledButtonDangerProps {
  $theme: Theme;
}

const StyledButtonDanger = styled(Button)<StyledButtonDangerProps>`
  color: var(--color-red-700);

  ${(props) =>
    props.$theme === "light"
      ? css`
          color: var(--color-red-700);
          &:not(:disabled):hover {
            color: var(--color-neutral-100);
            background-color: var(--color-red-700);
          }
        `
      : css`
          color: var(--color-red-600);
          &:not(:disabled):hover {
            color: var(--color-neutral-800);
            background-color: var(--color-red-300);
          }
        `}
`;

function ButtonDanger({ ...props }) {
  const { theme } = useTheme();

  const preferDarkColorScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const currentTheme: Theme =
    theme === "system" ? (preferDarkColorScheme ? "dark" : "light") : theme;

  return <StyledButtonDanger $theme={currentTheme} {...props} />;
}

export default ButtonDanger;
