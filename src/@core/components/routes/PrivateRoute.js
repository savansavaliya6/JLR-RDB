// ** React Imports
import { Navigate } from "react-router-dom";
import { useContext, Suspense } from "react";

// ** Context Imports
import { AbilityContext } from "@src/utility/context/Can";

// ** Spinner Import
import Spinner from "../spinner/Loading-spinner";

const PrivateRoute = ({ children, route }) => {
  // ** Hooks & Vars
  const ability = useContext(AbilityContext);
  const user = JSON.parse(sessionStorage.getItem("userData"));
  const users = JSON.parse(sessionStorage.getItem("userRole"));

  if (route) {
    let action = null;
    let resource = null;
    let restrictedRoute = false;

    if (route.meta) {
      action = route.meta.action;
      resource = route.meta.resource;
      restrictedRoute = route.meta.restricted;
    }
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    if (user && restrictedRoute) {
      return <Navigate to="/" />;
    }
    if (
      user &&
      restrictedRoute &&
      (users.role === "user" || users.role === "Dealer")
    ) {
      return <Navigate to="/access-control" />;
    }
    if (
      user &&
      restrictedRoute &&
      (users.role === "admin" || users.role === "Admin")
    ) {
      return <Navigate to="/access-dashboard/analytics" />;
    }
    // if (user && !ability.can(action || "read", resource)) {
    //   return <Navigate to="/misc/not-authorized" replace />;
    // }
  }

  return (
    <Suspense fallback={<Spinner className="content-loader" />}>
      {children}
    </Suspense>
  );
};

export default PrivateRoute;