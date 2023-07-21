// ** React Imports
import React from "react";
import { useContext, useState, Suspense } from "react";

import "@styles/react/libs/charts/apex-charts.scss";
import "../../../assets/output.css";
import { Toaster } from "react-hot-toast";
// import Loader from "../../../components/reusable/Loader";
import Loader from "react-js-loader";
const NavigationMenu = React.lazy(() =>
  import("../../../components/layouts/NavigationMenu")
);
const Editor = React.lazy(() => import("../../../components/editor/Editor"));
const TableSection = React.lazy(() =>
  import("../../../components/table/TableSection")
);

const WhatsappDashboard = () => {
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("select * from customers");
  const [isOpen, setIsOpen] = useState(false);

  const [sqltable, setSqlTable] = useState(false);
  const functionTwo = () => {
    setSqlTable(true);
  };
  return (
    <div
      id="dashboard-analytics"
      style={
        {
          // backgroundColor: "red",
        }
      }
    >
      {/* <h4>Query</h4> */}
      <div>
        {/* <Link to="/sql-editor">

        </Link> */}
        <button type="button" className="btn btn-primary" onClick={functionTwo}>
          WhatsApp Portal
        </button>

        {sqltable === true && (
          <div style={{ padding: "5%" }}>
            <Toaster
              position="top-center"
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                className: "",
                duration: 5000,
                style: {
                  background: "#ffffff",
                  color: "#3A4374",
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: "#4661E6",
                    secondary: "#ffffff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#D73737",
                    secondary: "#ffffff",
                  },
                },
              }}
            />
            <div className="grid grid-cols-layout-desktop grid-rows-layout-desktop min-h-screen">
              <Suspense fallback={<Loader />}>
                <NavigationMenu
                  setQuery={setQuery}
                  setValue={setValue}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
                <Editor
                  setQuery={setQuery}
                  value={value}
                  setValue={setValue}
                  isOpen={isOpen}
                />
                {query ? <TableSection query={query} isOpen={isOpen} /> : null}
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsappDashboard;
