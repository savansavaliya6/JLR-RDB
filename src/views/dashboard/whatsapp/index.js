// ** React Imports
import React from "react";
import { useState } from "react";

import "@styles/react/libs/charts/apex-charts.scss";
import "../../../assets/output.css";

const WhatsappDashboard = () => {
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("select * from customers");
  const [isOpen, setIsOpen] = useState(false);

  const [sqltable, setSqlTable] = useState(false);
  const functionTwo = () => {
    setSqlTable(true);
  };
  return (
    <div id="dashboard-analytics">
      <div>
        <button type="button" className="btn btn-primary" onClick={functionTwo}>
          WhatsApp Portal
        </button>

        {sqltable === true && (
          <div style={{ padding: "5%" }}>
            <p>hi</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsappDashboard;
