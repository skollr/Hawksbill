import { useState } from "react";
import { AiFillHome, AiFillPieChart } from "react-icons/ai";
import { /*IoDocuments, */ IoSettingsSharp } from "react-icons/io5";
import { SiHandshake } from "react-icons/si";
import { RiShutDownLine, RiTeamFill } from "react-icons/ri";
import { AdminPaths, PropsInterface } from "../../../helpers/interfaces";
import { LogoutButton, NavBarCategory, NavBarItem } from "./NavBarItems";
import { NavigationBar } from "./NavigationBar";
import { ToggleButton } from "./ToggleButton";
import { useAuth } from "../../../hooks/useAuth";

export const SideMenu: React.FC<PropsInterface> = (): JSX.Element => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { logout } = useAuth();
  return (
    <div
      className={openSideMenu ? "side-menu side-menu--open-menu" : "side-menu"}
    >
      <ToggleButton
        openSideMenu={openSideMenu}
        setOpenSideMenu={setOpenSideMenu}
      />
      <NavigationBar>
        <ul className="side-menu__navbar-list">
          <NavBarCategory
            openSideMenu={openSideMenu}
            setOpenSideMenu={setOpenSideMenu}
            detail="Inicio"
            icon={<AiFillHome className="reusable__icon" />}
            destination={AdminPaths.Dashboard}
          />
          {/* <NavBarCategory
            openSideMenu={openSideMenu}
            setOpenSideMenu={setOpenSideMenu}
            detail="Documentos"
            icon={<IoDocuments className="reusable__icon" />}
          >
            <NavBarItem
              openSideMenu={openSideMenu}
              setOpenSideMenu={setOpenSideMenu}
              detail="Cuadros de licenciamiento"
              destination={AdminPaths.LicensingTables}
            ></NavBarItem>
            <NavBarItem
              openSideMenu={openSideMenu}
              setOpenSideMenu={setOpenSideMenu}
              detail="Credenciales"
              destination={AdminPaths.Credentials}
            ></NavBarItem>
          </NavBarCategory> */}
          <NavBarCategory
            openSideMenu={openSideMenu}
            setOpenSideMenu={setOpenSideMenu}
            detail="Solicitudes"
            icon={<SiHandshake className="reusable__icon" />}
          >
            <NavBarItem
              openSideMenu={openSideMenu}
              setOpenSideMenu={setOpenSideMenu}
              detail="Abiertas"
              destination={AdminPaths.OpenRequest}
            ></NavBarItem>
            <NavBarItem
              openSideMenu={openSideMenu}
              setOpenSideMenu={setOpenSideMenu}
              detail="Cerradas"
              destination={AdminPaths.ClosedRequest}
            ></NavBarItem>
          </NavBarCategory>
          <NavBarCategory
            openSideMenu={openSideMenu}
            setOpenSideMenu={setOpenSideMenu}
            detail="Equipo"
            icon={<RiTeamFill className="reusable__icon" />}
            destination={AdminPaths.Team}
          />
          <NavBarCategory
            openSideMenu={openSideMenu}
            setOpenSideMenu={setOpenSideMenu}
            detail="Informes"
            icon={<AiFillPieChart className="reusable__icon" />}
            destination={AdminPaths.Reports}
          />
        </ul>
        <ul className="side-menu__navbar-list">
          <NavBarCategory
            openSideMenu={openSideMenu}
            setOpenSideMenu={setOpenSideMenu}
            detail="Configuración"
            icon={<IoSettingsSharp className="reusable__icon" />}
            destination={AdminPaths.Settings}
          />
          <LogoutButton
            logout={logout}
            icon={<RiShutDownLine className="reusable__icon" />}
          />
        </ul>
      </NavigationBar>
    </div>
  );
};
