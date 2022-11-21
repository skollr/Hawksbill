import { useEffect, useState } from "react";
import { FaBars, FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { collapseNavSubLists } from "../../../helpers/helpers";
import { ToggleButtonInterface } from "../../../helpers/interfaces";

export const ToggleButton: React.FC<ToggleButtonInterface> = ({
  openSideMenu,
  setOpenSideMenu,
}): JSX.Element => {
  const widthBreakpoint: number = 800;
  const [mobileScreen, setMobileScreen] = useState(
    window.innerWidth < widthBreakpoint
  );
  useEffect(() => {
    window.addEventListener("resize", (): void =>
      setMobileScreen(window.innerWidth < widthBreakpoint)
    );
  }, [mobileScreen]);
  return (
    <div
      className={
        mobileScreen
          ? openSideMenu
            ? "side-menu__toggle-button side-menu__toggle-button--mobile side-menu__toggle-button--open-menu"
            : "side-menu__toggle-button side-menu__toggle-button--mobile"
          : openSideMenu
          ? "side-menu__toggle-button side-menu__toggle-button--open-menu"
          : "side-menu__toggle-button"
      }
      onClick={(): void => {
        if (openSideMenu) {
          collapseNavSubLists();
        }
        setOpenSideMenu(!openSideMenu);
      }}
    >
      {mobileScreen ? (
        openSideMenu ? (
          <IoClose className="reusable__icon" />
        ) : (
          <FaBars className="reusable__icon" />
        )
      ) : openSideMenu ? (
        <FaAngleLeft className="reusable__icon" />
      ) : (
        <FaAngleRight className="reusable__icon" />
      )}
    </div>
  );
};
