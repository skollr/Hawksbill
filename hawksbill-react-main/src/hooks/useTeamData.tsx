import { useState } from "react";
import { APITeamInterface } from "../helpers/interfaces";

export const useTeamData = (
  initialValue: APITeamInterface[]
): [
  APITeamInterface[],
  React.Dispatch<React.SetStateAction<APITeamInterface[]>>
] => {
  const [teamData, setTeamData] = useState(initialValue);
  return [teamData, setTeamData];
};
