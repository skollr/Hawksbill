import { useRef } from "react";
import { RequestDetailInterface } from "../../../../helpers/interfaces";

export const RequestDetail: React.FC<RequestDetailInterface> = ({
  cardImageUrl,
  modificationDate,
  registrationDate,
  description,
  requestType,
  applicant,
  technician,
  isClosed,
}): JSX.Element => {
  const useCardImage: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  if (useCardImage.current !== null) {
    useCardImage.current.style.background = `url('${cardImageUrl}')`;
    useCardImage.current.style.backgroundSize = "cover";
    useCardImage.current.style.backgroundRepeat = "no-repeat";
  }
  return (
    <div className="reusable__modal-request-info">
      <div
        ref={useCardImage}
        className="reusable__card-image reusable__card-image--detail"
      />
      <div className="reusable__modal-request-detail">
        <span className="reusable__card-request-info">
          <span className="reusable__card-info--bold">Abierto: </span>
          {registrationDate}
        </span>
        <span className="reusable__card-request-info">
          <span className="reusable__card-info--bold">Tipo: </span>
          {requestType}
        </span>
        <span className="reusable__card-request-info">
          <span className="reusable__card-info--bold">Creador: </span>
          {applicant?.detail}
        </span>
        <span className="reusable__card-request-info">
          <span className="reusable__card-info--bold">Descripción: </span>
          {description}
        </span>
        <span className="reusable__card-request-info">
          <span className="reusable__card-info--bold">Responsable: </span>
          {technician?.detail}
        </span>
        {isClosed ? (
          <span className="reusable__card-request-info">
            <span className="reusable__card-info--bold">Cerrado: </span>
            {modificationDate}
          </span>
        ) : null}
      </div>
    </div>
  );
};
