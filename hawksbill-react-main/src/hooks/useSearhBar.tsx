import { useState } from "react";
import { SearchInterface } from "../helpers/interfaces";

export const useSearchBar = (
  initialValue: SearchInterface,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
): [
  SearchInterface,
  (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void
] => {
  const [form, setForm] = useState(initialValue);
  const handleChanges = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    setCurrentPage(0);
  };
  return [form, handleChanges];
};
