// ** Icons Import
import { List, Circle, File } from "react-feather";

export default [
  {
    id: "ListManagement",
    title: "List Management",
    icon: <List />,
    children: [
      {
        id: "ListManagement",
        title: "List Management",
        icon: <Circle size={12} />,
        navLink: "/list/management",
      },

      // {
      //   id: "eCommerceDash",
      //   title: "eCommerce",
      //   icon: <Circle size={12} />,
      //   navLink: "/dashboard/ecommerce",
      // },
    ],
  },
];
