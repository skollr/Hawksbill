import { useEffect, useState } from "react";
import {
  formatRequestData,
  getRequestData,
  nextResultPage,
  prevResultPage,
  resultsPagination,
} from "../../../../helpers/helpers";
import {
  OpenRequestItemCardInterface,
  PropsInterface,
} from "../../../../helpers/interfaces";
import { useRequestData } from "../../../../hooks/useRequestData";
import { useSearchBar } from "../../../../hooks/useSearhBar";
import { OpenRequestItemsCards, SearchBar } from "../../../reusableComponents";
import { Paginator } from "../../../reusableComponents/Paginator/Paginator";

export const ClosedRequest: React.FC<PropsInterface> = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [form, handleChanges] = useSearchBar(
    {
      search: "",
    },
    setCurrentPage
  );
  const [requestData, setRequestData] = useRequestData([]);
  useEffect(() => {
    getRequestData(setRequestData, true);
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
          placeholder="Busca una solicitud cerrada"
          form={form}
          handleChanges={handleChanges}
        />
        <OpenRequestItemsCards data={searchData} closeRequest={false} />
        <Paginator
          currentPage={info[0]}
          displayedResults={info[1]}
          totalResults={info[2]}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
    </div>
  );
};
