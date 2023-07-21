import React, { useState, Fragment } from "react";
import FirstTab from "../AllTabs/FirstTab";
import SecondTab from "../AllTabs/SecondTab";
import ThirdTab from "../AllTabs/ThirdTab";
import Chart from "react-apexcharts";
import Breadcrumbs from "@components/breadcrumbs";
import "./preview.css";
import { useNavigate } from "react-router-dom";
// ** Third Party Components
import { Row, Col } from "reactstrap";
const ReportPreview = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const navigate = useNavigate();
  const handleTab1 = () => {
    // update the state to tab1
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    // update the state to tab2
    setActiveTab("tab2");
  };
  const handleTab3 = () => {
    // update the state to tab2
    setActiveTab("tab3");
  };
  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      title: {
        text: "(Sales)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "" + val + " Sales";
        },
      },
    },
  };

  const series = [
    {
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58, 63, 54, 16],
    },
    {
      name: "Revenue",
      data: [76, 85, 101, 98, 87, 80, 91, 97, 94],
    },
    {
      name: "Free Cash Flow",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
    {
      name: "Net Profit",
      data: [49, 59, 59, 59, 69, 59, 69, 69, 66],
    },
    {
      name: "Revenue",
      data: [72, 82, 102, 92, 82, 102, 92, 112, 94],
    },
    {
      name: "Free Cash Flow",
      data: [30, 40, 30, 20, 40, 40, 50, 50, 41],
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        // minHeight: "400px",
        // background: "rgb(103 117 120)",
        // margin: "3.5rem auto 1.5rem",
        padding: "2rem 1rem",
        color: "black",
        // borderRadius: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        {" "}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            navigate("/reports/charts");
          }}
        >
          Go to Report List
        </button>
      </div>
      <Breadcrumbs
        title="Report Management"
        data={[{ title: "Report Managerment" }, { title: "Report Management" }]}
      />
      <ul
        style={{
          width: "60%",
          padding: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid black",
        }}
      >
        <li
          style={{
            width: "60%",
            padding: "1rem",
            listStyle: "none",
            textAlign: "center",
            cursor: "pointer",
            // transition: "all 0.7s",
            // borderRadius: "2rem",
          }}
          className={activeTab === "tab1" ? "active1111" : ""}
          onClick={handleTab1}
        >
          Bar
        </li>
        <li
          style={{
            width: "60%",
            padding: "1rem",
            listStyle: "none",
            textAlign: "center",
            cursor: "pointer",
            // transition: "all 0.7s",
            // borderRadius: "2rem",
          }}
          className={activeTab === "tab2" ? "active1111" : ""}
          onClick={handleTab2}
        >
          Line
        </li>
        <li
          style={{
            width: "60%",
            padding: "1rem",
            listStyle: "none",
            textAlign: "center",
            cursor: "pointer",
            // transition: "all 0.7s",
            // borderRadius: "2rem",
          }}
          className={activeTab === "tab3" ? "active1111" : ""}
          onClick={handleTab3}
        >
          Pie
        </li>
      </ul>

      <div className="outlet">
        {activeTab === "tab1" ? (
          <FirstTab />
        ) : activeTab === "tab2" ? (
          <SecondTab />
        ) : (
          <ThirdTab />
        )}
      </div>
    </div>
  );
};
export default ReportPreview;
