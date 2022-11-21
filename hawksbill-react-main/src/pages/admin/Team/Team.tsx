import { useEffect, useState } from "react";
import {
  formatTeamData,
  getTeamData,
  nextResultPage,
  prevResultPage,
  resultsPagination,
} from "../../../helpers/helpers";
import { ItemCardInterface, PropsInterface } from "../../../helpers/interfaces";
import { useSearchBar } from "../../../hooks/useSearhBar";
import { useTeamData } from "../../../hooks/useTeamData";
import { ItemsCards, SearchBar } from "../../reusableComponents";
import { Paginator } from "../../reusableComponents/Paginator/Paginator";

export const Team: React.FC<PropsInterface> = (): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0);
  const [form, handleChanges] = useSearchBar(
    {
      search: "",
    },
    setCurrentPage
  );
  const [teamData, setTeamData] = useTeamData([]);
  useEffect(() => {
    getTeamData(setTeamData);
  }, []);
  const data: ItemCardInterface["data"] = formatTeamData(teamData);
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
          placeholder="Busca un integrante del equipo"
          form={form}
          handleChanges={handleChanges}
        />
        <ItemsCards data={searchData} />
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
