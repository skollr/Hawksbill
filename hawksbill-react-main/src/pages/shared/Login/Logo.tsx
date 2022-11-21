import { PropsInterface } from "../../../helpers/interfaces";
import HawksbillLogo from "../../../assets/media/logo.svg";
import { preventDrag } from "../../../helpers/helpers";

export const Logo: React.FC<PropsInterface> = (): JSX.Element => {
  return (
    <img
      className="login__logo"
      src={HawksbillLogo}
      alt="Hawksbill Logo"
      onDragStart={preventDrag}
    />
  );
};
