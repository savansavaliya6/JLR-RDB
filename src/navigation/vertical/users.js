// ** Icons Import
import { Users, Circle, File } from "react-feather";

export default [
  {
    id: "UserManagement",
    title: "User Management",
    icon: <Users />,
    navLink: "/user/management",
    // children: [
    //   {
    //     id: "UserManagement",
    //     title: "User Management",
    //     icon: <Circle size={12} />,
    //     navLink: "/user/management",
    //   },
    // ],
  },

  {
    id: "CustomerManagement",
    title: "Customer Management",
    icon: <File />,
    children: [
      {
        id: "Customer Management",
        title: "Customer Management",
        icon: <Circle size={12} />,
        navLink: "/customers/management",
      },
    ],
  },
  {
    id: "SalesManagement",
    title: "Sales Management",
    icon: <File />,
    children: [
      {
        id: "Sales Management",
        title: "Sales Management",
        icon: <Circle size={12} />,
        navLink: "/sales/management",
      },
    ],
  },
  {
    id: "VehicleManagement",
    title: "Vehicle Management",
    icon: <File />,
    children: [
      {
        id: "Vehicle Management",
        title: "Vehicle Management",
        icon: <Circle size={12} />,
        navLink: "/vehicle/management",
      },
    ],
  },
  {
    id: "ReportManagement",
    title: "Report Management",
    icon: <File />,
    children: [
      {
        id: "DatabaseReport",
        title: "Report Management",
        icon: <Circle size={12} />,
        navLink: "/reports/charts",
      },
    ],
  },
];
