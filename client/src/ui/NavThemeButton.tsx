import styled from "styled-components";
import {
  HiMiniComputerDesktop,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";
import Menus from "./Menus";
import ButtonIcon from "./ButtonIcon";
import ThemeChooser from "./ThemeChooser";
import { useTheme } from "../context/ThemeContext";
import { Theme } from "../utils/types";

const ThemeToggle = styled(ButtonIcon)`
  border-radius: 50%;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const StyledList = styled(Menus.List)`
  width: 10rem;
`;

function NavThemeButton() {
  const { theme } = useTheme();

  const preferDarkColorScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const currentTheme: Theme =
    theme === "system" ? (preferDarkColorScheme ? "dark" : "light") : theme;

  const icons = {
    system: <HiMiniComputerDesktop />,
    light: <HiOutlineSun />,
    dark: <HiOutlineMoon />,
  };

  return (
    <Menus>
      <Menus.Menu>
        <Menus.Toggle id="theme" alignment="right" asChild>
          <ThemeToggle>{icons[currentTheme]}</ThemeToggle>
        </Menus.Toggle>

        <StyledList id="theme" domNodeId="nav-theme">
          <ThemeChooser />
        </StyledList>
      </Menus.Menu>
    </Menus>
  );
}

export default NavThemeButton;
