// ** Navigation imports

import dashboards from "./dashboards";
import database from "./database";
import users from "./users";

// ** Merge & Export
export default [
  ...dashboards,
  // ...database,
  ...users,
];
