import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { PaginatorInterface } from "../../../helpers/interfaces";

export const Paginator: React.FC<PaginatorInterface> = ({
  currentPage,
  displayedResults,
  totalResults,
  prevPage,
  nextPage,
}): JSX.Element => {
  return (
    <div className="paginator">
      <div className="paginator__box">
        <button className="paginator__button" onClick={prevPage}>
          <AiOutlineLeft />
        </button>
        <span className="paginator__page">
          {currentPage > 0 ? currentPage : "-"}
        </span>
        <button className="paginator__button" onClick={nextPage}>
          <AiOutlineRight />
        </button>
      </div>
      <p className="paginator__info">
        Mostrando{" "}
        <span className="paginator__info--bold" id="currentResults">
          {displayedResults}
        </span>{" "}
        de{" "}
        <span className="paginator__info--bold" id="totalResults">
          {totalResults}
        </span>{" "}
        resultados
      </p>
    </div>
  );
};
