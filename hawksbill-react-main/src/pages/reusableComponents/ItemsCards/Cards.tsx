import { useRef, useEffect } from "react";
import {
  CardInterface,
  OpenRequestCardInterface,
} from "../../../helpers/interfaces";
import { useModal } from "../../../hooks/useModal";
import { RequestDetail } from "../../admin/Requests/RequestDetail/RequestDetail";
import { TeamDetail } from "../../admin";
import { OpenRequestModal, Modal } from "../../reusableComponents";

export const OpenRequestCard: React.FC<OpenRequestCardInterface> = ({
  title,
  cardImageUrl,
  info,
  request,
  closeRequest,
  requestId,
}): JSX.Element => {
  const [modalIsOpen, openModal, closeModal] = useModal();
  const useCardImage: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  useEffect((): void => {
    if (useCardImage.current !== null) {
      useCardImage.current.style.background = `url('${cardImageUrl}')`;
      useCardImage.current.style.backgroundSize = "cover";
      useCardImage.current.style.backgroundRepeat = "no-repeat";
    }
  }, [cardImageUrl]);
  return (
    <>
      <div className="reusable__card" onClick={openModal}>
        <div ref={useCardImage} className="reusable__card-image" />
        <div className="reusable__card-detail">
          <span className="reusable__card-info reusable__card-info--center reusable__card-info--title">
            {title}
          </span>
          {info?.map((data, index) => (
            <span className="reusable__card-info" key={index}>
              <span className="reusable__card-info--bold">{data.detail}</span>
              {data.content}
            </span>
          ))}
        </div>
      </div>
      <OpenRequestModal
        requestId={requestId}
        closeRequest={closeRequest}
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        title={title}
        applicant={
          request !== undefined
            ? request.applicant
              ? request.applicant.check
              : false
            : false
        }
        technician={
          request !== undefined
            ? request.technician
              ? request.technician.check
              : false
            : false
        }
      >
        {request !== undefined ? <RequestDetail {...request} /> : null}
      </OpenRequestModal>
    </>
  );
};

export const Card: React.FC<CardInterface> = ({
  title,
  cardImageUrl,
  info,
  request,
}): JSX.Element => {
  const [modalIsOpen, openModal, closeModal] = useModal();
  const useCardImage: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  useEffect((): void => {
    if (useCardImage.current !== null) {
      useCardImage.current.style.background = `url('${cardImageUrl}')`;
      useCardImage.current.style.backgroundSize = "cover";
      useCardImage.current.style.backgroundRepeat = "no-repeat";
    }
  }, [cardImageUrl]);
  return (
    <>
      <div className="reusable__card" onClick={openModal}>
        <div ref={useCardImage} className="reusable__card-image" />
        <div className="reusable__card-detail">
          <span className="reusable__card-info reusable__card-info--center reusable__card-info--title">
            {title}
          </span>
          {info?.map((data, index) => (
            <span className="reusable__card-info" key={index}>
              <span className="reusable__card-info--bold">{data.detail}</span>
              {data.content}
            </span>
          ))}
        </div>
      </div>
      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} title={title}>
        {request !== undefined ? <TeamDetail {...request} /> : null}
      </Modal>
    </>
  );
};
