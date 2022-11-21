import { useState } from "react";

export const useModal = (
  initialValue: boolean = false
): [boolean, () => void, () => void] => {
  const [open, setOpen] = useState(initialValue);
  const openModal: () => void = () => setOpen(true);
  const closeModal: () => void = () => setOpen(false);
  return [open, openModal, closeModal];
};
