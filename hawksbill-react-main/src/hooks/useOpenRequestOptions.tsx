import { useState } from "react";
import { OpenRequestOptionsInterface } from "../helpers/interfaces";

export const useOpenRequestOptions = (
  initialValue: OpenRequestOptionsInterface
): [
  OpenRequestOptionsInterface,
  React.Dispatch<React.SetStateAction<OpenRequestOptionsInterface>>
] => {
  const [openRequestOptions, setOpenRequestOptions] = useState(initialValue);
  return [openRequestOptions, setOpenRequestOptions];
};
