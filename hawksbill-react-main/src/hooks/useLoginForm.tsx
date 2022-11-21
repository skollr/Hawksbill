import { useState } from "react";
import { LoginFormInterface } from "../helpers/interfaces";

export const useLoginForm = (
  initialValue: LoginFormInterface
): [
  LoginFormInterface,
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
  return [form, handleChanges];
};
