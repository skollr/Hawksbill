import { useEffect, useState } from "react";
import {
  formatRequestData,
  getRequestData,
  resultsPagination,
  prevResultPage,
  nextResultPage,
} from "../../../../helpers/helpers";
import {
  OpenRequestItemCardInterface,
  PropsInterface,
} from "../../../../helpers/interfaces";
import { useModal } from "../../../../hooks/useModal";
import { useRequestData } from "../../../../hooks/useRequestData";
import { useSearchBar } from "../../../../hooks/useSearhBar";
import {
  OpenRequestItemsCards,
  Modal,
  PrimaryButton,
  SearchBar,
} from "../../../reusableComponents";
import { Paginator } from "../../../reusableComponents/Paginator/Paginator";
import { OpenRequestForm } from "./Forms";

export const OpenRequest: React.FC<PropsInterface> = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [form, handleChanges] = useSearchBar(
    {
      search: "",
    },
    setCurrentPage
  );
  const [modalIsOpen, openModal, closeModal] = useModal();
  const [requestData, setRequestData] = useRequestData([]);
  useEffect(() => {
    getRequestData(setRequestData);
  }, []);
  const data: OpenRequestItemCardInterface["data"] =
    formatRequestData(requestData);
  const [searchData, info] = resultsPagination(data, currentPage, form.search);
  const prevPage = prevResultPage(currentPage, setCurrentPage);
  const nextPage = nextResultPage(
    info[1],
    info[2],
    currentPage,
    setCurrentPage
  );
  return (
    <div className="main">
      <div className="main__content">
        <SearchBar
          placeholder="Busca una solicitud abierta"
          form={form}
          handleChanges={handleChanges}
        />
        <PrimaryButton action={openModal}>Abrir evento</PrimaryButton>
        <OpenRequestItemsCards data={searchData} closeRequest={true} />
        <Paginator
          currentPage={info[0]}
          displayedResults={info[1]}
          totalResults={info[2]}
          nextPage={nextPage}
          prevPage={prevPage}
        />
        <Modal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          title="Abrir evento"
        >
          <OpenRequestForm />
        </Modal>
      </div>
    </div>
  );
};
