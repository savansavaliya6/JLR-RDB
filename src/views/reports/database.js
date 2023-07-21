// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import ReportDetails from "./steps/ReportDetails";
import ReportCharts from "../report/ReportCharts";
import ReportsTable from "./steps/ReportsTable";
import ReportResult from "./steps/ReportResult";

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import { Button } from "bootstrap";
import ReportLoginForm from "./ReportLoginForm";

const Database = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [sqltable, setSqlTable] = useState(false);
  const [selectedChartOption, setSelectedChartOption] = useState("");
  const [selectedTableOption, setSelectedTableOption] = useState("");
  const [selectedNameOption, setSelectedNameOption] = useState("");
  const functionTwo = () => {
    setSqlTable(true);
  };

  const steps = [
    {
      id: "report-name",
      title: "Report Name",
      subtitle: "Enter Report Name.",
      content: (
        <ReportDetails
          stepper={stepper}
          type="wizard-vertical"
          onSelectName={(e) => {
            setSelectedNameOption(e);
          }}
        />
      ),
    },
    {
      id: "report-info",
      title: "Report Charts",
      subtitle: "Select Report Charts",
      content: (
        <ReportCharts
          stepper={stepper}
          selectOption={selectedNameOption}
          onCheckedChartOption={(e) => {
            setSelectedChartOption(e);
          }}
          type="wizard-vertical"
        />
      ),
    },
    // {
    //   id: "report-table",
    //   title: "Reports Table",
    //   subtitle: "Select Reports Table",
    //   content: (
    //     <ReportsTable
    //       stepper={stepper}
    //       onCheckedTableOption={(e) => {
    //         setSelectedTableOption(e);
    //       }}
    //       type="wizard-vertical"
    //     />
    //   ),
    // },
    {
      id: "report-result",
      title: "Show Report chart",
      subtitle: "Show Report chart",
      content: (
        <ReportResult
          stepper={stepper}
          checkedChartOption={selectedChartOption}
          checkedTableOption={selectedTableOption}
          type="wizard-vertical"
        />
      ),
    },
  ];

  return (
    <div>
      <div>
        {sqltable === false && (
          <div>
            <div
              style={{
                // backgroundColor: "grey",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              {" "}
              <button
                type="button"
                className="btn btn-primary"
                onClick={functionTwo}
              >
                Generate Report
              </button>
            </div>
            <div>
              <ReportLoginForm />
            </div>
          </div>
        )}
      </div>

      {sqltable === true && (
        <div className="vertical-wizard">
          <Wizard
            type="vertical"
            ref={ref}
            steps={steps}
            options={{
              linear: false,
            }}
            instance={(el) => setStepper(el)}
          />
        </div>
      )}
    </div>
  );
};

export default Database;
