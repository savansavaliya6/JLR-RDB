// ** React Imports
import { lazy } from "react";

const AccessControl = lazy(() =>
  import("../../views/extensions/access-control")
);
const ForgotPassword = lazy(() =>
  import("../../views/pages/authentication/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("../../views/pages/authentication/ResetPassword")
);
const Dashboard = lazy(() => import("../../views/dashboard/ecommerce/index"));
const ReportCharts = lazy(() => import("../../views/report/ReportCharts"));
const ReportPreview = lazy(() =>
  import("../../views/report/TabComponent/reportPreview")
);
const CustomerManagement = lazy(() => import("../../views/customers/index"));
const SalesManagement = lazy(() => import("../../views/sales/index"));
const VehiclesManagement = lazy(() => import("../../views/vehicles/index"));
const VehicleReport = lazy(() => ("../../views/vehicleReports/VehicleReports"))
const DashboardUdaan = lazy(() => import("../../views/dashboard/udaan"));
const Profile = lazy(() => import("../../views/profile/Profile"));
const DashboardWhatsapp = lazy(() => import("../../views/dashboard/whatsapp"));
const Login = lazy(() => import("../../views/pages/authentication/Login"));
const users = JSON.parse(sessionStorage.getItem("userRole")) || "[]";

const UserRoutes = [
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },
  {
    path: "/charts/details",
    element: <ReportCharts />,
  },
  {
    path: "/charts/preview",
    element: <ReportPreview />,
  },
  {
    path: "/access-control",
    element: <AccessControl />,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
  {
    path: "/pages/profile",
    element: <Profile />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    layout: "BlankLayout",
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },

  {
    path: "/dashboard/udaan",
    element: <DashboardUdaan />,
  },
  {
    path: "/dashboard/whatsapp",
    element: <DashboardWhatsapp />,
  },
  {
    path: "/vehicle/management",
    element: <VehiclesManagement />,
  },
  {
    path: "/customers/management",
    element: <CustomerManagement />,
  },
  {
    path: "/sales/management",
    element: <SalesManagement />,
  },
  {
    path: "/report/vehicle",
    element: <VehicleReport />,
  },
  {
    path: "/reset/:userid/:token",
    element: <ResetPassword />,
    layout: "BlankLayout",
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },
];

export default UserRoutes;
