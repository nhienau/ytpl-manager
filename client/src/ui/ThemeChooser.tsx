import {
  HiMiniComputerDesktop,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";
import Menus from "./Menus";
import { useTheme } from "../context/ThemeContext";

function ThemeChooser() {
  const { changeTheme } = useTheme();

  return (
    <>
      <Menus.Button
        icon={<HiMiniComputerDesktop />}
        onClick={() => changeTheme("system")}
      >
        System
      </Menus.Button>
      <Menus.Button
        icon={<HiOutlineSun />}
        onClick={() => changeTheme("light")}
      >
        Light
      </Menus.Button>
      <Menus.Button
        icon={<HiOutlineMoon />}
        onClick={() => changeTheme("dark")}
      >
        Dark
      </Menus.Button>
    </>
  );
}

export default ThemeChooser;
