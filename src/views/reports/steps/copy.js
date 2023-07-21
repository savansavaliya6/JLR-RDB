import React, { useState } from "react";
import { ArrowLeft, BarChart2 } from "react-feather";
import Loader from "react-js-loader";
import { Row, Button, Col } from "reactstrap";
import Chart from "react-apexcharts";
import { Card, CardHeader } from "reactstrap";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { addReport } from "../store/index";
import { useDispatch } from "react-redux";
const data = [
  { sales: "37%", count: "1991", series: 20 },
  { sales: "21%", count: "1992", series: 15 },
  { sales: "12%", count: "1993", series: 49 },
  { sales: "13%", count: "1994", series: 43 },
  { sales: "14%", count: "1995", series: 32 },
  { sales: "15%", count: "1996", series: 45 },
  { sales: "16%", count: "1997", series: 22 },
];

const ReportResult = ({ stepper }) => {
  const dispatch = useDispatch();
  const [sqltable, setSqlTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const reportChart = useSelector((state) => state.chart.reportChart);
  const uniqueNames = Array.from(new Set(reportChart));
  const brandName = useSelector((state) => state.chart.brandName);
  const reportName = useSelector((state) => state.chart.reportName);
  const password = useSelector((state) => state.chart.password);

  const functionTwo = () => {
    setSqlTable(true);
  };
  const donutColors = {
    series1: "#00d4bd",
    series2: "#ffe700",
    series3: "#9C27B0",
    series4: "#2b9bf4",
    series5: "#826bf8",
    series6: "#E91E63",
    series7: "#FFA1A1",
  };

  const series = data.map((row) => row.series);

  const options = {
    legend: {
      show: true,
      position: "bottom",
    },

    labels: data.map((row) => row.count),

    colors: [
      donutColors.series1,
      donutColors.series5,
      donutColors.series4,
      donutColors.series3,
      donutColors.series2,
      donutColors.series6,
      donutColors.series7,
    ],
    dataLabels: {
      enabled: false,
    },
    markers: {
      colors: ["#F44336", "#E91E63", "#9C27B0"],
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: "2rem",
              fontFamily: "Montserrat",
            },
            value: {
              fontSize: "1rem",
              fontFamily: "Montserrat",
              formatter(val) {
                return `${parseInt(val)}%`;
              },
            },
            total: {
              show: true,
              fontSize: "1.5rem",
              label: ["Jaguar"],
              // formatter() {
              //   return "31%";
              // },
            },
          },
        },
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
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: "1.5rem",
                  },
                  value: {
                    fontSize: "1rem",
                  },
                  total: {
                    fontSize: "1.5rem",
                  },
                },
              },
            },
          },
        },
      },
    ],
  };
  const series1 = [
    {
      data: data.map((row) => row.series),
    },
  ];
  const options1 = {
    chart: {
      id: "basic-bar",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      colors: ["#F44336", "#E91E63", "#9C27B0"],
    },
    fill: {
      colors: ["#F44336", "#E91E63", "#9C27B0"],
      // type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: data.map((row) => row.count),
    },
  };
  const reportValues = {
    name: reportName,
    brand_name: brandName,
    password: password,
    type: uniqueNames,
  };

  const handleSubmit = () => {
    dispatch(addReport(reportValues));
  };
  // const handleSubmit = () => {
  //   var data = {
  //     name: reportName,
  //     brand_name: brandName,
  //     password: password,
  //     type: uniqueNames,
  //   };

  //   var config = {
  //     method: "post",
  //     url: "https://rdbapi.vnvserver.com/api/report/data",
  //     data: { data: data },
  //   };
  //   setLoading(true);
  //   axios(config).then(function (response) {
  //     if (response.data.status === 200) {
  //       toast.success(response.data.msg);

  //       setLoading(false);
  //       // navigate("/login", { replace: true });
  //     } else {
  //       toast.error("123------", response.data.error);

  //       setLoading(false);
  //     }
  //   });
  // };
  return (
    <div>
      <div onClick={functionTwo}>
        {sqltable ? (
          <Button color="success" style={{ backgroundColor: "green" }}>
            Report Chart
          </Button>
        ) : (
          <Button style={{ backgroundColor: "green" }}>
            Click to view chart
          </Button>
        )}
      </div>

      <Row>
        <Card>
          <CardHeader
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "10px",
            }}
          >
            {uniqueNames.map((i) => (
              <div
                style={{
                  backgroundColor: "pink",
                  padding: 10,
                  borderRadius: 10,
                  color: "white",
                  fontWeight: "300",
                }}
              >
                <BarChart2 />
                {i}
              </div>
            ))}
          </CardHeader>

          <Row>
            {uniqueNames.map((i) => (
              <Col md={6}>
                {sqltable === true && (
                  <Chart
                    key={i}
                    options={
                      i === "donut"
                        ? options
                        : i === "pie"
                          ? options
                          : i === "bar"
                            ? options1
                            : options1
                    }
                    series={
                      i === "donut"
                        ? series
                        : i === "pie"
                          ? series
                          : i === "bar"
                            ? series1
                            : series1
                    }
                    type={i}
                    height={i === "donut" || i === "pie" ? 380 : 350}
                  />
                )}
              </Col>
            ))}
          </Row>
        </Card>
      </Row>
      <div className="d-flex justify-content-between">
        <Button
          color="primary"
          className="btn-prev"
          onClick={() => stepper.previous()}
        >
          <ArrowLeft
            size={14}
            className="align-middle me-sm-25 me-0"
          ></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">
            Previous
          </span>
        </Button>
        {loading ? (
          <Loader type="spinner-default" bgColor={"#42b983"} size={10} />
        ) : (
          <Button
            color="success"
            className="btn-submit"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReportResult;
