import { getCornersClasses } from "../../../helpers/helpers";
import {
  InputInterface,
  CornerRadiusInputInterface,
} from "../../../helpers/interfaces";

export const LoginInput: React.FC<InputInterface> = ({
  label,
  ...rest
}): JSX.Element => {
  return (
    <div className="reusable">
      <label className="reusable__label">
        <span className="reusable__label-text">{label}</span>
        <input className="reusable__input" {...rest} />
      </label>
    </div>
  );
};

export const FormInput: React.FC<CornerRadiusInputInterface> = ({
  label,
  paddingIcon,
  corners,
  ...rest
}): JSX.Element => {
  const cornersClasses = getCornersClasses(corners);
  return (
    <div className="reusable">
      <label className="reusable__label">
        <span className="reusable__label-text">{label}</span>
        {paddingIcon ? (
          <div className="reusable__input--icon-container">
            <input
              className={`reusable__input reusable__input--padding-icon reusable__input--shadow${cornersClasses}${
                label !== undefined ? " reusable__input--margin-top" : ""
              }`}
              {...rest}
            />
          </div>
        ) : (
          <input
            className={`reusable__input reusable__input--shadow${cornersClasses}${
              label !== undefined ? " reusable__input--margin-top" : ""
            }`}
            {...rest}
          />
        )}
      </label>
    </div>
  );
};

export const FormSelect: React.FC<CornerRadiusInputInterface> = ({
  label,
  paddingIcon,
  corners,
  options,
  placeholder,
  ...rest
}): JSX.Element => {
  const cornersClasses = getCornersClasses(corners);
  return (
    <div className="reusable">
      <label className="reusable__label">
        <span className="reusable__label-text">{label}</span>
        {paddingIcon ? (
          <div className="reusable__input--icon-container">
            <select
              className={`reusable__input reusable__input--padding-icon reusable__input--shadow${cornersClasses}${
                label !== undefined ? " reusable__input--margin-top" : ""
              }`}
              {...rest}
            >
              <>
                <option
                  hidden
                  value=""
                  className="reusable__select-placeholder"
                >
                  {placeholder}
                </option>
                {options !== undefined
                  ? options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.detail}
                      </option>
                    ))
                  : null}
              </>
            </select>
          </div>
        ) : (
          <select
            className={`reusable__input reusable__input--shadow${cornersClasses}${
              label !== undefined ? " reusable__input--margin-top" : ""
            }`}
            {...rest}
          >
            <>
              <option hidden value="" className="reusable__select-placeholder">
                {placeholder}
              </option>
              {options !== undefined
                ? options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.detail}
                    </option>
                  ))
                : null}
            </>
          </select>
        )}
      </label>
    </div>
  );
};
