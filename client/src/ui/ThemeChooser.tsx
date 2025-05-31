import {
  HiMiniComputerDesktop,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";
import Menus from "./Menus";
import { useTheme } from "../context/ThemeContext";

function ThemeChooser() {
  const { setTheme } = useTheme();

  return (
    <>
      <Menus.Button
        icon={<HiMiniComputerDesktop />}
        onClick={() => setTheme("system")}
      >
        System
      </Menus.Button>
      <Menus.Button icon={<HiOutlineSun />} onClick={() => setTheme("light")}>
        Light
      </Menus.Button>
      <Menus.Button icon={<HiOutlineMoon />} onClick={() => setTheme("dark")}>
        Dark
      </Menus.Button>
    </>
  );
}

export default ThemeChooser;
