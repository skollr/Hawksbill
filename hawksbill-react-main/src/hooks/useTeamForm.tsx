import { useState } from "react";
import { TeamFormInterface } from "../helpers/interfaces";

export const useTeamForm = (
  initialValue: TeamFormInterface
): [
  TeamFormInterface,
  React.Dispatch<React.SetStateAction<TeamFormInterface>>,
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
  };
  return [form, setForm, handleChanges];
};
