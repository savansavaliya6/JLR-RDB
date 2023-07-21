import React from "react";
import Chart from "react-apexcharts";
const ThirdTab = () => {
  const optionsJ = {
    legend: {
      show: true,
      position: "bottom",
    },
    chart: {
      width: 280,
      type: "pie",
      dropShadow: {
        enabled: true,
        color: "black",
        top: 5,
        left: 3,
        blur: 3,
        opacity: 0.2,
        backgroundColor: "red",
      },
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
            },
          },
        },
      },
    },

    labels: [
      "Jaguar XF",
      "Jaguar F-TYPE",
      "Jaguar F-TYPE",
      "Jaguar F-PACE",
      "Jaguar E-PACE",
      "Jaguar XF",
      "Jaguar F-TYPE",
      "Jaguar I-PACE",
      "Jaguar F-PACE",
    ],

    dataLabels: {
      dropShadow: {
        blur: 0,
        opacity: 0.8,
      },
    },
    fill: {
      type: "pattern",
      opacity: 1,
      pattern: {
        enabled: true,
        style: [
          "verticalLines",
          "squares",
          "horizontalLines",
          "circles",
          "slantedLines",
          "verticalLines",
          "squares",
          "horizontalLines",
          "circles",
          "slantedLines",
        ],
      },
    },
    states: {
      hover: {
        filter: "none",
      },
    },

    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  const optionsLR = {
    legend: {
      show: true,
      position: "bottom",
    },
    chart: {
      width: 280,
      type: "pie",
      dropShadow: {
        enabled: true,
        color: "black",
        top: 5,
        left: 3,
        blur: 3,
        opacity: 0.2,
        backgroundColor: "red",
      },
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
            },
          },
        },
      },
    },

    labels: [
      "Land Rover Range Rover Evoque",
      "Land Rover Discovery Sport",
      "Land Rover Discovery",
      "Land Rover Range Rover Sport",
      "Land Rover Range Rover Velar",
      "Land Rover New Defender",
    ],

    dataLabels: {
      dropShadow: {
        blur: 0,
        opacity: 0.8,
      },
    },
    fill: {
      type: "pattern",
      opacity: 1,
      pattern: {
        enabled: true,
        style: [
          // "verticalLines",
          // "squares",
          // "horizontalLines",
          // "circles",
          // "slantedLines",
        ],
      },
    },
    states: {
      hover: {
        filter: "none",
      },
    },

    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  const seriesJ = [44, 55, 41, 17, 15, 44, 55, 41, 17];
  const seriesLR = [44, 55, 41, 17, 15, 44, ];
  return (
    <div className="FirstTab">
      <p style={{ fontSize: "25px", marginTop: "2rem", color: "black" }}>
        Jaguar
      </p>
      <div>
        <Chart
          options={optionsJ}
          series={seriesJ}
          type={"pie"}
          height={"320"}
        />
      </div>
      <p style={{ fontSize: "25px", marginTop: "2rem", color: "black" }}>
        Land Rover
      </p>
      <div>
        <Chart
          options={optionsLR}
          series={seriesLR}
          type={"pie"}
          height={"320"}
        />
      </div>
      {/* First tab content will go here */}
    </div>
  );
};
export default ThirdTab;
