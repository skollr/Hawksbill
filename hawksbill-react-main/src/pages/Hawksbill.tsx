import { useAuth } from "../hooks/useAuth";
import { Navigation } from "../routes/Navigation";
import { Login } from "./shared";

const Hawksbill = (): JSX.Element => {
  const { auth } = useAuth();
  return (
    <div className="Hawksbill">
      {auth !== null && auth !== undefined ? <Navigation /> : <Login />}
    </div>
  );
};

export default Hawksbill;
