import { lazy } from "react";

const DashboardAnalytics = lazy(() =>
  import("../../views/dashboard/analytics")
);
const DashboardUdaan = lazy(() => import("../../views/dashboard/udaan"));
const DashboardWhatsapp = lazy(() => import("../../views/dashboard/whatsapp"));
const SqlEditor = lazy(() => import("../../views/pages/Sqleditor/index"));
// const DashboardEcommerce = lazy(() =>
//   import("../../views/dashboard/ecommerce")
// );

const DashboardRoutes = [
  {
    path: "/dashboard/analytics",
    element: <DashboardAnalytics />,
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
    path: "/sql-editor",
    element: <SqlEditor />,
  },
  // {
  //   path: "/dashboard/ecommerce",
  //   element: <DashboardEcommerce />,
  // },
];

export default DashboardRoutes;
