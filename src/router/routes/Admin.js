// ** React Imports
import { lazy } from "react"


const ReportCharts = lazy(() => import("../../views/report/ReportCharts"))
const VehicleReports = lazy(() => import("../../views/vehicleReports/VehicleReports"))
const ReportPreview = lazy(() =>
  import("../../views/report/TabComponent/reportPreview")
)
const DashboardUdaan = lazy(() => import("../../views/dashboard/udaan"))
const DashboardWhatsapp = lazy(() => import("../../views/dashboard/whatsapp"))
const UserManagement = lazy(() => import("../../views/users/index"))
const CustomerManagement = lazy(() => import("../../views/customers/index"))
const SalesManagement = lazy(() => import("../../views/sales/index"))
const VehiclesManagement = lazy(() => import("../../views/vehicles/index"))
const ListManageMent = lazy(() => import("../../views/lists/index"))
const DatabaseManagement = lazy(() => import("../../views/reports/database"))
// const ChartsData = lazy(() => import("../../views/rseports/database"));
const ChartList = lazy(() => import("../../views/report/index"))
const Login = lazy(() => import("../../views/pages/authentication/Login"))
const ForgotPassword = lazy(() =>
  import("../../views/pages/authentication/ForgotPassword")
)
const ResetPassword = lazy(() =>
  import("../../views/pages/authentication/ResetPassword")
)

const Dashboard = lazy(() => import("../../views/dashboard/ecommerce/index"))
const Profile = lazy(() => import("../../views/profile/Profile"))


// bigquery components--------
const ExceptionReport = lazy(() =>
  import("../../views/bigquery/reports/ExceptionReport")
)
const ExceptionEmail = lazy(() =>
  import("../../views/bigquery/email/ExceptionEmail")
)



const users = JSON.parse(sessionStorage.getItem("userRole")) || "[]"

const AdminRoutes = [
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
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/user/management",
    element: <UserManagement />,
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
    path: "/vehicle/management",
    element: <VehiclesManagement />,
  },
  {
    path: "/list/management",
    element: <ListManageMent />,
  },
  {
    path: "/pages/profile",
    element: <Profile />,
  },
  {
    path: "/database/report",
    element: <DatabaseManagement />,
  },
  {
    path: "/reports/charts",
    element: <ChartList />,
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
    path: "/reset/:userid/:token",
    element: <ResetPassword />,
    layout: "BlankLayout",
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true,
    },
  },
  // big query components
  {
    path: "/reports/exception",
    element: <ExceptionReport />,
  },
  {
    path: "/reports/email",
    element: <ExceptionEmail />,
  },
  {
    path: "/report/vehicle",
    element: <VehicleReports />,
  },
]

export default AdminRoutes
