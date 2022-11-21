import { useRef } from "react";
import { Link } from "react-router-dom";
import { collapseNavSubLists, preventDrag } from "../../../helpers/helpers";
import {
  LogoutButtonInterface,
  NavBarCategoryInterface,
  NavBarItemInterface,
} from "../../../helpers/interfaces";

export const NavBarCategory: React.FC<NavBarCategoryInterface> = ({
  children,
  detail,
  icon,
  destination,
  openSideMenu,
  setOpenSideMenu,
}): JSX.Element => {
  const useItemList: React.RefObject<HTMLLIElement> =
    useRef<HTMLLIElement>(null);
  const useSubList: React.RefObject<HTMLUListElement> =
    useRef<HTMLUListElement>(null);
  const toggleSubList = (): void => {
    if (useSubList.current !== null && useItemList.current !== null) {
      const currentHeight: number = parseInt(
        window
          .getComputedStyle(useItemList.current)
          .getPropertyValue("height")
          .split("px")[0]
      );
      const height: number = useSubList.current.childElementCount * 52;
      if (!openSideMenu) {
        setOpenSideMenu(!openSideMenu);
      }
      if (currentHeight > 0) {
        useItemList.current.style.height = `${0}px`;
      } else {
        collapseNavSubLists();
        useItemList.current.style.height = `${height}px`;
      }
    }
  };
  return children ? (
    <>
      <li
        className="side-menu__item side-menu__item-destination"
        onClick={toggleSubList}
      >
        <div className="side-menu__item-container">
          <div className="side-menu__item-icon">{icon}</div>
          <span className="side-menu__item-detail">{detail}</span>
        </div>
      </li>
      <li ref={useItemList} className="side-menu__item-sublist">
        <ul ref={useSubList}>{children}</ul>
      </li>
    </>
  ) : (
    <li className="side-menu__item">
      {destination ? (
        <Link
          className="side-menu__item-destination"
          to={destination}
          onDragStart={preventDrag}
          onClick={(): void => {
            collapseNavSubLists();
            setOpenSideMenu(false);
          }}
        >
          <div className="side-menu__item-container">
            <div className="side-menu__item-icon">{icon}</div>
            <span className="side-menu__item-detail">{detail}</span>
          </div>
        </Link>
      ) : (
        <div className="side-menu__item-container">
          <div className="side-menu__item-icon">{icon}</div>
          <span className="side-menu__item-detail">{detail}</span>
        </div>
      )}
    </li>
  );
};

export const LogoutButton: React.FC<LogoutButtonInterface> = ({
  logout,
  icon,
}): JSX.Element => {
  return (
    <li
      className="side-menu__item side-menu__item-destination"
      onClick={() => logout()}
    >
      {
        <div className="side-menu__item-container">
          <div className="side-menu__item-icon">{icon}</div>
          <span className="side-menu__item-detail">Cerrar sesión</span>
        </div>
      }
    </li>
  );
};

export const NavBarItem: React.FC<NavBarItemInterface> = ({
  detail,
  destination,
  setOpenSideMenu,
}): JSX.Element => {
  return (
    <li className="side-menu__item">
      {destination ? (
        <Link
          className="side-menu__item-detail side-menu__item-destination"
          to={destination}
          onDragStart={preventDrag}
          onClick={(): void => {
            collapseNavSubLists();
            setOpenSideMenu(false);
          }}
        >
          {detail}
        </Link>
      ) : (
        detail
      )}
    </li>
  );
};
