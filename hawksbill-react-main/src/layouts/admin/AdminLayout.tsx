import { PropsInterface } from "../../helpers/interfaces";
import { Header } from "../../pages/shared/Header/Header";
import { SideMenu } from "../../pages/admin";

const AdminLayout: React.FC<PropsInterface> = ({
  children,
}: PropsInterface): JSX.Element => {
  return (
    <div className="adminlayout">
      <Header />
      <SideMenu></SideMenu>
      {children}
    </div>
  );
};

export default AdminLayout;
