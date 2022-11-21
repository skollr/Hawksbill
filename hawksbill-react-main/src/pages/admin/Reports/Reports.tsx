import { PropsInterface } from "../../../helpers/interfaces";
import { ReportForm } from "./Forms";

export const Reports: React.FC<PropsInterface> = (): JSX.Element => {
  return (
    <div className="main">
      <div className="main__content main__content--center">
        <div className="reusable__mmiddle">
          <ReportForm />
        </div>
      </div>
    </div>
  );
};
