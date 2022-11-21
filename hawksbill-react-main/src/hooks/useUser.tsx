import { useState } from "react";
import { UserDataInterface } from "../helpers/interfaces";

export const useUser = (
  initialValue?: UserDataInterface | null
): [
  UserDataInterface | null | undefined,
  React.Dispatch<React.SetStateAction<UserDataInterface | null | undefined>>
] => {
  const [user, setUser] = useState(initialValue);
  return [user, setUser];
};
