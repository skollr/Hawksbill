import AdminLayout from "../layouts/admin/AdminLayout";
import {
  Dashboard,
  // LicensingTables,
  // Credentials,
  OpenRequest,
  ClosedRequest,
  Reports,
  Team,
  Settings,
} from "../pages/admin";
import { AdminPaths, RouteInterface } from "../helpers/interfaces";

const adminRoutes: RouteInterface[] = [
  {
    path: AdminPaths.Root,
    layout: AdminLayout,
    component: Dashboard,
  },
  {
    path: AdminPaths.Dashboard,
    layout: AdminLayout,
    component: Dashboard,
  },
  // {
  //   path: AdminPaths.LicensingTables,
  //   layout: AdminLayout,
  //   component: LicensingTables,
  // },
  // {
  //   path: AdminPaths.Credentials,
  //   layout: AdminLayout,
  //   component: Credentials,
  // },
  {
    path: AdminPaths.OpenRequest,
    layout: AdminLayout,
    component: OpenRequest,
  },
  {
    path: AdminPaths.ClosedRequest,
    layout: AdminLayout,
    component: ClosedRequest,
  },
  {
    path: AdminPaths.Team,
    layout: AdminLayout,
    component: Team,
  },
  {
    path: AdminPaths.Reports,
    layout: AdminLayout,
    component: Reports,
  },
  {
    path: AdminPaths.Settings,
    layout: AdminLayout,
    component: Settings,
  },
];

export default adminRoutes;
