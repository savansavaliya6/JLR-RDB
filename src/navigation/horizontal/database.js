// ** Icons Import
import { Home, Activity, ShoppingCart, Circle } from "react-feather";

export default [
  {
    id: "Databases",
    title: "Databases",
    icon: <Home />,
    children: [
      {
        id: "analyticsDash",
        title: "Analytics",
        // icon: <Circle size={12} />,
        navLink: "/dashboard/analytics",
      },
      {
        id: "whatsapp",
        title: "whatsapp",
        // icon: <Circle size={12} />,
        navLink: "/dashboard/whatsapp",
      },
      {
        id: "udaan",
        title: "Udaan",
        // icon: <Circle size={12} />,
        navLink: "/dashboard/udaan",
      },
      // {
      //   id: "analyticsDash",
      //   title: "Analytics",
      //   icon: <Activity />,
      //   navLink: "/dashboard/analytics",
      // },
      // {
      //   id: 'eCommerceDash',
      //   title: 'eCommerce',
      //   icon: <ShoppingCart />,
      //   navLink: '/dashboard/ecommerce'
      // }
    ],
  },
];
