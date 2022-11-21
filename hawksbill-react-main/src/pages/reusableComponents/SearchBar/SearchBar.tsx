import { BsSearch } from "react-icons/bs";
import { SearchBarInterface } from "../../../helpers/interfaces";
import { FormInput } from "../Inputs/Inputs";

export const SearchBar: React.FC<SearchBarInterface> = ({
  placeholder,
  form,
  handleChanges,
}): JSX.Element => {
  return (
    <div className="reusable--search-container">
      <form className="reusable">
        <button
          className="reusable__input-icon"
          onClick={(event) => event.preventDefault()}
        >
          <BsSearch className="reusable__icon" />
        </button>
        <FormInput
          name="search"
          value={form.search === undefined ? "" : form.search}
          placeholder={placeholder}
          type="text"
          onChange={handleChanges}
          corners={[true, true, true, true]}
          paddingIcon={true}
        />
      </form>
    </div>
  );
};
