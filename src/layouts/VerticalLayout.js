import { Navigate, Outlet } from "react-router-dom"
import Layout from "@layouts/VerticalLayout"
import { Home, Users, Circle, File, User, Truck, BarChart } from "react-feather"

const VerticalLayout = (props) => {
  const users = JSON.parse(sessionStorage.getItem("userRole"))

  const adminOptions = [
    {
      id: "Dashboard",
      title: "Dashboard",
      icon: <i className="fa fa-home" aria-hidden="true"></i>,
      // badge: "light-warning",
      // badgeText: "2",
      navLink: "/admin/dashboard",
    },

    {
      id: "UserManagement",
      title: "User Management",
      icon: <i className="fa fa-user" aria-hidden="true"></i>,
      navLink: "/user/management",
      // children: [
      //   {
      //     id: "UserManagement",
      //     title: "User Management",
      //     icon: <User size={12} />,
      //     navLink: "/user/management",
      //   },
      // ],
    },

    {
      id: "CustomerManagement",
      title: "Customer Management",
      icon: <i className="fa fa-users" aria-hidden="true"></i>,
      navLink: "/customers/management",
      // children: [
      //   {
      //     id: "Customer Management",
      //     title: "Customer Management",
      //     icon: <Users size={12} />,
      //     navLink: "/customers/management",
      //   },
      // ],
    },
    {
      id: "SalesManagement",
      title: "Sales Management",
      icon: <i className="fas fa-poll" aria-hidden="true"></i>,
      navLink: "/sales/management",
      // children: [
      //   {
      //     id: "Sales Management",
      //     title: "Sales Management",
      //     icon: <BarChart size={12} />,
      //     navLink: "/sales/management",
      //   },
      // ],
    },

    {
      id: "VehicleManagement",
      title: "Vehicle Management",
      icon: <i className="fa fa-car" aria-hidden="true"></i>,
      navLink: "/vehicle/management",
      // children: [
      //   {
      //     id: "Vehicle Management",
      //     title: "Vehicle Management",
      //     icon: <Circle size={12} />,
      //     navLink: "/vehicle/management",
      //   },
      // ],
    },
    {
      id: "ReportManagement",
      title: "Report Management",
      icon: <i className="fa fa-file" aria-hidden="true"></i>,
      navLink: "/reports/charts",
      // children: [
      //   {
      //     id: "DatabaseReport",
      //     title: "Report Management",
      //     icon: <File size={12} />,
      //     navLink: "/reports/charts",
      //   },
      // ],
    },
    // big query components----------
    {
      id: "ExceptionReport",
      title: "Data Quality Check",
      icon: <i className="fa fa-file" aria-hidden="true"></i>,
      navLink: "/reports/exception",
      // children: [
      //   {
      //     id: "DatabaseReport",
      //     title: "Report Management",
      //     icon: <File size={12} />,
      //     navLink: "/reports/charts",
      //   },
      // ],
    },
    {
      id: "ExceptionEmail",
      title: "Exception Email",
      icon: <i className="fa fa-envelope" aria-hidden="true"></i>,
      navLink: "/reports/email",
      // children: [
      //   {
      //     id: "DatabaseReport",
      //     title: "Report Management",
      //     icon: <File size={12} />,
      //     navLink: "/reports/charts",
      //   },
      // ],
    },
    {
      id: "VehicleReports",
      title: "Vehicle Report",
      icon: <i class="fa fa-car" aria-hidden="true"></i>,
      navLink: "/report/vehicle",
      // children: [
      //   {
      //     id: "DatabaseReport",
      //     title: "Report Management",
      //     icon: <File size={12} />,
      //     navLink: "/reports/charts",
      //   },
      // ],
    },
  ]
  const userOptions = [
    {
      id: "Dashboard",
      title: "Dashboard",
      icon: <i className="fa fa-home" aria-hidden="true"></i>,
      // badge: "light-warning",
      // badgeText: "2",
      navLink: "/access-control",
    },

    {
      id: "CustomerManagement",
      title: "Customer Management",
      icon: <i className="fa fa-users" aria-hidden="true"></i>,
      navLink: "/customers/management",
      // children: [
      //   {
      //     id: "Customer Management",
      //     title: "Customer Management",
      //     icon: <Users size={12} />,
      //     navLink: "/customers/management",
      //   },
      // ],
    },
    {
      id: "SalesManagement",
      title: "Sales Management",
      icon: <i className="fas fa-poll" aria-hidden="true"></i>,
      navLink: "/sales/management",
      // children: [
      //   {
      //     id: "Sales Management",
      //     title: "Sales Management",
      //     icon: <BarChart size={12} />,
      //     navLink: "/sales/management",
      //   },
      // ],
    },
    {
      id: "VehicleManagement",
      title: "Vehicle Management",
      icon: <i className="fa fa-car" aria-hidden="true"></i>,
      navLink: "/vehicle/management",
      // children: [
      //   {
      //     id: "Vehicle Management",
      //     title: "Vehicle Management",
      //     icon: <Circle size={12} />,
      //     navLink: "/vehicle/management",
      //   },
      // ],
    },
    {
      id: "ReportManagement",
      title: "Report Management",
      icon: <i className="fa fa-file" aria-hidden="true"></i>,
      navLink: "/reports/charts",
      // children: [
      //   {
      //     id: "DatabaseReport",
      //     title: "Report Management",
      //     icon: <Circle size={12} />,
      //     navLink: "/reports/charts",
      //   },
      // ],
    },
    {
      id: "ExceptionReport",
      title: "Data Quality Check",
      icon: <i className="fa fa-file" aria-hidden="true"></i>,
      navLink: "/reports/exception",
      // children: [
      //   {
      //     id: "DatabaseReport",
      //     title: "Report Management",
      //     icon: <File size={12} />,
      //     navLink: "/reports/charts",
      //   },
      // ],
    },
    {
      id: "VehicleReports",
      title: "Vehicle Report",
      icon: <i class="fa fa-car" aria-hidden="true"></i>,
      navLink: "/report/vehicle",
      // children: [
      //   {
      //     id: "DatabaseReport",
      //     title: "Report Management",
      //     icon: <File size={12} />,
      //     navLink: "/reports/charts",
      //   },
      // ],
    },
  ]
  if (!users) return <Navigate to="/login" />
  return (
    <Layout
      menuData={
        users && (users.role === "admin" || users.role === "Admin")
          ? adminOptions
          : users.role === "role"
            ? userOptions
            : userOptions
      }
      {...props}
    >
      <Outlet />
    </Layout>
  )
}

export default VerticalLayout
