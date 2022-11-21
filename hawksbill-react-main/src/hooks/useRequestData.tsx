import { useState } from "react";
import { APIRequestInterface } from "../helpers/interfaces";

export const useRequestData = (
  initialValue: APIRequestInterface[]
): [
  APIRequestInterface[],
  React.Dispatch<React.SetStateAction<APIRequestInterface[]>>
] => {
  const [requestData, setRequestData] = useState(initialValue);
  return [requestData, setRequestData];
};
