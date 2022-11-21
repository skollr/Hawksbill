import { ButtonInterface } from "../../../helpers/interfaces";

export const PrimaryButton: React.FC<ButtonInterface> = ({
  children,
  action,
  executeAction = true,
}): JSX.Element => {
  return (
    <div className="reusable__button">
      <button
        className="reusable__primary-button"
        onClick={action}
        disabled={!executeAction}
      >
        {children}
      </button>
    </div>
  );
};
