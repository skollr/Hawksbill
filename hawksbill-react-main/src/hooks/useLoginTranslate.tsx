import { useState } from "react";
import { LoginModes } from "../helpers/interfaces";

export const useLoginTranslate = (
  initialValue: LoginModes,
  formContainerRef: React.RefObject<HTMLDivElement>
): [LoginModes, React.Dispatch<React.SetStateAction<LoginModes>>] => {
  formContainerRef.current?.classList.remove("login__slide--displace");
  const [mode, setMode] = useState(initialValue);
  return [mode, setMode];
};
