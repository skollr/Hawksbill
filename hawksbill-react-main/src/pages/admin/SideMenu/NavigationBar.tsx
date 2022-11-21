import { PropsInterface } from "../../../helpers/interfaces";

export const NavigationBar: React.FC<PropsInterface> = ({
  children,
}): JSX.Element => {
  return <div className="side-menu__navbar">{children}</div>;
};
