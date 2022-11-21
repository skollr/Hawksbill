import { PropsInterface } from "../../../helpers/interfaces";
import { useAuth } from "../../../hooks/useAuth";
import { UserDetail } from "./UserDetail";

export const Settings: React.FC<PropsInterface> = (): JSX.Element => {
  const { auth } = useAuth();
  return (
    <div className="main">
      <div className="main__content main__content--center">
        <div className="reusable__mmiddle">
          <UserDetail
            cardImageUrl={`${auth?.profile_image}`}
            position={`${auth?.position}`}
            closedRequestNumber={5}
            openRequestNumber={5}
            description={""}
            modificationDate={""}
            registrationDate={""}
          />
        </div>
      </div>
    </div>
  );
};
