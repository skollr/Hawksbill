import { Login, NotFound } from "../pages/shared";
import { SharedPaths, RouteInterface } from "../helpers/interfaces";
import adminRoutes from "./routes.admin";
// import customerRoutes from "./routes.customer";

export const sharedRoutes: RouteInterface[] = [
  {
    path: SharedPaths.Login,
    component: Login,
  },
  {
    path: SharedPaths.NotFound,
    component: NotFound,
  },
];

export const routes: RouteInterface[] = [
  ...sharedRoutes,
  ...adminRoutes,
  // ...customerRoutes,
];
