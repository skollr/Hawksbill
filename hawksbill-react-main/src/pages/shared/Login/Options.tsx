import { LoginModes, LoginOptionInterface } from "../../../helpers/interfaces";

export const Options: React.FC<LoginOptionInterface> = ({
  mode,
  formContainerRef,
  onModeChange,
}): JSX.Element => {
  const option = {
    question:
      mode === LoginModes.SignIn
        ? "¿No tienes una cuenta?"
        : mode === LoginModes.SignUp
        ? "¿Ya tienes una cuenta?"
        : "¿Ya tienes tu contraseña de vuelta?",
    reply:
      mode === LoginModes.SignIn
        ? "Regístrate"
        : mode === LoginModes.SignUp
        ? "Inicia sesión"
        : "Inicia sesión",
    newMode:
      mode === LoginModes.SignIn
        ? LoginModes.SignUp
        : mode === LoginModes.SignUp
        ? LoginModes.SignIn
        : LoginModes.SignIn,
  };
  return (
    <div className="login__options">
      <span className="login__question">{option.question}</span>
      <span
        className="reusable__label-text reusable__label-text--hyperlink"
        onClick={() => {
          formContainerRef.current?.classList.add("login__slide--displace");
          setTimeout(() => {
            onModeChange(option.newMode);
          }, 250);
        }}
      >
        {option.reply}
      </span>
    </div>
  );
};
