import { PropsInterface } from "../../../helpers/interfaces";
import { useAuth } from "../../../hooks/useAuth";
import { LoginForms } from "./Forms";
import { Logo } from "./Logo";
import { SocialNetwork } from "./SocialNetwork";

export const Login: React.FC<PropsInterface> = (): JSX.Element => {
  const { auth } = useAuth();
  if (auth !== null && auth !== undefined) {
    window.location.replace("/");
    return <div />;
  }
  return (
    <div className="login">
      <div className="login__container">
        <Logo />
        <LoginForms />
        <SocialNetwork />
      </div>
    </div>
  );
};
