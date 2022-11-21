import { AiFillCloseCircle } from "react-icons/ai";
import { cancelOpenRequest, closeOpenRequest } from "../../../helpers/helpers";
import {
  ModalInterface,
  OpenRequestModalInterface,
} from "../../../helpers/interfaces";
import { PrimaryButton } from "../../reusableComponents";

export const Modal: React.FC<ModalInterface> = ({
  children,
  modalIsOpen,
  closeModal,
  title,
}): JSX.Element => {
  return (
    <div
      className={`reusable__modal${
        modalIsOpen ? " reusable__modal--is-open" : ""
      }`}
    >
      <div className="reusable__modal-container">
        <div className="reusable__modal-header">
          <div />
          <span className="reusable__modal-header--title">{title}</span>
          <button
            onClick={closeModal}
            className="reusable__button reusable__trasparent-button"
          >
            <AiFillCloseCircle className="reusable__icon" />
          </button>
        </div>
        <div className="reusable__modal-body reusable__modal-body--footer">
          {children}
        </div>
      </div>
    </div>
  );
};

export const OpenRequestModal: React.FC<OpenRequestModalInterface> = ({
  children,
  modalIsOpen,
  closeModal,
  title,
  applicant,
  technician,
  closeRequest,
  requestId,
}): JSX.Element => {
  return (
    <div
      className={`reusable__modal${
        modalIsOpen ? " reusable__modal--is-open" : ""
      }`}
    >
      <div className="reusable__modal-container">
        <div className="reusable__modal-header">
          <div />
          <span className="reusable__modal-header--title">{title}</span>
          <button
            onClick={closeModal}
            className="reusable__button reusable__trasparent-button"
          >
            <AiFillCloseCircle className="reusable__icon" />
          </button>
        </div>
        <div
          className={`reusable__modal-body${
            !closeRequest ? " reusable__modal-body--footer" : ""
          }`}
        >
          {children}
        </div>
        {closeRequest ? (
          <div className="reusable__modal-footer">
            <PrimaryButton
              action={() =>
                (async () => await cancelOpenRequest(`${requestId}`))()
              }
              executeAction={applicant}
            >
              Cancelar evento
            </PrimaryButton>
            <PrimaryButton
              action={() =>
                (async () => await closeOpenRequest(`${requestId}`))()
              }
              executeAction={technician}
            >
              Cerrar evento
            </PrimaryButton>
          </div>
        ) : null}
      </div>
    </div>
  );
};
