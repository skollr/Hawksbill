import { useEffect, useRef } from "react";
import { APIPaths, TeamDetailInterface } from "../../../helpers/interfaces";

export const UserDetail: React.FC<TeamDetailInterface> = ({
  cardImageUrl,
  position,
  openRequestNumber,
  closedRequestNumber,
}): JSX.Element => {
  const useCardImage: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  useEffect((): void => {
    if (useCardImage.current !== null) {
      useCardImage.current.style.background = `url('${APIPaths.MEDIA_URL}/${cardImageUrl}')`;
      useCardImage.current.style.backgroundSize = "cover";
      useCardImage.current.style.backgroundRepeat = "no-repeat";
    }
  }, [useCardImage]);
  return (
    <div className="reusable__modal-request-info">
      <div
        ref={useCardImage}
        className="reusable__card-image reusable__card-image--detail"
      />
      <div className="reusable__modal-request-detail">
        <span className="reusable__card-request-info">
          <span className="reusable__card-info--bold">Cargo: </span>
          {position}
        </span>
        <span className="reusable__card-request-info">
          <span className="reusable__card-info--bold">
            Solicitudes abiertas:{" "}
          </span>
          {openRequestNumber}
        </span>
        <span className="reusable__card-request-info">
          <span className="reusable__card-info--bold">
            Solicitudes cerradas:{" "}
          </span>
          {closedRequestNumber}
        </span>
      </div>
    </div>
  );
};
