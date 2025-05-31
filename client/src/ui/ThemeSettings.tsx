import { HiOutlineChevronDown } from "react-icons/hi2";
import styled from "styled-components";
import Menus from "./Menus";
import Button from "./Button";
import ThemeChooser from "./ThemeChooser";
import { useTheme } from "../context/ThemeContext";

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ThemeButton = styled(Button)`
  & span {
    font-size: 1rem;
  }

  & .icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & svg {
    width: 1rem;
    height: 1rem;
  }
`;

const StyledList = styled(Menus.List)`
  padding: 0.25rem;
  background-color: var(--color-neutral-200);
  box-shadow: var(--shadow-lg);
  border-radius: 0.5rem;
  border: 1px solid var(--color-neutral-300);
  width: 10rem;
`;

function ThemeSettings() {
  const { theme } = useTheme();

  return (
    <div>
      <Box>
        <span>Theme</span>

        <Menus.Menu>
          <Menus.Toggle id="theme" alignment="right" asChild>
            <ThemeButton>
              <p>{theme[0].toUpperCase() + theme.slice(1)}</p>
              <div className="icon">
                <HiOutlineChevronDown />
              </div>
            </ThemeButton>
          </Menus.Toggle>

          <StyledList id="theme" domNodeId="settings">
            <ThemeChooser />
          </StyledList>
        </Menus.Menu>
      </Box>
    </div>
  );
}

export default ThemeSettings;
