import { PropsInterface } from "../../helpers/interfaces";

const CustomerLayout: React.FC<PropsInterface> = ({
  children,
}: PropsInterface): JSX.Element => {
  return <div className="customerlayout">{children}</div>;
};

export default CustomerLayout;
