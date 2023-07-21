import React from "react";
import Chart from "react-apexcharts";
const SecondTab = () => {
  const seriesLR = [
    {
      name: "Land Rover Range Rover Evoque",
      data: [44, 55, 57, 56, 61, 58, 63, 54, 16],
    },
    {
      name: "Land Rover Discovery Sport",
      data: [76, 85, 101, 98, 87, 80, 91, 97, 94],
    },
    {
      name: "Land Rover Discovery",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
    {
      name: "Land Rover Range Rover Sport",
      data: [49, 59, 59, 59, 69, 59, 69, 69, 66],
    },
    {
      name: "Land Rover Range Rover Velar",
      data: [72, 82, 102, 92, 82, 102, 92, 112, 94],
    },
    {
      name: "Land Rover New Defender",
      data: [30, 40, 30, 20, 40, 40, 50, 50, 41],
    },
  ];
  const seriesJ = [
    {
      name: "Jaguar XF",
      data: [44, 55, 57, 56, 61, 58, 63, 54, 16],
    },
    {
      name: "Jaguar F-TYPE",
      data: [76, 85, 101, 98, 87, 80, 91, 97, 94],
    },
    {
      name: "Jaguar F-TYPE",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
    {
      name: "Jaguar F-PACE",
      data: [49, 59, 59, 59, 69, 59, 69, 69, 66],
    },
    {
      name: "Jaguar E-PACE",
      data: [72, 82, 102, 92, 82, 102, 92, 112, 94],
    },
    {
      name: "Jaguar XF",
      data: [30, 40, 30, 20, 40, 40, 50, 50, 41],
    },
    {
      name: "Jaguar F-TYPE",
      data: [49, 59, 59, 59, 69, 59, 69, 69, 66],
    },
    {
      name: "Jaguar I-PACE",
      data: [72, 82, 102, 92, 82, 102, 92, 112, 94],
    },
    {
      name: "Jaguar F-PACE",
      data: [30, 40, 30, 20, 40, 40, 50, 50, 41],
    },
  ];
  const optionsJ = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      // text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
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
      ],
    },
  };
  const optionsLR = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "stepline",
    },
    title: {
      // text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
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
      ],
    },
  };;
  return (
    <div className="SecondTab">
      <p style={{ fontSize: "25px", marginTop: "2rem", color: "black" }}>
        Jaguar
      </p>
      <div>
        <Chart
          options={optionsJ}
          series={seriesJ}
          type={"line"}
          height={"320"}
        />
      </div>
      <p style={{ fontSize:'25px',marginTop:'2rem',color:'black'}}>Land Rover</p>
      <div>
        <Chart
          options={optionsLR}
          series={seriesLR}
          type={"line"}
          height={"320"}
        />
      </div>
      {/* First tab content will go here */}

      {/* Second  tab content will go here */}
    </div>
  );
};
export default SecondTab;
