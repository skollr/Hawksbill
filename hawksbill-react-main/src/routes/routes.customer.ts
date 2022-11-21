import CustomerLayout from "../layouts/customer/CustomerLayout";
import { Home } from "../pages/customer";
import { CustomerPaths, RouteInterface } from "../helpers/interfaces";

const customerRoutes: RouteInterface[] = [
  {
    path: CustomerPaths.Home,
    layout: CustomerLayout,
    component: Home,
  },
];

export default customerRoutes;
