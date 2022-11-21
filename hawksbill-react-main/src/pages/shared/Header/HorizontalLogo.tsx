import { PropsInterface } from "../../../helpers/interfaces";
import HawksbillHorizontalLogo from "../../../assets/media/horizontal_logo.svg";
import { preventDrag } from "../../../helpers/helpers";

export const HorizontalLogo: React.FC<PropsInterface> = (): JSX.Element => {
  return (
    <img
      className="header__logo"
      src={HawksbillHorizontalLogo}
      alt="Hawksbill Logo"
      onDragStart={preventDrag}
    />
  );
};
